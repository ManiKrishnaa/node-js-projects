const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');


const app = express();
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json())

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

app.post('/sendmail',function(req,res){
    const rrecpemail = req.body.recpemail;
    const rbody = req.body.content;

    var mailOptions = {
        from: '',
        to: rrecpemail,
        subject: 'Hello',
        text: rbody
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            alert('email sent!');
          console.log('Email sent: ' + info.response);
        }
      });      

      res.send('Email sent successfully');
})

app.get('/',function(req,res){
    res.render("index");
})

app.listen(8081,()=>{
    console.log("server is running at port 8081");
})
