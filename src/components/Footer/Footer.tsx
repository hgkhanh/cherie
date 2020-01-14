import React, { Component } from "react";
import { Link } from "gatsby";
import PageLinks from "../PageLinks/PageLinks";
import * as styles from "./Footer.module.scss";

class Footer extends Component<{ config: any }, {}> {
  render() {
    const { config } = this.props;
    const url = config.siteRss;
    const { copyright } = config;
    if (!copyright) {
      return null;
    }
    return (
      <footer className={styles.footer}>
        Copyright © 2020 by Chérie
      </footer>
    );
  }
}

export default Footer;
