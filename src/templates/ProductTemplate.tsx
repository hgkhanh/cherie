import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../layout";
import Product from "../components/Product/Product";
import SEO from "../components/SEO";
import Recommendation from "../components/Recommendation";
import config from "../../data/SiteConfig";

const ProductTemplate = (props: any) => {
  const { data, pageContext } = props;
  const product = data.markdownRemark.frontmatter;
  const { slug } = pageContext;
  return (
    <Layout>
      <Helmet>
        <title>{`${product.name} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO productPath={slug} productData={product} productSEO />
      <div className="pageContainer">
        <Product product={product} />
        <Recommendation excludeId={data.markdownRemark.id}/>
      </div>
    </Layout>
  );
}

export const productQuery = graphql`
    query ProductBySlug($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug } }) {
        id
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

