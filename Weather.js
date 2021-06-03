'use strict';
require('dotenv').config();//install dotenv(npm i dotenv)/require .env 
const  axios = require('axios');

module.exports = bitWeatherHandler;
let inMemo={};

function bitWeatherHandler(req,res){
    let {searchQuery,lat,lon}=(req.query);
    let weatherKey=process.env.weather_key;
    let weatherUrl =`https://api.weatherbit.io/v2.0/current?city=${searchQuery}&key=${weatherKey}&include=hourly`;
    // `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${weatherKey}&include=hourly`
if (inMemo[searchQuery] !== undefined ){
    res.send(inMemo[searchQuery]);
}else{
     axios
     .get (weatherUrl)
     .then (result =>
        {const weatherArr = result.data.data.map( weatherItem =>{
               return new Weather (weatherItem)
     }) 
      inMemo[searchQuery]=weatherArr;  
            res.send(weatherArr);

  }).catch( error => {
console.log(searchQuery,'inError',weatherArr);
        res.status(200).send(`error in getting data ${error}`);
   } )
}}

function Weather (weatherItem){
    this.name=weatherItem.city_name;
    this.description=weatherItem.weather.description;
    this.datetime=weatherItem.datetime;
    }