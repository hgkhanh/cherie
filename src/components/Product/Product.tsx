import React, { useContext, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Helmet from "react-helmet";
import styles from './Product.module.scss';
// import SocialLinks from '../SocialLinks/SocialLinks';
import { Row, Col, Carousel, Button } from "antd";
import { Spring } from 'react-spring/renderprops';
import VisibilitySensor from 'react-visibility-sensor';
import { Link } from 'gatsby';
import _ from 'lodash';
import { WindowDimensionsContext } from '../../shared/WindowDimensionsProvider';
import SliderArrow from '../SliderArrow';
import Image from "gatsby-image";
import RevealAnimation from '../../shared/RevealAnimation';
const fetch = require(`node-fetch`);
const base64 = require('base-64');

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

    // Create session, and init Klarna
    const onKlarnaInit = () => {
        const url = process.env.GATSBY_KLARNA_BASE_URL
            + 'payments/v1/sessions';
        const order = {
            "purchase_country": "FI",
            "purchase_currency": "EUR",
            "locale": "en-US",
            "order_amount": 10,
            "order_tax_amount": 0,
            "order_lines": [{
                "type": "physical",
                "reference": "19-402",
                "name": "Battery Power Pack",
                "quantity": 1,
                "unit_price": 10,
                "tax_rate": 0,
                "total_amount": 10,
                "total_discount_amount": 0,
                "total_tax_amount": 0
            }]
        };
        // Create session
        fetch(url, {
            method: "POST",
            headers: {
                'Authorization': 'Basic '
                    + base64.encode(
                        process.env.GATSBY_KLARNA_API_USERNAME
                        + ':'
                        + process.env.GATSBY_KLARNA_API_PASSWORD
                    ),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(response => {
                console.log('response', response);
                response.json()
            })
            .then(data => {
                console.log('data', data);
                // get client token
                // Init
                Klarna.Payments.init({
                    client_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.dtxWM6MIcgoeMgH87tGvsNDY6cH'
                });
                // Load widget
                Klarna.Payments.load({
                    container: '#klarna-payments-container',
                    payment_method_category: 'pay_later'
                }, function (res) {
                    console.debug(res);
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <React.Fragment>
            <Helmet>
                <script src="https://x.klarnacdn.net/kp/lib/v1/api.js" async></script>
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
                                <Button type="primary" onClick={onKlarnaInit}>
                                    Buy with Klarna
                                </Button>
                                <div id="klarna-payments-container"></div>
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