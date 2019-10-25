/*jshint esversion: 8 */

require('process');
require('dotenv').config();

const nearley = require("nearley");
const grammar = require("./problem-grammar.js");
const later = require('later');

const Discord = require('discord.js');
const discordClient = new Discord.Client();
const leetcodeClient = require('./external/leetcode-client');
const prefix = "!";

var problemsChannel;
var solutionsChannel;

async function cleanupPinnedProblems() {
  const pins = await problemsChannel.fetchPinnedMessages();
  for (let [id, msg] of pins) {
    msg.unpin();
  }
}

function initProblemsChannel() {
  problemsChannel = discordClient.guilds
    .find(guild => guild.name === process.env.GUILD).channels
    .find(ch => ch.name === process.env.CHANNEL);
  solutionsChannel = discordClient.guilds
  .find(guild => guild.name === process.env.GUILD).channels
  .find(ch => ch.name === process.env.CHANNEL);
}

function getProblemParser() {
  return new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
}

function parseStoredProblem(problem) {
  const problemParser = getProblemParser();
  return problemParser.feed(problem).finish()[0];
}

function getProblemHeader(problem) {
  return `${problem.name}\n${problem.link}`;
}

async function renewProblemOfADay(hardness) {
  const pinned = await problemsChannel.fetchPinnedMessages()
  var problemsByType = {};
  problemsByType[hardness] = null

  var messagesByType = {};

  for (var [id, msg] of pinned) {
    try {
      var problemMsg = parseStoredProblem(msg.content);
      problemsByType[problemMsg.hardness] = problemMsg;
      messagesByType[problemMsg.hardness] = msg;
    } catch (e) {
      console.log("Error parsing pinned problem: %s", e);
    }
  }
  var today = (new Date()).toDateString()

  if (!problemsByType[hardness] || problemsByType[hardness].date !== today) {
    newProblem = await leetcodeClient.getAny(hardness)
    var newMsg = await problemsChannel.send(`[${today}][${hardness}][${newProblem.fid}]\n${getProblemHeader(newProblem)}`)
    newMsg.pin()

    if (messagesByType[hardness]) {
      messagesByType[hardness].unpin();
    }
  }
}

discordClient.on('ready', async () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
  initProblemsChannel();
});

discordClient.on("message", async msg => {
  if (msg.channel.type !== "text") return;
  if (!msg.content.startsWith(prefix)) return;
  if (!msg.channel.permissionsFor(discordClient.user).has("SEND_MESSAGES")) return;

  const words = msg.content.slice(prefix.length).replace( /\n/g, " " ).split(" ");
  console.log(msg.content);
  const cmd = words.shift();

  switch (cmd) {
    case "help":
      msg.channel.send(`
Hello! I am 'leetcode-a-day' bot. I will pick at random 
one hard problem every Monday,
one medium problem every Monday and Wednessday and
one easy problem every day, so you can practice non-stop.

Commands:
'${prefix}list' to see chosen problems.
'${prefix}submit <id> <lang> <code>' to judge your solution. Paste formatted code in form \\\`\\\`\\\`lang ... \\\`\\\`\\\`
`);
      break;

    case "list":
      const pinned = await problemsChannel.fetchPinnedMessages();
      for (var [id, problemMsg] of pinned) {
        msg.reply("\n" + problemMsg.content);
      }
      break;

    case "submit":
      try {
        console.log(words);
        const problemId = words.shift();
        const lang = words.shift();
        var code = words.join(" ");
        code = code.replace(/^[\s\n]*```[^\s\n]+/, '').replace(/```[\s\n]*$/, '');

        leetcodeClient.submit(problemId, lang, code, (result) => {
          solutionsChannel.send(`${msg.author} submitted problem ${problemId}\n${JSON.stringify(result)}`);
          if (result.state === 'Accepted') {
            solutionsChannel.send(`Hurray to ${msg.author}!`);
          }
        })
      } catch (e) {
        console.log(e);
        solutionsChannel.send("Something went wrong. Please contact admin");
      }
      break;
  }
})

var everyDaySched = later.parse.cron('0 10 * * 1-5 *')
var everyMonAndWedSched = later.parse.cron('0 10 * * 1,3 *')
var everyMonSched = later.parse.cron('0 10 * * 1 *')

later.setInterval(async () => {
  renewProblemOfADay("easy")
}, everyDaySched);

later.setInterval(async () => {
  renewProblemOfADay("medium")
}, everyMonAndWedSched);

later.setInterval(async () => {
  renewProblemOfADay("hard")
}, everyMonSched);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  console.log(reason.stack)
});

discordClient.login(process.env.BOT_TOKEN)