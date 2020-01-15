import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Header from "../components/Header";
import Footer from "../components/Footer";
import './index.scss';
export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <html lang="en" />
        </Helmet>
        <Header config={config} />
        <main>{children}</main>
        <Footer config={config} />
      </Fragment>
    );
  }
}
