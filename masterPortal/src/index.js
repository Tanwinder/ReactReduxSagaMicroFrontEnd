import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';
import reducers from './app/reducers';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

let middleware = [promise(), thunk, loadingBarMiddleware({
  promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
})];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducers);

import App from './app/App';

render((
  <BrowserRouter>
    <Provider store={store}>
    <Switch>
        <Route path="/" name="Home" component={App}/>
      </Switch>
    </Provider>  
  </BrowserRouter>
), document.getElementById('root'));