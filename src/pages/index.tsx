import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import { Button } from 'antd';
class HomePage extends Component {
  render() {
    return (
      <Layout>
        <div className="home-container">
          Home
          <Helmet title={`Home | ${config.siteTitle}`} />
          <Button type="primary">Primary</Button>
        </div>
      </Layout>
    );
  }
}

export default HomePage;
