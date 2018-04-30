import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './style/index.css'
import Home from './components/Home'
import Search from './components/Search'
import * as BooksAPI from './utils/BooksAPI'
import BookDetails from './components/BookDetails';

class App extends Component {
  state = {
    books: []
  }

  /**
   * Used to update the global books variable when a book's shelf is changed.
   *
   * @memberof App
   */
  updateShelf = (book, val) => {
    this.setState((prev) => {
      book.shelf = val
      let books = prev.books.filter(b => b.id !== book.id)
      books.push(book)
      return { books }
    })
  }

  componentWillMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  render() {
    const {books} = this.state
    return (
      <div>
        <div className="app-header">
          <Link to="/"><h4>MyReads App</h4></Link>
        </div>
        <div className="container">
          <Route exact path="/" render={() => (
            <Home books={books} updateShelf={this.updateShelf}/>
          )} />
          <Route exact path="/search" render={() => (
            <Search books={books} updateShelf={this.updateShelf}/>
          )} />
          <Route path="/book/:id" component={BookDetails} />
        </div>
      </div>
    );
  }
}

export default App;
