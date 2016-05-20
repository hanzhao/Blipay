'use strict';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { message } from 'antd';
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

import { isLoggedIn } from './redux/modules/account/auth';

const history = syncHistoryWithStore(browserHistory, store);

const checkLogin = (nextState, replace, callback) => {
  if (!isLoggedIn(store.getState()) && 
      (nextState.location.pathname !== '/')) {
    replace('/');
    message.info('请先登录');
  }
  callback();
};

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/admin">
        <IndexRoute component={AdminIndexPage} />
      </Route>
      <Route path="/" component={App}>
        <IndexRoute component={MainPage} />
        <Route onEnter={checkLogin}>
          <Route path="/shopping" component={ShoppingPage} />
          <Route path="/account" component={AccountPage} >
            <IndexRoute component={AccountWelcomePage} />
            <Route path="/account/info" component={AccountInfoPage} />
            <Route path="/account/records" component={AccountRecordPage} />
            <Route path="/account/security" component={AccountSecurityPage} />
          </Route>
        </Route>
      </Route>
      <Route path="*" component={NotFoundPage} />
    </Router>
  </Provider>
);

// React Start!
ReactDOM.render(router, document.getElementById('react-root'));
