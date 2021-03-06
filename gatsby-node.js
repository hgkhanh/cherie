/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "name")
    ) {
      slug = `/dresses/${_.kebabCase(node.frontmatter.name)}`;
    } else if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/posts/${_.kebabCase(node.frontmatter.title)}`;
    }
    else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const productPage = path.resolve("src/templates/ProductTemplate.tsx");
  const postPage = path.resolve("src/templates/PostTemplate.tsx");
  const tagPage = path.resolve("src/templates/TagTemplate.tsx");
  // const categoryPage = path.resolve("src/templates/category.tsx");
  // const listingPage = path.resolve("./src/templates/listing.tsx");

  // Get a full list of markdown products
  const markdownQueryResult = await graphql(`
    {
      products: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/products\\//"}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              category
              name
            }
          }
        }
      }
      posts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/posts\\//"}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }

      tags: allMarkdownRemark(limit: 200) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  // const categorySet = new Set();

  const productsEdges = markdownQueryResult.data.products.edges;
  const postsEdges = markdownQueryResult.data.posts.edges;
  const tags = markdownQueryResult.data.tags.group;

  // Sort products
  // productsEdges.sort((productA, productB) => {
  //   const dateA = moment(
  //     productA.node.frontmatter.date,
  //     siteConfig.dateFromFormat
  //   );

  //   const dateB = moment(
  //     productB.node.frontmatter.date,
  //     siteConfig.dateFromFormat
  //   );

  //   if (dateA.isBefore(dateB)) return 1;
  //   if (dateB.isBefore(dateA)) return -1;

  //   return 0;
  // });

  // Paging
  // const { productsPerPage } = siteConfig;
  // const pageCount = Math.ceil(productsEdges.length / productsPerPage);

  // [...Array(pageCount)].forEach((_val, pageNum) => {
  //   createPage({
  //     path: pageNum === 0 ? `/shop` : `/shop/${pageNum + 1}/`,
  //     component: listingPage,
  //     context: {
  //       limit: productsPerPage,
  //       skip: pageNum * productsPerPage,
  //       pageCount,
  //       currentPageNum: pageNum + 1
  //     }
  //   });
  // });

  // Product page creating
  productsEdges.forEach((edge) => {
    // Generate a list of categories
    // if (edge.node.frontmatter.category) {
    //   categorySet.add(edge.node.frontmatter.category);
    // }

    // Create product pages
    // const nextID = index + 1 < productsEdges.length ? index + 1 : 0;
    // const prevID = index - 1 >= 0 ? index - 1 : productsEdges.length - 1;
    // const nextEdge = productsEdges[nextID];
    // const prevEdge = productsEdges[prevID];
    createPage({
      path: `${edge.node.fields.slug}/`,
      component: productPage,
      context: {
        slug: edge.node.fields.slug
      }
    });
  });

  // Posts page creating
  postsEdges.forEach((edge) => {
    createPage({
      path: `${edge.node.fields.slug}/`,
      component: postPage,
      context: {
        slug: edge.node.fields.slug
      }
    });
  });

  //  Create tag pages
  tags.forEach(tag => {
    console.log(tag);
    console.log(_.kebabCase(tag.fieldValue));
    createPage({
      path: `/collection/${_.kebabCase(tag.fieldValue)}/`,
      component: tagPage,      
      context: {
        tag: tag.fieldValue,
      },
    });
  });

  // // Create category pages
  // categorySet.forEach(category => {
  //   createPage({
  //     path: `/categories/${_.kebabCase(category)}/`,
  //     component: categoryPage,
  //     context: { category }
  //   });
  // });
};
