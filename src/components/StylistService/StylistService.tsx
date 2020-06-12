import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Icon, Collapse } from 'antd';
import styles from './StylistService.module.scss';
import Hero from '../Hero';



const StylistService = () => {
  const data = useStaticQuery(graphql`
    query {
      banner1wide: file(name: {eq: "Contact-Banner-01"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }
    }
  `);

  const { Panel } = Collapse;

  return (
    <div>
      <div className={styles.checkList}>
        <h2 className='uppercase centerAlign'>What's in the package</h2>
        <div className={styles.item}>
          <div className={styles.icon}>
            <Icon type='check' style={{ fontSize: '20px' }} />
          </div>
          <div>
            <span>Our finest style suggestions</span>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <Icon type='check' style={{ fontSize: '20px' }} />
          </div>
          <div>
            <span>Personal bridal consultation</span>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <Icon type='check' style={{ fontSize: '20px' }} />
          </div>
          <div>
            <span>Tips and tricks</span>
          </div>
        </div>
      </div>
      <div style={{ height: 400 }}>
        <Hero overlay={true} hasScroll={false} isParallax={false}
          imageWide={data.banner1wide} mobileFullHeight={false}>
        </Hero>
      </div>
      <div className='grid'>
        <Collapse defaultActiveKey={['1']}>
          <Panel header='What is stylist picks?' key='1'>
            <p>The ‘Stylist picks’ is the collection of wedding dress chosen by our dedicated stylists.
            Based on your given information, our stylists will carefully pick the silhouettes,
            styles and details that match with your type of venue and the vibes you want to create.
            It aims to help our brides narrow their choices and find the dress that they want.
              The service is complety free-of-charge.</p>
          </Panel>
          <Panel header='Do I need to make an appointment?' key='2'>
            <p>Most of our work can be done via emails (stylist picks, bridal consultation) 
              so don’t worry if you can’t come to our physical store. If you’d like to visit us, 
              we are currently open by appointment only. Please reach out to us by calling 050 511 6776 
              or send us a message on Facebook or Instagram, or book via our website.</p>
          </Panel>
          <Panel header='How much a custom dress costs?' key='3'>
            <p>Our price is competitive, starting from 690 euros. Depend on the chosen styles and fabrics, 
              the price would be higher. We work directly with the dressmaker to prevent any unnecessary 
              add-on costs, thus, make our price cheaper but still keeping high quality.</p>
          </Panel>
          <Panel header='How long does the dressmaking take?' key='3'>
            <p>Depend on the complexity, the process can take up to 2 months. We advise that you should 
              start shopping at least 3 months before your wedding to avoid any rushing fee.</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  )
};


export default StylistService;