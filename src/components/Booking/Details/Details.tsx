import React, { useState, useContext, useEffect } from "react";
import 'firebase/firestore';
import { FirebaseContext } from '../../../shared/FirebaseProvider';
import * as styles from "./Details.module.scss";
import { Row, Col, Icon, Descriptions, Spin } from 'antd';
import moment from 'moment';

const Details = ({ location, bookingId }) => {
  const firebase = useContext(FirebaseContext);
  const db = firebase.firestore();
  const [booking, setBooking] = useState({});
  const [isError, setError] = useState('');
  const [isReady, setReady] = useState(false);
  const [isEmailSending, setEmailSending] = useState(true);
  const [isEmailSuccess, setEmailSuccess] = useState(false);
  /**
   * Get booking detail
   **/
  useEffect(() => {
    if (bookingId) {
      const docRef = db.collection('booking').doc(bookingId);

      docRef.get()
        .then(function (doc) {
          if (doc.exists) {
            console.log(doc.data());
            const bookingObj = doc.data();
            bookingObj.bookTime = moment(bookingObj.bookTime.seconds * 1000);
            setBooking(bookingObj);
            setReady(true);
            const emailPayload = {
              email: bookingObj.email,
              subject: 'Thanks! Your booking is confirmed at Chérie',
              name: bookingObj.name,
              phone: bookingObj.phone,
              bookTime: bookingObj.bookTime,
              budget: bookingObj.budget ? bookingObj.budget : 'N/A',
              note: bookingObj.note ? bookingObj.note : 'N/A',
              bookingId: bookingId,
              domain: location.origin
            }
            if (!bookingObj.emailSent) {
              sendEmail(emailPayload).then((response) => {
                console.log('Details - email sent', response);
                setEmailSending(false);
                if (!response.ok) {
                  setEmailSuccess(false);
                  return
                }
                // set in db, emailSent = true
                docRef.update({
                  emailSent: true
                });
                setEmailSuccess(true);
              });
            } else {
              setEmailSending(false);
              setEmailSuccess(true);
            }
          } else {
            console.log("No such document!");
            setError('Invalid Booking ID.');
          }
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error);
          setError('Failed to retrieve booking details.');
        });
      setEmailSending(false);
    }
  }, []);

  const sendEmail = (booking) => {
    return fetch("/.netlify/functions/confirmationEmail", {
      method: "POST",
      body: JSON.stringify(booking),
    });
  }

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
            {!isEmailSending && isEmailSuccess ?
              (
                <h2>An email confirmation was sent to&nbsp;&nbsp;<b>{booking.email}</b></h2>
              ) : (
                <p>We had trouble sending comfirmation email to&nbsp;&nbsp;<b>{booking.email}</b></p>
              )}
            {isEmailSending && (
              <p>Sending email...</p>
            )}

            <hr className='divider' />
            <div className={`${styles.details} leftAlign`}>
              <Descriptions
                title="Your booking detail" layout="horizontal" column={1}>
                <Descriptions.Item label="Time">
                  {booking.bookTime.format("dddd, MMMM Do YYYY, h:mm:ss a")}
                </Descriptions.Item>
                <Descriptions.Item label="Name">{booking.name}</Descriptions.Item>
                <Descriptions.Item label="Email">{booking.email}</Descriptions.Item>
                <Descriptions.Item label="Phone">{booking.phone}</Descriptions.Item>
                <Descriptions.Item label="Note">{booking.note}</Descriptions.Item>
                <Descriptions.Item label="Booking ID">{bookingId}</Descriptions.Item>
              </Descriptions>
            </div>
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
