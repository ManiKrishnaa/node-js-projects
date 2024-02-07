const qrcode = require('qrcode');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    return res.render('index', { qrCodeData: null });
});

app.post('/generate', function (req, res) {
    var data = req.body.data;
    var strdata = JSON.stringify(data);
    qrcode.toDataURL(strdata, function (err, qrCodeDataURL) {
        if (err) {
            console.log("Error occurred while converting:", err);
            return res.status(500).send("Error occurred while generating QR code");
        }
        return res.render('index', { qrCodeData: qrCodeDataURL });
    });
});

app.listen(8081, () => {
    console.log("Server connected to port 8081");
});
