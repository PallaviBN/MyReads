import React, { Component } from 'react'
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import ShowBooks from './ShowBooks';


class Search extends Component {
  
  static propTypes = {
      books: PropTypes.array.isRequired,
      changeShelf: PropTypes.func.isRequired
  };
    
  state = {
      userInput: '',
      searchedBooks: [] ,
      showError: false
  };
    
  searchBook(event){
      const userIn = event.target.value;
        this.setState({ userInput: userIn });
        // call Api to fetch books 
        // if (userInput) {
          BooksAPI.search(userIn.trim(), 20).then(books => {
            books.length > 0 ? 
                this.setState({ searchedBooks: books, showError: false })
              : this.setState({ searchedBooks: [],  showError: true });
          });
          // if user input is empty
        // } else {
        //   this.setState({ searchedBooks: [], showError: false });
        // }
      };
   
render() {

  const { books, changeShelf } = this.props;
  const { userInput, searchedBooks, showError } = this.state;

  return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  value={userInput}
                  onChange={this.searchBook}
                />
                </div>
            </div>

            {showError && (
            <h4>No Book Found. Try searhing any other!</h4>
            )}

            <div className="search-books-results">
            {searchedBooks.length > 0 && (
            <div>
              <h3>Found {searchedBooks.length} related books </h3>
              <ol className="books-grid">
                {searchedBooks.map(book => (
                                    
                  <ShowBooks
                    book={book}
                    books={books}
                    key={book.id}
                    changeShelf={changeShelf}
                  />

                ))}
              </ol>
            </div>
          )}
          
          </div>
        </div>

        )
    }
}

export default Search;