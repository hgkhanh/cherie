import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import Helmet from "react-helmet";
import Layout from "../layout";
import siteConfig from "../../data/SiteConfig";
import { Row, Col, Carousel } from "antd";
import withRevealAnimation from '../shared/withRevealAnimation';
import ProductList from '../components/ProductList';

const HomePage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              category
              name
              galleryImages
              featureImage
              description
              price
              sizes
              tags
            }
          }
        }
      }
    }
  `);
  const products = data.allMarkdownRemark.edges;
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    easing: "ease-in-out"
  };
  return (
    <Layout>
      <div className="pageContainer">
        <Helmet title={`Home | ${siteConfig.siteTitle}`} />
        {withRevealAnimation((props) => (
          <div className="grid" style={{ ...props }}>
            <Carousel {...settings}>
              <div>
                <img src="/assets/home-slide-1.jpg" />
              </div>
              <div>
                <img src="/assets/home-slide-4.jpg" />
              </div>
              <div>
                <img src="/assets/home-slide-2.jpg" />
              </div>
              <div>
                <img src="/assets/home-slide-3.jpg" />
              </div>
            </Carousel>
          </div>
        ))}
        <hr className="divider" />
        {withRevealAnimation((props) => (
          <div className="gridWrapper darkTone" style={{ ...props }}>
            <div className="grid flexSection">
              <Row type="flex" justify="center" align="top">
                <Col span={8}><h1>Who We Are</h1></Col>
                <Col span={8}>
                  <p>Inspired by clean lines, last dances and beautiful hues, Name of
                  Love is a collection of 17 styles in 9 signature colors. Made to
                be worn amongst the madly in love, even after 'I do'.</p>
                </Col>
              </Row>
            </div>
          </div>
        ))}
        <hr className="divider" />
        <div className="grid">
          <div className="gridTitle">
            <h1>Shop</h1>
          </div>
          <ProductList products={products} />
        </div>
        <hr className="divider" />
      </div>
    </Layout>
  );
};

export default HomePage;
