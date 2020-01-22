import React, { Component, Fragment } from "react";
import { Link } from "gatsby";
import VisibilitySensor from "react-visibility-sensor";
import * as styles from "./Header.module.scss";

class Header extends Component<{ config: any }, {}> {
  rightItems: any;
  leftItems: any;

  constructor(props) {
    super(props);

    this.leftItems = [
      { to: "/dresses", label: "Shop" },
      { to: "/category/", label: "Categories" },
      { to: "/about/", label: "About" }
    ];

    this.rightItems = [
      { to: "/contact/", label: "Contact" }
      // { to: "/search/", label: "Search", icon: FaSearch }
    ];
  }

  state = {
    fixed: false
  };

  visibilitySensorChange = val => {
    if (val) {
      this.setState({ fixed: false });
    } else {
      this.setState({ fixed: true });
    }
  };

  getHeaderStatus = () => {
    const fixed = this.state.fixed ? styles.fixed : "";

    return `${fixed}`;
  };

  render() {
    return (
      <Fragment>
        <VisibilitySensor onChange={this.visibilitySensorChange}>
          <div className={styles.sensor} />
        </VisibilitySensor>
        <header className={[styles.header, this.getHeaderStatus()].join(" ")}>
          <div className={styles.logoContainer}>
            <Link to="/">
              <h1>Cherie</h1>
            </Link>
          </div>
          <nav className={["grid", styles.menu].join(" ")}>
            <ul className={styles.menuLink}>
              {this.leftItems.map(item => (
                <Link to={item.to} key={item.label}>
                  {item.label}
                </Link>
              ))}
            </ul>
            <ul className={styles.menuLink}>
              {this.rightItems.map(item => (
                <Link to={item.to} key={item.label}>
                  {item.label}
                </Link>
              ))}
            </ul>
          </nav>
        </header>
      </Fragment>
    );
  }
}

export default Header;
