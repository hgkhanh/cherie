import React from "react";
import { Link } from "gatsby";

class ProductListing extends React.Component {
  getProductList() {
    const productList = [];
    this.props.productEdges.forEach(productEdge => {
      productList.push({
        path: productEdge.node.fields.slug,
        tags: productEdge.node.frontmatter.tags,
        cover: productEdge.node.frontmatter.cover,
        title: productEdge.node.frontmatter.title,
        date: productEdge.node.fields.date,
        excerpt: productEdge.node.excerpt,
        timeToRead: productEdge.node.timeToRead
      });
    });
    return productList;
  }

  render() {
    const productList = this.getProductList();
    return (
      <div>
        product listing component
        {/* Your product list here. */
        productList.map(product => (
          <Link to={product.path} key={product.title}>
            <h1>{product.title}</h1>
          </Link>
        ))}
      </div>
    );
  }
}

export default ProductListing;
