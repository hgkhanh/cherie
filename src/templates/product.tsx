import React from "react";
import Helmet from "react-helmet";
import { graphql, PageRendererProps, useStaticQuery } from "gatsby";
import Layout from "../layout";
import Product from "../components/Product/Product";
import SEO from "../components/SEO/SEO";
import Footer from "../components/Footer/Footer";
import config from "../../data/SiteConfig";
import "./b16-tomorrow-dark.scss";
import "./product.scss";

const ProductTemplate = (props: any) => {
  const { data, path, pageContext } = props;
  const product = data.markdownRemark.frontmatter;
  const { slug } = pageContext;
  return (
    <Layout>
      <div className="pageContainer">
        <Helmet>
          <title>{`${product.name} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO productPath={slug} productData={product} productSEO />
        <Product product={product} />
      </div>
    </Layout>
  );
}

export const productQuery = graphql`
    query ProductBySlug($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug } }) {
        frontmatter {
          category
          description
          galleryImages {
            childCloudinaryAsset {
              fluid(maxWidth: 1600) {
                ...CloudinaryAssetFluid
              }
            }
          }
          featureImage {
            childCloudinaryAsset {
              fixed(width: 700) {
                ...CloudinaryAssetFixed
              }
            }
          }
          name
          price
          detailsAndFit
          sizes
          tags
        }
      }
    }
  `;

export default ProductTemplate;

