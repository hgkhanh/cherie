import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import About from "../components/About/About";
import config from "../../data/SiteConfig";

const AboutPage = () => {
  return (
    <Layout>
      <div className="about-container">
        <Helmet title={`About | ${config.siteTitle}`} />
        about
        <About />
      </div>
    </Layout>
  );
}

export default AboutPage;
