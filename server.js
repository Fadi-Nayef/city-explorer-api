'use strict';

//overall creat a new application (npm init -y)
require('dotenv').config();//install dotenv(npm i dotenv)/require .env 
const express = require ('express');//require express (npm i express)
const weatherData =require ('./data/weather.json');//require json file
const cors = require('cors');//require Cross-Origin Resource Sharing(npm i cors)
const  axios = require('axios');
const movieHandler = require('./Movies')
const bitWeatherHandler = require ('./Weather');
const weatherHandler = require ('./OldWwather');
const server = express();
server.use(cors());// (allow public access permission )
const PORT = process.env.PORT;



    // http://localhost:5000/
    server.get('/',(req,res) => { res.send('Test')})
    // http://localhost:5000/test
    server.get('/test',(req,res) => {
        let first=req.query.first
        console.log("query",first); 
    })
    // http://localhost:5000/weather?searchQuery=Paris
    server.get('/weather',weatherHandler) ;
    // http://localhost:5000/movie?searchQuery=Paris
    server.get('/movie',movieHandler);
    // http://localhost:5000/bitWeather?searchQuery=Paris
    server.get('/bitWeather',bitWeatherHandler);
 
    server.get('*',(request,response) => {
    response.send('Something Wrong') })
server.listen(PORT ,()=>{
console.log(`Server Listinig on PORT ${PORT}`); })