import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
    };
    this.getGenres = this.getGenres.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios
      .get('/genres')
      .then(({ data }) => {
        this.setState(data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    const optionList = this.state.genres.map(({ id, name }) => (
      <option value={id} key={id}>
        {name}
      </option>
    ));
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? 'Show Results' : 'Show Favorites'}
        </button>
        <br />
        <br />

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select value={this.state.genreId} onChange={this.props.setSelectState}>
          <option value="" key="-1">
            All Genres
          </option>
          {optionList}
        </select>
        <br />
        <br />

        <button onClick={this.props.getMovies}>Search</button>
      </div>
    );
  }
}

export default Search;
