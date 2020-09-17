import React from "react";
import * as styles from "./Footer.module.scss";
import { Icon } from "antd";
import { Link } from "gatsby";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <hr className="divider" />
      <div className={styles.linkContainer}>
        <a href="//goo.gl/maps/sGsqDJexpQtTDLQA8" target="_blank" rel="noopener">
          <h4>Location</h4>
        </a>
        <Link to="/about">
          <h4>About</h4>
        </Link>
        {/* <Link to="/faq">
          <h3 className="">FAQ</h3>
        </Link> */}
        <a href="mailto:info@cheriebridal.fi" target="_blank" rel="noopener">
          <h4 className="">Contact</h4>
        </a>
      </div>
      <div>
        <a href="//www.instagram.com/cheriebridal/" target="_blank" rel="noopener">
          <Icon type="instagram" />
        </a>
      </div>
      <p>
        Chérie bridal shop<br />
        Sepänkatu 15, 00150, Helsinki<br />
        p: 0505 116 776<br />
        e: info@cheriebridal.fi
      </p>
      <p>
        Opening hours<br />
        Mon-Fri: 12 - 19 <br />
        Sat: 12 - 17<br />
        Sun: Closed
      </p>
    </footer >
  );
}

export default Footer;
