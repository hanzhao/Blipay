'use strict';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { message } from 'antd';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect'
import { syncHistoryWithStore } from 'react-router-redux';

import moment from 'moment';
moment.locale('zh-CN');

import store from './redux/store';

import App from './components/App';
import MainPage from './components/MainPage';
import AccountPage from './components/AccountPage';
import AccountRecordPage from './components/AccountRecordPage';
import AccountSecurityPage from './components/AccountSecurityPage';
import AccountWelcomePage from './components/AccountWelcomePage';
import AccountInfoPage from './components/AccountInfoPage';
import AdminIndexPage from './components/AdminIndexPage';
import AdminApp from './components/AdminApp';
import AdminWelcomePage from './components/AdminWelcomePage';
import AdminInfoPage from './components/AdminInfoPage';
import AdminManager from './components/AdminManager';
import AdminAddAdminPage from './components/AdminAddAdminPage';
import AdminAddAuditorPage from './components/AdminAddAuditorPage';
import AdminRegisterPage from './components/AdminRegisterPage';
import AdminJudgement from './components/AdminJudgement';
import AdminVerify from './components/AdminVerify';
import AdminVerifyDetail from './components/AdminVerifyDetail';
import AdminManagePage from './components/AdminManagePage';
import AdminManageUserPage from './components/AdminManageUserPage';
import AdminManageAuditorPage from './components/AdminManageAuditorPage';
import AdminManageAdminPage from './components/AdminManageAdminPage';
import ShoppingPage from './components/ShoppingPage';
import ShoppingItemPage from './components/ShoppingItemPage';
import ShoppingWelcomePage from './components/ShoppingWelcomePage';
import ShoppingOrderPage from './components/ShoppingOrderPage';
import ShoppingInfoPage from './components/ShoppingInfoPage';
import ShoppingAddItemPage from './components/ShoppingAddItemPage';
import ShoppingItemManage from './components/ShoppingItemManage';
import NotFoundPage from './components/NotFoundPage';

import BookingPage from './components/BookingPage'
import BookingInfoPage from './components/BookingInfoPage'

import AuditApp from './components/AuditApp';
import AuditorLoginPage from './components/AuditorLoginPage';
import AuditPage from './components/AuditPage';
import AuditLatestRecordPage from './components/AuditLatestRecordPage';
import AuditSearchPage from './components/AuditSearchPage';
import AuditLogPage from './components/AuditLogPage';
import AuditUserPage from './components/AuditUserPage';

const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Provider store={store}>
    <Router history={history}
            render={(props) => <ReduxAsyncConnect {...props} />}>
      <Route path="/admin" component={AdminApp}>
        <IndexRoute component={AdminIndexPage} />
        <Route path="/admin/panel" component={AdminInfoPage}>
          <Route path="/admin/panel/welcome" component={AdminWelcomePage} />
          <Route path="/admin/panel/manage" component={AdminManagePage}>
            <Route path="/admin/panel/manage/user" component={AdminManageUserPage} />
            <Route path="/admin/panel/manage/admin" component={AdminManageAdminPage} />
            <Route path="/admin/panel/manage/admin/add" component={AdminAddAdminPage} />
            <Route path="/admin/panel/manage/auditor" component={AdminManageAuditorPage} />
            <Route path="/admin/panel/manage/auditor/add" component={AdminAddAuditorPage} />
          </Route>
	        <Route path="/admin/panel/judgement" component={AdminJudgement} />
          <Route path="/admin/panel/verification" component={AdminVerify} />
          <Route path="/admin/panel/verification/:userId/detail" component={AdminVerifyDetail} />
        </Route>
        <Route path="/admin/register" component={AdminRegisterPage} />
      </Route>

       <Route path="/auditor" component = {AuditApp}>
        <IndexRoute component={AuditorLoginPage} />

      <Route path="/audit" component={AuditPage}>
        <IndexRoute component={AuditLatestRecordPage} />
          <Route path="/audit/search" component={AuditSearchPage} />
          <Route path="/audit/log" component={AuditLogPage} />
          <Route path="/audit/user" component={AuditUserPage} />
      </Route>
      </Route>

      <Route path="/" component={App} >
        <IndexRoute component={MainPage} />
        <Route path="/account" component={AccountPage} >
          <IndexRoute component={AccountWelcomePage} />
          <Route path="/account/info" component={AccountInfoPage} />
          <Route path="/account/records" component={AccountRecordPage} />
          <Route path="/account/security" component={AccountSecurityPage} />
        </Route>
        <Route path="/shopping" component={ShoppingPage}>
          <IndexRoute component={ShoppingInfoPage} />
          <Route path="/shopping/item/:itemId" component={ShoppingItemPage} />
          <Route path="/shopping/info" component={ShoppingInfoPage} />
          <Route path="/shopping/order" component={ShoppingOrderPage} />
          <Route path="/shopping/add_item" component={ShoppingAddItemPage} />
          <Route path="/shopping/manage_item" component={ShoppingItemManage} />
        </Route>
        <Route path="/booking" component={BookingPage}>
          <IndexRoute component={BookingInfoPage} />
        </Route>
      </Route>
      <Route path="*" component={NotFoundPage} />
    </Router>
  </Provider>
);

// React Start!
ReactDOM.render(router, document.getElementById('react-root'));
