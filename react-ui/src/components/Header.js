import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="navigators">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
  </div>
);

export default Header;
