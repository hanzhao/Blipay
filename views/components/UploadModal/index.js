/*
 * 用于上传文件的提示框
 */
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Upload, Icon, Button, message } from 'antd';
import styles from './styles';

class UploadModal extends React.Component {

  state = {
    fileList: []
  };

  handleChange = (info) => {
    let fileList = info.fileList;
    /* 只显示最后上传的两张图片 */
    fileList = fileList.slice(-2);
    this.setState({fileList});
  };

  render() {
    const uploadProps = {
      name: 'photo',
      action: '/api/account/verification',
      onChange: this.handleChange,
      onRemove: this.handleMove
    };
    return (
      <div>
        <Modal visible={this.props.visible}
               width="400px"
               title={this.props.title}
               footer={null}
               onCancel={this.props.toggleModal}>
          <div className={styles.dragger}>
            <Upload.Dragger {...uploadProps} fileList={this.state.fileList}>
              <Icon type="plus"/>
              <div className={styles.hint}>
                请拖拽或点击上传身份证正反面复印件或照片。
                <br/>
                只有最后上传的两张图片将被保存。
              </div>
            </Upload.Dragger>
          </div>
          <div className={styles.error}
               style={{marginTop: this.state.fileList.length * 40 + 20}}>
            {this.props.errorMsg ? this.props.errorMsg : '　'}
          </div>
          <Button className={styles.confirm}
                  type="primary"
                  onClick={this.props.btnCallback}
                  loading={this.props.loading === true}>
            {this.props.btnText}
          </Button>
        </Modal>
      </div>
    );
  }
}

export default UploadModal;
