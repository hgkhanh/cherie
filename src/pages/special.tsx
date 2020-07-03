// import { graphql, useStaticQuery } from "gatsby";
// import React from "react";
// import Helmet from "react-helmet";
// import Layout from "../layout";
// import siteConfig from "../../data/SiteConfig";
// import ProductList from "../components/ProductList";
// import { Spring, config } from 'react-spring/renderprops';

// const SpecialPage = ({ location }) => {
//   const data = useStaticQuery(graphql`
//     query {
//       allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/products\\//"}, 
//         frontmatter: {salePrice: {ne: null}}}, 
//         sort: {fields: fileAbsolutePath, order: ASC}) {
//         edges {
//           node {
//             id
//             fields {
//               slug
//             }
//             frontmatter {
//               category
//               name
//               featureImage {
//                 childCloudinaryAsset {
//                   fluid(maxWidth: 1600) {
//                     ...CloudinaryAssetFluid
//                   }
//                 }
//               }
//               description
//             price
//             salePrice
//               sizes
//               tags
//             }
//           }
//         }
//       }
//     }
//   `);
//   const products = data.allMarkdownRemark.edges;
//   return (
//     <Layout location={location}>
//       <div className="grid wide" >
//         <Helmet title={`Special | ${siteConfig.siteTitle}`} />
//         <Spring
//           delay={300}
//           config={config.default}
//           from={{
//             opacity: 0,
//             transform: "translateY(10px)"
//           }}
//           to={{
//             opacity: 1,
//             transform: "translateY(0px)"
//           }}
//         >
//           {props => (
//             <React.Fragment>
//               <h1 className="sectionTitle" style={props}>Special Offers</h1>
//             </React.Fragment>
//           )
//           }
//         </Spring>
//         <ProductList products={products} showPrice={true}/>
//       </div>
//     </Layout>
//   );
// };

// export default SpecialPage;
