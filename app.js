const token = '469094055:AAFdKs9jkqZiXqaXBd9V5TOep8OgCL1r3Fc';
const telegramBot = require('node-telegram-bot-api');
const request = require('request');
// const fs = require('fs');

const bot = new telegramBot(token, {
    polling: true
});

var urlCourse = 'https://api.coinmarketcap.com/v1/ticker/?limit=5';

function start(chatId) {
    bot.sendMessage(chatId, 'Привет! Я криптоБот. \nВыбери валюту, чтобы продолжить!', {
        reply_markup: JSON.stringify({
            keyboard: [[{
                text: 'Курсы топ-5 криптовалют'
            }]]
        })
    });
};

function sendRequest(chatId, i) {
    request(urlCourse, function (error, response, body) {
       var data = JSON.parse(body);
    
        bot.sendMessage(chatId,
            data[i].name +' (' + data[i].symbol + ')' + '\nЦена ($): ' + 
            data[i].price_usd + '\nЦена (BTC): ' + data[i].price_btc
        );
    });
};

function sendList(chatId) {
    bot.sendMessage(chatId, 
        '/BTC\n/ETH\n/XRP\n/BCH\n/LTC'
    );
}

bot.on('message', function(msg) {
    var chatId = msg.from.id;

    switch (msg.text) {
        case '/start':
            start(chatId);
            break;
        case 'Курсы топ-5 криптовалют':
            sendList(chatId);
            break;
        case '/BTC':
            sendRequest(chatId, 0);
            break;
        case '/ETH':
            sendRequest(chatId, 1);
            break;
        case '/XRP':
            sendRequest(chatId, 2);
            break;
        case '/BCH':
            sendRequest(chatId, 3);
            break;
        case '/LTC':
            sendRequest(chatId, 4);
            break;
    }
});
