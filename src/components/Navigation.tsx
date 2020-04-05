import React, { useContext, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import AuthContext from '../contexts/AuthContext';
import { Auth } from 'aws-amplify';

const Navigation: FunctionComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);

  const handleLogout = async () => {
    await Auth.signOut();
    setIsAuthenticated(false);
  };

  return (
    <nav className="Navigation">
      <ul>
        {isAuthenticated ? (
          <li className="Navigation__item">
            <Button ghost onClick={handleLogout}>
              Logout
            </Button>
          </li>
        ) : (
          <>
            <li className="Navigation__item">
              <Link to="/signup">
                <Button ghost>Sign Up</Button>
              </Link>
            </li>
            <li className="Navigation__item">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
