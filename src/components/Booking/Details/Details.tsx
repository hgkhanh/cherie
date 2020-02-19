import React, { useState, useContext, useEffect } from "react";
import 'firebase/firestore';
import { FirebaseContext } from '../../../shared/FirebaseProvider';
import * as styles from "./Details.module.scss";
import { Row, Col, Icon, Descriptions, Spin } from 'antd';
import moment from 'moment';

const Details = ({ bookingId }) => {
  const firebase = useContext(FirebaseContext);
  const db = firebase.firestore();
  const [booking, setBooking] = useState({});
  const [isError, setError] = useState('');
  const [isReady, setReady] = useState(false);
  /**
   * Get booking detail
   **/
  useEffect(() => {
    if (bookingId) {
      db.collection('booking').doc(bookingId)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log(doc.data());
            const bookingObj = doc.data();
            bookingObj.bookTime = moment(bookingObj.bookTime.seconds * 1000);
            setBooking(bookingObj);
            setReady(true);
          } else {
            console.log("No such document!");
            setError('Invalid Booking ID.');
          }
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error);
          setError('Failed to retrieve booking details.');
        });
    }
  }, []);

  return (
    <div className={`${styles.container} serif`}>
      {isError === '' && isReady &&
        (
          <React.Fragment>
            <h1>
              Your booking is confirmed&nbsp;&nbsp;
                <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
            </h1>
            <h2>Booking id: &nbsp;&nbsp;{bookingId}</h2>
            <p>An email confirmation was sent to <b>{booking.email}</b> </p>
            <Descriptions
              title="Your booking detail" layout="horizontal" size="smal">
              <Descriptions.Item span={3} label="Time">
                {booking.bookTime.format("dddd, MMMM Do YYYY, h:mm:ss a")}
              </Descriptions.Item>
              <Descriptions.Item span={3} label="Name">{booking.name}</Descriptions.Item>
              <Descriptions.Item span={3} label="Phone">{booking.phone}</Descriptions.Item>
              <Descriptions.Item span={3} label="Note">{booking.note}</Descriptions.Item>
            </Descriptions>
          </React.Fragment>
        )}
        { isError.length > 0 && !isReady && (
          <h1>
            Something wrong&nbsp;&nbsp;
                <Icon type="close-circle" theme="twoTone" twoToneColor="#a8071a" />
          </h1>
        )}
        { isError === '' && !isReady && (<Spin/>) }

        
    </div >
  );
}

export default Details;
