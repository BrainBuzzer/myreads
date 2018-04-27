import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './style/index.css'
import Home from './components/Home'
import Search from './components/Search'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Route exact path="/" render={() =>
          <Home />
        } />
        <Route exact path="/search" render={() =>
          <Search />
        } />
      </div>
    );
  }
}

export default App;
