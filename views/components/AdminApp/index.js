/*
 * Admin 基准模板
 */
import React from 'react';

import AdminNavBar from '../AdminNavBar';

import './styles';

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
