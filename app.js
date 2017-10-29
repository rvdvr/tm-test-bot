const token = '469094055:AAFdKs9jkqZiXqaXBd9V5TOep8OgCL1r3Fc';
const fs = require('fs');
const telegramBot = require('node-telegram-bot-api');

const bot = new telegramBot(token, {
    polling: true
});

function start(chatId) {
    bot.sendMessage(chatId, 'Привет! Я криптоБот. \nВыбери валюту, чтобы продолжить!', {
        reply_markup: JSON.stringify({
            keyboard: [[{
                text: 'BTC'
            }],
            [{
                text: 'TOP-5'
            }]]
        })
    });
}

function sendBTC(chatId) {
    bot.sendMessage(chatId, 'Курс BTC' + ' составляет 50.000 Р');
}

function sendTop(chatId) {
    bot.sendMessage(chatId, 'Курс TOP-5 валют' + ' составляет 50.000 Р');
}

bot.on('message', function(msg) {
    var chatId = msg.from.id;

    switch (msg.text) {
        case '/start':
            start(chatId);
            break;
        case 'BTC':
            sendBTC(chatId);
            break;
        case 'TOP-5':
            sendTop(chatId);
            break;
    }
});
