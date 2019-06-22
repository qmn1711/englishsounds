import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Switch
} from 'react-router-dom';

import store from 'store/configureStore';
import { data } from 'assets/data';

import './App.css';

const Header = lazy(() => import('components/Header'));
const Footer = lazy(() => import('components/Footer'));
const About = lazy(() => import('components/About'));
const SoundDetail = lazy(() => import('components/SoundDetail'));
const PhonemicChart = lazy(() => import('components/PhonemicChart'));

const NoMatch = ({ location }: RouteComponentProps) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

const Loading = () => <div>Loading...</div>;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <div className="wrapper">
            <Header />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <PhonemicChart
                    {...props}
                    vowels={data.vowels}
                    consonants={data.consonants}
                  />
                )}
              />
              <Route path="/sound/:word" component={SoundDetail} />
              <Route path="/about" component={About} />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </div>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
