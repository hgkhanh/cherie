import React from 'react';
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet';
import siteConfig from '../../data/SiteConfig';
import Layout from '../layout';
import { Row, Col } from 'antd';
import RevealAnimation from '../shared/RevealAnimation';
import ProductList from '../components/ProductList';
import Hero from '../components/Hero';

const HomePage = (props) => {
  const products = props.data.products.edges;

  return (
    <Layout path={props.path}>
      <div className='pageContainer'>
        <Helmet title={`Home | ${siteConfig.siteTitle}`} />
        <Hero/>
        <hr className='divider' />
        <RevealAnimation opacity transform>
          <div className='gridWrapper'>
            <div className='grid flexSection boxContent'>
              <Row type='flex' justify='center' justify='center'>
                <Col className='gutter-row' span={16}><h1>Who We Are</h1></Col>
                <Col className='gutter-row' span={16}>
                  <p>Inspired by clean lines, last dances and beautiful hues, Made to
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
              childImageSharp {
                fluid(maxWidth: 1600) {
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
  }
`;


export default HomePage;
