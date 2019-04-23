var http = require('http');
var colors = require('colors');
var handlers = require('./handlers')

function start() {
    function onRequest(req, resp) {
        console.log('Odebrano zapytanie'.green);
        console.log('Zapytanie ' + req.url + ' odebrane');
        resp.writeHead(200, { 'Content-Head': 'text/plain; charset=utf-8' });

        switch (req.url) {
            case '/':
            case '/start':
                handlers.welcome(req, resp);
                break;
            case '/upload':
                handlers.upload(req, resp);
                break;
            case '/show':
                handlers.show(req, resp);
                break;
            default:
                handlers.error(req, resp);
                break;
        }
    }

    http.createServer(onRequest).listen(9000);

    console.log('Uruchomiono serwer!'.green);
}

exports.start = start;