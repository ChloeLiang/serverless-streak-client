import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';

const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
