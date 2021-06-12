import React from 'react'
import { Route, Switch } from 'react-router';
import App from './app';

const routes = <Switch>
<Route exact path="/notauthorized" render={() => "Not authorized"} />
<Route exact path="*" render={() => <App />} />
</Switch>
export default routes;