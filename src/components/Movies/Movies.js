import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { store } from '../..';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

class Movies extends Component {
    render() {
        return (
            <ul className="movies">

                {this.props.allMovie.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} />
                    </li>
                ))}
            </ul>
        );
    }
}
const mapStateToProps = (state) => {
    return ({ allMovie: state.allMovie })
}
export default connect(mapStateToProps)(Movies);