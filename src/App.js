import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Front from './Front'
import Search from './Search'

class BooksApp extends React.Component {
  
  state = { 
    books: [] 
  };

  componentDidMount() {
    // get books on load
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  changeShelf(selectedBook, newShelf){
    BooksAPI.update(selectedBook, newShelf).then(res => {
      // update shelf for selected book
      selectedBook.shelf = newShelf;
      
      this.setState(prevState => ({
        books: prevState.books
          // remove old details and add updated to array
          .filter(book => book.id !== selectedBook.id)
          .concat(selectedBook)
      }));
    });
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        
        <Route exact path='/' render={() => (
          <Front books={books} changeShelf={this.changeShelf} /> 
        )} />

        <Route path='/search' render={() => (
          <Search books={books} changeShelf={this.changeShelf} />
        )} />

      </div>
    )
  }
}

export default BooksApp;
