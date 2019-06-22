import React from 'react';
import { Link } from 'react-router-dom';

import Home from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';

const About = () => (
  <div className="about-wrapper">
    <Link className="back-to-home" to="/">
      <IconButton aria-label="back to home">
        <Home />
        <KeyboardBackspace />
      </IconButton>
    </Link>

    <div className="technologies">
      <p>- Use React, Redux, React Router</p>
      <p>- Use Oxford Dictionaries API</p>
      <p>- Use Material-UI library</p>
      <p>- Follow Airbnb style guide</p>
    </div>
    <div className="todo">
      <p>TODO: Add steps to pronounce a phonemic symbols</p>
      <p>TODO: Add meanings of word</p>
      <p>TODO: Add audio recorder for better practice</p>
      <p>
        TODO: Add a warning when adding a word does not contain the current
        phonemic symbols
      </p>
    </div>
  </div>
);

export default About;
