import React from "react";
import * as styles from "./About.module.scss";
import { Row, Col } from 'antd';

const About = () => {
  return (
    <div className={styles.container}>
      <Row className='centerAlign' type='flex' justify='center' gutter={40}>
        <Col span={18} lg={12}>
          <div className={styles.quote}>
            <blockquote>
              Love alters not with his brief hours and weeks.<br />
              But bears it out even to the edge of doom.
            <cite>Shakespeare</cite>
            </blockquote>
          </div>
          <hr className='divider' />
          <p>
            The celebration of love is not a fleeting moment,
            a sign of ephemerality but one that lasts for an eternity.
            And perhaps that is the true connotation of weddings,<br />
            to mark the most significant threshold of one’s life in the name of love.
          </p>
          <p>
            Inspired by modern beauty with a nostalgic soul that forever longs for the past, <br />
            allured by romance and passion,the idea of a small bridal boutique was conceived
            at the heart of Helsinki like a long lost dream.
          </p>
          <p>
            With the goal of creating a once-in-a-lifetime experience for our customers,
            the name ‘Cherie‘ came to mind, along with its true meaning of ‘sweetheart’
            in French and its homophone ‘cherry’, <br />a constant reminder of sweetness.
          </p>
          <p>
            Representing the brand under such beliefs and ideas,
            at Cherie Bridal where the provision of excellent customer service is the top priority,
            every bride who comes to us is and will always be our ‘sweetheart’.
          </p>
          <p>
            In today’s market where wedding planning has become a process of relentless waiting and extravagance,
            Cherie Bridal promises you the most enjoyable experience of finding your true match of a wedding dress,
            sincerely tailor-made to your preference and identity,<br />
            with customisation time frame under three months at competitive prices.
          </p>
          <p>
            As we have the honour of temporarily accompanying you on your journey,
            with the right wedding dress, the portrait of a contemporary Juliet can be seen in every bride,
            but this time with a happy ending:
          </p>
          <div className={styles.quote}>
            <blockquote>
              Did my heart love till now? Forswear it, sight!<br />
              For I ne'er saw true beauty till this night
            <cite>Shakespeare</cite>
            </blockquote>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default About;
