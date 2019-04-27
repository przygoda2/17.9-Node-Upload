var http = require("http");
var colors = require("colors");
var handlers = require("./handlers");

function start() {
  var PORT = 5678;

  function onRequest(req, resp) {
    resp.writeHead(200, { "Content-Head": "text/plain; charset=utf-8" });

    const [path] = req.url.split("?");
    console.log("Odebrano zapytanie".green);
    console.log("Zapytanie " + path + " odebrane");

    switch (path) {
      case "/":
      case "/start":
        handlers.welcome(req, resp);
        break;
      case "/upload":
        handlers.upload(req, resp);
        break;
      case "/show":
        handlers.show(req, resp);
        break;
      default:
        handlers.error(req, resp);
        break;
    }
  }

  http.createServer(onRequest).listen(PORT);

  console.log("Uruchomiono serwer!".green);
  console.log(`Wejdz na localhost:${PORT}`.green);
}

exports.start = start;