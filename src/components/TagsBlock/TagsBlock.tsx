import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styles from './TagsBlock.module.scss';
import Image from "gatsby-image";

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
          <Image style={{ height: '100%' }} fluid={data.catImage1.childCloudinaryAsset.fluid}>
          </Image>
          <div className={styles.title}>
            <h3 style={{ marginBottom: 0 }}>Minimal</h3>
          </div>
        </Link>
      </div>
      <div className={styles.item}>
        <Link to='/collection/romantic'>
          <Image style={{ height: '100%' }} fluid={data.catImage2.childCloudinaryAsset.fluid}>
          </Image>
          <div className={styles.title}>
            <h3 style={{ marginBottom: 0 }}>Romantic</h3>
          </div>
        </Link>
      </div>
      <div className={styles.item}>
        <Link to='/collection/elegant'>
          <Image style={{ height: '100%' }} fluid={data.catImage3.childCloudinaryAsset.fluid}>
          </Image>
          <div className={styles.title}>
            <h3 style={{ marginBottom: 0 }}>Elegant</h3>
          </div>
        </Link>
      </div>
    </div >
  )
};

export default TagsBlock;