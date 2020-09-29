import React from 'react';
import BackgroundImage from 'gatsby-background-image';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Icon, Button } from 'antd';
import styles from './HowItWork.module.scss';

const HowItWork = () => {
    const data = useStaticQuery(graphql`
        query {
            background1: file(name: {eq: "Banner-03"}) {
                childCloudinaryAsset {
                  fluid(maxWidth: 2400) {
                    ...CloudinaryAssetFluid
                  }
                }
            }  
              
            background2: file(name: {eq: "Banner-04"}) {
                childCloudinaryAsset {
                    fluid(maxWidth: 1600) {
                    ...CloudinaryAssetFluid
                    }
                }
            }
        }
    `);

    return (
        <div className={styles.container}>
            <h2 className='uppercase heavyText'>How It Work</h2>
            <div className={styles.step}>
                <div className={styles.icon}>
                    <Icon type='form' style={{ fontSize: '40px' }} />
                </div>
                <div>
                    <p>Start: Answer a few questions about your weddings, preference styles or special requirements</p>
                </div>
            </div>
            <div className={styles.step}>
                <div className={styles.icon}>
                    <Icon type='tag' style={{ fontSize: '40px' }} />
                </div>
                <div>
                    <p>Refine: Receive our stylist picks, from that we can discuss further about the styles and alteration if needed</p>
                </div>
            </div>
            <div className={styles.step}>
                <div className={styles.icon}>
                    <Icon type='shopping' style={{ fontSize: '40px' }} />
                </div>
                <div>
                    <p>Order: Placing order if you decide to go with us</p>
                </div>
            </div>
            <div className={styles.step}>
                <div className={styles.icon}>
                    <Icon type='smile' style={{ fontSize: '40px' }} />
                </div>
                <div>
                    <p>Receive: Order arrives, you can pick up at our store or have it send to your home</p>
                </div>
            </div>
            <Link to='/booking'>
                <Button type='primary'>
                    Get Started
                </Button>
            </Link>
        </div>
    )
};


export default HowItWork;