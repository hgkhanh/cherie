import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import About from "../components/About";
import config from "../../data/SiteConfig";

const AboutPage = ({ location }) => {
  return (
    <Layout location={location}>
      <Helmet title={`About | ${config.siteTitle}`} />
      <hr className='divider' />
      <div className='grid narrow centerAlign'>
        <h1>
          About
        </h1>
        <About />
      </div>
      <hr className='divider' />
    </Layout>
  );
}

export default AboutPage;
