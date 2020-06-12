import React, { useContext } from 'react';
import styles from './InstaSlider.module.scss';
import { useStaticQuery, graphql } from "gatsby";
import { Carousel } from "antd";
import Image from 'gatsby-image';
import SliderArrow from '../SliderArrow';
import { WindowDimensionsContext } from '../../shared/WindowDimensionsProvider';

const InstaSlider = () => {
  const data = useStaticQuery(graphql`
    query {
        allInstaNode {
          edges {
            node {
              id
              likes
              comments
              mediaType
              preview
              original
              timestamp
              caption
              localFile {
                childImageSharp {
                  fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
    }
    `);

  const { width } = useContext(WindowDimensionsContext);

  let settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 1,
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
    settings.slidesToShow = 3;
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

  const pictures = data.allInstaNode.edges;
  return (
    <Carousel {...settings}>
      {pictures.map((pic, index) => {
        return (
          <a key={index} className={styles.container} href={`//instagram.com/p/${pic.node.id}`}>
            <Image className={styles.slide}
              sizes={{ ...pic.node.localFile.childImageSharp.fluid, aspectRatio: 1 }} alt='' />
            {/* <div className={styles.overlay}>
              <h3>{pic.node.likes} likes</h3>
              <p>{pic.node.caption}</p>
              <p>{moment(pic.node.timestamp).format("dddd, MMMM Do")}</p>
            </div> */}
          </a>
        )
      }
      )}
    </Carousel>
  );
};


export default InstaSlider;
