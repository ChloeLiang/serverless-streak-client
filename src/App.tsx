import React, { FunctionComponent } from 'react';
import { Layout } from 'antd';
import Routes from './Routes';
import Header from './components/Header';

const App: FunctionComponent = () => {
  const { Content } = Layout;
  return (
    <Layout className="App">
      <Header />
      <Content className="App__content">
        <Routes />
      </Content>
    </Layout>
  );
};

export default App;
