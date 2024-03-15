const express = require('express');
const session = require('express-session');
const mongodbsession = require("connect-mongodb-session")(session);
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const usermodel = require('./models/userschema');

mongoose.connect('mongodb+srv://manikrishna:manikrishna@cluster0.uhgyfig.mongodb.net/')
.then(() => {
    console.log("MongoDB connected!");
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

const store = new mongodbsession({
    uri : 'mongodb+srv://manikrishna:manikrishna@cluster0.uhgyfig.mongodb.net/',
    session : 'mysessions'
});

const app = express();

app.use(session({
    secret : 'something i kept',
   resave : false,
   saveUninitialized : false,
   store : store
}));

app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));

const isAuth = (req,res,next) =>{
    if(req.session.isAuth)
    {
        next();
    }else{
        res.redirect('/login');
    }
}

app.get('/',(req,res)=>{
    res.render('landing');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/register',(req,res)=>{
    res.render('register')
});

app.post('/login',async(req,res)=>{
   const {username,password} = req.body;

   let user = await usermodel.findOne({username});

   if(!user)
   {
      return res.redirect('/register');
   }

   let ismatch = await bcrypt.compare(password,user.password);
   
   if(!ismatch){
    return res.redirect('/register');
   }
   req.session.isAuth = true;
   res.redirect('dashboard');
});

app.post('/register',async(req,res)=>{
    const {username,password,email} = req.body;

   let user = await usermodel.findOne({email});

   if(user){
    return res.redirect('/login');
   }

   let hashedpassword = await bcrypt.hash(password,12);

   const newUser = new usermodel({
    username,
    email,
    password : hashedpassword
   });

    await newUser.save();
    return res.redirect('/login');
});

app.get('/dashboard',isAuth,(req,res)=>{
     res.render('dashboard');
});

app.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){console.log("error while destroying session")};
        res.redirect('/');
    });
})

app.listen(3000,()=>{
    console.log("Server connected !");
})
