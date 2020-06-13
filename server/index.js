const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const movie = require('./models/movieModel.js');

var app = express();

// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup

//Helpers
var apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

//***********************************************************************************************************************

/*
Use the routes below to build your application:

|      URL         | HTTP Verb |  Result                                                     |
| :------------:   | :-------: |------------------------------------------------------:      |
|     /genres      |   GET     |  Respond with JSON of all genres                            |
|     /search      |   GET     |  Respond with JSON of all movies by the selected genre      |
|     /save        |   POST    |  Save selected movie as favorite                            |
|     /delete      |   POST    |  Remove selected movie as favorite                          |

*/

//TODO: Pick one of the two route options below:
//OPTION 1: Use regular routes, where endpoints are pre-defined on this page, you do NOT need to refer to /server/routes/movieRoutes.js file
//OPTION 2: Use Express Router, where the routes are defined under /server/routes/movieRoutes.js file

//***********************************************************************************************************************
//OPTION 1: Use regular routes;
//If you are using OPTION 1, you do not need routes>movieRoutes.js file

app.get('/genres', function (req, res) {
  // make an axios request to get the official list of genres from themoviedb
  // use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list
  apiHelpers
    .getAllGenres()
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/search', function (req, res) {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
  // and sort them by votes (worst first) using the search parameters in themoviedb API
  // do NOT save the results into the database; render results directly on the page
  apiHelpers
    .getMoviesByGenre(req.query.genreId)
    .then(({ data }) => res.status(200).send(data.results))
    .catch((err) => res.sendStatus(500));
});

app.post('/save', function (req, res) {
  //save movie as favorite into the database
  // use model
  movie.saveFavorite(req.body.movie, (err, results, fields) => {
    if (err) {
      console.log('save movie: ', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.post('/delete', function (req, res) {
  //remove movie from favorites into the database
  // use model
  movie.deleteFavorite(req.body.id, (err, results, fields) => {
    if (err) {
      console.log('delete movie: ', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.get('/favorites', (req, res) => {
  movie.getFavorites((err, results, fields) => {
    if (err) {
      console.log('fav movies: ', err);
      res.sendStatus(500);
    } else {
      res.status(200).send(results);
    }
  });
});

//***********************************************************************************************************************
//OPTION 2: Use Express Router

//IF you decide to go with this OPTION 2, delete OPTION 1 to continue

//Routes
// const movieRoutes = require('./routes/movieRoutes.js');

// //Use routes
// app.use('/movies', movieRoutes);

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
