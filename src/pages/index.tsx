import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import siteConfig from '../../data/SiteConfig';
import Layout from '../layout';
import { Row, Col, Button } from 'antd';
import RevealAnimation from '../shared/RevealAnimation';
import ProductList from '../components/ProductList';
import InstaSlider from '../components/InstaSlider';
import Hero from '../components/Hero';
import ValueBlock from '../components/ValueBlock';
import HowItWork from '../components/HowItWork';
// import CampaignModal from '../components/CampaignModal';

const HomePage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      banner1wide: file(name: {eq: "Banner-01"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 2400) {
            ...CloudinaryAssetFluid
          }
        }
      }
      banner1vertical: file(name: {eq: "Banner-01-Vertical"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1200) {
            ...CloudinaryAssetFluid
          }
        }
      }

      banner2wide: file(name: {eq: "Banner-02"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 2400) {
            ...CloudinaryAssetFluid
          }
        }
      } 

      banner3wide: file(name: {eq: "Banner-03"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 2400) {
            ...CloudinaryAssetFluid
          }
        }
      }  
      
      banner4wide: file(name: {eq: "Banner-04"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }
      
      modalBackground: file(name: {eq: "Modal-BG"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 600, transformations: ["b_black", "o_90"]) {
            aspectRatio
            sizes
            src
            srcSet
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

  const products = data.products.edges;
  const [modalActive, setModalActive] = useState(false);

  const storedView =
    typeof window !== 'undefined' && window.localStorage.getItem('view');
  const [view, setView] = useState(storedView || false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('view', view);
    }
  }, [view]);

  useEffect(() => {
    setTimeout(() => {
      console.log('Showing modal');
      if (!view) {
        setModalActive(true);
      } else {
        console.log('User already see this modal. Abort!');
      }
    }, 5000);
  }, []);

  return (
    <Layout location={location}>
      {/* <CampaignModal modalBackground={data.modalBackground} visible={modalActive} setVisible={setModalActive} /> */}
      <div className='pageContainer'>
        <Helmet title={`Home | ${siteConfig.siteTitle}`} />
        <Hero overlay={true} hasScroll={false} isParallax={false}
          imageWide={data.banner1wide} imageVertical={data.banner1vertical}>
          <h2 className='uppercase' style={{ marginBottom: 0 }}>Ready for the bridal</h2>
          <h2 className='uppercase' style={{ marginBottom: '1em' }}>Revolution?</h2>
          <Link to='/booking'>
            <Button block style={{ width: '150px' }}>
              Get started
          </Button>
          </Link>
        </Hero>
        <RevealAnimation opacity transform>
          <div className='gridWrapper'>
            <div className='grid wide'>
              <ValueBlock />
            </div>
          </div>
        </RevealAnimation>
        <Hero overlay={true} overlayAlpha={0.6} hasScroll={false} isParallax={true} imageWide={data.banner2wide}
          imageVertical={data.banner2wide}>
          <h2 className='uppercase' style={{ marginBottom: '1em' }}>We are here for you</h2>
          <Link to='/about'>
            <Button block style={{ width: '150px' }}>
              Our story
          </Button>
          </Link>
        </Hero>
        <RevealAnimation opacity transform>
          <div className='gridWrapper'>
            <div className='grid'>
              <HowItWork />
            </div>
          </div>
        </RevealAnimation>
        <Hero overlay={true} hasScroll={false} isParallax={true} imageWide={data.banner3wide}
          imageVertical={data.banner3wide}>
          <h2 style={{ marginBottom: 0 }} className='uppercase'>Have all your wedding photos back</h2>
          <h3 style={{ marginBottom: '1em' }}>and ready to share with us?</h3>
          <a href='mailto:info@cheriebridal.fi'>
            <Button size='large' ghost htmlType='submit'>
              Submit your wedding
            </Button>
          </a>
        </Hero>
        <hr className='divider' />
        <div className='gridTitle centerAlign'>
          <h3>Get inspired</h3>
          <h2 className='uppercase'>Our Instagram</h2>
        </div>
        <InstaSlider />
        <hr className='divider' />
        <hr className='divider' />
        <Hero overlay={true} hasScroll={false} isParallax={true} imageWide={data.banner4wide}
          imageVertical={data.banner4wide}>
          <h3 style={{ marginBottom: 0 }}>Ready to</h3>
          <h1 style={{ marginBottom: '1em' }}>Find your dress?</h1>
          <Link to='/booking'>
            <Button size='large' ghost htmlType='submit'>
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
