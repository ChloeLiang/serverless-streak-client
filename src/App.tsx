import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Header from './components/Header';

const App: FunctionComponent = () => {
  const { Content } = Layout;
  return (
    <Layout className="App">
      <Header />
      <Content className="App__content">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default App;
