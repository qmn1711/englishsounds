import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from 'theme';

import 'typeface-roboto';
import './index.css';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
