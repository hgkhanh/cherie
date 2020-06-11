import React, { useContext } from "react";
import styles from "./About.module.scss";
import { useStaticQuery, graphql } from 'gatsby';
import Hero from '../Hero';

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      banner1wide: file(name: {eq: "Our-Story-Banner-01"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }
      banner2wide: file(name: {eq: "Celia-01"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }
      banner3wide: file(name: {eq: "photo-1500531279542-fc8490c8ea4d"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }
      banner4wide: file(name: {eq: "Banner-03"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }
      banner5wide: file(name: {eq: "photo-1588412277680-e3490a0ba09d-2-"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }
      banner6wide: file(name: {eq: "Banner-04"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }
    }      
  `)

  return (
    <React.Fragment>
      {/* Banner 1: Hero */}
      < Hero overlay={true} hasScroll={false} isParallax={false}
        imageWide={data.banner1wide} mobileFullHeight={true} verticalAlign='top' >
        <h2 className='uppercase darkTone' style={{ marginBottom: '1em' }}>Our Story</h2>
      </Hero >
      {/* Text Block */}
      < hr className='divider' />
      <div className='gridWrapper'>
        <div className='grid narrow'>
          <div className='sectionTextBlock centerAlign'>
            <p>
              The celebration of love is not a fleeting moment,
              a sign of ephemerality but one that lasts for an eternity.
              And perhaps that is the true connotation of weddings,
              to mark the most significant threshold of one’s life in the name of love.
            </p>
          </div>
        </div>
      </div>
      <hr className='divider' />
      {/* Banner 2: text on hero */}
      <Hero overlay={true} hasScroll={false} isParallax={false}
        imageWide={data.banner2wide} mobileFullHeight={true}
        verticalAlign='bottom'>
        <h2 className='uppercase darkTone' style={{ marginBottom: '1em' }}>The dress made for everyone</h2>
        <p className='darkTone'>
          Cherie was designed to serve the widest range of brides that most beautiful yet convenient dress,
          allured by romance and passion,the idea of a small bridal boutique was conceived
          at the heart of Helsinki like a long lost dream.
        </p>
      </Hero>
      {/* Banner 3: Pic then Text */}
      <div className={styles.smallBannerWrapper}>
        <Hero overlay={true} hasScroll={false} isParallax={false}
          imageWide={data.banner3wide} mobileFullHeight={false}>
        </Hero>
      </div>
      <hr className='divider' />
      <div className='gridWrapper'>
        <div className='grid narrow'>
          <div className='sectionTextBlock centerAlign'>
            <h2 className='uppercase' style={{ marginBottom: '1em' }}>Cater to your need</h2>
            <p>
              Every brides is anything but ordinary. Allured by romance and passion,the idea of a small bridal boutique was conceived
              at the heart of Helsinki like a long lost dream.
            </p>
          </div>
        </div>
      </div>
      <hr className='divider' />
      {/* Banner 4: Pic then Text */}
      <div className={styles.smallBannerWrapper}>
        <Hero overlay={true} hasScroll={false} isParallax={false}
          imageWide={data.banner4wide} mobileFullHeight={false}>
        </Hero>
      </div>
      <hr className='divider' />
      <div className='gridWrapper'>
        <div className='grid narrow'>
          <div className='sectionTextBlock centerAlign'>
            <h2 className='uppercase' style={{ marginBottom: '1em' }}>Handcrafted with love</h2>
            <p>
              Say no to glue. Unlike other manufacturers who save 
              time by using glue to add beaded, ruffles and laces.
              The celebration of love is not a fleeting moment,
              a sign of ephemerality but one that lasts for an eternity.
            </p>
          </div>
        </div>
      </div>
      <hr className='divider' />
      {/* Banner 5: Pic then Text */}
      <div className={styles.smallBannerWrapper}>
        <Hero overlay={true} hasScroll={false} isParallax={false}
          imageWide={data.banner5wide} mobileFullHeight={false}>
        </Hero>
      </div>
      <hr className='divider' />
      <div className='gridWrapper'>
        <div className='grid narrow'>
          <div className='sectionTextBlock centerAlign'>
            <h2 className='uppercase' style={{ marginBottom: '1em' }}>Style and comfort</h2>
            <p>
              The celebration of love is not a fleeting moment,
              a sign of ephemerality but one that lasts for an eternity.
              And perhaps that is the true connotation of weddings,
              to mark the most significant threshold of one’s life in the name of love.
            </p>
          </div>
        </div>
      </div>
      <hr className='divider' />
      {/* Banner 6: Text on Hero */}
      <Hero overlay={true} hasScroll={false} isParallax={false}
        imageWide={data.banner6wide} mobileFullHeight={true} verticalAlign='top'>
        <h2 className='uppercase darkTone' style={{ marginBottom: '1em' }}>Feel special in your own way</h2>
      </Hero>
    </React.Fragment>
  );
}

export default About;
