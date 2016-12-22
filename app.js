var restify = require('restify'); //used to create "strict" API services
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

var botConnectorOptions = {
    appId: process.env.BOTFRAMEWORK_APPID,
    appSecret: process.env.BOTFRAMEWORK_APPSECRET
};

var bot = new builder.BotConnectorBot(botConnectorOptions);
bot.add('/',function(session) {
  session.send("You said " + session.message.text);
  });


// Setup Restify Server
var server = restify.createServer();

server.post('/api/messages', bot.verifyBotFramework(),bot.listen());

server.get(/.*/,restify.serverStatic({
  'directory': '.',
  'default': 'index.html'
  }));

server.listen(process.env.port || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

