const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

module.exports = {
  /*
    {
    "genres": [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
      ]
    }
    */
  getAllGenres: () => {
    return axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
  },

  /**
   {
    "page": 1,
    "total_results": 10000,
    "total_pages": 500,
    "results": [
        {
            "popularity": 374.353,
            "vote_count": 3661,
            "video": false,
            "poster_path": "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
            "id": 419704,
            "adult": false,
            "backdrop_path": "/5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
            "original_language": "en",
            "original_title": "Ad Astra",
            "genre_ids": [
                18,
                878
            ],
            "title": "Ad Astra",
            "vote_average": 6,
            "overview": "The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.",
            "release_date": "2019-09-17"
        },
      ]
    }
   */
  getMoviesByGenre: (genreId) => {
    const query = genreId !== undefined ? `&with_genres=${genreId}` : '';
    return axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&vote_count.gte=1&sort_by=popularity.asc${query}`
    );
  },
};
