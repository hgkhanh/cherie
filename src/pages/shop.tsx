import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import siteConfig from "../../data/SiteConfig";
import ProductList from "../components/ProductList";
import { Spring, config } from 'react-spring/renderprops';

const ShopPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/products\\//"}}
        , sort: {fields: fileAbsolutePath, order: ASC}) {
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
                <h1 className="gridTitle">Shop</h1>
              </div>
              <hr className="divider" />
            </React.Fragment>
          )
          }
        </Spring>
        <div className="grid flexLeft">
          <ProductList products={products} />
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
