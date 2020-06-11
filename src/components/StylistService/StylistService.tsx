import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Icon } from 'antd';
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
  `)

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
          imageWide={data.banner5wide} mobileFullHeight={false}>
        </Hero>
      </div>
    </div>
  )
};


export default StylistService;