import React, { Component } from 'react';
import MovieItem from './movieitem';

class Movies extends Component {
    render() {
        return this.props.films.map((film) => {
            // passing Reload Data down the component stack
            return <MovieItem movie={film} ReloadData={this.props.ReloadData} key={film.imdbID}></MovieItem>
        })
    }
}
export default Movies;