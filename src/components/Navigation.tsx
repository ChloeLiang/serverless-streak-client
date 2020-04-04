import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Navigation: FunctionComponent = () => {
  return (
    <nav className="Navigation">
      <ul>
        <li className="Navigation__item">
          <Link to="/signup">
            <Button ghost>Sign Up</Button>
          </Link>
        </li>
        <li className="Navigation__item">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
