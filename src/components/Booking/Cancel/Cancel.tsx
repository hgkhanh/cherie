import React, { useState, useContext, useEffect } from "react";
import 'firebase/firestore';
import { FirebaseContext } from '../../../shared/FirebaseProvider';
import * as styles from "./Cancel.module.scss";
import { Row, Col, Icon, Descriptions, Spin, Button, message, Result } from 'antd';
import moment from 'moment';

const Cancel = ({ location, bookingId }) => {
  const firebase = useContext(FirebaseContext);
  const db = firebase.firestore();
  const [booking, setBooking] = useState({});
  const [isError, setError] = useState('');
  const [isReady, setReady] = useState(false);
  const [isCancelSending, setCancelSending] = useState(false);
  const [isCancelSuccess, setCancelSuccess] = useState(false);
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

  const handleClick = () => {
    setCancelSending(true);
    // send email
    const emailPayload = {
      subject: 'Please cancel my booking',
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      bookTime: booking.bookTime.format("dddd, MMMM Do YYYY, h:mm:ss a"),
      bookingId: bookingId,
      domain: location.origin
    }
    sendEmail(emailPayload)
      .then((response) => {
        // show result
        console.log('Cancel - email sent', response);
        setCancelSending(false);
        if (!response.ok) {
          message.error('Failed to cancel the booking');
          return
        }
      })
      .catch(function (error) {
        console.log('Cancel - Error sending email: ', error);
        setCancelSending(false);
      });
  }

  const sendEmail = (booking) => {
    return fetch("/.netlify/functions/cancelationEmail", {
      method: "POST",
      body: JSON.stringify(booking),
    });
  }

  return (
    <div className={styles.container}>
      {!isCancelSuccess && isError === '' && isReady &&
        (
          <React.Fragment>
            <h1>
              Are you sure you want to cancel your booking &nbsp;&nbsp;
              <Icon type="question-circle" theme="twoTone" twoToneColor="#C79479" />
            </h1>
            <hr className='divider' />
            <Row className={`${styles.details} leftAlign`}>
              <Col span={24} lg={{ span: 12, offset: 6 }} >
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
              </Col>
            </Row>
            <hr className='divider' />
            <Button type="danger" htmlType="submit" onClick={handleClick} disabled={isCancelSending}>Cancel booking</Button>
            {isCancelSending && (<Spin />)}
          </React.Fragment>
        )}
      {!isCancelSuccess && isError.length > 0 && !isReady && (
        <React.Fragment>
          <h1>
            Something wrong&nbsp;&nbsp;
                  <Icon type="close-circle" theme="twoTone" twoToneColor="#a8071a" />
          </h1>
          <p>Error retrieving booking details.</p>
        </React.Fragment>
      )}

      {isCancelSuccess && (
        <Result
          status="success"
          title="Successfully cancel your booking!"
          subTitle={`Booking slot: ${booking.bookTime}. Go back to booking if you want to create another booking.`}
          extra={[
            <Button type="primary" key="console" onClick={() => {
              navigate('/booking');
            }}>
              Go to Booking
            </Button>
          ]}
        />
      )}

    </div >
  );
}

export default Cancel;
