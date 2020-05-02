import React, {
  lazy,
  Suspense,
  useState,
  FunctionComponent,
  useEffect,
} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { Auth } from 'aws-amplify';
import Home from './components/Home';
import Header from './components/Header';
import AuthContext from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import { onError } from './services/logger';

const Login = lazy(() => import('./components/Login'));
const SignUp = lazy(() => import('./components/SignUp'));
const NewGoal = lazy(() => import('./components/NewGoal'));
const GoalDetails = lazy(() => import('./components/GoalDetails'));

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
      onError(e);
    }
    setIsAuthenticating(false);
  };

  const getRoutes = () => {
    let routes = (
      <Suspense fallback={<Spin spinning size="large" />}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
    if (isAuthenticated) {
      routes = (
        <Suspense fallback={<Spin spinning size="large" />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/goals/new" component={NewGoal} />
            <Route path="/goals/:id" component={GoalDetails} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
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
