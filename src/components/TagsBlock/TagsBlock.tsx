import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styles from './TagsBlock.module.scss';
import Hero from '../Hero';

const TagsBlock = () => {
  const data = useStaticQuery(graphql`
        query {
            catImage1: file(name: {eq: "Tag-Minimal"}) {
              childCloudinaryAsset {
                fluid(maxWidth: 1600) {
                  ...CloudinaryAssetFluid
                }
              }
            }
      
            catImage2: file(name: {eq: "Tag-Romantic"}) {
              childCloudinaryAsset {
                fluid(maxWidth: 1600) {
                  ...CloudinaryAssetFluid
                }
              }
            }
      
            catImage3: file(name: {eq: "Tag-Elegant"}) {
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
        <Link to='/collection/minimal'>
          <Hero overlay={false} hasScroll={false} isParallax={false} imageWide={data.catImage1} />
          <div className={styles.title}>
            <h3 style={{ marginBottom: 0 }}>Minimal</h3>
          </div>
        </Link>
      </div>
      <div className={styles.item}>
        <Link to='/collection/romantic'>
          <Hero overlay={false} hasScroll={false} isParallax={false} imageWide={data.catImage2} />
          <div className={styles.title}>
            <h3 style={{ marginBottom: 0 }}>Romantic</h3>
          </div>
        </Link>
      </div>
      <div className={styles.item}>
        <Link to='/collection/elegant'>
          <Hero overlay={false} hasScroll={false} isParallax={false} imageWide={data.catImage3} />
          <div className={styles.title}>
            <h3 style={{ marginBottom: 0 }}>Elegant</h3>
          </div>
        </Link>
      </div>
    </div >
  )
};

export default TagsBlock;