import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route,
} from 'react-router-dom';

import Main from './Router';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route component={Main} />
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
