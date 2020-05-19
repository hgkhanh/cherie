import React, { useContext, useState } from 'react';
// import PropTypes from 'prop-types';
import Helmet from "react-helmet";
import styles from './Product.module.scss';
// import SocialLinks from '../SocialLinks/SocialLinks';
import { Row, Col, Carousel } from "antd";
import { Spring } from 'react-spring/renderprops';
import VisibilitySensor from 'react-visibility-sensor';
import { Link } from 'gatsby';
import _ from 'lodash';
import { WindowDimensionsContext } from '../../shared/WindowDimensionsProvider';
import SliderArrow from '../SliderArrow';
import Image from "gatsby-image";
import RevealAnimation from '../../shared/RevealAnimation';

const Product = ({ product }) => {
    const [isHeaderVisible, setHeaderVisible] = useState(false);
    const [isFooterVisible, setFooterVisible] = useState(false);
    const { width } = useContext(WindowDimensionsContext);
    const settings = {
        dots: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 4000,
        speed: 1000,
        easing: "ease-in-out",
        lazyLoad: 'progressive'
    };
    const getContainerClassName = () => {
        if (width < 769) {
            return ['grid', styles.container].join(' ');
        }
        return ['grid', 'boxContent', styles.container].join(' ');
    }

    const getInfoDivClassName = () => {
        let classArray = [styles.infoContainer];
        if (isHeaderVisible) {
            classArray.push(styles.isAtTop);
        }
        if (isFooterVisible) {
            classArray.push(styles.isPastFooter);
        }
        return classArray.join(' ');
    }

    return (
        <React.Fragment>
            <Helmet>
                <script>
                {`
                    window.klarnaAsyncCallback = function () {
                    Klarna.InstantShopping.load({
                        "setup": {
                        "instance_id": "purchase-1",
                        "key": "c3003865-4d08-404a-aa32-34fd321dfb2c",
                        "environment": "development",
                        "region": "eu"
                        },
                        "purchase_country": "FI",
                        "purchase_currency": "EUR",
                        "locale": "en-us",
                        "merchant_urls": {
                        "terms": "https://feature-klarna.cheriebridal.fi/about", // mandatory
                        },
                        "order_lines": [{
                        "type": "physical",
                        "reference": "19-402-B",
                        "name": "Battery Power Pack Black",
                        "quantity": 1,
                        "unit_price": 119000,
                        "tax_rate": 2500,
                        "total_amount": 119000,
                        "total_discount_amount": 0,
                        "total_tax_amount": 23800,
                        "product_url": "https://www.example.com/products/f2a8d7e34",
                        "image_url": "https://www.example.com/products/f2a8d7e34"
                        }],
                        "merchant_reference1": "45aa52f397871e3a210645d5", // optional
                        "shipping_options": [{ // add multiple if necessary
                        "id": "express_priority",
                        "name": "Express 1-2 days",
                        "description": "Delivery by 4:30pm",
                        "price": 5000,
                        "tax_amount": 1000,
                        "tax_rate": 2500,
                        "shipping_method": "PickUpStore"
                        }]
                    }, function (response) {
                        console.log('Klarna.InstantShopping.load callback with data:' + JSON.stringify(response))
                    })
                    };
                `}
                </script>
                <script src="https://x.klarnacdn.net/instantshopping/lib/v1/lib.js" async></script>
            </Helmet>
            <div className={getContainerClassName()}>
                <Row type='flex' justify='center' align='stretch'>
                    {width < 769 ? (
                        <Col span={24}>
                            <Carousel {...settings}>
                                {product.galleryImages.map((image, index) =>
                                    <Image key={index} fluid={image.childCloudinaryAsset.fluid} alt='' />
                                )}
                            </Carousel>
                        </Col>
                    ) :
                        (
                            <Col span={0} md={12}>
                                {product.galleryImages.map((image, index) =>
                                    <RevealAnimation key={index} opacity>
                                        <Image key={index} fluid={image.childCloudinaryAsset.fluid} alt='' />
                                    </RevealAnimation>
                                )}
                            </Col>
                        )}

                    <Col span={24} md={12} className={getInfoDivClassName()}>
                        <VisibilitySensor onChange={visiblity => {
                            setHeaderVisible(visiblity);
                        }}>
                            <div className={styles.sensor} />
                        </VisibilitySensor>
                        <Row type='flex' justify='center' align='middle'>
                            <Col className={styles.info} span={24}>
                                <h1 className={styles.name}>{product.name}</h1>
                                {/* <h4 className={[styles.price, 'grayText'].join(' ')}>From €{_.round((product.price), 2).toFixed(2)}</h4> */}
                                <p className={styles.description}>{product.description}</p>
                                <div className={styles.borderBlock}>
                                    <Row type='flex' justify='start' align='middle'>
                                        <Col span={24}>
                                            {/* <h3>Details And Fit</h3>
                                            <p className='leftAlign grayText'>
                                                {product.detailsAndFit.map((line, index) => {
                                                    return (<React.Fragment key={index}>{`- ${line}`}<br /></React.Fragment>)
                                                })}
                                            </p> */}
                                            <Link className={styles.checkSize} to='/size-guide'><span className="link">Check your size</span></Link>
                                        </Col>
                                    </Row>
                                    {/* <Row type='flex' justify='space-between' align='middle'>
                                        <Col className='leftAlign' span={8}>
                                            Sizes
                                        </Col>
                                        <Col className='rightAlign' span={8}>
                                            {product.sizes.map((size, index) => {
                                                let text = size;
                                                // if (index < product.sizes.length - 1) {
                                                //     text += ', ';
                                                // }
                                                return (<span className='grayText' key={index}>{text}</span>)
                                            })}
                                        </Col>
                                    </Row> */}
                                    {/* <Row type='flex' justify='space-between' align='middle'>
                                        <Col className='leftAlign' span={12}>
                                            Tags
                                        </Col>
                                        <Col className='rightAlign' span={12}>
                                            {product.tags.map((tag, index) => {
                                                let text = tag;
                                                if (index < product.tags.length - 1) {
                                                    text += ', ';
                                                }
                                                return (
                                                    <Link className='grayText'
                                                        key={tag}
                                                        style={{ textDecoration: 'none' }}
                                                        to={`/tags/${_.kebabCase(tag)}`}
                                                    >{text}</Link>
                                                )
                                            })}
                                        </Col>
                                    </Row> */}
                                </div>
                                {/* <div>
                                Tags: <ProductTags tags={product.tags} />
                            </div> */}
                                {/* <SocialLinks productPath={slug} productNode={productNode} /> */}
                                <klarna-instant-shopping data-instance-id="purchase-1" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div >

            <VisibilitySensor onChange={visiblity => {
                setFooterVisible(visiblity);
            }}>
                <div className={styles.sensor} />
            </VisibilitySensor>
        </React.Fragment>
    );
}

export default Product;