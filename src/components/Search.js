import React, { Component } from 'react'
import BookRow from './BookRow'
import PropTypes from 'prop-types'
import * as BooksAPI from '../utils/BooksAPI'
import FaAngleLeft from 'react-icons/lib/fa/angle-left'
import { chunk } from '../utils/helper';
import { Link } from 'react-router-dom'

/**
 * Search Page
 *
 * @class Search
 * @extends {Component}
 */
class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  state = {
    status: 'Nothing to Show',
    results: [],
    loading: false
  }

  /**
   * Search for the user query on server
   *
   * @memberof Search
   */
  searchQuery = (event) => {
    this.setState({
      status: 'Loading',
      results: [],
      loading: true
    })
    let val = event.target.value.trim()
    if(val==='') {
      return this.setState({
        results: [],
        status: 'Nothing to Show',
        loading: false
      })
    } else {
      BooksAPI.search(val).then(res => {
        let results = [];
        if (res.error) {
          this.setState({
            status: 'Some error occured',
            loading: false
          })
        } else {
          if (res.length>=4) {
            results = chunk(res, 4)
          } else {
            results = chunk(res, res.length)
          }
          this.setState({
            results,
            loading: false
          })
        }
      })
    }
  }

  /**
   * Updates the shelf both locally and on server.
   *
   * @memberof Search
   */
  updateShelf = (book, shelf) => {
    this.setState({
      loading: true
    })
    BooksAPI.update(book, shelf).then(data => {
      this.props.updateShelf(book, shelf)
      this.setState((prev) => ({
        loading: false
      }))
    })
  }

  render() {
    const { loading, results, status } = this.state
    return (
      <div>
      { loading ? (
        <div className="spinner">
          <div className="lds-dual-ring"></div>
        </div> ) : <div /> }
        <div className="row">
          <input
            type="text"
            className="fluid"
            placeholder="Enter your query"
            onChange={(event) => this.searchQuery(event)}/>
        </div>
        { results.length > 0 ? (
          <div className="row">
            { results.map((books, i) => (
              <BookRow books={books} originalBooks={this.props.books} updateShelf={this.updateShelf} key={i}/>
            ))}
          </div>
        ) : (
          <div className="nothing">
            {status}
          </div>
        )}
        <Link to="/" className="search-icon"><FaAngleLeft /></Link>
      </div>
    )
  }
}

export default Search
