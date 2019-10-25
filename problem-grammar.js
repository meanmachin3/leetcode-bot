// Generated automatically by nearley, version 2.18.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "problemMessage", "symbols": ["dateTag", "hardTag", "idTag", "nl", "body"], "postprocess": d => new Object({date: d[0], hardness: d[1], id: d[2], problem: d[4]})},
    {"name": "weekDay$string$1", "symbols": [{"literal":"M"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "weekDay", "symbols": ["weekDay$string$1"]},
    {"name": "weekDay$string$2", "symbols": [{"literal":"T"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "weekDay", "symbols": ["weekDay$string$2"]},
    {"name": "weekDay$string$3", "symbols": [{"literal":"W"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "weekDay", "symbols": ["weekDay$string$3"]},
    {"name": "weekDay$string$4", "symbols": [{"literal":"T"}, {"literal":"h"}, {"literal":"u"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "weekDay", "symbols": ["weekDay$string$4"]},
    {"name": "weekDay$string$5", "symbols": [{"literal":"F"}, {"literal":"r"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "weekDay", "symbols": ["weekDay$string$5"]},
    {"name": "weekDay$string$6", "symbols": [{"literal":"S"}, {"literal":"a"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "weekDay", "symbols": ["weekDay$string$6"]},
    {"name": "weekDay$string$7", "symbols": [{"literal":"S"}, {"literal":"u"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "weekDay", "symbols": ["weekDay$string$7"]},
    {"name": "month$string$1", "symbols": [{"literal":"J"}, {"literal":"a"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "month", "symbols": ["month$string$1"]},
    {"name": "month$string$2", "symbols": [{"literal":"F"}, {"literal":"e"}, {"literal":"b"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "month", "symbols": ["month$string$2"]},
    {"name": "month$string$3", "symbols": [{"literal":"M"}, {"literal":"a"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "month", "symbols": ["month$string$3"]},
    {"name": "month$string$4", "symbols": [{"literal":"A"}, {"literal":"p"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "month", "symbols": ["month$string$4"]},
    {"name": "month$string$5", "symbols": [{"literal":"M"}, {"literal":"a"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "month", "symbols": ["month$string$5"]},
    {"name": "month$string$6", "symbols": [{"literal":"J"}, {"literal":"u"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "month", "symbols": ["month$string$6"]},
    {"name": "month$string$7", "symbols": [{"literal":"J"}, {"literal":"u"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "month", "symbols": ["month$string$7"]},
    {"name": "month$string$8", "symbols": [{"literal":"A"}, {"literal":"u"}, {"literal":"g"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "month", "symbols": ["month$string$8"]},
    {"name": "month$string$9", "symbols": [{"literal":"S"}, {"literal":"e"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "month", "symbols": ["month$string$9"]},
    {"name": "month$string$10", "symbols": [{"literal":"O"}, {"literal":"c"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "month", "symbols": ["month$string$10"]},
    {"name": "month$string$11", "symbols": [{"literal":"N"}, {"literal":"o"}, {"literal":"v"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "month", "symbols": ["month$string$11"]},
    {"name": "month$string$12", "symbols": [{"literal":"D"}, {"literal":"e"}, {"literal":"c"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "month", "symbols": ["month$string$12"]},
    {"name": "day", "symbols": [/[0-3]/, /[0-9]/], "postprocess": d => d.join('')},
    {"name": "year$string$1", "symbols": [{"literal":"2"}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "year", "symbols": ["year$string$1", /[1-2]/, /[0-9]/], "postprocess": d => d.join('')},
    {"name": "dateTag", "symbols": [{"literal":"["}, "weekDay", {"literal":" "}, "month", {"literal":" "}, "day", {"literal":" "}, "year", {"literal":"]"}], "postprocess": d => d.slice(1,8).join('')},
    {"name": "hardness$string$1", "symbols": [{"literal":"e"}, {"literal":"a"}, {"literal":"s"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "hardness", "symbols": ["hardness$string$1"]},
    {"name": "hardness$string$2", "symbols": [{"literal":"m"}, {"literal":"e"}, {"literal":"d"}, {"literal":"i"}, {"literal":"u"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "hardness", "symbols": ["hardness$string$2"]},
    {"name": "hardness$string$3", "symbols": [{"literal":"h"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "hardness", "symbols": ["hardness$string$3"]},
    {"name": "hardTag", "symbols": [{"literal":"["}, "hardness", {"literal":"]"}], "postprocess": d => d[1].join('')},
    {"name": "body$ebnf$1", "symbols": ["any"]},
    {"name": "body$ebnf$1", "symbols": ["body$ebnf$1", "any"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "body", "symbols": ["body$ebnf$1"], "postprocess": d => d[0].join("")},
    {"name": "any", "symbols": [/./]},
    {"name": "any", "symbols": ["nl"]},
    {"name": "id", "symbols": ["int"]},
    {"name": "idTag", "symbols": [{"literal":"["}, "id", {"literal":"]"}], "postprocess": d => d[1].join('')},
    {"name": "nl", "symbols": [{"literal":"\n"}]},
    {"name": "nl$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "nl", "symbols": ["nl$string$1"]}
]
  , ParserStart: "problemMessage"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
