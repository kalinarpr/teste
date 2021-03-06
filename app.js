var restify = require('restify');
var builder = require('botbuilder');

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);

// Get secrets from server environment
//var botConnectorOptions = {
//    appId: process.env.BOTFRAMEWORK_APPID,
//    appSecret: process.env.BOTFRAMEWORK_APPSECRET
//};

// Create bot
//var bot = new builder.BotConnectorBot(botConnectorOptions);
//bot.add('/', function (session) {

    //respond with user's message
  //  session.send("You said " + session.message.text);
//});

// Setup Restify Server
var server = restify.createServer();

// Handle Bot Framework messages
server.post('/api/messages', connector.listen());
//server.post('/api/messages', bot.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.send("You said " + session.message.text);
});