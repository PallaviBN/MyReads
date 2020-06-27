import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ShowBooks extends Component {

  static propTypes = {
        book: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    };
  
    updateShelf = event =>
    this.props.changeShelf(this.props.book, event.target.value);

   render() {

       const { book, books} = this.props;

       const bookTitle = book.title;
       const bookCover = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.smallThumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSU-3VMMY2V4vuFDP2JQSO9KM1yKjAZSIhmUw&usqp=CAU';
       let currentShelf = 'none';

       // if book is in current list, set current shelf to book.shelf
       for (let item of books) {
           if (item.id === book.id) {
               currentShelf = item.shelf;
               break;
           }
       }

       return (
           <li>
               <div className="book">
                   <div className="book-top">
                       <div className="book-cover"
                            style={{ backgroundImage: `url(${bookCover})` }}
                       />
                       
                       <div className="book-shelf-changer">
                           <select onChange={this.updateShelf} defaultValue={currentShelf}>
                               <option value="none" disabled>Move to... </option>
                               <option value="currentlyReading">Currently Reading</option>
                               <option value="wantToRead">Want to Read</option>
                               <option value="read">Read</option>
                               <option value="none">None</option>
                           </select>
                       </div>

                   </div>
                   <div className="book-title">{bookTitle}</div>
                   {book.authors && book.authors.map((author, index) => (
                       <div className="book-authors" key={index}>
                           {author}
                       </div>
                   ))}
               </div>
           </li>
       );
   }
};


export default ShowBooks;
