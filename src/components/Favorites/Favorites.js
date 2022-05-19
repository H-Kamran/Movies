import React, { Component } from 'react';
import { store } from '../..';
import { connect } from 'react-redux';
import './Favorites.css';


class Favorites extends Component {
    state = {
        title: ''
        // movies: [
        //     { imdbID: 'tt0068646', title: 'The Godfather', year: 1972 }
        // ]
    }
    handle = (e) => {
        this.setState({ title: e.target.value });
    }
    removeItem(id) {
        store.dispatch({ type: "DELETE_FROM_FAVORITE", payload: id })
    }
    postList = () => {
        // console.log(1)
        // fetch('http://www.omdbapi.com/?apikey=1fa733f1', {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         "title": "Example List",
        //         "movies": [
        //             "tt0068646",
        //             "tt0098019"
        //         ]

        //     })
        // }).then(response => response.json())
        //     .then(data => {
        //         console.log = (data);
        //     })
        //     .catch(data => {
        //         console.log(data)
        //     });
    }
    render() {
        return (
            <div className="favorites">
                <input value={this.state.title} placeholder="Введите название списка" className="favorites__name" onChange={this.handle} />
                <ul className="favorites__list">
                    {this.props.favMovie.map((item) => (
                        <li key={item.imdbID} className="favorites__list-item">{item.Title}&nbsp;({item.Year})
                            <button onClick={() => this.removeItem(item.imdbID)}>X</button></li>
                    ))}
                </ul>
                <button type="button" className="favorites__save" disabled={!this.state.title} onClick={this.postList}>Сохранить список</button>
                <a href="/list/5508daa0-34ad-45be-8b09-e704c9e7b389">Перейти к списку</a>
            </div>
        );
    }
}

// export default Favorites;
const mapStateToProps = (state) => {
    return ({ favMovie: state.favMovie })
}
export default connect(mapStateToProps)(Favorites);