import React, { useContext, useState, useEffect } from 'react';
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

    const getInfoDivClassName = () => {
        let classArray = [styles.infoContainer, styles.flexBlock];
        if (isFooterVisible) {
            classArray.push(styles.isPastFooter);
        }
        return classArray.join(' ');
    }

    useEffect(() => {
        // Check if window exist and screen is small
        if (typeof window !== 'undefined') {
            window.klarnaAsyncCallback = function () {
                try {
                    Klarna.InstantShopping.load({
                        "setup": {
                            "instance_id": "purchase-1",
                            "key": process.env.GATSBY_KLARNA_BUTTON_KEY,
                            "environment": process.env.NODE_ENV === "production" ? "production" : "playground",
                            "region": "eu"
                        },
                        "purchase_country": "FI",
                        "purchase_currency": "EUR",
                        "locale": "en-US",
                        "merchant_urls": {
                            "terms": process.env.GATSBY_KLARNA_CHERIE_URL + "about"
                        },
                        "order_lines": [{
                            "type": "physical",
                            "reference": "DRS-" + product.name,
                            "name": product.name,
                            "quantity": 1,
                            "unit_price": product.price * 100,
                            "tax_rate": 2400,
                            "total_amount": product.price * 100,
                            "total_discount_amount": 0,
                            "total_tax_amount": _.toInteger(product.price * 100 - (product.price * 100 * 10000) / (10000 + 2400)),
                            "product_url": process.env.GATSBY_KLARNA_CHERIE_URL + "dresses/" + _.toLower(product.name),
                            "image_url": process.env.GATSBY_KLARNA_CHERIE_URL + "dresses/" + _.toLower(product.name)
                        }],
                        "merchant_reference1": "45aa52f397871e3a210645d5", // optional
                        "shipping_options": [{ // add multiple if necessary
                            "id": "standard",
                            "name": "Standard 4-6 weeks",
                            "description": "Delivery by 4:30pm",
                            "price": 5000,
                            "tax_amount": 968,
                            "tax_rate": 2400,
                            "shipping_method": "PickUpStore"
                        }]
                    }, function (response) {
                        console.log('Klarna.InstantShopping.load callback with data:' + JSON.stringify(response))
                    })
                } catch (e) {
                    console.log(e);
                }
            };
        }
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <script src="https://x.klarnacdn.net/instantshopping/lib/v1/lib.js" async></script>
            </Helmet>
            <div className={styles.container}>
                {width < 600 ? (
                    <div className={styles.flexBlock}>
                        <Carousel {...settings}>
                            {product.galleryImages.map((image, index) =>
                                <Image key={index} fluid={image.childCloudinaryAsset.fluid} alt='' />
                            )}
                        </Carousel>
                    </div>
                ) :
                    (
                        <div className={styles.flexBlock}>
                            {product.galleryImages.map((image, index) =>
                                <RevealAnimation key={index} opacity>
                                    <Image key={index} fluid={image.childCloudinaryAsset.fluid} alt='' />
                                </RevealAnimation>
                            )}
                        </div>
                    )}

                <div className={getInfoDivClassName()}>
                    <VisibilitySensor onChange={visiblity => {
                        setHeaderVisible(visiblity);
                    }}>
                        <div id="infoSensor" className={styles.sensor} />
                    </VisibilitySensor>
                    <div className={styles.info}>
                        <h1 className={styles.name}>{product.name}</h1>
                        <h4 className={[styles.price, 'grayText'].join(' ')}>€{_.round((product.price), 2).toFixed(2)}</h4>
                        <p className={styles.description}>{product.description}</p>
                        <div className={styles.borderBlock}>
                            <div>
                                {/* <h3>Details And Fit</h3>
                                            <p className='leftAlign grayText'>
                                                {product.detailsAndFit.map((line, index) => {
                                                    return (<React.Fragment key={index}>{`- ${line}`}<br /></React.Fragment>)
                                                })}
                                            </p> */}
                                <Link className={styles.checkSize} to='/size-guide'><span className="link">Check your size</span></Link>
                            </div>
                            {/* <div>
                                    <div>
                                        Sizes
                                    </div>
                                    <div>
                                        {product.sizes.map((size, index) => {
                                            let text = size;
                                            // if (index < product.sizes.length - 1) {
                                            //     text += ', ';
                                            // }
                                            return (<span className='grayText' key={index}>{text}</span>)
                                        })}
                                    </div>
                                </div> */}
                            {/* <div>
                                <div>
                                    Tags
                                </div>
                                <div>
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
                                </div>
                            </div> */}
                        </div>
                        {/* <div>
                                Tags: <ProductTags tags={product.tags} />
                            </div> */}
                        {/* <SocialLinks productPath={slug} productNode={productNode} /> */}
                        <klarna-instant-shopping data-instance-id="purchase-1" data-environment="playground" />
                    </div>
                </div>
            </div >

            <VisibilitySensor onChange={visiblity => {
                setFooterVisible(visiblity);
            }}>
                <div id="footerSensor" className={styles.sensor} />
            </VisibilitySensor>
        </React.Fragment>
    );
}

export default Product;