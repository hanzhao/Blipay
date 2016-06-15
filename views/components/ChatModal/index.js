/** 聊天界面 */
import React from 'react';
import ReactDOM from 'react-dom';
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

@reduxForm({
  form: 'Chat',
  fields: ['text']
}, undefined, {

})
@connect(
  (state) => ({
    user: state.account.user,
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
    const { user, listUsers, showChatModal, sendMessage, chatUsers, chatMsgs, clearNewMsg, selectChater, chaterId, selfMsg, resetForm, fields: { text } } = this.props;
    const sendMsg = (e) => {
      sendMessage(text.value)
      selfMsg({ to: chaterId, text: text.value })
      resetForm()
      e.preventDefault()
    }
    if (!user) { return null }
    /** 自动滚动到最新消息 */
    setTimeout(() => {
      const node = ReactDOM.findDOMNode(this.refs.messages)
      if (node && node.scrollHeight) {
        node.scrollTop = node.scrollHeight
      }
    }, 0)
    return (
      <Modal title="消息" footer={null}
             wrapClassName="vertical-center-modal"
             className={styles.modal}
             visible={showChatModal}
             onOk={this.props.toggleShoppingChat}
             onCancel={this.props.toggleShoppingChat}>
        <Row type="flex" justify="start">
          <Col className= {styles.chatUsers}>
            用户列表 {
              listUsers && listUsers.map((e, i) => (
                e && (
                  <div key={e.userId} className={e.newMsg && styles.newMsg}   onClick={selectChater.bind(this, e.userId) }>
                    <span>{e.userName}</span>
                  </div>
                )
              ))
            }
          </Col>
          <Col className={styles.chatMain}>
            <Row className={styles.chatDisplay} ref="messages">
              {
                chaterId ?
                  chatMsgs[chaterId] ?
                    chatMsgs[chaterId].map((e, i) => (
                      <div key={i} className={styles.chatItemOther}>
                        <span>
                          { e.from ? chatUsers[e.from].userName : '我' }
                        </span>
                        <span>：</span>{ e.text }
                      </div>
                    ))
                    :
                    <span>{chatUsers[chaterId].userName}没有信息</span>
                  :
                  <span>请选择用户</span>
              }
            </Row>
            { chaterId && <Row>
                <form onSubmit={sendMsg}>
                  <Col span="20">
                    <Input size="large" className={styles.chatTextarea} {...text } />
                  </Col>
                  <Col span="3" offset="1">
                    <Button htmlType="submit" type="primary">
                      发送
                    </Button>
                  </Col>
                </form>
              </Row>
            }
          </Col>
        </Row>
      </Modal>
    )
  }
}

export default ChatModal
