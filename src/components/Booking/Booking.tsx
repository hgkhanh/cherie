import React, { useState, useContext, useEffect } from 'react';
import * as styles from './Booking.module.scss';
import 'firebase/firestore';
import { Link } from "gatsby";
import { FirebaseContext } from '../../shared/FirebaseProvider';
import BookingForm from './BookingForm';
import { Col, Row, Calendar, Radio } from 'antd';
import moment from 'moment';

const Booking = () => {
  const firebase = useContext(FirebaseContext);
  const db = firebase.firestore();
  const [bookingData, setBookingData] = useState([]);
  const allSlot = [
    12, 13, 14, 15, 16, 17, 18
  ];
  const allSlotSaturday = [
    12, 13, 14, 15, 16
  ];
  const [bookedSlot, setBookedSlot] = useState([]);
  const [date, setDate] = useState(moment());
  const [bookTime, setBookTime] = useState();
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
          if (data.bookTime && data.bookTime.seconds) {
            queriedBookingData.push(moment(data.bookTime.seconds * 1000));
          }
        });
        setBookingData(queriedBookingData);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
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
    // console.log(bookedSlot);
    setBookedSlot(bookedSlot);
  }

  const handleTimeSelect = (e) => {
    if (e.target && e.target.value) {
      setBookTime(e.target.value);
    }
  }

  const year = moment().get('year');
  const isBeforeOpening = (date) => {
    return date.isBefore('2020-03-04', 'day');
  }
  const holiday = [
    year + "-01-01",
    year + "-01-06",
    year + "-04-10",
    year + "-04-12",
    year + "-04-13",
    year + "-05-01",
    year + "-05-21",
    year + "-05-31",
    year + "-06-19",
    year + "-06-20",
    year + "-10-31",
    year + "-12-06",
    year + "-12-24",
    year + "-12-25",
    year + "-12-26",
  ];

  const offDays = [
    year + "-07-24",
    year + "-07-25",
    year + "-07-26",
    year + "-07-27",
  ];

  const isOffDay = (date) => {
    const listOfDays = holiday.concat(offDays);
    return listOfDays.some(day => {
      return date.isSame(moment(day), 'day');
    });
  }

  // Off sunday, monday, offDays, holiday, before opening day
  const disabledDate = (current) => {
    return current && current < moment().endOf('day')
      || current.weekday() === 0 // Sunday off
      || current.weekday() === 1 // Monday off
      || isOffDay(current)
      || isBeforeOpening(current);
  }

  return (
    <div className={styles.container}>
      <h2 className="uppercase">Let's make our first date!</h2>
      <div className={styles.form}>
        <h3 className="noBtmMargin">
          Pick a date and time
            </h3>
        <span>
          Duration: 60 mins <br />
          Location: Sepankatu 15, 00150, Helsinki (<a href="//goo.gl/maps/sGsqDJexpQtTDLQA8" target="_blank" rel="noopener">
            <span className="link">Map</span>
          </a>)
        </span>
        <div className={styles.timeSelectContainer}>
          <div className={styles.calendar}>
            <h3>Select date</h3>
            <Calendar fullscreen={false} disabledDate={disabledDate} onSelect={handleDateSelect} />
          </div>
          <div>
            <h3>Select time</h3>
            <Row className={styles.slot} gutter={[10, 10]}>
              <Radio.Group buttonStyle='solid' onChange={handleTimeSelect}>
                {
                  date.weekday() === 6 ?
                    (
                      allSlotSaturday.map(slot => {
                        return (
                          <Col span={12} key={slot}>
                            <Radio.Button disabled={bookedSlot.includes(slot)} value={slot}>
                              {`${slot}.00`}
                              <span></span>
                            </Radio.Button>
                          </Col>
                        )
                      })
                    ) :
                    (
                      allSlot.map(slot => {
                        return (
                          <Col span={12} key={slot}>
                            <Radio.Button disabled={bookedSlot.includes(slot)} value={slot}>
                              {`${slot}.00`}
                              <span></span>
                            </Radio.Button>
                          </Col>
                        );
                      })
                    )
                }
              </Radio.Group>
            </Row>
          </div>
        </div>
        <hr className='divider' />
        {date && bookTime && <BookingForm date={date} bookTime={bookTime} />}
      </div>
    </div>
  );
}

export default Booking;
