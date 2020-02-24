import React from "react";
import * as styles from "./FAQ.module.scss";

const FAQ = () => {
  return (
    <div className={styles.container}>
      <div className={styles.qaBlock}>
        <h2>How far in advance should I begin searching for dresses?</h2>
        <p>In order to ensure you are not rushed with your decision-making, 
          we are recommend you to begin dress shopping as soon as possible, 
          ideally 6-8 months in advance of your wedding date. </p>
      </div>

      <div className={styles.qaBlock}>
        <h2>Do I need appointments?</h2>
        <p>Yes, our appointment fittings are by appointment only 
          in order to provide the full intention of our experienced consultants. </p>
      </div>
      <div className={styles.qaBlock}>
        <h2>How long my appointments will be??</h2>
        <p>The appointments will last for 60 minutes. If we run over, 
          we are happily to schedule another appointment with you to 
          make sure you are taken care of. </p>
      </div>
      <div className={styles.qaBlock}>
        <h2>What is the price range of your gowns?</h2>
        <p>Our price range is 1,000 - 2,000 euros. 
          With the majority of gowns range from 1,200 - 1,600 euros.</p>
      </div>
      <div className={styles.qaBlock}>
        <h2>Do I need alteration?</h2>
        <p>We can offer slight altercations such as: short sleeves vs. 
          long sleeves, different neckline, etc. However, it depends on the style itself.</p>
      </div>
      <div className={styles.qaBlock}>
        <h2>What sizes are available to try on at Chérie?</h2>
        <p>Sample sizes range from 36 - 44, but we have creative ways to fit up to size 46-48.  
          If you are size 46 or up, kindly email us at info@cheriebridal.fi beforehand so 
          we could show you the styles that would fit comfortably. Don’t know your size? 
          Please check the size guide here.</p>
      </div>
      <div className={styles.qaBlock}>
        <h2>What does made-to-order mean when ordering my gown?</h2>
        <p>Made-to-order means that there is no stock of your gown and the making of 
          the gown begins once you place your order. The most important thing to note 
          is that made-to-order gowns are ordered to the closest numerical dress size 
          (e.g. 34-64) based on the measurement made at Chérie. The gown is not made 
          to exact measurements (which is referred to as "made-to-measure"). 
          In order to achieve the perfect fit, the bride must seek the assistance 
          of a seamstress or tailor. </p>
      </div>
      <div className={styles.qaBlock}>
        <h2>Do I need to bring anything to my appoinment?</h2>
        <p>We invite you to bring any undergarments (perferably nude) 
          and shoes that you are considering wearing on your wedding day, if applicable. </p>
      </div>
      <div className={styles.qaBlock}>
        <h2>How long will it take for my made-to-order gown to arrive?</h2>
        <p>It would take approximately 4-6 weeks.  </p>
      </div>
      <div className={styles.qaBlock}>
        <h2>Do you offer refunds or cancellations?</h2>
        <p>All sales are final. Once a made-to-order gown or Sample Sale gown is paid for, 
          you are in a contractual agreement to follow through with the gown chosen.  </p>
      </div>
    </div>
  );
}

export default FAQ;
