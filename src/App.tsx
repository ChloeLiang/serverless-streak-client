import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import Routes from './Routes';
import logo from './assets/logo.png';
import './App.css';

const App: FunctionComponent = () => {
  const { Header, Content } = Layout;
  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <Link to="/">
            <div className="logo-box">
              <img src={logo} alt="Logo" className="logo" />
            </div>
          </Link>
        </Header>
        <Content className="content">
          <Routes />
        </Content>
      </Layout>
    </div>
  );
};

export default App;
