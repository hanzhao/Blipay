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
import NotFoundPage from './components/NotFoundPage';
import AdminApp from './components/AdminApp';
import AdminWelcomePage from './components/AdminWelcomePage';
import AdminInfoPage from './components/AdminInfoPage';
import AdminManager from './components/AdminManager';
import AdminChange from './components/AdminChange';
import AdminRegisterPage from './components/AdminRegisterPage';
import AdminJudgement from './components/AdminJudgement';

import AdminVerify from './components/AdminVerify';
import AdminVerifyDetail from './components/AdminVerifyDetail';
import ShoppingPage from './components/ShoppingPage';
import ShoppingItemPage from './components/ShoppingItemPage';
import ShoppingWelcomePage from './components/ShoppingWelcomePage';
import ShoppingOrderPage from './components/ShoppingOrderPage';
import ShoppingInfoPage from './components/ShoppingInfoPage';
import ShoppingAddItemPage from './components/ShoppingAddItemPage';
import ShoppingItemManage from './components/ShoppingItemManage';

import BookingPage from './components/BookingPage'
import BookingInfoPage from './components/BookingInfoPage'


const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Provider store={store}>
    <Router history={history}
            render={(props) => <ReduxAsyncConnect {...props} />}>
      <Route path="/admin" component={AdminApp}>
        <IndexRoute component={AdminIndexPage} />
        <Route path="/admin/account" component={AdminInfoPage}>
          <Route path="/admin/account/welcome" component={AdminWelcomePage} />
          <Route path="/admin/account/manage" component={AdminManager} />
          <Route path="/admin/account/change" component={AdminChange} />
	        <Route path="/admin/account/judgement" component={AdminJudgement} />
          <Route path="/admin/account/verification" component={AdminVerify} />
          <Route path="/admin/account/verification/:userId/detail" component={AdminVerifyDetail} />
        </Route>
        <Route path="/admin/register" component={AdminRegisterPage} />   //调试使用
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
