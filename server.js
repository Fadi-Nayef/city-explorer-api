'use strict';

//overall creat a new application (npm init -y)

require('dotenv').config();//install dotenv(npm i dotenv)/require .env 

const express = require ('express');//require express (npm i express)

const weatherData =require ('./data/weather.json');//require json file

const cors = require('cors');//require Cross-Origin Resource Sharing(npm i cors)
const { query } = require('express');

const server = express();

server.use(cors());// (allow public access permission )


const PORT = process.env.PORT;
server.get('/',(req,res) => { 
    res.send('Test')
})

// server.get('/test',(req,res) => {let first=req.query.first; 
//     console.log(query,first);})

// http://localhost:5000/weather?searchQuery=Paris
server.get('/weather',(request,response) => {
    let {searchQuery} = request.query;

console.log(query,searchQuery);

    let resData = weatherData.find(item => item.city_name=== searchQuery  )     
            
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
            
        })
            

function Forcast (day){
    this.date=day.valid_date
    this.description=day.weather.description
}

server.get('*',(request,response) => {
response.send('Something Wrong')
})

server.listen(PORT ,()=>{
console.log(`Server Listinig on PORT ${PORT}`);
})