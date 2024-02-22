import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Posts, NotFound } from 'pages';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          component={Posts}
        />
        <Route
          path="*"
          exact
          component={NotFound}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
