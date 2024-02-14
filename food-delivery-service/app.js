const express = require('express');
const path = require('path');

const app = express();
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res) => {
    res.render("index.ejs");
})

app.get('/home',(req,res) => {
    res.render("home.ejs");
})

app.get('/restaurants',(req,res) => {
    res.render("restaurants.ejs");
})


app.listen(8081,() => {
    console.log("server running at port 8081");
})
