'use strict';

//overall creat a new application (npm init -y)

const express = require ('express');//require express (npm i express)

require('dotenv').config();//install dotenv(npm i dotenv)/require .env 

const weatherData =require ('./data/weather.json');//require json file

const cors = require('cors');//require Cross-Origin Resource Sharing(npm i cors)

const server = express();

server.use(cors());// (allow public access permission )


const PORT = process.env.PORT;


server.get('/',(request,response)=>{
console.log(`localhost:${PORT}/`);
let dataArr = weatherData.map(item=>{
    return item.city_name;
})
response.send(dataArr);
})



server.listen(PORT ,()=>{
console.log(`Server Listinig on PORT ${PORT}`);
})