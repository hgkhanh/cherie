import React from 'react';
import BackgroundImage from 'gatsby-background-image';
import { useStaticQuery, graphql } from 'gatsby';
import Hero from '../Hero';
import styles from './ValueBlock.module.scss';

const ValueBlock = () => {
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
            <div className={styles.item}>
                <BackgroundImage
                    fluid={data.background1.childCloudinaryAsset.fluid}
                    style={{ width: '100%', height: '100%' }}>
                    <div className={styles.overlay} style={{ backgroundColor: `rgba(255,255,255, 0.3)` }} />
                    <div className={styles.textWrapper}>
                        <h2 style={{ marginBottom: 0 }} className="uppercase darkText">Better Experience</h2>
                        <p style={{ marginBottom: 0 }} className="uppercase darkText">A less painfull, less stressful way to find 'the' dress</p>
                    </div>
                </BackgroundImage>
            </div>
            <div className={styles.item}>
                <BackgroundImage
                    fluid={data.background2.childCloudinaryAsset.fluid}
                    style={{ width: '100%', height: '100%' }}>
                    <div className={styles.overlay} style={{ backgroundColor: `rgba(255,255,255, 0.3)` }} />
                    <div className={styles.textWrapper}>
                        <h2 style={{ marginBottom: 0 }} className="uppercase darkText">Better Price</h2>
                        <p style={{ marginBottom: 0 }} className="uppercase darkText">High quality with unmatched price</p>
                    </div>
                </BackgroundImage>
            </div>
        </div>
    )
};


export default ValueBlock;