import React, { useContext, useEffect } from 'react';
import * as styles from './Booking.module.scss';
import 'firebase/firestore';
import { FirebaseContext } from '../../shared/FirebaseProvider';
import BookingForm from './BookingForm';
import { Col, Row, Calendar, Radio } from 'antd';
import moment from 'moment';

const Booking = () => {
  const firebase = useContext(FirebaseContext);
  const db = firebase.firestore();

  /**
   * Get all booking
   **/
  useEffect(() => {
    db.collection('booking-public').limit(10)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
        });
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }, []);


  const handleDateSelect = () => {

  }
  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }

  return (
    <div className={styles.container}>
      <h1>
        Booking component
      </h1>
      <Row className='centerAlign' type='flex' justify='center' gutter={40}>
        <Col span={24} md={12} lg={8} className={styles.calendar}>
          <h2>Select date</h2>
          <Calendar fullscreen={false} disabledDate={disabledDate} onSelect={handleDateSelect} />
        </Col>
        <Col span={24} md={12} lg={8} >
          <h2>Select time</h2>
          <Row className={styles.slot} gutter={[10, 10]}>
            <Radio.Group buttonStyle='solid'>
              <Col span={12}>
                <Radio.Button value='11'>11.00 AM</Radio.Button>
              </Col>
              <Col span={12}>
                <Radio.Button value='13'>13.00 PM</Radio.Button>
              </Col>
              <Col span={12} offset={12}>
                <Radio.Button value='14'>14.00 PM</Radio.Button>
              </Col>
              <Col span={12} offset={12}>
                <Radio.Button value='15'>15.00 PM</Radio.Button>
              </Col>
              <Col span={12} offset={12}>
                <Radio.Button value='16'>16.00 PM</Radio.Button>
              </Col>
            </Radio.Group>
          </Row>
        </Col>
      </Row>
      <BookingForm bookingData={"adsf"} timeSlot={"1234"} />
    </div>
  );
}

export default Booking;
