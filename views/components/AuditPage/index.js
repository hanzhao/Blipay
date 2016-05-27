/*
 * 登錄之後的審計員頁面
 */

import React from 'react';

import { Table,Icon,DatePicker,Button } from'antd';
import Container from '../Container/';
import AuditMenu from '../AuditMenu';
import styles from './styles';

class AuditPage extends React.Component {   
  render() {
    return (
       <div className={styles.wrapper}
           style={{ height: window.innerHeight -85}}>
      
        <Container className={styles.container}>
        <div className={styles.left}>
            <AuditMenu />
       </div>
        	<div className={styles.right}>
             { this.props.children }
        	</div>
        </Container>
      </div>
    );
  }
}

export default AuditPage;
