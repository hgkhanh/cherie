import React from "react";
import { Helmet } from 'react-helmet';
import Layout from "../components/Layout";
import config from "../../data/SiteConfig";
import StylistPickForm from '../components/StylistPickForm';
import StylistService from '../components/StylistService';

const AboutPage = ({ location }) => {

  return (
    <Layout location={location}>
      <Helmet title={`Stylist Pick | ${config.siteTitle}`} />
      <h1 className='visuallyHidden'>Stylist Pick</h1>
      <h2 className="sectionTitle centerAlign">Let's find you a gown!</h2>
      <StylistPickForm />
      <StylistService />
    </Layout>
  );
}

export default AboutPage;
