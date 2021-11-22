import React from "react";
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from "gatsby";
import SEO from "../components/SEO";
import Post from "../components/Post";
import config from "../../data/SiteConfig";
import Layout from "../components/Layout";

const PostTemplate = (props: any) => {
  const { data, pageContext } = props;
  const { slug } = pageContext;

  const post = data.markdownRemark;
  const SEOData = {
    title: data.markdownRemark.frontmatter.title,
    description: data.markdownRemark.excerpt,
    featureImage: data.markdownRemark.frontmatter.cover,
  }
  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO productPath={slug} productData={SEOData} productSEO />
      <div className="grid">
        <Post post={post} />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html,
      frontmatter {
        title
        date
        cover {
          childCloudinaryAsset {
            fluid(maxWidth: 1600) {
              ...CloudinaryAssetFluid
            }
            fixed(width: 700) {
              ...CloudinaryAssetFixed
            }
          }
        }
      }
    }
  }
`
export default PostTemplate;

