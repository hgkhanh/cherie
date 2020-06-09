import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import siteConfig from "../../data/SiteConfig";
import ProductList from "../components/ProductList";
import { Spring, config } from 'react-spring/renderprops';

const ShopPage = ({ location }) => {
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
  `);
  const products = data.allMarkdownRemark.edges;
  return (
    <Layout location={location}>
      <div className="grid wide" >
        <Helmet title={`Collection | ${siteConfig.siteTitle}`} />
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
              <h1 className="gridTitle" style={props}>Collection</h1>
            </React.Fragment>
          )
          }
        </Spring>
        <ProductList products={products} />
      </div>
    </Layout>
  );
};

export default ShopPage;
