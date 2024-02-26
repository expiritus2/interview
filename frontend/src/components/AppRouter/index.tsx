import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Main, NotFound, Shows } from 'pages';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          component={Main}
        />
        <Route
          path="/genres/:genreName"
          exact
          component={Shows}
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
