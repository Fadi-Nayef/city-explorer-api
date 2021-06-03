const weatherData =require ('./data/weather.json');//require json file

require('dotenv').config();//install dotenv(npm i dotenv)/require .env 

const  axios = require('axios');

module.exports = weatherHandler;

function weatherHandler (request,response){
    let {searchQuery} = request.query;

    console.log(request.query,searchQuery);

    let resData = weatherData.find(item => item.city_name.toUpperCase() === searchQuery.toUpperCase()  )     
            
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
    
function Forcast (day){
    this.date=day.valid_date
    this.description=day.weather.description
}