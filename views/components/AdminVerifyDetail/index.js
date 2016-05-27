/*
 * 用户验证的细节
*/
import React from 'react';
import { Link } from 'react-router';
import photo from './2233.png';
import { Input, Button, Row,Col, Table,Popconfirm,message,Form,Modal} from 'antd';
import styles from './styles';

function confirm() {
  message.success('点击了确定');
}

function cancel() {
  message.error('点击了取消');

}

const Reject = React.createClass({
  getInitialState() {
    return {
      loading: false,
      visible: false,
    };
  },
  showModal() {
    this.setState({
      visible: true,
    });
  },
  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  },
  handleCancel() {
    this.setState({ visible: false });
  },
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          拒绝
        </Button>
        <Modal ref="modal"
          visible={this.state.visible}
          title="拒绝验证" onOk={this.handleOk} onCancel={this.handleCancel}

          footer={[
            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
              提 交
            </Button>,
          ]}>

          <Input placeholder="请输入拒绝理由" />

        </Modal>
      </div>
    );
  },
});

const modalconfirm = Modal.confirm;
function showConfirm_accept() {
  modalconfirm({
    title: '确定通过该用户的实名验证吗？',

    onOk() {
      console.log('确定');
    },
    onCancel() {},
  });
}

const columns1 = [{
  title: '用户名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '用户ID',
  dataIndex: 'id',
  key: 'id',
},{
  title: '用户真实姓名',
  dataIndex: 'realname',
  key: 'realname'
}
];

const columns2 = [{
  title:'身份证正面',
  dataIndex:'identification_front',
  key:'identification_front'
  /*,  render(text, record) {
      return (
        <img alt="example" width="10%" src="photo" />
      )
    }
    */
},{
  title:'身份证反面',
  dataIndex:'identification_back',
  key:'identification_back'
  /*,  render(text, record) {
      return (
        <img alt="example" width="10%" src="photo" />
      )
    }*/
}
];

const columns3 = [{
  title:'其他验证信息',
  dataIndex:'information',
  key:'information'
}
];

const data1 = [{
  key: '1',
  name: 'Shirley',
  id: '3130100668',
  realname: '陈雪儿'
}];

const data2 = [{
  key: '1',
  identification_front:'身份证正面',
  identification_back:'身份证反面',

}];

const data3 = [{
  key: '1',
  information:'浙江大学2013级学生'
}];

const datanull=null;

class AdminVerifyDetail extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Table
               className={styles.table}
               columns={columns1}
               dataSource={data1}
               pagination={false} //需要有{}
        />
        <Table
               className={styles.table}
               columns={columns2}

               pagination={false} //需要有{}
        >
        <div>
          <Row className={styles.juzhong} /*styles={{text-align:"center"}}*/>
            <Col span={12}>
              <img alt="example" width="10%" src="photo" />
            </Col>
            <Col span={12}>
              <img alt="example" width="10%" src="photo" />
            </Col>
          </Row>
        </div>


        </Table>

        <Table
               className={styles.table2}
               columns={columns3}
               dataSource={data3}
               pagination={false}
        />

        <div>
          <Row className={styles.juzhong} /*styles={{text-align:"center"}}*/>
            <Col span={8}>
              <Button onClick={showConfirm_accept}>通过</Button>
            </Col>
            <Col span={8}>
                <Reject />
            </Col>
            <Col span={8}><Button><Link to="/admin/account/verification">返回</Link></Button></Col>
          </Row>
        </div>

      </div>
    );
  }
}

export default AdminVerifyDetail;

//待商榷：点击通过之后可否再点拒绝
//说明：点击一次通过或拒绝之后，该条用户验证从用户验证列表中消失
//待完成：调节页面高度，插入身份证正反面图片，onclick改用redux实现
