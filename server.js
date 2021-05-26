'use strict';

//overall creat a new application (npm init -y)

require('dotenv').config();//install dotenv(npm i dotenv)/require .env 

const express = require ('express');//require express (npm i express)

const weatherData =require ('./data/weather.json');//require json file

const cors = require('cors');//require Cross-Origin Resource Sharing(npm i cors)

const server = express();

server.use(cors());// (allow public access permission )


const PORT = process.env.PORT;
server.get('/',(req,res) => { 
    res.send('Test')
})


// http://localhost:5000/weather?cityName=Paris
server.get('/weather',(request,response) => {
    let cityName = request.query.cityName;

console.log(query,cityName);

    let resData = weatherData.find(item,idx => {if (item.city_name == cityName)        
            return item;
    })
    console.log('------------------------------------',resData,'-------------------------------------');
    try {
        let newForcast;
        let forcastArr=[];

         forcastArr = resData.data.map (item => { 
             data = item.valid_date;
             description=item.weather.desqription;
             newForcast = new Forcast(date,desqription);
             return newForcast;
         })
         response.send(resData)
    }catch(error){

        response.send(`server error ${error}`)
    }

})


class Forcast { constructor(date,desqription ){
this.date = date
this.desqription = desqription
}
}

server.get('*',(request,response) => {
response.send('Something Wrong')
})

server.listen(PORT ,()=>{
console.log(`Server Listinig on PORT ${PORT}`);
})