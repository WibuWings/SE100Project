import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import DirectionURL from './Router/DirectionURL';
import './CSS/App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <DirectionURL></DirectionURL>
        </div>
      </Router>
    );
  }
}

export default App;

