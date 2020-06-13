import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
      genreId: '',
    };

    // you might have to do something important here!
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.setSelectState = this.setSelectState.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    this.getMovies();
    this.getFavorites();
  }

  getMovies() {
    axios
      .get(`/search?genreId=${this.state.genreId}`)
      .then(({ data }) => {
        this.setState({ movies: data });
      })
      .catch((err) => console.log(err));
  }

  saveMovie(movieId) {
    // same as above but do something diff
    let movie,
      found = false;
    for (movie of this.state.movies) {
      if (movie.id === parseInt(movieId)) {
        found = true;
        break;
      }
    }
    if (found) {
      axios
        .post('/save', { movie: movie })
        .then((data) => {
          this.getFavorites();
        })
        .catch((err) => console.log(err));
    }
  }

  deleteMovie(movieId) {
    // same as above but do something diff
    axios
      .post('/delete', { id: movieId })
      .then((data) => {
        this.getFavorites();
      })
      .catch((err) => console.log(err));
  }

  getFavorites() {
    axios
      .get('/favorites')
      .then(({ data }) => {
        console.log('data: ', data);
        this.setState({ favorites: data });
      })
      .catch((err) => console.log(err));
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves,
    });
  }

  setSelectState(event) {
    this.setState({ genreId: event.target.value });
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            getMovies={this.getMovies}
            setSelectState={this.setSelectState}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
            saveMovie={this.saveMovie}
            deleteMovie={this.deleteMovie}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
