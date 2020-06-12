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
import TagsBlock from '../components/TagsBlock';
// import CampaignModal from '../components/CampaignModal';

const HomePage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      bannerTop: file(name: {eq: "Home-Page-Banner-Top"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 2400) {
            ...CloudinaryAssetFluid
          }
        }
      }

      bannerStory: file(name: {eq: "Home-Page-Banner-Story"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 2400) {
            ...CloudinaryAssetFluid
          }
        }
      }  
      
      bannerBottom: file(name: {eq: "Home-Page-Banner-Bottom"}) {
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
        <Hero overlay={false} hasScroll={false} isParallax={false}
          imageWide={data.bannerTop} mobileFullHeight={true} verticalAlign='bottom'>
          <h1 className='uppercase centerAlign darkerText heavyText' style={{ marginBottom: '1em' }}>Ready for the bridal Revolution?</h1>
          <Link to='/contact'>
            <Button type='primary' block style={{ width: '150px' }}>
              Get started
          </Button>
          </Link>
        </Hero>
        <RevealAnimation opacity transform>
          <ValueBlock />
        </RevealAnimation>
        <Hero overlay={true} overlayAlpha={0.2} hasScroll={false} isParallax={false} imageWide={data.bannerStory}
          mobileFullHeight={true} verticalAlign='top'>
          <h1 className='uppercase darkTone heavyText' style={{ marginBottom: '1em' }}>We are here for you</h1>
          <Link to='/about'>
            <Button type='primary' block style={{ width: '150px' }}>
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
        <TagsBlock />
        <hr className='divider' />
        <div className='sectionTitle centerAlign'>
          <h4 className='uppercase'>Get inspired</h4>
          <h2 className='heavyText'>@cheriebridal</h2>
        </div>
        <InstaSlider />
        <hr className='divider' />
        <hr className='divider' />
        <Hero overlay={false} hasScroll={false} isParallax={false} imageWide={data.bannerBottom} mobileFullHeight={true}
          verticalAlign='bottom'>
          <h1 className='uppercase heavyText centerAlign' style={{ marginBottom: '1em' }}>Finding 'the' dress shouldn't be hard</h1>
          <Link to='/contact'>
            <Button type='primary' block style={{ width: '150px' }}>
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
