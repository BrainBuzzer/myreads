import React, { Component } from 'react'
import * as BooksAPI from '../utils/BooksAPI.js'
import FaSearch from 'react-icons/lib/fa/search'
import { Link } from 'react-router-dom'
import { chunk } from '../utils/helper'
import BookRow from './BookRow'
import PropTypes from 'prop-types'

/**
 * Home page
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  state = {
    wantToRead: [],
    currentlyReading: [],
    read: [],
    loading: true
  }

  /**
   * Load the content of the prop that is passed and then
   * chop the provided array into the given category and
   * update the state accordingly.
   *
   * @static
   * @param {any} nextProps - Gets the props when updated
   * @param {any} prevState - Previous State of the component
   * @returns updated state variable
   * @memberof Home
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const wantToRead = chunk(nextProps.books.filter(book => book.shelf==='wantToRead'), 4)
    const currentlyReading = chunk(nextProps.books.filter(book => book.shelf==='currentlyReading'), 4)
    const read = chunk(nextProps.books.filter(book => book.shelf==='read'), 4)

    return {
      wantToRead,
      currentlyReading,
      read,
      loading: false
    }
  }

  /**
   * This method updates the shelf of the given book both locally
   * and on server.
   *
   * @memberof Home
   */
  updateStatus = (book, val) => {
    this.setState({
      loading: true
    })
    BooksAPI.update(book, val).then(res => {
      this.props.updateShelf(book, val)
      switch(book.shelf) {
        case 'wantToRead':
          this.setState((prev) => {
            let ar = [].concat.apply([], prev.wantToRead);
            ar = chunk(ar.filter(b => b.id !== book.id), 4)
            return { wantToRead: ar }
          })
          break;
        case 'currentlyReading':
          this.setState((prev) => {
            let ar = [].concat.apply([], prev.currentlyReading);
            ar = chunk(ar.filter(b => b.id !== book.id), 4)
            return { currentlyReading: ar }
          })
          break;
        case 'read':
          this.setState((prev) => {
            let ar = [].concat.apply([], prev.read);
            ar = chunk(ar.filter(b => b.id !== book.id), 4)
            return { read: ar }
          })
          break;
        default:
          break;
      }
      switch(val) {
        case 'wantToRead':
          this.setState((prev) => {
            book.shelf = 'wantToRead'
            let ar = [].concat.apply([], prev.wantToRead);
            ar = chunk(ar.concat(book), 4);
            return { wantToRead: ar }
          })
          break;
        case 'currentlyReading':
          book.shelf = 'currentlyReading'
          this.setState((prev) => {
            let ar = [].concat.apply([], prev.currentlyReading);
            ar = chunk(ar.concat(book), 4);
            return { currentlyReading: ar }
          })
          break;
        case 'read':
          book.shelf = 'read'
          this.setState((prev) => {
            let ar = [].concat.apply([], prev.read);
            ar = chunk(ar.concat(book), 4);
            return { read: ar }
          })
          break;
        default:
          break;
      }
      this.setState({
        loading: false
      })
    })
  }

  render() {
    const { wantToRead, currentlyReading, read, loading } = this.state
    return (
      <div>
      { loading ? (
        <div className="spinner">
          <div className="lds-dual-ring"></div>
        </div> ) : <div /> }
        <div>
          <div className="sep"><span>Want to read</span></div>
          <div className="list-books row">
            { wantToRead.map((books, i) => (
              <BookRow books={books} updateShelf={this.updateStatus} originalBooks={this.props.books} key={i} />
            ))}
          </div>
          <div className="sep"><span>Currently Reading</span></div>
          <div className="list-books row">
            { currentlyReading.map((books, i) => (
              <BookRow books={books} updateShelf={this.updateStatus} originalBooks={this.props.books} key={i} />
            ))}
          </div>
          <div className="sep"><span>Read</span></div>
          <div className="list-books row">
            { read.map((books, i) => (
              <BookRow books={books} updateShelf={this.updateStatus} originalBooks={this.props.books} key={i} />
            ))}
          </div>
        </div>
        <Link to="/search" className="search-icon"><FaSearch /></Link>
      </div>
    )
  }
}

export default Home
