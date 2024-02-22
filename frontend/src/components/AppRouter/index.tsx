import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../../App';
import NotFound from '../NotFound';

const AppRouter = () => {
  return <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="*" exact component={NotFound} />
    </Switch>
  </BrowserRouter>;
};

export default AppRouter;
