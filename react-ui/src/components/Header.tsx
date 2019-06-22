import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div className="navigators">
    <NavLink exact to="/">
      Home
    </NavLink>
    <NavLink exact to="/about">
      About
    </NavLink>
  </div>
);

export default Header;
