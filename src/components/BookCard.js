import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import noCover from '../icons/no-cover-image.png'
import StarRatingComponent from 'react-star-rating-component'

class BookCard extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    changeStatus: PropTypes.func.isRequired
  }

  render() {
    const { book, books, changeStatus } = this.props
    const coverImg = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover
    let shelf = 'none'
    for(let b of books) {
      if(b.id === book.id) {
        shelf = b.shelf
      }
    }

    return (
      <div className="book">
        <div className="book-img" style={{ backgroundImage: `url(${coverImg})` }} alt={book.title} />
        <select
          className="status"
          onChange={(event) => changeStatus(book, event.target.value)}
          value={shelf}>
            <option value="none" disabled>Select an Option</option>
            <option value="wantToRead">Want To Read</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
        <div className="book-name">{book.title}</div>
        { book.averageRating && (
          <div className="book-rating">
            <StarRatingComponent
              name="rating"
              editing={false}
              starCount={5}
              value={book.averageRating}
            />
            <span>({book.ratingsCount})</span>
          </div>
        )}
        <Link to={`/book/${book.id}`} className="button button-primary more-info">More Info</Link>
      </div>
    );
  }
}

export default BookCard
