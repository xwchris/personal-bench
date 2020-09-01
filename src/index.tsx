import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './global.css'

render(
  (
    <Router>
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Route path="/admin" component={lazy(() => import(/* webpackChunkName: "admin" */ './containers/Admin'))} />
          <Route path="/" component={lazy(() => import(/* webpackChunkName: "app" */ './containers'))} />
        </Switch>
      </Suspense>
    </Router>
  ),
  document.getElementById('root')
);
