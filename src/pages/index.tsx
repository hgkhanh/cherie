import React from 'react';
import { graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet';
import siteConfig from '../../data/SiteConfig';
import Layout from '../layout';
import { Row, Col, Carousel } from 'antd';
import RevealAnimation from '../shared/RevealAnimation';
import ProductList from '../components/ProductList';
import Image from 'gatsby-image';
import { useWindowDimensions } from '../shared/WindowDimensionsProvider';
import SliderArrow from '../components/SliderArrow';

const HomeCarousel = ({ pictures }) => {
  const { width } = useWindowDimensions();
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    easing: 'ease-in-out',
    lazyLoad: 'progressive'
  };

  if (width < 770) {
    settings.arrows = true,
    settings.prevArrow = (<SliderArrow to='prev' />),
    settings.nextArrow = (<SliderArrow to='next' />)
  }
  return (
    <Carousel {...settings}>
      {pictures.map((pic, index) => {
        if (width < 770) {
          return (<img style={{width:'100%'}} key={index} src={pic.childImageSharp.resize.src} alt='' />)
        }
        return (<Image key={index} fluid={pic.childImageSharp.fluid} alt='' />)
      }
      )}
    </Carousel>
  )
}

const HomePage = (props) => {
  const products = props.data.allMarkdownRemark.edges;
  const carouselPics = props.data.allFile.nodes;
  return (
    <Layout>
      <div className='pageContainer'>
        <Helmet title={`Home | ${siteConfig.siteTitle}`} />
        <RevealAnimation opacity transform>
          <div className='grid'>
            <HomeCarousel pictures={carouselPics} />
          </div>
        </RevealAnimation>
        <hr className='divider' />
        <RevealAnimation opacity transform>
          <div className='gridWrapper darkTone'>
            <div className='grid flexSection boxContent'>
              <Row type='flex' justify='center' align='top'>
                <Col className='gutter-row' span={24} md={8}><h1>Who We Are</h1></Col>
                <Col className='gutter-row' span={24} md={8}>
                  <p>Inspired by clean lines, last dances and beautiful hues, Name of
                  Love is a collection of 17 styles in 9 signature colors. Made to
                be worn amongst the madly in love, even after 'I do'.</p>
                </Col>
              </Row>
            </div>
          </div>
        </RevealAnimation>
        <hr className='divider' />
        <div className='grid'>
          <div className='gridTitle'>
            <h1>Shop</h1>
          </div>
          <ProductList products={products} />
        </div>
        <hr className='divider' />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: {fields: fileAbsolutePath, order: ASC}) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            category
            name
            featureImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            description
            price
            sizes
            tags
          }
        }
    }
    }  
    allFile(filter: {relativePath: {regex: "/images\/homeSlider/"}}) {
      nodes {
        childImageSharp {
          fluid(maxWidth: 2400) {
            ...GatsbyImageSharpFluid
          }
          resize(width: 1240, height: 1600, cropFocus: ATTENTION) {
            src
          }
        }
      }
    }
  }
`;

export default HomePage;
