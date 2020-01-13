import React, { Component } from "react";
import * as styles from "./PageLinks.module.scss";

class PageLinks extends Component {
  getLinkElements() {
    const { PageLinks } = this.props.config;
    const { labeled } = this.props;
    return PageLinks.map(link => (
      <a href={link.url}>
        <button type="button" key={link.label}>
          {labeled ? link.label : ""}
        </button>
      </a>
    ));
  }

  render() {
    const { PageLinks } = this.props.config;
    if (!PageLinks) {
      return null;
    }
    return <div className={styles.pageLinks}>{this.getLinkElements()}</div>;
  }
}

export default PageLinks;
