import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import StylistPickForm from '../components/StylistPickForm';
import StylistService from '../components/StylistService';

const AboutPage = ({ location }) => {

  return (
    <Layout location={location}>
      <Helmet title={`Contact | ${config.siteTitle}`} />
      <h2 className="sectionTitle centerAlign">Let's find you a gown</h2>
      <StylistPickForm />
      <StylistService />
    </Layout>
  );
}

export default AboutPage;
