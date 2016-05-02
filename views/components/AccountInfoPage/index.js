import React from 'react';

import TogglableInput from '../TogglableInput';

import styles from './styles';

const items = [
	{ title: '昵称', display: null},
	{ title: '真实姓名', display: null},
	{ title: '身份证号', display: null},
	{ title: '邮箱地址', display: 'xxx@xxx.com'},
	{ title: '手机/电话', display: '13000000000'},
];

class AccountInfoPage extends React.Component {
  render() {
    return (
    	<div className={styles.container}>
    		<div className={styles.mainTitle}>修改个人资料</div>
    		{ items.map((i) => (
    			<div className={styles.row}>
    				<div className={styles.verticalBar}/>
    				<div className={styles.editTitle}>{ i.title }</div>
    				<TogglableInput defaultValue={i.display} />
    			</div>
    		)) }
    	</div>);
  }
}

export default AccountInfoPage;
