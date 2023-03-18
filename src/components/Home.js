import '../styles/Home.css';
import React from 'react';
import Carousel from './Carousel';
import Landing from './Landing';

import {motion} from 'framer-motion';


function Home() {
  return (
    <motion.div 
        className="App"
        key="boxzefe"
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        exit={{ opacity:0.8, transition:{duration: 1.2} }}
    >
      <header className="App-header"></header>
      <Landing />
      <Carousel />
    </motion.div>
  );
}

export default Home;
