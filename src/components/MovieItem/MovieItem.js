import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../..';
import './MovieItem.css';

class MovieItem extends Component {
    // AddToFavorite = () => {
    //     store.dispatch({ type: "ADD_TO_FAVORITE", payload: this.props })
    // }
    render() {
        const { Title, Year, Poster } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" onClick={() => this.props.addToFavorite(this.props)} className="movie-item__add-button">Добавить в список</button>
                </div>
            </article>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToFavorite: (movie) => dispatch({ type: 'ADD_TO_FAVORITE', payload: movie })
    }
}

export default connect(null, mapDispatchToProps)(MovieItem);