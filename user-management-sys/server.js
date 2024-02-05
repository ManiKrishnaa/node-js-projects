const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json())

const users = [{
        userid : "01",
        username : "hello"
    }
]

app.get('/',function(req,res){
    res.render("index",{
        data : users
    });
})


app.post('/adduser',function(req,res){
    const nuserid = req.body.uid;
    const nuname = req.body.uname;
    users.push({
        userid : nuserid,
        username : nuname
    })
    res.redirect("/");
})

app.post('/deleteuser',function(req,res){
    var nuid = req.body.userid;
    var j = 0;
    users.forEach(user => {
        j = j + 1;
        if (user.userid === nuid) {
            users.splice((j - 1), 1)
        }
    })
    res.render("index", {
        data: users
    })
})

app.post('/updateuser',function(req,res){
    var nuid = req.body.uid;
    var nuname = req.body.uname;

    var j = 0;
    users.forEach(user => {
        j = j + 1;
        if (user.userid === nuid) {
            user.username = nuname;
        }
    })
    res.render("index", {
        data: users
    })
})

app.listen(8081,()=>{
    console.log("server is running at port 8081");
})
