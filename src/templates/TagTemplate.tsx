import React from "react";
import { Link, graphql } from "gatsby";
import Helmet from "react-helmet";
import Layout from "../layout";
import siteConfig from "../../data/SiteConfig";
import ProductList from "../components/ProductList";
import { Spring, config } from 'react-spring/renderprops';

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const products = data.allMarkdownRemark.edges;
  return (
    <Layout location={location}>
      <div className="grid wide" >
        <Helmet title={`${tag} Collection | ${siteConfig.siteTitle}`} />
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
              <h1 className="sectionTitle" style={props}>{tag} collection</h1>
            </React.Fragment>
          )
          }
        </Spring>
        <ProductList products={products} />
      </div>
    </Layout>
  );
}

export default Tags;

export const pageQuery = graphql`
  query ProductByTag($tag: String) {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }) {      
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
`;
