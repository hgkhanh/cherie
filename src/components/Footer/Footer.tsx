import React, { Component } from "react";
import * as styles from "./Footer.module.scss";

const Footer = (props) => {
  const { config } = props;
  const url = config.siteRss;
  const { copyright } = config;
  if (!copyright) {
    return null;
  }
  return (
    <footer className={[styles.footer, 'flexSection'].join(' ')}>
      Copyright © 2020 by Chérie
    </footer>
  );
}

export default Footer;
