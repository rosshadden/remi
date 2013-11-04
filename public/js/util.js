(function() {
	"use strict";

	////////////////////////////////
	//	GLOBAL
	////////////////////////////////
		//	Custom logging function.
		window.log = function f() {
			log.history = log.history || [];
			log.history.push(arguments);
			if (this.console) {
				var args = arguments,
					newarr;
				args.callee = args.callee.caller;
				newarr = [].slice.call(args);
				if (typeof console.log === 'object') log.apply.call(console.log, console, newarr);
				else console.log.apply(console, newarr);
			}
		};

		//	Makes it safe to use console.log even in IE.
		(function(a) {
			function b() {}
			for (var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), d; !! (d = c.pop());) {
				a[d] = a[d] || b;
			}
		})
		(function() {
			try {
				console.log();
				return window.console;
			} catch (a) {
				return (window.console = {});
			}
		}());

	////////////////////////////////
	//	HANDLEBARS
	////////////////////////////////
		Handlebars.registerHelper('log', function(string){
			var args = Array.prototype.slice.call(arguments);
			return console.log('LOG:', args.slice(0, -1)) || "";
		});

		//	Handlebars Equality helper.
		//	{{#iff one}}:  !!one
		//	{{#iff one two}}:  one === two
		//	{{#iff one "[operator]" two}}:  one [operator] two
		Handlebars.registerHelper('iff', function(){
			var args = Array.prototype.slice.call(arguments);

			var	left = args[0],
				operator = '===',
				right,
				options = {};

			if(args.length === 2){
				right = true;
				options = args[1];
			}

			if(args.length === 3){
				right = args[1];
				options = args[2];
			}

			if(args.length === 4){
				operator = args[1];
				right = args[2];
				options = args[3];
			}

			if(options.hash && options.hash['case'] === false){
				left = (""+left).toLowerCase();
				right = (""+right).toLowerCase();
			}

			var operators = {
				"^==$": function(l, r){ return l == r; },
				"^!=$": function(l, r){ return l !== r; },
				"^IS$|^===$": function(l, r){ return l === r; },
				"^NOT$|^IS NOT$|^!==$|^!$": function(l, r){ return l != r; },
				"^OR$|^\\|\\|$": function(l, r){ return l || r; },
				"^AND$|^&&$": function(l, r){ return l && r; },
				"^MOD$|^%$": function(l, r){ return !(l % r); },
				"^<$": function(l, r){ return l < r; },
				"^>$": function(l, r){ return l > r; },
				"^<=$": function(l, r){ return l <= r; },
				"^>=$": function(l, r){ return l >= r; },
				"^typeof$": function(l, r){ return typeof l == r; },
				"^IN$|^E$": function(l, r){
					var isPresent = false;
					if(typeof r === 'object'){
						if(r.indexOf && r instanceof Array){
							if(/^\d+$/.test(l)){
								isPresent = !!~r.indexOf(+l) || !!~r.indexOf(""+l);
							}
							return isPresent || !!~r.indexOf(l);
						}else{
							return l in r;
						}
					}
				}
			};

			var op, result, expression;
			for(op in operators){
				expression = RegExp(op, 'i');

				if(expression.test(operator)){
					result = operators[op](left, right);

					if(result){
						return options.fn(this);
					}else{
						return options.inverse(this);
					}
				}
			}

			if(!operators[operator]){
				throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
			}
		});
})();
