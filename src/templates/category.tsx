// import React from "react";
// import Helmet from "react-helmet";
// import { graphql } from "gatsby";
// import Layout from "../layout";
// import PostListing from "../components/ProductListing/ProductListing";
// import config from "../../data/SiteConfig";

// const CategoryTemplate = (props) => {
//   const { category } = props.pageContext;
//   const postEdges = props.data.allMarkdownRemark.edges;
//   return (
//     <Layout>
//       <div className="category-container">
//         <Helmet
//           title={`Posts in category "${category}" | ${config.siteTitle}`}
//         />
//         <PostListing postEdges={postEdges} />
//       </div>
//     </Layout>
//   );
// }

// /* eslint no-undef: "off" */
// export const pageQuery = graphql`
//   query CategoryPage($category: String) {
//     allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/products\\//"}}) {
//       totalCount
//       edges {
//         node {
//           id
//           frontmatter {
//             category
//             name
//             featureImage {
//               childCloudinaryAsset {
//                 fluid(maxWidth: 1600) {
//                   ...CloudinaryAssetFluid
//                 }
//               }
//             }
//             description
//             price
//             sizes
//             tags
//           }
//         }
//       }
//     }
//   }
// `;

// export default CategoryTemplate;
