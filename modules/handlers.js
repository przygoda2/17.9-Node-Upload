var fs = require("fs");
const qs = require("query-string");
var path = require("path");
var formidable = require("formidable");

function upload(req, resp) {
  console.log("Rozpoczynam obsługę żądania upload");
  var form = new formidable.IncomingForm();
  form.uploadDir = "./uploads";
  form.parse(req, function(err, fields, files) {
    var tmpFileName = path.win32.basename(files.upload.path);
    var newFileName = (fields.title || "dummy") + ".png";
    fs.renameSync("./uploads" + "/" + tmpFileName, "./uploads/" + newFileName);
    fs.readFile("templates/upload.html", function(err, html) {
      console.log("html");
      console.log(html.toString());
      resp.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      resp.write(html.toString().replace(`{{ imageQuery }}`, newFileName));
      resp.end();
    });
  });
}

function welcome(req, resp) {
  console.log("Rozpoczynam obsługę żądania welcome");
  fs.readFile("templates/start.html", function(err, html) {
    resp.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    resp.write(html);
    resp.end();
  });
}

function show(req, resp) {
  const [, query] = req.url.split("?");
  const { img } = qs.parse(query);

  fs.readFile(`uploads/${img}`, "binary", function(err, file) {
    resp.writeHead(200, { "Content-Type": "image/png" });
    resp.write(file, "binary");
    resp.end();
  });
}
function error(req, resp) {
  console.log("Nie wiem co robić.");
  resp.write("404 :(");
  resp.end();
}

module.exports = {
  upload: upload,
  welcome: welcome,
  show: show,
  error: error
};