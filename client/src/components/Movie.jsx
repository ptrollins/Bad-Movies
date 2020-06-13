import React from 'react';

var Movie = ({ movie, handleMovieClick }) => (
  <li className="movie_item" id={movie.id} onClick={handleMovieClick}>
    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
    <div className="movie_description">
      <h2>{movie.title}</h2>
      <section className="movie_details">
        <div className="movie_year">
          <span className="title">Year</span>
          <span>{movie.release_date.split('-')[0]}</span>
        </div>
        <div className="movie_rating">
          <span className="title">Votes</span>
          <span>{movie.vote_count}</span>
        </div>
        <div className="movie_rating">
          <span className="title">Rating</span>
          <span>{movie.popularity}</span>
        </div>
      </section>
    </div>
  </li>
);

export default Movie;
