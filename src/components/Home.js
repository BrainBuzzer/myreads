import React, { Component } from 'react'
import BookCard from './BookCard'
import * as BooksAPI from '../utils/BooksAPI.js'

class Home extends Component {
  state = {
    wantToRead: [],
    currentlyReading: [],
    read: [],
    loading: true
  }

  getBooks() {
    let wantToRead = [], currentlyReading = [], read = [];
    BooksAPI.getAll().then((books) => {
      books.filter(book => {
        if(book.shelf==="wantToRead") {
          wantToRead.push(book)
        } else if(book.shelf==="currentlyReading") {
          currentlyReading.push(book)
        } else if(book.shelf==="read") {
          read.push(book)
        }
      })
      this.setState({
        wantToRead,
        currentlyReading,
        read,
        loading: false
      })
    })
  }

  updateStatus = (book, val) => {
    this.setState({
      loading: true
    })
    BooksAPI.update(book, val).then(res => {
      switch(book.shelf) {
        case 'wantToRead':
          this.setState((prev) => ({
            wantToRead: prev.wantToRead.filter(b => b.id !== book.id)
          }))
          break;
        case 'currentlyReading':
          this.setState((prev) => ({
            currentlyReading: prev.currentlyReading.filter(b => b.id !== book.id)
          }))
          break;
        case 'read':
          this.setState((prev) => ({
            read: prev.read.filter(b => b.id !== book.id)
          }))
          break;
      }
      switch(val) {
        case 'wantToRead':
          this.setState((prev) => {
            book.shelf = 'wantToRead'
            let ar = prev.wantToRead.concat(book)
            return { wantToRead: ar }
          })
          break;
        case 'currentlyReading':
          book.shelf = 'currentlyReading'
          this.setState((prev) => {
            let ar = prev.currentlyReading.concat(book)
            return { currentlyReading: ar }
          })
          break;
        case 'read':
          book.shelf = 'read'
          this.setState((prev) => {
            let ar = prev.read.concat(book)
            return { read: ar }
          })
          break;
      }
      this.setState({
        loading: false
      })
    })
  }

  componentDidMount() {
    this.getBooks()
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
            { wantToRead.map(book => (
              <div className="three columns" key={book.id}>
                <BookCard book={book} changeStatus={this.updateStatus}/>
              </div>
            ))}
          </div>
          <div className="sep"><span>Currently Reading</span></div>
          <div className="list-books row">
            { currentlyReading.map(book => (
              <div className="three columns" key={book.id}>
                <BookCard book={book} changeStatus={this.updateStatus}/>
              </div>
            ))}
          </div>
          <div className="sep"><span>Read</span></div>
          <div className="list-books row">
            { read.map(book => (
              <div className="three columns" key={book.id}>
                <BookCard book={book} changeStatus={this.updateStatus}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
