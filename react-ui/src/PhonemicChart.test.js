import React from 'react';
import ReactDOM from 'react-dom';
import PhonemicChart from './PhonemicChart';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PhonemicChart />, div);
});
