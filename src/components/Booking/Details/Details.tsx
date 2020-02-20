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
    <div className={styles.container}>
      {isError === '' && isReady &&
        (
          <React.Fragment>
            <h1>
              Your booking is confirmed&nbsp;&nbsp;
              <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
            </h1>
            <hr className='divider' />
            <h2>Booking id: &nbsp;&nbsp;{bookingId}</h2>
            <p>An email confirmation was sent to&nbsp;&nbsp;<b>{booking.email}</b> </p>
            <hr className='divider' />
            <Descriptions
              title="Your booking detail" layout="horizontal" column={1}>
              <Descriptions.Item label="Time">
                {booking.bookTime.format("dddd, MMMM Do YYYY, h:mm:ss a")}
              </Descriptions.Item>
              <Descriptions.Item label="Name">{booking.name}</Descriptions.Item>
              <Descriptions.Item label="Phone">{booking.phone}</Descriptions.Item>
              <Descriptions.Item label="Note">{booking.note}</Descriptions.Item>
            </Descriptions>
          </React.Fragment>
        )}
      {isError.length > 0 && !isReady && (
        <React.Fragment>
          <h1>
            Something wrong&nbsp;&nbsp;
                  <Icon type="close-circle" theme="twoTone" twoToneColor="#a8071a" />
          </h1>
          <p>Error retrieving booking details.</p>
        </React.Fragment>
      )}
      {isError === '' && !isReady && (<Spin />)}


    </div >
  );
}

export default Details;
