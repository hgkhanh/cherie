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
    10, 14, 11, 15, 12, 16, 17
  ];
  const allSlotSaturday = [
    10, 14, 11, 12
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
  const isHoliday = (date) => {
    return holiday.some(holiday => {
      return date.isSame(moment(holiday), 'day');
    });
  }

  const disabledDate = (current) => {
    return current && current < moment().endOf('day')
      || current.weekday() === 0 || isHoliday(current)
      || isBeforeOpening(current);
  }

  return (
    <div className={styles.container}>
      <h1 className="uppercase">Let's make our first date!</h1>
      {/* <h3 className="uppercase">We kindly ask that you read the information<br />
            below before booking an appointment with us</h3>
      <br />
      <ul className={styles.bullet}>
        <li>
          Our gowns are all made-to-order. These would take 4-6 weeks to be
          ready, so the “sweet spot” is to purchase 3-4 months before your
          wedding, especially if it requires alteration. In case of rush
          order, there will be a rushing fee of 150 euros.
            </li>
        <li>
          Our price range is 1,000 - 2,000 euros. With the majority of
          gowns range from 1,200 - 1,600 euros.
            </li>
        <li>
          Sample sizes range from 36 - 44, but we have creative ways to fit
          up to size 46-48. If you are size 46 or up, kindly email us at
              <b>&nbsp;&nbsp;info@cheriebridal.fi&nbsp;</b>
              beforehand so we could show you the styles that would fit
              comfortably. Don’t know your size? Please check the size guide
              <Link to="/size-guide" >
            <span className="link">&nbsp;here&nbsp;</span>
          </Link>.
            </li>
        <li>
          We highly recommend that you read our
              <Link to="/faq" >
            <span className="link">&nbsp;FAQ&nbsp;</span>
          </Link>
              before booking an appointment.
            </li>
      </ul> */}
      <div className={styles.form}>
        <h1 className="noBtmMargin">
          Pick a date and time
            </h1>
        <h3>
          Duration: 60 mins <br />
          Location: Sepankatu 15, 00150, Helsinki (<a href="//goo.gl/maps/sGsqDJexpQtTDLQA8" target="_blank" rel="noopener">
            <span className="link">Map</span>
          </a>)
        </h3>
        <div className={styles.timeSelectContainer}>
          <div className={styles.calendar}>
            <h2>Select date</h2>
            <Calendar fullscreen={false} disabledDate={disabledDate} onSelect={handleDateSelect} />
          </div>
          <div>
            <h2>Select time</h2>
            <Row className={styles.slot} gutter={[10, 10]}>
              <Radio.Group buttonStyle='solid' onChange={handleTimeSelect}>
                {
                  date.weekday() === 6 ?
                    (
                      allSlotSaturday.map(slot => {
                        return (
                          <Col span={12} offset={slot === 12 ? 12 : 0} pull={slot === 12 ? 12 : 0} key={slot}>
                            <Radio.Button disabled={bookedSlot.includes(slot)} value={slot}>
                              {`${slot}.00 ${slot > 11 ? 'PM' : 'AM'}`}
                              <span></span>
                            </Radio.Button>
                          </Col>
                        )
                      })
                    ) :
                    (
                      allSlot.map(slot => {
                        return (
                          <Col span={12} offset={slot > 16 ? 12 : 0} key={slot}>
                            <Radio.Button disabled={bookedSlot.includes(slot)} value={slot}>
                              {`${slot}.00 ${slot > 11 ? 'PM' : 'AM'}`}
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
