/*
 * 所有主站页面基准模板
 */
import React from 'react';

import NavBar from '../NavBar';

import './styles';

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
