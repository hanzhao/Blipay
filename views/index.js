'use strict';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './redux/store';

import App from './components/App';
import AuditApp from './components/AuditApp/';
import MainPage from './components/MainPage';
import ShoppingPage from './components/ShoppingPage';
import AccountPage from './components/AccountPage';
import AccountRecordPage from './components/AccountRecordPage';
import AccountSecurityPage from './components/AccountSecurityPage';
import AccountWelcomePage from './components/AccountWelcomePage';
import AccountInfoPage from './components/AccountInfoPage';
import AdminIndexPage from './components/AdminIndexPage';
import NotFoundPage from './components/NotFoundPage';
import AuditorLoginPage from './components/AuditorLoginPage';
import AuditPage from './components/AuditPage';
import AuditLatestRecordPage from './components/AuditLatestRecordPage'
import AuditCheckPage from './components/AuditCheckPage';
import AuditSearchPage from './components/AuditSearchPage';
import AuditLogPage from './components/AuditLogPage';

import { isLoggedIn } from './redux/modules/account/auth';
import { AuditorisLoggedIn } from './redux/modules/auditor/auth';


const history = syncHistoryWithStore(browserHistory, store);

const checkLogin = (nextState, replace, callback) => {
  if (!isLoggedIn(store.getState()) && 
      (nextState.location.pathname !== '/'))
    replace('/');
  callback();
};

const AuditorcheckLogin = (nextState, replace, callback) => {
  if (!AuditorisLoggedIn(store.getState()) && 
      (nextState.location.pathname !== '/auditor'))
    replace('/auditor');
  callback();
};
const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/admin">
        <IndexRoute component={AdminIndexPage} />
      </Route>
      <Route path="/auditor" component = {AuditApp}>
        <IndexRoute component={AuditorLoginPage} />
        <Route onEnter={AuditorcheckLogin}>
      <Route path="/audit" component={AuditPage}>
        <IndexRoute component={AuditLatestRecordPage} />
        <Route path="/audit/check" component={AuditCheckPage} />
          <Route path="/audit/search" component={AuditSearchPage} />
          <Route path="/audit/log" component={AuditLogPage} />
        </Route>
      </Route>
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
