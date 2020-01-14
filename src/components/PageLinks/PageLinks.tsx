import React, { Component } from "react";
import * as styles from "./PageLinks.module.scss";

class PageLinks extends Component<{ config: any, labeled: any }, {}> {
  getLinkElements() {
    const { PageLinks } = this.props.config;
    const { labeled } = this.props;
    return PageLinks.map(link => (
      <a href={link.url}  key={link.label}>
        <button type="button">
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
