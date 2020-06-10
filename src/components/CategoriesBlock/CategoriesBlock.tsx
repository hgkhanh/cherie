import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styles from './CategoriesBlock.module.scss';
import Hero from '../Hero';

const CategoriesBlock = () => {
    const data = useStaticQuery(graphql`
        query {
            catImage1: file(name: {eq: "Aurora-01"}) {
              childCloudinaryAsset {
                fluid(maxWidth: 1600) {
                  ...CloudinaryAssetFluid
                }
              }
            }
      
            catImage2: file(name: {eq: "Ella-01"}) {
              childCloudinaryAsset {
                fluid(maxWidth: 1600) {
                  ...CloudinaryAssetFluid
                }
              }
            }
      
            catImage3: file(name: {eq: "Eve-04"}) {
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
                <Link to='/collection'>
                    <Hero overlay={false} hasScroll={false} isParallax={false} imageWide={data.catImage1}>
                        <div className='glassTitle'>
                            <h2 className='darkerText uppercase' style={{ marginBottom: 0 }}>Ball gown</h2>
                        </div>
                    </Hero>
                </Link>
            </div>
            <div className={styles.item}>
                <Link to='/collection'>
                    <Hero overlay={false} hasScroll={false} isParallax={false} imageWide={data.catImage2}>
                        <div className='glassTitle'>
                            <h2 className='darkerText uppercase' style={{ marginBottom: 0 }}>Mermaid</h2>
                        </div>
                    </Hero>
                </Link>
            </div>
            <div className={styles.item}>
                <Link to='/collection'>
                    <Hero overlay={false} hasScroll={false} isParallax={false} imageWide={data.catImage3}>
                        <div className='glassTitle'>
                            <h2 className='darkerText uppercase' style={{ marginBottom: 0 }}>A line</h2>
                        </div>
                    </Hero>
                </Link>
            </div>
        </div>
    )
};

export default CategoriesBlock;