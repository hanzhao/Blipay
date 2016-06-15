import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Modal, Form, Row, Col, DatePicker, Input, Alert, Button } from 'antd'

import {
  toggleBookModal,
  bookHotel
} from '../../redux/modules/shopping'

import styles from './styles'

const RangePicker = DatePicker.RangePicker

const disabledDate = (current) => (
  current && current.getTime() < Date.now() - 1000
)

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const validate = (values) => {
  const errors = {};
  const { idNumber, realName } = values;
  if (!realName) {
    errors.realName = '请填写单位名';
  }
  if (!idNumber) {
    errors.idNumber = '请填写身份证号码';
  }
  return errors;
};

function getValidate(item) {
  if (!item.touched) {
    return {}
  } else if (!item.error) {
    return {
      validateStatus: 'success'
    }
  } else {
    return {
      validateStatus: 'error',
      help: item.error
    }
  }
}

@connect(
  (state) => ({
    showBookModal: state.shopping.showBookModal,
    t: state.shopping._t_
  }),
  (dispatch) => ({
    toggleModal: () => dispatch(toggleBookModal())
  })
)
@reduxForm({
  form: 'book-hotel',
  fields: ['id', 'uid', 'date', 'idNumber', 'realName'],
  validate
}, (state) => ({
  initialValues: {
    id: state.shopping._t_ && state.shopping._t_.room.id,
    uid: state.shopping._t_ && state.shopping._t_.user.id
  }
}), {
  onSubmit: (data) => bookHotel(data)
})
class ShoppingBookModal extends React.Component {
  render() {
    const { fields: { date, idNumber, realName },
      t, handleSubmit } = this.props
    if (!t) { return <span /> }
    const day = Math.floor((Number(date.value[1]) - Number(date.value[0])) / 86400000)
    return (
      <Modal title="预订酒店"
             visible={this.props.showBookModal}
             onCancel={this.props.toggleModal}
             footer={null}>
        <Alert type="info"
               message={`您正在预订${t.user.realName}的${t.room.name}${day ? `，一共 ${day} 天。` : ''}`} />
        <Form className={styles.form} horizontal onSubmit={handleSubmit}>
          <Form.Item label="入住人真实姓名：" {...formItemLayout} required
            hasFeedback {...getValidate(realName)}>
            <Input placeholder="请输入入住人的真实姓名" {...realName} />
          </Form.Item>
          <Form.Item label="身份证：" {...formItemLayout} required
            hasFeedback {...getValidate(idNumber)}>
            <Input placeholder="请输入身份证号码" {...idNumber} />
          </Form.Item>
          <Form.Item label="入住日期：" {...formItemLayout} required hasFeedback>
            <RangePicker disabledDate={disabledDate} {...date} />
          </Form.Item>
          <div className={styles.buttonContainer}>
            <Button className={styles.buttonSummit} type="primary"
                    htmlType="submit">
              预订
            </Button>
          </div>
        </Form>
      </Modal>
    )
  }
}

export default ShoppingBookModal
