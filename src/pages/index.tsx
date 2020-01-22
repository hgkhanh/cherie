import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import { Row, Col, Carousel } from "antd";

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    easing: "ease-in-out"
  };
  return (
    <Layout>
      <div className="pageContainer">
        <Helmet title={`Home | ${config.siteTitle}`} />
        <div className="grid">
          <Carousel {...settings}>
            <div>
              <img src="https://d3gmm2xq16tvhv.cloudfront.net/spree/cmsimage/788/homepage_carousel_retina/BlackFirdayDesktop.jpg?1542731636" />
            </div>
            <div>
              <img src="https://d3gmm2xq16tvhv.cloudfront.net/spree/cmsimage/809/homepage_carousel_normal/Web.png?1553871921" />
            </div>
            <div>
              <img src="https://d3gmm2xq16tvhv.cloudfront.net/spree/cmsimage/774/homepage_carousel_normal/Lola_W.jpg?1526569108" />
            </div>
            <div>
              <img src="https://d3gmm2xq16tvhv.cloudfront.net/spree/cmsimage/805/homepage_carousel_normal/Joan.jpg?1547759157" />
            </div>
          </Carousel>
        </div>
        <hr className="divider" />
        <div className="gridWrapper darkTone">
          <div className="grid flexSection">
            <Row type="flex" justify="center" align="top">
              <Col span={8}><h3>Who We Are</h3></Col>
              <Col span={8}>
                <p>Inspired by clean lines, last dances and beautiful hues, Name of
                Love is a collection of 17 styles in 9 signature colors. Made to
                be worn amongst the madly in love, even after 'I do'.</p>
              </Col>
            </Row>
          </div>
        </div>
        <hr className="divider" />
        <div className="grid flexSection">
          <h3>Shop</h3>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
