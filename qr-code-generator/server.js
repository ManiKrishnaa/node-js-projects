const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.set('view engine','ejs');
app.set(bodyparser.urlencoded({extended:true}));

app.get('/',(req,res) => {
    res.render("index",{qrcodeurl : null});
})

app.get('/generate',(req,res) => {
    const data = req.query.content;
    const encodedText = encodeURIComponent(data);
    const url = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodedText}`;
    res.render("index",{qrcodeurl : url});
})

app.listen(8081,() => {
    console.log("server running at port 8081");
})
