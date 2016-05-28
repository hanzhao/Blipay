/*
 * Blipay Logo
 */
import React from 'react';

import logo from './logo.png';

class Logo extends React.Component {
  render() {
    return (
      <img src={logo} {...this.props} />
    );
  }
}

export default Logo;
