import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import Helmet from "react-helmet";
import Layout from "../layout";
import siteConfig from "../../data/SiteConfig";
import { Row, Col, Carousel } from "antd";
import RevealAnimation from '../shared/RevealAnimation';
import ProductList from '../components/ProductList';
import Image from "gatsby-image";

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
              featureImage {
                childImageSharp {
                  fluid(quality: 100) {
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
            fluid(maxWidth: 2400, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);
  const products = data.allMarkdownRemark.edges;
  const carouselPics = data.allFile.nodes;
  console.log(carouselPics);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    easing: "ease-in-out",
    lazyLoad: 'progressive'
  };
  return (
    <Layout>
      <div className="pageContainer">
        <Helmet title={`Home | ${siteConfig.siteTitle}`} />
        <RevealAnimation opacity transform>
          <div className="grid">
            <Carousel {...settings}>
              {carouselPics.map((pic, index) => 
                <Image key={index} fluid={pic.childImageSharp.fluid} alt=""/> 
              )}
            </Carousel>
          </div>
        </RevealAnimation>
        <hr className="divider" />
        <RevealAnimation opacity transform>
          <div className="gridWrapper darkTone">
            <div className="grid flexSection boxContent">
              <Row type="flex" justify="center" align="top">
                <Col className="gutter-row" span={24} md={8}><h1>Who We Are</h1></Col>
                <Col className="gutter-row" span={24} md={8}>
                  <p>Inspired by clean lines, last dances and beautiful hues, Name of
                  Love is a collection of 17 styles in 9 signature colors. Made to
                be worn amongst the madly in love, even after 'I do'.</p>
                </Col>
              </Row>
            </div>
          </div>
        </RevealAnimation>
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
