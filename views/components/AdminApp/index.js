/*
 * Admin 基准模板
 */
import React from 'react';
import { asyncConnect } from 'redux-connect';

import AdminNavBar from '../AdminNavBar';

import { loadAdminInfo } from '../../redux/modules/admin';

import './styles';

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadAdminInfo());
    }
  }]
)
class AdminApp extends React.Component {
  render() {
    return (
      <div>
        <AdminNavBar />
        { this.props.children }
      </div>
    );
  }
}

export default AdminApp;
