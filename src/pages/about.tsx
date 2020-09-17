import React from "react";
import { Helmet } from 'react-helmet';
import Layout from "../components/Layout";
import config from "../../data/SiteConfig";
import About from '../components/About';

const AboutPage = ({ location }) => {

  return (
    <Layout location={location}>
      <Helmet title={`About | ${config.siteTitle}`} />
      <div className="grid wide" >
        <About />
      </div>
    </Layout>
  );
}

export default AboutPage;
