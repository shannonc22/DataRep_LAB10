import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// some comments
class MovieItem extends Component {

    constructor() {
        super();
        this.DeleteMovie = this.DeleteMovie.bind(this);
    }
    // _id comes from mongo db
    DeleteMovie() {
        // logs to the console which movie id is being deleted
        console.log('Delete: ' + this.props.movie._id);
        // deletes movie id and reloads page so you don't have to refresh page
        axios.delete('http://localhost:4000/api/movies/' + this.props.movie._id)
            .then(() => {
                this.props.ReloadData();
            })
            .catch();
    }

    render() {
        return (
            <div>
                {/* cards for movies  */}
                <Card>
                    <Card.Header>{this.props.movie.Title}</Card.Header>
                    <Card.Body>
                        <blockquote>
                            <img src={this.props.movie.Poster}></img>
                            <footer>
                                {this.props.movie.Year}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    {/* link to edit url + edit button to edit movie */}
                    <Link to={"/edit/" + this.props.movie._id} className="btn btn-primary">Edit</Link>
                    {/* button to delete movie */}
                    <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>
                </Card>
            </div>
        );
    }
}
export default MovieItem;