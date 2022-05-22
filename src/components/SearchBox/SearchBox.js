import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../..';
import './SearchBox.css';

class SearchBox extends Component {
    state = {
        searchLine: ''
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        fetch(`http://www.omdbapi.com/?s=${this.state.searchLine}&apikey=1fa733f1`)
            .then(data => data.json())
            .then(res => res.Search)
            .then(arr => {
                this.props.deleteMovie();
                arr.forEach(item => { this.props.addMovie(item) })
            })
            .catch(data => {
                console.log(data)
            });
    }
    render() {

        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
// const mapDispatchToProps = dispatch => ({
//     searchBoxSubmitHandler: (id) => dispatch(searchBoxSubmitHandler(id))
//   });

const mapStateToProps = (state) => {
    return { allMovie: state.allMovie }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteMovie: () => dispatch({ type: 'DELETE_MOVIE' }),
        addMovie: (movie) => dispatch({ type: 'ADD_MOVIE', payload: movie })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);