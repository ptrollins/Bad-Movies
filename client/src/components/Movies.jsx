import React from 'react';
import Movie from './Movie.jsx';

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.handleMovieClick = this.handleMovieClick.bind(this);
  }

  // Make an onClick for each list item. If the movies shown is the search results,
  // onClick add it to the database (do it in the main app, and pass down the function)
  handleMovieClick(event) {
    console.log('clicked: ', event.currentTarget.id);
    if (this.props.showFaves) {
      this.props.deleteMovie(event.currentTarget.id);
    } else {
      this.props.saveMovie(event.currentTarget.id);
    }
  }

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    return (
      <ul className="movies">
        {this.props.movies.map((movie) => (
          <Movie
            movie={movie}
            key={movie.id}
            handleMovieClick={this.handleMovieClick}
          />
        ))}
      </ul>
    );
  }
}

export default Movies;
