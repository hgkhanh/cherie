import React from "react";
import * as styles from "./Footer.module.scss";
import { Icon } from "antd";
import { Link } from "gatsby";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <hr className="divider" />
      <div className={styles.linkContainer}>
        <a href="//goo.gl/maps/xDcRUSp836pwG9vdA" target="_blank" rel="noopener">
          <h3>Chérie Location</h3>
        </a>
        <Link to="/about">
          <h3>About</h3>
        </Link>
        <Link to="/faq">
          <h3 className="">FAQ</h3>
        </Link>
        <a href="mailto:info@cheriebridal.fi" target="_blank" rel="noopener">
          <h3 className="">Contact</h3>
        </a>
      </div>
      <div>
        <a href="//www.instagram.com/cheriebridal/" target="_blank" rel="noopener">
          <Icon type="instagram" />
        </a>
      </div>
      <p style={{ color: "#9D9D9D" }}>
        Chérie bridal shop<br />
        Sepänkatu 15, 00150, Helsinki<br />
        p: 0505 116 776<br />
        e: info@cheriebridal.fi
      </p>
      <p style={{ color: "#9D9D9D" }}>
        Opening hours<br />
        Mon-Fri: 10 - 18 <br />
        Sat: 10 - 15<br />
        Sun: Closed
      </p>
    </footer >
  );
}

export default Footer;
