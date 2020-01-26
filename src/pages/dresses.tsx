import { graphql, useStaticQuery } from "gatsby"
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import siteConfig from "../../data/SiteConfig";
import ProductList from "../components/ProductList";
import { Spring, config } from 'react-spring/renderprops'

const DressPage = () => {
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
  return (
    <Layout>
      <div className="shop-container">
        <Helmet title={`Shop | ${siteConfig.siteTitle}`} />
        <Spring
          delay={300}
          config={config.default}
          from={{
            opacity: 0,
            transform: "translateY(10px)"
          }}
          to={{
            opacity: 1,
            transform: "translateY(0px)"
          }}
        >
          {props => (
            <React.Fragment>
              <div className="grid" style={props}>
                <h1>Shop</h1>
              </div>
              <hr className="divider" />
            </React.Fragment>
          )
          }
        </Spring>
        <div className="grid flexSection flexLeft">
          <ProductList products={products} />
        </div>
      </div>
    </Layout>
  );
};

export default DressPage;
