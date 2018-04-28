import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './style/index.css'
import Home from './components/Home'
import Search from './components/Search'

class App extends Component {
  render() {
    return (
      <div>
        <div className="app-header"><h4>MyReads App</h4></div>
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route exact path="/search" render={() =>
            <Search />
          } />
        </div>
      </div>
    );
  }
}

export default App;
