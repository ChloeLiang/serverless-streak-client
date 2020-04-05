import React, { useState, FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Header from './components/Header';
import AuthContext from './contexts/AuthContext';

const App: FunctionComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { Content } = Layout;
  return (
    <AuthContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
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
    </AuthContext.Provider>
  );
};

export default App;
