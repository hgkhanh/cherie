import React, { Component } from "react";
import "./PageLinks.css";

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
    return <div className="page-links">{this.getLinkElements()}</div>;
  }
}

export default PageLinks;
