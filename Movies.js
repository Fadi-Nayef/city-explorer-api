'use strict';
require('dotenv').config();//install dotenv(npm i dotenv)/require .env 

const  axios = require('axios');
const { response } = require('express');
module.exports = movieHandler;
// if (inMemory[ingredient] !== undefined) {
    //     console.log('get the data from the Memory')
    //     response.send(inMemory[ingredient])
    //   } 
    
    //   else {
        //     console.log('get the data from the API');
        //     axios
        //       .get(url)
        //       .then(res => {
            //         const recipeArr = res.data.hits.map(recipe => new Recipe(recipe.recipe));
            //         inMemory[ingredient] = recipeArr;
            //         response.status(200).send(recipeArr);
            //       })
            //       .catch(err => {
                //         console.err('error', err);
                //         response.status(500).send('error', err);
                //       })
//   }

let inMemory={};
function movieHandler(req,res){
    
    let {searchQuery}=(req.query);
    let movieKey=process.env.movies_key;
    let url=`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${searchQuery}`;
    console.log(searchQuery,'outError',req.query);

    if (!inMemory[searchQuery] == undefined ){
        response.send(inMemory[searchQuery])
        console.log('in memory');
    }else{
        console.log('from API');
 axios
    .get(url)
    .then(result =>{
        const movieArr = result.data.results.map(item => {
         console.log('in result');
            
            return new Movie(item)
        })
          inMemory[searchQuery] = (movieArr) ; 
         res.send(movieArr)
    }).catch(err => {
console.log(searchQuery,'inError');
        res.status(500).send(`error in getting data ${err}`);
        })
}}

function Movie (item){
    this.title=item.title;
    this.overview=item.overview;
    this.average_votes=item.vote_average;
    this.total_votes=item.vote_count;
    this.image_url='https://image.tmdb.org/t/p/w500'+item.poster_path;
    this.popularity=item.popularity;
    this.released_on=item.release_date;
   
   }