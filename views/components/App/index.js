/*
 * 所有主站页面基准模板
 */
import React from 'react';
import { asyncConnect } from 'redux-connect';

import NavBar from '../NavBar';
import { loadAccountInfo } from '../../redux/modules/account';

import './styles';

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState }}) => {
      return dispatch(loadAccountInfo());
    }
  }]
)
class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        { this.props.children }
      </div>
    );
  }
}

export default App;
