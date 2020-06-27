import React, { Component } from 'react'
import PropTypes from 'prop-types';
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import Library from './Library';



class Front extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  };


  
  render() {

    const { books, changeShelf } = this.props;
    const shelfNames = [
      { type: 'currentlyReading', title: 'Currently Reading' },
      { type: 'wantToRead', title: 'Want to Read' },
      { type: 'read', title: 'Read' }
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelfNames.map((shelf, index) => {
            const shelfBooks = books.filter(book => book.shelf === shelf.type);
            return (
              <div className="bookshelf" key={index}>
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                  <Library books={shelfBooks} changeShelf={changeShelf} />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="open-search">
          <Link to='/search'> Add a book</Link>
        </div>
        </div>
    )
  }
}

export default Front;