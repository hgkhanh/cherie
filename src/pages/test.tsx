import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout";
import Blog from "../components/Blog";

class ShopPage extends React.Component {
  separator = React.createRef();

  scrollToContent = e => {
    this.separator.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  render() {
    const {
      data: {
        posts: { edges: posts = [] }
      }
    } = this.props;


    return (
      <div>{JSON.stringify(posts)}</div>
    );
  }
}

ShopPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ShopPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query ShopQasdfuery {
    posts: allMarkdownRemark {
      edges {
        node {
          id
          excerpt
        }
      }
    }
  }
`;

//hero-background