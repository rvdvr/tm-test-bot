const token = '469094055:AAFdKs9jkqZiXqaXBd9V5TOep8OgCL1r3Fc';
const telegramBot = require('node-telegram-bot-api');
const request = require('request');
// const fs = require('fs');

const bot = new telegramBot(token, {
    polling: true
});

var urlCourse = 'https://api.coinmarketcap.com/v1/ticker/?limit=5';

function sendRequest(chatId, i) {
    request(urlCourse, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage
        var data = JSON.parse(body);
    
        bot.sendMessage(chatId,
            data[i].name +' (' + data[i].symbol + ')' + '\nЦена ($): ' + data[i].price_usd + ' $ \nЦена (BTC): ' + data[i].price_btc + ' BTC'
        );
    });
}

function start(chatId) {
    bot.sendMessage(chatId, 'Привет! Я криптоБот. \nВыбери валюту, чтобы продолжить!', {
        reply_markup: JSON.stringify({
            keyboard: [[{
                text: 'BTC'
            }],
            [{
                text: 'ETH'
            }],
            [{
                text: 'XRP'
            }],
            [{
                text: 'BCH'
            }],
            [{
                text: 'LTC'
            }]]
        })
    });
}

bot.on('message', function(msg) {
    var chatId = msg.from.id;

    switch (msg.text) {
        case '/start':
            start(chatId);
            break;
        case 'BTC':
            sendRequest(chatId, 0);
            break;
        case 'ETH':
            sendRequest(chatId, 1);
            break;
        case 'XRP':
            sendRequest(chatId, 2);
            break;
        case 'BCH':
            sendRequest(chatId, 3);
            break;
        case 'LTC':
            sendRequest(chatId, 4);
            break;
    }
});


