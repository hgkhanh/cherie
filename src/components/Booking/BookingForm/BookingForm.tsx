import React, { useContext, useEffect } from 'react';
import * as styles from './BookingForm.module.scss';
import 'firebase/firestore';
import { FirebaseContext } from '../../../shared/FirebaseProvider';
import { Form, Col, Row, Input, Button, DatePicker } from 'antd';
import moment from 'moment';

const BookingForm = ({ form, date, time }) => {
  const firebase = useContext(FirebaseContext);
  const db = firebase.firestore();
  const { getFieldDecorator, setFieldsValue } = form;
  const { TextArea } = Input;

  // Set time field when user selected a time slot

  useEffect(() => {
    const timeObject = date.set({ 'hour': time, 'minute': 0, 'second': 0 });
    setFieldsValue({
      time: timeObject
    });
  }, [date, time]);

  const handleSubmit = (event) => {
    console.log('Submit');
    event.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        values.time = values.time.toDate();
        // Form valid, create Booking in Firebase
        const publicBookingRef = db.collection('booking-public');
        const detailBookingRef = db.collection('booking');

        // Create a detailed entry in 'booking' collection
        const detailBooking = detailBookingRef.add(
          { ...values }
        )
        // Create an simple entry with only Time data in 'booking-public' collection
        const publicBooking = publicBookingRef.add(
          {
            time: values.time
          }
        )

        Promise.all([detailBooking, publicBooking])
          .then(function (result) {
            const success = result.every(response => {
              return response.id
            });
            if (success) {
              console.error("Booking success: ", result);
            }
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
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
      <Row className={styles.container} gutter={[10, 10]}>
        <Col span={24} lg={{ span: 16, offset: 4 }} >
          <Form.Item label='Time' required style={{ display: 'none' }}>
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
        <Col span={24} lg={{ span: 16, offset: 4 }} className='rightAlign' push={4}>
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
