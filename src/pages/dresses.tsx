import { graphql, useStaticQuery } from "gatsby"
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import ProductList from "../components/ProductList";


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
        <Helmet title={`Shop | ${config.siteTitle}`} />
        <div className="grid">
          <h1>Shop</h1>
        </div>
        <hr className="divider" />
        <div className="grid flexSection flexLeft">
          <ProductList products={products} />
        </div>
      </div>
    </Layout>
  );
};

export default DressPage;
