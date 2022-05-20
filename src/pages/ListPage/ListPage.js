import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: []
    }
    componentDidMount () {
        const id = this.props.match.params.id;
        console.log(id);
        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID

        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
            .then(res => res.json())
            .then(data => { 
                this.setState({movies:data.movies});
            }).catch(data => {
                console.log(data)
            })
    }
    render() {
        return (
            <div className="list-page">
                <h1 className="list-page__title">Мой список</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ListPage;