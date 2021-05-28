'use strict';

//overall creat a new application (npm init -y)
require('dotenv').config();//install dotenv(npm i dotenv)/require .env 

const express = require ('express');//require express (npm i express)

const weatherData =require ('./data/weather.json');//require json file

const cors = require('cors');//require Cross-Origin Resource Sharing(npm i cors)
const  axios = require('axios');

const server = express();

server.use(cors());// (allow public access permission )


const PORT = process.env.PORT;

// http://localhost:5000/
    server.get('/',(req,res) => { 
        res.send('Test')
    })
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
 
  function bitWeatherHandler(req,res){
    let {searchQuery}=(req.query);
    let weatherKey=process.env.weather_key;
    let weatherUrl =`https://api.weatherbit.io/v2.0/current?city=${searchQuery}&key=${weatherKey}&include=hourly`;
    // `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${weatherKey}&include=minutely`

     axios
     .get (weatherUrl)
     .then (result =>
        {const weatherArr = result.data.data.map( weatherItem =>{
            console.log('in result')
               return new Weather (weatherItem)
     }) 
        
            res.send(weatherArr);

  }).catch( error => {
console.log(searchQuery,'inError',weatherArr);
        res.status(200).send(`error in getting data ${error}`);
   } )
}

function weatherHandler (request,response){
    let {searchQuery} = request.query;

    console.log(request.query,searchQuery);

    let resData = weatherData.find(item => item.city_name === searchQuery  )     
            
            console.log('------------------------------------',resData,'-------------------------------------');
            try {
                let newForcast;
                let forcastArr=[];
                
                forcastArr = resData.data.map (item => { 
                    // date = item.valid_date;
                    // description=item.weather.desqription;
                    newForcast = new Forcast(item);
                    return newForcast;
                })
                response.send(forcastArr)
            }catch(error){
                
                response.send(`server error ${error}`)
            }
            
        }
    



function movieHandler(req,res){

    let {searchQuery}=(req.query);
    let movieKey=process.env.movies_key;
    let url=`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${searchQuery}`;
    console.log(searchQuery,'outError',req.query);

 axios
    .get(url)
    .then(result =>{
        const movieArr = result.data.results.map(item => {
         console.log('in result');
            return new Movie(item)
        })

         res.send(movieArr)
    }).catch(err => {
console.log(searchQuery,'inError');
        res.status(500).send(`error in getting data ${err}`);
        })
}

function Forcast (day){
    this.date=day.valid_date
    this.description=day.weather.description
}


function Movie (item){
 this.title=item.title;
 this.overview=item.overview;
 this.average_votes=item.average_votes;
 this.total_votes=item.total_votes;
 this.image_url=item.poster_path;
 this.popularity=item.popularity;
 this.released_on=item.released_on;

}
function Weather (weatherItem){
this.name=weatherItem.city_name;
this.description=weatherItem.weather.description;
this.datetime=weatherItem.datetime;
}

server.get('*',(request,response) => {
response.send('Something Wrong')
})

server.listen(PORT ,()=>{
console.log(`Server Listinig on PORT ${PORT}`);
})