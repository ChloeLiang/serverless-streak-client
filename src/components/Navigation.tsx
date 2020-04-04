import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const Navigation: FunctionComponent = () => {
  return (
    <nav className="nav">
      <ul>
        <li className="nav__item">
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className="nav__item">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
