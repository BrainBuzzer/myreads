import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { get } from '../utils/BooksAPI'
import StarRatingComponent from 'react-star-rating-component'
import noCover from '../icons/no-cover-image.png'
import FaAngleLeft from 'react-icons/lib/fa/angle-left'
import { Link } from 'react-router-dom'

/**
 * Details of the book that will be rendered at the path '/book/:id'
 * Where `id` is the book's unique identifier as per API.
 *
 * @class BookDetails
 * @extends {Component}
 */
class BookDetails extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  state = {
    book: [],
    loading: true
  }

  /**
   * Get the details of the book from API.
   *
   * @param {any} id - ID of the book
   * @memberof BookDetails
   */
  getBook(id) {
    get(id).then(book => {
      this.setState({ book, loading: false })
    })
  }

  componentDidMount() {
    this.getBook(this.props.match.params.id)
  }

  render() {
    const { loading, book } = this.state
    const coverImg = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover
    return (
      <div>
      { loading ? (
        <div className="spinner">
          <div className="lds-dual-ring"></div>
        </div> ) : (
        <div className="book-details row">
          <div className="book-details-img three columns" style={{ backgroundImage: `url(${coverImg})` }} />
          <div className="nine columns">
            <span className="book-details-title">{book.title}</span>
            <span className="book-details-subtitle">{book.subtitle}</span>
            { book.authors && (
              <span className="book-details-authors">
                Written By - { book.authors.map(author => (<span>{author}, </span>))}
              </span>
            )}
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
            <div className="book-details-description">
              <p>{book.description}</p>
            </div>
          </div>
        </div>
      )}
      <Link to="/" className="search-icon"><FaAngleLeft /></Link>
      </div>
    );
  }
}

export default BookDetails;
