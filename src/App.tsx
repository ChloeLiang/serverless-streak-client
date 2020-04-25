import React, { useState, FunctionComponent, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { Auth } from 'aws-amplify';
import Home from './components/Home';
import Login from './components/Login';
import Header from './components/Header';
import AuthContext from './contexts/AuthContext';
import SignUp from './components/SignUp';
import NewGoal from './components/NewGoal';
import GoalDetails from './components/GoalDetails';
import ErrorBoundary from './components/ErrorBoundary';

const App: FunctionComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const { Content } = Layout;

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);
    } catch (e) {
      console.error(e);
    }
    setIsAuthenticating(false);
  };

  const getRoutes = () => {
    let routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    );
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/goals/new" component={NewGoal} />
          <Route path="/goals/:id" component={GoalDetails} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return routes;
  };

  return (
    <Spin spinning={isAuthenticating} size="large" tip="Loading...">
      <ErrorBoundary>
        <AuthContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
          <Layout className="App">
            <Header />
            <Content className="App__content">{getRoutes()}</Content>
          </Layout>
        </AuthContext.Provider>
      </ErrorBoundary>
    </Spin>
  );
};

export default App;
