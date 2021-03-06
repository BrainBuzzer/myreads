import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookCard from './BookCard'

/**
 * This component render a row of four books with proper grid lines.
 *
 * @class BookRow
 * @extends {Component}
 */
class BookRow extends Component {
  static propTypes = {
    originalBooks: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {
    const { books, updateShelf, originalBooks } = this.props
    return (
      <div className="row">
        { books.map(book => (
          <div className="three columns" key={book.id}>
            <BookCard book={book} changeStatus={updateShelf} books={originalBooks}/>
          </div>
        ))}
      </div>
    );
  }
}

export default BookRow;
