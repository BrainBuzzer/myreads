import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'

class BookCard extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeStatus: PropTypes.func.isRequired
  }
  render() {
    const { book, changeStatus } = this.props
    return (
      <div className="book">
        <div className="book-img" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }} alt={book.title} />
        <select
          className="status"
          onChange={(event) => changeStatus(book, event.target.value)}
          value={book.shelf}>
            <option value="wantToRead">Want To Read</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="read">Read</option>
        </select>
        <button class="primary button"><FontAwesome icon="info"/> More Info</button>
      </div>
    );
  }
}

export default BookCard
