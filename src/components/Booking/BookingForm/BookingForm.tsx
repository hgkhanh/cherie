import React, { useContext, useEffect } from 'react';
import { navigate } from 'gatsby';
import * as styles from './BookingForm.module.scss';
import 'firebase/firestore';
import { FirebaseContext } from '../../../shared/FirebaseProvider';
import { Form, Col, Row, Input, Button, DatePicker } from 'antd';

const BookingForm = ({ form, date, bookTime }) => {
  const firebase = useContext(FirebaseContext);
  const db = firebase.firestore();
  const { getFieldDecorator, setFieldsValue } = form;
  const { TextArea } = Input;
  // Set time field when user selected a time slot

  useEffect(() => {
    const timeObject = date.set({ 'hour': bookTime, 'minute': 0, 'second': 0 });
    setFieldsValue({
      bookTime: timeObject
    });
  }, [date, bookTime]);

  const handleSubmit = (event) => {
    console.log('Submit');
    event.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        values.bookTime = values.bookTime.toDate();
        values.createTime = new Date();
        // add emailSent field, indicate wheter confirmation email has been sent to user or not
        values.emailSent = false;
        // Form valid, create Booking in Firebase
        const publicBookingRef = db.collection('booking-public');
        const detailBookingRef = db.collection('booking');


        console.log('Create');
        console.log(values);
        // Create a detailed entry in 'booking' collection
        const detailBooking = detailBookingRef.add(
          { ...values }
        )
        // Create an simple entry with only Time data in 'booking-public' collection
        const publicBooking = publicBookingRef.add(
          {
            bookTime: values.bookTime
          }
        )

        Promise.all([detailBooking, publicBooking])
          .then(function (result) {
            const success = result.every(response => {
              return response.id
            });
            if (success) {
              console.error("Booking success: ", result);
              navigate('/booking/details/' + result[0].id);
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
        <Col span={24} lg={{ span: 12, offset: 6 }} >
          <Form.Item label='bookTime' required style={{ display: 'none' }}>
            {getFieldDecorator('bookTime')
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
            {getFieldDecorator('budget', { initialValue: ''})
              (<Input prefix='€' suffix='EUR' type='number'/>)}
          </Form.Item>
          <Form.Item label='Note'>
            {getFieldDecorator('note', { initialValue: ''})
              (<TextArea autoSize={{ minRows: 3 }} />)}
          </Form.Item>
        </Col>
        <Col span={24} sm={{ push: 0 }} md={{ push: 4 }} lg={{ span: 12, offset: 4 }} className='rightAlign' >
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
