'use strict';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './redux/store';

import App from './components/App';
import MainPage from './components/MainPage';
import AccountPage from './components/AccountPage';
import AccountRecordPage from './components/AccountRecordPage';
import AccountSecurityPage from './components/AccountSecurityPage';
import AccountWelcomePage from './components/AccountWelcomePage';
import AdminIndexPage from './components/AdminIndexPage';
import NotFoundPage from './components/NotFoundPage';
import ShoppingPage from './components/ShoppingPage'
import ShoppingWelcomePage from './components/ShoppingWelcomePage'
import ShoppingCartPage from './components/ShoppingCartPage'
import ShoppingOrderPage from './components/ShoppingOrderPage'
const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/admin">
        <IndexRoute component={AdminIndexPage} />
      </Route>
      <Route path="/" component={App}>
        <IndexRoute component={MainPage} />
        
        <Route path="/account" component={AccountPage}>
          <IndexRoute component={AccountWelcomePage} />
          <Route path="/account/records" component={AccountRecordPage} />
          <Route path="/account/security" component={AccountSecurityPage} />
        </Route>

        <Route path="/shopping" component={ShoppingPage}>
          <IndexRoute component={ShoppingWelcomePage} />
          <Route path="/shopping/shoppingcart" component={ShoppingCartPage} />
          <Route path="/shopping/shoppingorder" component={ShoppingOrderPage} />
        </Route>

        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>
);

// React Start!
ReactDOM.render(router, document.getElementById('react-root'));
