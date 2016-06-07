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
  selectChater,
  selfMsg
} from '../../redux/modules/shopping';

function scrollButtom(){
  // TODO 还是不会写滚屏
}

@reduxForm(
  {
    form: 'Chat',
    fields: ['text']
  }, undefined, {
  })
@connect(
  (state) => ({
    userId: state.account.user.id,
    showChatModal: state.shopping.showChatModal,
    chatUsers: state.shopping.chatUsers,
    listUsers: state.shopping.listUsers,
    chatMsgs: state.shopping.chatMsgs,
    chaterId: state.shopping.chaterId
  }),
  (dispatch) => ({
    toggleShoppingChat: () => dispatch(toggleShoppingChat()),
    startChat: () => dispatch(startChat()),
    sendMessage: (text) => dispatch(sendMsg(text)),
    selfMsg: (data) => dispatch(selfMsg(data)),
    clearNewMsg: () => dispatch(clearNewMsg()),
    selectChater: (userId) => dispatch(selectChater(userId))
  })
)
class ChatModal extends React.Component {
  render() {
    const { userId, listUsers, showChatModal, sendMessage, chatUsers, chatMsgs, clearNewMsg, selectChater, chaterId, selfMsg, fields: { text } } = this.props;
    const sendMsg = () => {
      sendMessage(text.value)
      selfMsg({ to: chaterId, text: text.value })
    }
    console.log(chatMsgs)
    return (
      <Modal
        title="消息"
        wrapClassName="vertical-center-modal"
        className={styles.modal}
        visible = {showChatModal}
        onOk={ this.props.toggleShoppingChat }
        onCancel={this.props.toggleShoppingChat}>
        <Row type="flex" justify="start">
          <Col className= {styles.chatUsers}>
            用户列表
            {

              listUsers ? listUsers.map((e, i) => (
                e ? (
                  <div key={e.userId} className={e.newMsg ? styles.newMsg : null}   onClick={selectChater.bind(this, e.userId) }>
                    <span>{e.userName}</span>
                  </div>
                ) : null
              )) : null
            }
          </Col>
          <Col className={styles.chatMain}>
            <Row className={styles.chatDisplay}>
              {
                chaterId ?
                  chatMsgs[chaterId] ?
                    chatMsgs[chaterId].map((e, i) => (
                      <div key={i} className={e.to ? styles.chatItemUser : styles.chatItemOther}>
                        <div>
                          {e.from ? chatUsers[e.from].userName : null}
                        </div>
                        {e.text}
                      </div>
                    ))
                    :
                    <span>用户 {chatUsers[chaterId].userName} 没有信息</span>
                  :
                  <span>请选择用户</span>
              }
            </Row>
            { chaterId ?
              <Row>
                <Input type='textarea' className={styles.chatTextarea} {...text } />
                <Button onClick={sendMsg}>
                  发送
                </Button>
              </Row>
              :
              null
            }
          </Col>
        </Row>
      </Modal>
    )
  }
}

export default ChatModal
