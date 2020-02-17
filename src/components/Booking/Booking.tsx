import React, { useState, useContext, useEffect } from 'react';
import * as styles from './Booking.module.scss';
import 'firebase/firestore';
import { FirebaseContext } from '../../shared/FirebaseProvider';
import BookingForm from './BookingForm';
import { Col, Row, Calendar, Radio } from 'antd';
import moment from 'moment';

const Booking = () => {
  const firebase = useContext(FirebaseContext);
  const db = firebase.firestore();
  const [isReady, setReady] = useState(false);
  const [isError, setError] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const allSlot = [
    11, 13, 14, 15, 16, 17
  ];
  const [bookedSlot, setBookedSlot] = useState([]);
  const [date, setDate] = useState(moment());
  const [time, setTime] = useState();
  /**
   * Get all booking
   **/
  useEffect(() => {
    db.collection('booking-public').limit(10)
      .get()
      .then(function (querySnapshot) {
        let queriedBookingData = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          const data = doc.data();
          console.log(data.time);
          console.log(data.time.seconds);
          if (data.time && data.time.seconds) {
            queriedBookingData.push(moment(data.time.seconds * 1000));
          }
        });
        console.log(queriedBookingData);
        setBookingData(queriedBookingData);
        setReady(true);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
        setError(true);
      });
  }, []);

  const handleDateSelect = (date) => {
    setDate(date);
    const bookedSlot = [];
    bookingData.forEach(booking => {
      if (booking.isSame(date, 'day')) {
        bookedSlot.push(booking.get('hour'));
      }
    });
    console.log(bookedSlot);
    setBookedSlot(bookedSlot);
  }

  const handleTimeSelect = (e) => {
    if (e.target && e.target.value) {
      setTime(e.target.value);
    } 
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
            <Radio.Group buttonStyle='solid' onChange={handleTimeSelect}>
              {
                allSlot.map(slot => {
                  return (
                    <Col span={12} offset={slot > 13 ? 12 : 0} key={slot}>
                      <Radio.Button disabled={bookedSlot.includes(slot)} value={slot}>
                        {`${slot}.00 ${slot > 12 ? 'PM' : 'AM'}`}
                        <span></span>
                      </Radio.Button>
                    </Col>
                  );
                })
              }
            </Radio.Group>
          </Row>
        </Col>
      </Row>
      <hr className='divider' />
      { date && time && <BookingForm date={date} time={time} /> }      
    </div>
  );
}

export default Booking;
