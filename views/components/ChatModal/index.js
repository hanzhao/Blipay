import React from 'react';
import { connect } from 'react-redux';
import { Modal, Input } from 'antd';
import { reduxForm, addArrayValue } from 'redux-form';

import io from 'socket.io-client';
import {
  toggleShoppingChat,
  startChat,
  sendMsg
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
    chatMsgs: state.shopping.chatMsgs
  }),
  (dispatch) => ({
    toggleShoppingChat: () => dispatch(toggleShoppingChat()),
    startChat: () => dispatch(startChat()),
    sendMessage: (userId, text) => dispatch(sendMsg(userId, text))
  })
)
class ChatModal extends React.Component {
  render() {
    const { showChatModal, sendMessage, chatUsers, chatMsgs, fields: { text } } = this.props;
    const sendMsg = () => {
      console.log(text.value)
      sendMessage(1, text.value)
    }
    console.log(chatMsgs)
    return (
      <Modal
        visible = {showChatModal}
        onOk={ sendMsg }
        onCancel={this.props.toggleShoppingChat}>
        <div>
          Users
          {

            chatUsers ? chatUsers.map((e, i) => (
              e ? (
                <div key={e.userId}>
                  {e.userName}
                </div>
              ) : null
            )) : null
          }
        </div>
        <div>
          Messgaes
          {
            chatMsgs ? chatMsgs.map((e, i) => (
              <div>{
                e ? e.map((ee, ii) => (
                  <span>
                    {ee}
                  </span>
                )) : null
              }
              </div>
            )) : null
          }
        </div>
        <div>
          <Input type='textarea' {...text } />
        </div>
      </Modal>
    )
  }
}

export default ChatModal
