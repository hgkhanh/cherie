import React, { useContext, useState, useRef } from 'react';
import styles from './Recommendation.module.scss';
import { useStaticQuery, graphql, Link } from "gatsby";
import { Row, Col, Carousel } from "antd";
import Image from 'gatsby-image';
import SliderArrow from '../SliderArrow';
import { WindowDimensionsContext } from '../../shared/WindowDimensionsProvider';
import { shuffle } from 'underscore';

/**
 * Show 6 other products as slider
 */

const Recommendation = ({ excludeId }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/products\\//"}}
        , sort: {fields: fileAbsolutePath, order: ASC}) {
        edges {
          node {
            id    
            fields {
              slug
            }
            frontmatter {
              name
              featureImage {
                childCloudinaryAsset {
                  fluid(maxWidth: 500) {
                    ...CloudinaryAssetFluid
                  }
                }
              }
              price
            }
          }
        }
      }
    }
  `);
  // Filter excludeId from data
  console.log(data.allMarkdownRemark.edges);
  let products = data.allMarkdownRemark.edges
    .filter(product => product.node.id !== excludeId)

  // Shuffle and cut to 6
  products = shuffle(products).slice(0, 6);
  console.log(products);

  const { width } = useContext(WindowDimensionsContext);

  let settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 2,
    dots: false,
    infinite: true,
    autoplay: false,
    arrows: false,
    speed: 1000,
    easing: "ease-in-out",
    lazyLoad: 'eager',
    draggable: true,
    swipeToSlide: true
  };

  if (width > 576) {
    settings.centerPadding = '200px';
  }

  if (width > 768) {
    settings.centerPadding = '120px';
    settings.slidesToShow = 4;
    settings.arrows = true;
    settings.prevArrow = <SliderArrow to="prev" /> ,
      settings.nextArrow = <SliderArrow to="next" />
  }

  if (width > 992) {
    settings.centerPadding = '120px';
  }

  if (width > 1200) {
    settings.centerPadding = '225px';
  }

  if (width > 1600) {
    settings.centerPadding = '320px';
  }

  return (
    <div className={styles.container}>
      <h2 className="centerAlign">You may also like</h2>
      <Carousel {...settings}>
        {products.map((product, index) => {
          return (
            <Link key={index} className={styles.item} to={product.node.fields.slug}>
              <Image className={styles.slide} fluid={product.node.frontmatter.featureImage.childCloudinaryAsset.fluid} alt='' >
              </Image>
            </Link>
          )
        }
        )}
      </Carousel>
    </div>
  );
};


export default Recommendation;
