import React, { Component } from "react";
import _ from "lodash";
import { Link } from "gatsby";

class ProductTags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <div className="product-tag-container">
        {tags &&
          tags.map(tag => (
            <Link className="serif"
              key={tag}
              style={{ textDecoration: "none" }}
              to={`/tags/${_.kebabCase(tag)}`}
            >{tag}<span>&#44;&nbsp;</span></Link>
          ))}
      </div>
    );
  }
}

export default ProductTags;
