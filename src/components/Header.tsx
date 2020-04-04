import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import Navigation from './Navigation';
import logo from '../assets/logo.png';

const Header: FunctionComponent = () => {
  const { Header } = Layout;
  return (
    <Header className="Header">
      <div className="Header__container">
        <Link to="/">
          <div className="Header__logo-box">
            <img src={logo} alt="Logo" className="Header__logo" />
          </div>
        </Link>
        <Navigation />
      </div>
    </Header>
  );
};

export default Header;
