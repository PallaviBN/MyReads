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
      query: '',
      searchedBooks: [] ,
      showError: false
  };
    
  searchBook(query){
      // const userIn = event.target.value;
        this.setState({ query });
        // call Api to fetch books 
        if (query) {
          BooksAPI.search(query.trim(), 20).then(books => {
            books.length > 0 ? 
                this.setState({ searchedBooks: books, showError: false })
              : this.setState({ searchedBooks: [],  showError: true });
          });
          //if user input is empty
        } else {
          this.setState({ searchedBooks: [], showError: false });
        }
      };
   
render() {

  const { books, changeShelf } = this.props;
  const { query, searchedBooks, showError } = this.state;

  return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Search by title"
                  value={query}
                  onChange={e => this.searchBook(e.target.value)}
                />
                </div>
            </div>


            <div className="search-books-results">
            {showError && (
            <h4 id="errmsg">No Book Found. Please try again!</h4>
            )}
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