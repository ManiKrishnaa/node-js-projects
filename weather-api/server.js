const express = require('express');
const axios = require('axios');

app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const apikey = "d1d9ea2d7ba7a576033293c8ccbecb40";

app.get('/',async(req,res) => {
    res.render("index",{weatherdata : null});
})

app.get('/getdata',async(req,res) => {
    const city = req.query.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    try{
        const response = await axios.get(url);
        const weatherdata = response.data;
        const celsius = Math.round(weatherdata.main.temp - 273.15);
        res.render('index',{weatherdata,celsius});
    }catch(error){
        res.render('index', { weatherdata: null, celsius: null, error: 'Error while fetching weather data' });
    }
})

app.listen(8081,()=>{
    console.log('server is running at port 8081');
})