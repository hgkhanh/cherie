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

      cat1: file(name: {eq: "Aurora-01"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }

      cat2: file(name: {eq: "Ella-01"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }

      cat3: file(name: {eq: "Eve-04"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
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
            <div className='grid narrow'>
              <HowItWork />
            </div>
          </div>
        </RevealAnimation>
        <Link to='/collection'>
          <Hero overlay={false} hasScroll={false} isParallax={false} imageWide={data.cat1}>
            <div className='glassTitle'>
              <h2 className='darkText uppercase' style={{ marginBottom: 0 }}>Ball gown</h2>
            </div>
          </Hero>
        </Link>
        <Link to='/collection'>
          <Hero overlay={false} hasScroll={false} isParallax={false} imageWide={data.cat2}>
            <div className='glassTitle'>
              <h2 className='darkText uppercase' style={{ marginBottom: 0 }}>Mermaid</h2>
            </div>
          </Hero>
        </Link>
        <Link to='/collection'>
          <Hero overlay={false} hasScroll={false} isParallax={false} imageWide={data.cat3}>
            <div className='glassTitle'>
              <h2 className='darkText uppercase' style={{ marginBottom: 0 }}>A line</h2>
            </div>
          </Hero>
        </Link>
        <hr className='divider' />
        <div className='gridTitle centerAlign'>
          <h4 className='uppercase'>Get inspired</h4>
          <h2>@cheriebridal</h2>
        </div>
        <InstaSlider />
        <hr className='divider' />
        <hr className='divider' />
        <Hero overlay={true} hasScroll={false} isParallax={true} imageWide={data.banner4wide}
          imageVertical={data.banner4wide}>
          <h2 className='uppercase' style={{ marginBottom: '1em' }}>Finding 'the' dress shouldn't be harder than</h2>
          <Link to='/booking'>
            <Button block style={{ width: '150px' }}>
              Get started
          </Button>
          </Link>
        </Hero>
        <hr className='divider' />
      </div>
    </Layout>
  );
};

export default HomePage;
