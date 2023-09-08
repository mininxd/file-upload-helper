var express = require('express');
var multer  = require('multer');
var fs  = require('fs');

var app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    //load index.ejs
    res.render('index');
});

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
                 
                    //nama folder upload        
        var dir = './FILE_UPLOAD';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        //output nama file upload
        callback(null, 'mininproject.dev_' + file.originalname);
    }
});
var upload = multer({storage: storage}).array('files', 12);
app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            //pesan error
            return res.end("Maaf ada Kesalahan:(");
        }
        //load berhasil.ejs jika upload berhasil
        res.render('berhasil');
    });
})

//aplikasi berjalan di localhost:3000 (bisa diubah sesuai selera)
app.listen(80);
