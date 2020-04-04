import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import Navigation from './Navigation';
import logo from '../assets/logo.png';

const Header: FunctionComponent = () => {
  const { Header } = Layout;
  return (
    <Header className="header">
      <div className="header__container">
        <Link to="/">
          <div className="header__logo-box">
            <img src={logo} alt="Logo" className="header__logo" />
          </div>
        </Link>
        <Navigation />
      </div>
    </Header>
  );
};

export default Header;
