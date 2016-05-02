import React from 'react';

import { Button, Input, Icon } from 'antd';

import styles from './styles';

class TogglableInput extends React.Component {
	state = {
		editing: false,
	};
	handleEdit = () => {
		this.setState({ editing: true });
	};
	handleCancel = () => {
		this.setState({ editing: false });
	}
	render() {
		return (
			<span>
				{ this.state.editing && 
					<span className={styles.row}>
				    <Input className={styles.input}/>
				    <Button className={styles.button} type="primary">保存</Button>
				    <a className={styles.cancel} onClick={this.handleCancel}>取消</a>
				  </span>
				}
				{ !this.state.editing &&
					<span className={styles.row}>
			      <span className={styles.title}>{this.props.defaultValue}</span>
			      <a className={styles.edit} onClick={this.handleEdit}>
				      <Icon type='edit' className={styles.icon}/>
				      <span>填写</span>
			      </a>
			    </span>
				}
			</span>
		)
	}
}

export default TogglableInput;