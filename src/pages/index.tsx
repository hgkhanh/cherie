import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby'
import Helmet from 'react-helmet';
import siteConfig from '../../data/SiteConfig';
import Layout from '../layout';
import { Row, Col, Button } from 'antd';
import RevealAnimation from '../shared/RevealAnimation';
import ProductList from '../components/ProductList';
import InstaSlider from '../components/InstaSlider';
import Hero from '../components/Hero';

const HomePage = (props) => {
  const data = useStaticQuery(graphql`
      query {
        banner1wide: file(name: {eq: "banner1"}) {
          childCloudinaryAsset {
            fluid(maxWidth: 2400) {
              ...CloudinaryAssetFluid
            }
          }
        }
        banner1vertical: file(name: {eq: "banner1-vertical"}) {
          childCloudinaryAsset {
            fluid(maxWidth: 900) {
              ...CloudinaryAssetFluid
            }
          }
        }

        banner2wide: file(name: {eq: "banner2"}) {
          childCloudinaryAsset {
            fluid(maxWidth: 2400) {
              ...CloudinaryAssetFluid
            }
          }
        } 

        banner3wide: file(name: {eq: "banner3"}) {
          childCloudinaryAsset {
            fluid(maxWidth: 2400) {
              ...CloudinaryAssetFluid
            }
          }
        }  
        
        banner4wide: file(name: {eq: "banner4"}) {
          childCloudinaryAsset {
            fluid(maxWidth: 2400) {
              ...CloudinaryAssetFluid
            }
          }
        }        
        products: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/products\\//"}}, sort: {fields: fileAbsolutePath, order: ASC}, limit: 6) {
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
                    fluid(maxWidth: 1600) {
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
      }      
    `)

  console.log(data);
  const products = data.products.edges;

  return (
    <Layout path={props.path}>
      <div className='pageContainer'>
        <Helmet title={`Home | ${siteConfig.siteTitle}`} />
        <Hero overlay={false} hasScroll={true}
          imageWide={data.banner1wide} imageVertical={data.banner1vertical}></Hero>
        <hr className='divider' />
        <RevealAnimation opacity transform>
          <div className='gridWrapper'>
            <div className='grid flexSection boxContent'>
              <Row className='gridTitle centerAlign' type='flex' justify='center'>
                <Col className='gutter-row' span={24}><h2 className="uppercase" style={{ marginBottom: '2em' }}>Who We Are</h2>
                </Col>
                <Col className='gutter-row' span={24} md={16} lg={12}>
                  <p style={{ marginBottom: '2em' }}>Inspired by modern beauty with a nostalgic soul that forever longs
                    for the past, allured by romance and passion,the idea of a small
                    bridal boutique was conceived at the heart of Helsinki like a long
                    lost dream. With the goal of creating a once-in-a-lifetime experience
                    for our customers, the name ‘Cherie‘ came to mind, along with its true
                    meaning of ‘sweetheart’ in French and its homophone ‘cherry’, a constant
                    reminder of sweetness. Representing the brand under such beliefs and ideas,
                    at Cherie Bridal where the provision of excellent customer service is the
                    top priority, every bride who comes to us is and will always be our
                    ‘sweetheart’.
                  </p>
                  <p>In today’s market where wedding planning has become a process of
                    relentless waiting and extravagance, Cherie Bridal promises you the
                    most enjoyable experience of finding your true match of a wedding dress,
                    sincerely tailor-made to your preference and identity, with
                    customisation time frame under three months at competitive prices.
                  </p>
                  <h4>- The Cherie Bridal Team</h4>
                  <hr className='divider' />
                  <Link to={'/about'} >
                    <h3 className='underline uppercase'>Learn more</h3>
                  </Link>
                </Col>
              </Row>
            </div>
          </div>
        </RevealAnimation>
        <hr className='divider' />
        <Hero overlay={true} overlayAlpha={0.6} hasScroll={false} imageWide={data.banner2wide}
          imageVertical={data.banner2wide}>
          <h3 style={{ marginBottom: 0 }} >Made-to-order dresses</h3>
          <h2 style={{ marginBottom: '1em' }} className="uppercase">Chérie Store</h2>
          <Link to='/booking'>
            <Button size='large' ghost htmlType="submit">
              Book An Appointment
          </Button>
          </Link>
        </Hero>
        <hr className='divider' />
        <div className='grid'>
          <div className='gridTitle centerAlign'>
            <h2 className="uppercase">Our Favourites</h2>
          </div>
          <ProductList products={products} />
          <div className='gridTitle footTitle centerAlign'>
            <Link to={'/shop'} >
              <h3 className='underline uppercase'>See more</h3>
            </Link>
          </div>
        </div>
        <hr className='divider' />
        <Hero overlay={true} hasScroll={false} imageWide={data.banner3wide}
          imageVertical={data.banner3wide}>
          <h2 style={{ marginBottom: 0 }} className="uppercase">Have all your wedding photos back</h2>
          <h3 style={{ marginBottom: '1em' }}>and ready to share with us?</h3>
          <a href="mailto:info@cheriebridal.fi">
            <Button size='large' ghost htmlType="submit">
              Submit your wedding
            </Button>
          </a>
        </Hero>
        <hr className='divider' />
        <div className='gridTitle centerAlign'>
          <h3>Get inspired</h3>
          <h2 className="uppercase">Our Instagram</h2>
        </div>
        <InstaSlider />
        <hr className='divider' />
        <hr className='divider' />
        <Hero overlay={true} hasScroll={false} imageWide={data.banner4wide}
          imageVertical={data.banner4wide}>
          <h3 style={{ marginBottom: 0 }}>Ready to</h3>
          <h1 style={{ marginBottom: '1em' }}>Find your dress?</h1>
          <Link to='/booking'>
            <Button size='large' ghost htmlType="submit">
              Book your appointment
          </Button>
          </Link>
        </Hero>
        <hr className='divider' />
      </div>
    </Layout>
  );
};

export default HomePage;
