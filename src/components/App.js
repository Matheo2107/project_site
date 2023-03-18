import Carousel from './Carousel';
import Landing from './Landing';
import {BrowserRouter as Router} from "react-router-dom"
import React from 'react';
import AnimatedRoutes from './AnimatedRoutes';

function App() {

  return (
    <div className="App">
      <Router>
        <AnimatedRoutes/>
      </Router>
    </div>

  );
}

export default App;
