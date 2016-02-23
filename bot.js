/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
          \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
           \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    set token=<MY TOKEN>
	
	node bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "who are you?"

  The bot will tell you its name, where it running, and for how long.

  Say: "Call me <nickname>"

  Tell the bot your nickname. Now you are friends.

  Say: "who am I?"

  The bot will tell you your nickname, if it knows one for you.

  Say: "shutdown"

  The bot will ask if you are sure, and then shut itself down.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit is has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var os = require('os');

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();


controller.hears(['hello','hi'],'direct_message,direct_mention,mention',function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    },function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(',err);
        }
    });


    controller.storage.users.get(message.user,function(err, user) {
        if (user && user.name) {
            bot.reply(message,'Hello ' + user.name + '!!');
        } else {
            bot.reply(message,'Hello.');
        }
    });
});

controller.hears(['call me (.*)'],'direct_message,direct_mention,mention',function(bot, message) {
    var matches = message.text.match(/call me (.*)/i);
    var name = matches[1];
    controller.storage.users.get(message.user,function(err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        controller.storage.users.save(user,function(err, id) {
            bot.reply(message,'Got it. I will call you ' + user.name + ' from now on.');
        });
    });
});

controller.hears(['what is my name','who am i'],'direct_message,direct_mention,mention',function(bot, message) {

    controller.storage.users.get(message.user,function(err, user) {
        if (user && user.name) {
            bot.reply(message,'Your name is ' + user.name);
        } else {
            bot.reply(message,'I don\'t know yet!');
        }
    });
});

controller.hears(['Who made you','who is your daddy'],'direct_message,direct_mention,mention',function(bot, message) {
                bot.reply(message, 'Robert made me.');
});

controller.hears(['prime'],'direct_message,direct_mention,mention',function(bot, message) {
            bot.reply(message, 'First ten prime numbers are: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29');    
});

controller.hears(['prime (.*)'],'direct_message,direct_mention,mention',function(bot, message) {
				
				var input = message.match[1];
				var x = parseInt(input);
				console.log("X is "+x);
			
			function isPrime(x) {
				var d = x-1;
				while(d>1) {
				console.log("X is "+x+" D is"+d);
					if((x%d)==0) {
						return false;
					}
					d--;
				}
				return true;
			}
			
			if(x>1 && x%1==0 && x!=null) {
				if(isPrime(x)) {
					bot.reply(message, 'The number you gave is prime!');
					bot.reply(message, 'Next ten prime numberare: ');
					var count = 0;
					while(count <10){
						x++;
						if(isPrime(x)) {
							bot.reply(message, x+', ');
							count++;
						}
					}
				}
			
				else{	
					bot.reply(message, 'The number you gave is not prime!');
				}
			}
			
			else {
				bot.reply(message, 'Input a proper number, damn it!');
			}
});



controller.hears(['shutdown'],'direct_message,direct_mention,mention',function(bot, message) {

    bot.startConversation(message,function(err, convo) {
        convo.ask('Are you sure you want me to shutdown?',[
            {
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    convo.say('Bye!');
                    convo.next();
                    setTimeout(function() {
                        process.exit();
                    },3000);
                }
            },
        {
            pattern: bot.utterances.no,
            default: true,
            callback: function(response, convo) {
                convo.say('*Phew!*');
                convo.next();
            }
        }
        ]);
    });
});


controller.hears(['uptime','identify yourself','who are you','what is your name'],'direct_message,direct_mention,mention',function(bot, message) {

    var hostname = os.hostname();
    var uptime = formatUptime(process.uptime());

    bot.reply(message,':robot_face: I am a bot named <@' + bot.identity.name + '>. I have been running for ' + uptime + ' on ' + hostname + '.');

});

controller.hears(['fibonacci(.*)'],'direct_message,direct_mention,mention',function(bot, message) {
    var param = message.match[1].trim();
    if(param.length==0){
        var a = 0, b = 1;
        var fibos = [];
        for (var i = 1; i <= 10; i++) {
            a = a + b;
            b = a - b;
            fibos.push(a);
        }
        bot.reply(message, fibos.toString());
    }else if(!isNaN(param) && Number(param) % 1 === 0) {
        var couldBeFibo = true;
        var isSurelyFibo = false;
        var a = 0, b = 1;
        var fibos = [];
        var i = 1;
        for (; couldBeFibo && !isSurelyFibo; i++) {
            a = a + b;
            b = a - b;
            if (a === Number(param)) {
                isSurelyFibo = true;
            } else if (a > param) {
                couldBeFibo = false;
            } else {
                fibos.push(a);
            }
        }
        if (isSurelyFibo) {
            start = i <= 10 ? 0 : fibos.length - 10;
            var tenLastFibos = fibos.slice(start, fibos.length);
            bot.reply(message, tenLastFibos.toString());
        }else{
            bot.reply(message, "not fibonacci number");
        }
    }else{
        bot.reply(message, "Give me a number parameter");
    }
});

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}
