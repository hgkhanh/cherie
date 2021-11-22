import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import Layout from "../components/Layout";
import FAQ from "../components/FAQ";
import config from "../../data/SiteConfig";

const FAQPage = ({ location }) => {
  return (
    <Layout location={location}>
      <Helmet title={`FAQ | ${config.siteTitle}`} />
      <hr className='divider' />
      <div className='grid'>
        <h1 className="centerAlign">
          FAQ
        </h1>
        <FAQ />
      </div>
      <hr className='divider' />
    </Layout>
  );
}

export default FAQPage;
