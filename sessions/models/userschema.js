const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://manikrishna:manikrishna@cluster0.uhgyfig.mongodb.net/')

const userschema = new mongoose.Schema({
    username : {type : String,required : true,unique : true},
    email : {type : String,required : true,unique : true},
    password : {type : String,required : true}
});

module.exports = mongoose.model('userschema',userschema);
