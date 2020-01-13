import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";

class HomePage extends Component {
  render() {
    return (
      <Layout>
        <div className="home-container">
          Home
          <Helmet title={`Home | ${config.siteTitle}`} />
          Home
        </div>
      </Layout>
    );
  }
}

export default HomePage;
