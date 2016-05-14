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
import AccountInfoPage from './components/AccountInfoPage';
import AdminIndexPage from './components/AdminIndexPage';
import NotFoundPage from './components/NotFoundPage';
import ShoppingPage from './components/ShoppingPage'
import ShoppingWelcomePage from './components/ShoppingWelcomePage'
import ShoppingCartPage from './components/ShoppingCartPage'
import ShoppingOrderPage from './components/ShoppingOrderPage'
import ShoppingInfoPage from './components/ShoppingInfoPage'
import ShoppingItemAdd from './components/ShoppingItemAdd'
import ShoppingItemManage from './components/ShoppingItemManage'
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
          <Route path="/account/info" component={AccountInfoPage} />
          <Route path="/account/records" component={AccountRecordPage} />
          <Route path="/account/security" component={AccountSecurityPage} />
        </Route>
        <Route path="/shopping" component={ShoppingPage}>
          <IndexRoute component={ShoppingInfoPage} />
          <Route path="/shopping/shoppinginfo" component={ShoppingInfoPage} />
          <Route path="/shopping/shoppingcart" component={ShoppingCartPage} />
          <Route path="/shopping/shoppingorder" component={ShoppingOrderPage} />
          <Route path="/shopping/shoppingitemadd" component={ShoppingItemAdd} />
          <Route path="/shopping/shoppingitemmanage" component={ShoppingItemManage} />
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>
);

// React Start!
ReactDOM.render(router, document.getElementById('react-root'));
