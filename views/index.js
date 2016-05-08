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
import ShoppingPage from './components/ShoppingPage';
import AccountPage from './components/AccountPage';
import AccountRecordPage from './components/AccountRecordPage';
import AccountSecurityPage from './components/AccountSecurityPage';
import AccountWelcomePage from './components/AccountWelcomePage';
import AccountInfoPage from './components/AccountInfoPage';
import AdminIndexPage from './components/AdminIndexPage';
import NotFoundPage from './components/NotFoundPage';
import AdminApp from './components/AdminApp';
import AdminWelcomePage from './components/AdminWelcomePage';
import AdminInfoPage from './components/AdminInfoPage';
import AdminManager from './components/AdminManager';
import AdminChange from './components/AdminChange';

const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/admin" component={AdminApp}>
        <IndexRoute component={AdminIndexPage} />
        <Route path="/admin/account" component={AdminInfoPage}>
          <Route path="/admin/account/welcome" component={AdminWelcomePage} />
          <Route path="/admin/account/manager" component={AdminManager} />
          <Route path="/admin/account/change" component={AdminChange} />
        </Route>

      </Route>
      <Route path="/" component={App}>
        <IndexRoute component={MainPage} />
        <Route path="/shopping" component={ShoppingPage} />
        <Route path="/account" component={AccountPage}>
          <IndexRoute component={AccountWelcomePage} />
          <Route path="/account/info" component={AccountInfoPage} />
          <Route path="/account/records" component={AccountRecordPage} />
          <Route path="/account/security" component={AccountSecurityPage} />
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>
);

// React Start!
ReactDOM.render(router, document.getElementById('react-root'));
