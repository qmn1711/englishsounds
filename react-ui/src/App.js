import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import PhonemicChart from './PhonemicChart';

import SoundDetailContainer from './containers/SoundDetailContainer';
import About from './components/About';
import Header from './components/Header';
import Footer from './components/Footer';
import data from './data';

const NoMatch = ({ location }) => ((
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
));

const App = () => ((
  <div className="wrapper">
    <Header />
    <Switch>
      <Route
        exact
        path="/"
        render={props =>
          <PhonemicChart {...props} vowels={data.vowels} consonants={data.consonants} />}
      />
      <Route path="/sound/:word" component={SoundDetailContainer} />
      <Route path="/about" component={About} />
      <Route component={NoMatch} />
    </Switch>
    <Footer />
  </div>
));

NoMatch.propTypes = {
  location: PropTypes.object.isRequired,
};

export default App;
