/*
 * 
 */
import React from 'react';

import AuditorLoginBar from '../AuditorLoginBar/';

import './styles';

class App extends React.Component {
  render() {
    return (
      <div>
        <AuditorLoginBar />
        { this.props.children }
      </div>
    );
  }
}

export default App;
