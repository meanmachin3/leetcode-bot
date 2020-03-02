/*jshint esversion: 8 */
require('leetcode-cli/lib/cli');
require('dotenv').config();

var fs = require("fs");
var path = require('path');
var tmp = require('tmp');
var _ = require('underscore');
const util = require('util');
const asyncTmpFile = util.promisify(tmp.file);

const config = require('leetcode-cli/lib/config');
const plugin = require('leetcode-cli/lib/plugin');
const core = require('leetcode-cli/lib/core');
const session = require('leetcode-cli/lib/session');
const log = require('leetcode-cli/lib/log');
const chalk = require('leetcode-cli/lib/chalk');

log.init();
log.setLevel('INFO');

chalk.enabled = false;
chalk.init();
config.init();

function initLeetcodeSubsystem(cb) {
  try {
    console.log("creating path " + path.join(__dirname, '..', '.lc/leetcode'));
    fs.mkdirSync(path.join(__dirname, '..', '.lc',));
    fs.mkdirSync(path.join(__dirname, '..', '.lc', 'leetcode'));
    fs.mkdirSync(path.join(__dirname, '..', '.lc', 'leetcode', 'cache'));
    leetcodeUserData = `
    {
        "login": "${process.env.LEETCODE_LOGIN}",
        "loginCSRF": "",
        "sessionCSRF":  "${process.env.LEETCODE_SESSION_CSRF}",
        "sessionId":   "${process.env.LEETCODE_SESSION_ID}"
    }`;
    fs.writeFileSync((path.join(__dirname, '..', '.lc', 'leetcode', 'user.json')), leetcodeUserData);
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }  
  if (plugin.init()) {
    return cb();
  } else {
    plugin.installMissings(function (e) {
      if (e) return cb(e);
      plugin.init();
      return cb();
    });
  }
}


var language_extensions = {
  python: 'py',
  python3: 'py',
  c: 'c',
  cpp: 'cpp',
  scala: 'sc',
  java: 'java',
  javascript: 'js',
  js: 'js'
};

class LeetcodeClient {

  constructor() {
    initLeetcodeSubsystem(function (e) { });
    this.login();
  }

  login() {
    core.login({
      login: process.env.LEETCODE_LOGIN,
      pass: process.env.LEETCODE_PASS
    }, function (e, user) {
      if (e) console.log(e);
    })
  }

  async getAny(type) {
    await this.login();

    return new Promise((resolve, reject) => {
      core.filterProblems({ query: type[0], tag: ['algorithms'] }, (e, problems) => {
        if (e) {
          console.log(e)
          reject(e);
        }
        else {
          problems = problems.filter(function (x) {
            if (x.state === 'ac') return false;
            if (x.locked) return false;
            return true;
          });
          if (problems.length === 0) return log.fail('Problem not found!');

          const problem = _.sample(problems);
          resolve(problem);
        }
      });
    });
  }

  submit(id, lang, text, reply) {
    core.getProblem(id, function (e, problem) {
      if (e) return console.log(e);

      var ext = '.py';
      if (_.has(language_extensions, lang.toLowerCase())) {
        ext = language_extensions[lang.toLowerCase()];
      }
      var options = {
        template: `${id}.XXXXXXXX.${ext}`,
        keep: true
      };
      tmp.file(options, (err, path, fd, cleanupCallback) => {
        try {
          if (err) throw err;

          fs.writeFileSync(path, text);
          problem.file = path;
          problem.lang = lang;

          core.submitProblem(problem, function (e, results) {
            if (e) return log.fail(e);

            const result = results[0];

            const stateMsg = result.state;
            const infoMsg = `${result.passed}/${result.total} cases passed (${result.runtime})`;
            console.log("result: %s", infoMsg)
            reply({ state: stateMsg, extra: infoMsg });

            if (result.ok) {
              session.updateStat('ac', 1);
              session.updateStat('ac.set', problem.fid);
              core.updateProblem(problem, { state: 'ac' });
            }
          });
        } finally {
          cleanupCallback();
        }
      });
    });
  }
}

module.exports = new LeetcodeClient();
