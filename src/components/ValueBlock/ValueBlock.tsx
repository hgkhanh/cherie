import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from "gatsby-image";
import styles from './ValueBlock.module.scss';
import cx from 'classnames';

const ValueBlock = () => {
    const data = useStaticQuery(graphql`
        query {
            background1: file(name: {eq: "Value-03"}) {
                childCloudinaryAsset {
                  fluid(maxWidth: 1200) {
                    ...CloudinaryAssetFluid
                  }
                }
            }  
              
            background2: file(name: {eq: "Value-04"}) {
                childCloudinaryAsset {
                    fluid(maxWidth: 1200) {
                    ...CloudinaryAssetFluid
                    }
                }
            }
        }
    `);

    return (
        <div>
            <div className='sectionTitle centerAlign' style={{ margin: '10px 0' }}>
                <h3 style={{ marginBottom: '0' }}>The better and better</h3>
            </div>
            <div className={cx(styles.cardContainer, styles.right)} style={{ paddingTop: '0' }}>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image style={{ height: '100%' }} fluid={data.background2.childCloudinaryAsset.fluid}>
                        </Image>
                    </div>
                    <div className={styles.text}>
                        <h3 className='uppercase heavyText'>Better Experience</h3>
                        <p>
                            A less painful, less stressful way to find 'the' dress.
                        </p>
                    </div>
                </div>
            </div>
            <div className={cx(styles.cardContainer, styles.left)}>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image style={{ height: '100%' }} fluid={data.background1.childCloudinaryAsset.fluid}>
                        </Image>
                    </div>
                    <div className={styles.text}>

                        <h3 className='uppercase heavyText'>Better Price</h3>
                        <p>
                            High quality with unmatched price.
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
};


export default ValueBlock;