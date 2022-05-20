import React, { Component } from 'react';
import { store } from '../..';
import { connect } from 'react-redux';
import './Favorites.css';


class Favorites extends Component {
    state = {
        title: '',
        id: ''
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
    postList = (e) => {
        console.log(1)
        this.link.current.style.display="block";
        e.target.style.display="none";
        
        fetch('https://acb-api.algoritmika.org/api/movies/list/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "title": this.state.title,
                "movies":this.props.favMovie
            })
        }).then(response => response.json())
            .then(data => {
                this.setState({ id: data.id })
            })
            .catch(data => {
                console.log(data)
            });
    }
    constructor(props) {
        super(props);
        this.link = React.createRef();
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
                <a ref={this.link} className='link-to-listPage' href={`/list/${this.state.id}`}>Перейти к списку</a>
            </div>
        );
    }
}

// export default Favorites;
const mapStateToProps = (state) => {
    return ({ favMovie: state.favMovie })
}
export default connect(mapStateToProps)(Favorites);