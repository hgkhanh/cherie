import { graphql, PageRendererProps, useStaticQuery } from "gatsby"
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import ProductList from "../components/ProductList";

type Props = PageRendererProps

const ShopPage = (props: Props) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            excerpt
            fields {
              date
              slug
            }
            frontmatter {
              category
              cover
              title
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
          <h3>Shop</h3>
        </div>
        <hr className="divider" />
        <div className="grid flexSection flexLeft">
          <ProductList products={products} />
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
