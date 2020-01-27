import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Header from "../components/Header";
import Footer from "../components/Footer";
import './index.scss';

const MainLayout = (props) => {
  const { children } = props;
  return (
    <React.Fragment>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="en" />
      </Helmet>
      <Header config={config} />
      <main>{children}</main>
      <Footer config={config} />
    </React.Fragment>
  );
}

export default MainLayout;
