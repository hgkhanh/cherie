import React from "react";
import * as styles from "./Result.module.scss";
import { Row, Col, Icon } from 'antd';

const Result = () => {
  return (
    <div className={styles.container}>
      <Row className='centerAlign' type='flex' justify='center' gutter={40}>
        <Col span={24} lg={16}>
          <h1>
            Your booking is confirmed&nbsp;&nbsp;
            <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
          </h1>
          <p>An email confirmation was sent to ...</p>
          <h2>Your booking detail</h2>
          <h3>Time:</h3>
          <p>Fri, February, 25, 2020, 11:00 AM - 12:00 PM ...</p>
          <h3>Name:</h3>
          <p>Jane Doe</p>
          <h3>Phone:</h3>
          <p>012 453 1273</p>
          <h3>Email:</h3>
          <p>jane.doe@test.com</p>
        </Col>
      </Row>
    </div>
  );
}

export default Result;
