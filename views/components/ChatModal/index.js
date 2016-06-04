import React from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Button } from 'antd';
import { Row, Col } from 'antd';

import { reduxForm, addArrayValue } from 'redux-form';
import styles from './styles';

import io from 'socket.io-client';
import {
  toggleShoppingChat,
  startChat,
  sendMsg,
  clearNewMsg,
  selectChater
} from '../../redux/modules/shopping';

@reduxForm(
  {
    form: 'Chat',
    fields: ['text']
  }, undefined, {
  })
@connect(
  (state) => ({
    showChatModal: state.shopping.showChatModal,
    chatUsers: state.shopping.chatUsers,
    chatMsgs: state.shopping.chatMsgs,
    chaterId: state.shopping.chaterId
  }),
  (dispatch) => ({
    toggleShoppingChat: () => dispatch(toggleShoppingChat()),
    startChat: () => dispatch(startChat()),
    sendMessage: (text) => dispatch(sendMsg(text)),
    clearNewMsg: () => dispatch(clearNewMsg()),
    selectChater: (userId) => dispatch(selectChater(userId))
  })
)
class ChatModal extends React.Component {
  render() {
    const { showChatModal, sendMessage, chatUsers, chatMsgs, clearNewMsg, selectChater, chaterId, fields: { text } } = this.props;
    const sendMsg = () => {
      sendMessage(text.value)
    }
    console.log(chatMsgs)
    return (
      <Modal
        title="消息"
        className={styles.modal}
        visible = {showChatModal}
        onOk={ this.props.toggleShoppingChat }
        onCancel={this.props.toggleShoppingChat}>
        <Row>
          <Col className= {styles.users}>
            Users
            {

              chatUsers ? chatUsers.map((e, i) => (
                e ? (
                  <div key={e.userId} className={styles.userEntry}   onClick={selectChater.bind(this, e.userId) }>
                    <span className={styles.userEntryText}>{e.userName}</span>
                  </div>
                ) : null
              )) : null
            }
          </Col>
          <Col className={styles.msgs}>
            <div>
              {
                this.props.chaterId ?
                  this.props.chatMsgs[chaterId] ?
                    this.props.chatMsgs[chaterId].map((e, i) => (
                      <div key={i}>
                        {e}
                      </div>
                    ))
                    :
                    <span>{chatUsers[chaterId].userName} 没有信息</span>
                  :
                  <span>请选择</span>
              }
            </div>
            <div>
              <Input className={styles.input} type='textarea' {...text } />
              <Button onClick={sendMsg}>
                发送
              </Button>
            </div>
          </Col>
        </Row>
      </Modal>
    )
  }
}

export default ChatModal
