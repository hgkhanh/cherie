import React from 'react';
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet';
import siteConfig from '../../data/SiteConfig';
import Layout from '../layout';
import { Row, Col, Carousel } from 'antd';
import RevealAnimation from '../shared/RevealAnimation';
import ProductList from '../components/ProductList';
import Image from 'gatsby-image';
import { useWindowDimensions } from '../shared/WindowDimensionsProvider';
import SliderArrow from '../components/SliderArrow';

const HomeCarousel = ({ carousel }) => {
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
      {carousel.map((slide, index) => {
        const { image, link } = slide.node.frontmatter;

        if (width < 770) {
          return (
            <Link key={index} to={link}>
              <Image fluid={image.childCloudinaryAsset.vertical} alt='' />
            </Link>
          )
        }
        return (
          <Link key={index} to={link}>
            <Image fluid={image.childCloudinaryAsset.full} alt='' />
          </Link>
        )
      }
      )}
    </Carousel>
  )
}

const HomePage = (props) => {
  const products = props.data.products.edges;
  const carousel = props.data.carousel.edges;

  return (
    <Layout>
      <div className='pageContainer'>
        <Helmet title={`Home | ${siteConfig.siteTitle}`} />
        <RevealAnimation opacity transform>
          <div className='grid'>
            <HomeCarousel carousel={carousel} />
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
            <h1>Our Favourites</h1>
          </div>
          <ProductList products={products} />
          <div className='gridTitle centerAlign'>
            <Link to={'/shop'}>
              <h2>See more</h2>
            </Link>
          </div>
        </div>
        <hr className='divider' />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    products: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/products\\//"}},
      sort: {fields: fileAbsolutePath, order: ASC}, limit: 6) {
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
              childCloudinaryAsset {
                fluid {
                  ...CloudinaryAssetFluid
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
    carousel: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/slider\//"}}) {
      edges {
        node {
          frontmatter {
            image {
              childCloudinaryAsset {
                full: fluid(maxWidth: 2400) {
                  ...CloudinaryAssetFluid
                }
                vertical: fluid(transformations: ["ar_2:3","c_fill","g_face", "q_auto:best"]) {
                  ...CloudinaryAssetFluid
                }
              }
            }
            link
          }
        }
      }
    } 
  }
`;


export default HomePage;
