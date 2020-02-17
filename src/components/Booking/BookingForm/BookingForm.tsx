import React, { useContext, useEffect } from 'react';
import * as styles from './BookingForm.module.scss';
import 'firebase/firestore';
import { FirebaseContext } from '../../../shared/FirebaseProvider';
import { Form, Col, Row, Input, Button, DatePicker } from 'antd';

const BookingForm = (props) => {
  const firebase = useContext(FirebaseContext);
  const db = firebase.firestore();
  const { form, bookingData } = props;
  const { getFieldDecorator } = form;
  const { TextArea } = Input;

  const handleSubmit = (event) => {
    console.log('Submit');
    event.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  const formItemLayout = {
    labelCol: {
      sm: { span: 24 },
      md: { span: 4 }
    },
    wrapperCol: {
      sm: { span: 24 },
      md: { span: 20 }
    },
    colon: false,
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Row className={styles.slot} gutter={[10, 10]}>
        <Col span={24} lg={{ span: 16, offset: 4}} >
          <Form.Item label='Time' required>
            {getFieldDecorator('time')
              (<DatePicker showTime placeholder="Select Time" />)}
          </Form.Item>
          <Form.Item label='Name' required>
            {getFieldDecorator('name')
              (<Input />)}
          </Form.Item>
          <Form.Item label='E-mail' required>
            {getFieldDecorator('email')
              (<Input type='email' />)}
          </Form.Item>
          <Form.Item label='Phone' required>
            {getFieldDecorator('phone')
              (<Input />)}
          </Form.Item>
          <Form.Item label='Budget'>
            {getFieldDecorator('budget')
              (<Input prefix='€' suffix='EUR' type='number' />)}
          </Form.Item>
          <Form.Item label='Note'>
            {getFieldDecorator('note')
              (<TextArea autoSize={{ minRows: 3 }} />)}
          </Form.Item>
        </Col>
        <Col span={24} lg={{ span: 16, offset: 4}} className='rightAlign' push={4}>
          <Form.Item >
            <Button type="primary" htmlType="submit">
              Book
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
const WrappedBookingForm = Form.create({ name: 'dressing' })(BookingForm);

export default WrappedBookingForm;
