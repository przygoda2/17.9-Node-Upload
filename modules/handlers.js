var fs = require('fs');
var path = require('path');
var formidable = require('formidable');

function upload(req, resp) {
    console.log('Rozpoczynam obsługę żądania upload');
    var form = new formidable.IncomingForm();
    form.uploadDir = 'uploads/tmp';
    form.parse(req, function (err, fields, files) {
        var tmpFileName = path.win32.basename(files.upload.path);
        var newFileName = (fields.title || 'dummy') + '.png';
        fs.renameSync('uploads/tmp' + '/' + tmpFileName, 'uploads/' + newFileName);
        fs.readFile('templates/upload.html', function (err, html) {
            resp.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            resp.write(html);
            resp.end();
        })
    })
}

function welcome(req, resp) {
    console.log('Rozpoczynam obsługę żądania welcome');
    fs.readFile('templates/start.html', function (err, html) {
        resp.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        resp.write(html);
        resp.end();
    })
}

function show(req, resp) {
    fs.readFile('uploads/dummy.png', 'binary', function (err, file) {
        resp.writeHead(200, { 'Content-Type': 'image/png' });
        resp.write(file, 'binary');
        resp.end();
    })
}
function error(req, resp) {
    console.log('Nie wiem co robić.');
    resp.write('404 :(');
    resp.end();
}

module.exports = {
    upload: upload,
    welcome: welcome,
    show: show,
    error: error
}