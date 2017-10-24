const token = '469094055:AAFdKs9jkqZiXqaXBd9V5TOep8OgCL1r3Fc';
const fs = require('fs');
const telegramBot = require('node-telegram-bot-api');

const bot = new telegramBot(token, {
    polling: true
});

bot.on('message', function(msg) {
    var chatId = msg.from.id;
    var file = __dirname + '/photo.jpg';

    bot.sendPhoto(chatId, file);
});
