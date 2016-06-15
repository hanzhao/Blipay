/** 审计员顶级页面 */
import React from 'react';
import { asyncConnect } from 'redux-connect';

import AuditorLoginBar from '../AuditorLoginBar/';
import { loadAccountInfo } from '../../redux/modules/auditor';

import './styles';

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState }}) => {
      return dispatch(loadAccountInfo())
    }
  }]
)
class AuditApp extends React.Component {
  render() {
    return (
      <div>
        <AuditorLoginBar />
        { this.props.children }
      </div>
    );
  }
}

export default AuditApp;

