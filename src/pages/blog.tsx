import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from 'react-helmet';
import Layout from "../components/Layout";
import siteConfig from "../../data/SiteConfig";
import Blog from "../components/Blog";

const BlogPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//posts/" } }
      ) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              title
              date
              cover {
                children {
                  ... on ImageSharp {
                    fluid(maxWidth: 800, maxHeight: 360) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout location={location}>
      <Helmet title={`Blog | ${siteConfig.siteTitle}`} />
      <div className="pageContainer">
        <hr className='divider' />
        <div className="grid">
          <h1>Blog</h1>
          <Blog posts={posts} />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
