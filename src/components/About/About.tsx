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
      banner2wide: file(name: {eq: "Our-Story-Banner-02"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }
      banner3wide: file(name: {eq: "Our-Story-Banner-03"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }
      banner4wide: file(name: {eq: "Our-Story-Banner-04"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }
      banner5wide: file(name: {eq: "Our-Story-Banner-05"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }
      banner6wide: file(name: {eq: "Our-Story-Banner-06"}) {
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
        <h1 className='uppercase darkTone' style={{ marginBottom: '1em' }}>Our Story</h1>
      </Hero >
      {/* Text Block */}
      < hr className='divider' />
      <div className='gridWrapper'>
        <div className='grid narrow'>
          <div className='sectionTextBlock centerAlign'>
            <p className='leftAlign grayText'>
              Wedding is one of the most important milestones in life,
              where two people celebrate their loves with the witness of the beloved guests.
              And no one is the bigger star than brides and groom on their wedding day.
              For many brides, the wedding dress serves as a statement piece that makes
              them feel perfectly special on their memorable day.
            </p>
            <p className='leftAlign grayText'>
              Unfortunately, finding the perfect wedding dress is the biggest challenge when
              most of us have zero experience in wedding dress shopping. The last time we went
              on an appointment, we were frustrated by the countless choices, higher prices and time consuming.
              Buying a dress shouldn’t be this hard, and that’s why we started Cherie -
              to make buying a dress easier and more approachable to every brides.
            </p>
          </div>
        </div>
      </div>
      <hr className='divider' />
      {/* Banner 2: text on hero */}
      <Hero overlay={false} hasScroll={false} isParallax={false}
        imageWide={data.banner2wide} mobileFullHeight={true}
        verticalAlign='top'>
        <div>
          <h2 className='uppercase darkerText heavyText' style={{ marginBottom: '1em' }}>The dress made for you</h2>
          <p className='darkerText' style={{ width: 300 }}>
            Cherie stylist picks was designated to accompany each and every brides
            to find the most beautiful bress with the least effort. They are customized
            to your styles and measurements and created by tailors with years of experience
            in the wedding industry using the same materials in same facilities as top-of-the-line brands.
            </p>
        </div>
      </Hero>
      {/* Banner 3: Pic then Text */}
      <div className={styles.smallBannerWrapper}>
        <Hero overlay={false} hasScroll={false} isParallax={false}
          imageWide={data.banner3wide} mobileFullHeight={false}>
        </Hero>
      </div>
      <hr className='divider' />
      <div className='gridWrapper'>
        <div className='grid narrow'>
          <div className='sectionTextBlock leftAlign'>
            <h2 className='uppercase heavyText' style={{ marginBottom: '1em' }}>Cater to your need</h2>
            <p className='grayText'>
              We believe that everybody is anything but ordinary and what we wear represents
              much of ourselves. That’s why Cherie says no to one-size-fit-all. We offer
              consultation and alternation service. Anything you need, from simply
              changing the dress top to a complicated sophisticated pearl beaded ball
              gown with 3 meter lengths train. We do it for you.
            </p>
          </div>
        </div>
      </div>
      <hr className='divider' />
      {/* Banner 4: Pic then Text */}
      <div className={styles.smallBannerWrapper}>
        <Hero overlay={false} hasScroll={false} isParallax={false}
          imageWide={data.banner4wide} mobileFullHeight={false}>
        </Hero>
      </div>
      <hr className='divider' />
      <div className='gridWrapper'>
        <div className='grid narrow'>
          <div className='sectionTextBlock leftAlign'>
            <h2 className='uppercase heavyText' style={{ marginBottom: '1em' }}>Handcrafted with love</h2>
            <p className='grayText'>
              We say no to glue. Using glue may save time, but it will turn your dress yellowish after a while. 
              That’s why we sew the beading, ruffles and laces entirely by hand, whenever it needs. 
              So rest assured, that your dress will be long lasting to pass on to the next generation.
            </p>
          </div>
        </div>
      </div>
      <hr className='divider' />
      {/* Banner 5: Pic then Text */}
      <div className={styles.smallBannerWrapper}>
        <Hero overlay={false} hasScroll={false} isParallax={false}
          imageWide={data.banner5wide} mobileFullHeight={false}>
        </Hero>
      </div>
      <hr className='divider' />
      <div className='gridWrapper'>
        <div className='grid narrow'>
          <div className='sectionTextBlock leftAlign'>
            <h2 className='uppercase heavyText' style={{ marginBottom: '1em' }}>Comfort and stylish</h2>
            <p className='grayText'>
            Comfy bride is the best bride. But a stunning comfy bride is even better. 
            We’ve included some thoughtful touches to make the dress more comfortable. 
            A hidden pocket to carry your phone. A invisible zipper helps you get dress 
            in a second. Or a removable cap for your dance. Plus, the dresses are stylish, 
            catch up with the lastest trend. You’ll be the star on your day.
            </p>
          </div>
        </div>
      </div>
      <hr className='divider' />
      {/* Banner 6: Text on Hero */}
      <Hero overlay={false} hasScroll={false} isParallax={false}
        imageWide={data.banner6wide} mobileFullHeight={true} verticalAlign='top'>
        <h1 className='uppercase darkTone heavyText' style={{ marginTop: '60px' }}>Feel special in your own way</h1>
      </Hero>
    </React.Fragment>
  );
}

export default About;
