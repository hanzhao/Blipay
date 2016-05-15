import React from 'react';
import Container from '../Container';
import ShoppingMenu from '../ShoppingMenu';
import { Form, Input, Row, Col, Button,  InputNumber,DatePicker } from 'antd';
import { Upload, Icon, Modal } from 'antd';
const FormItem = Form.Item;

class ShoppingItemAdd extends React.Component {
  render() {
    return(
   	<div>
   	 <Form horizontal form={this.props.form}>
   	<Row type="flex" justify="start">
   		<Col span={12}>
   			<FormItem
   		 	label="商品名称："
   		  	labelCol={{ span: 10 }}
   		  	wrapperCol={{ span: 14 }}>
   		  	<Input placeholder="请输入商品名称" />
   			</FormItem>
      	</Col>
     </Row>
   	<Row type="flex" justify="start">
   		<Col span={12}>
   			<FormItem
   		 	label="商品价格："
   		  	labelCol={{ span: 10 }}
   		  	wrapperCol={{ span: 14 }}>
   		  	<Input placeholder="请输入商品价格" />
   			</FormItem>
      	</Col>
     </Row>
     <Row type="flex" justify="start">
   		<Col span={12}>
   			<FormItem
   		 	label="商品库存："
   		  	labelCol={{ span: 10 }}
   		  	wrapperCol={{ span: 14 }}>
   		  	<InputNumber min={1} />
   			</FormItem>
      	</Col>
     </Row>
     <Row type="flex" justify="start">
   		<Col span={12}>
   			<FormItem
   		 	label="商品介绍："
   		  	labelCol={{ span: 10 }}
   		  	wrapperCol={{ span: 14 }}>
   		  	<Input type="textarea" placeholder="请输入商品介绍" id="textarea" name="textarea" />
   			</FormItem>
      	</Col>
     </Row>

       <Row type="flex" justify="start">
   			<Col span={12}>
      		</Col>
       </Row>

       	<Row type="flex" justify="start">
   		<Col span={12}>
   			<Upload className="upload-list-inline">
      		<Button type="ghost">
        	<Icon type="upload" /> 点击上传
      		</Button>
      		</Upload>
        </Col>
       	</Row>

       	<Row type="flex" justify="start">
   			<Col span={12}>
       		<FormItem wrapperCol={{ span: 12, offset: 7 }}>
          	<Button type="primary">确定</Button>
          	<Button type="ghost"  >重置</Button>
        	</FormItem>
        	</Col>
       	</Row>
       

      </Form>
  	</div>
    )
  }
}

export default ShoppingItemAdd;