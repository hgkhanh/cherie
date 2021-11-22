import React, { useContext, useState, useEffect, MouseEvent } from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styles from './Product.module.scss';
// import SocialLinks from '../SocialLinks/SocialLinks';
import { Carousel, Select, Modal, Button, Icon } from "antd";
import { Spring } from 'react-spring/renderprops';
import VisibilitySensor from 'react-visibility-sensor';
import { Link } from 'gatsby';
import _ from 'lodash';
import { WindowDimensionsContext } from '../../shared/WindowDimensionsProvider';
import SliderArrow from '../SliderArrow';
import Image from "gatsby-image";
import RevealAnimation from '../../shared/RevealAnimation';
import SizeRequestForm from './SizeRequestForm';
import PurchaseForm from './PurchaseForm';

const Product = ({ product }) => {
    const KLARNA_PRODUCT_OBJECT = {
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
        "image_url": process.env.GATSBY_KLARNA_CHERIE_URL + "dresses/" + _.toLower(product.name),
        "group_identifier": "Dress"
    }
    const MIN_SIZE = 34;
    const MAX_SIZE = 52;
    const { Option } = Select;

    const sizes = [];
    const [selectedSize, setSelectedSize] = useState(null);
    for (let i = MIN_SIZE; i <= MAX_SIZE; i += 2) {
        sizes.push(<Option key={i}>{i}</Option>);
        // className={product.sizes.includes(i + '') ? '' : 'disabled'}>{i}</Option>);
    }
    const [isHeaderVisible, setHeaderVisible] = useState(false);
    const [isFooterVisible, setFooterVisible] = useState(false);
    const [sizePopupVisible, setSizePopupVisible] = useState(false);
    const [requestSize, setRequestSize] = useState(false);
    const [popupSuccess, setPopupSuccess] = useState(false);
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

    const handleSizeSelect = (value: any, event: any) => {
        console.log(`Selected size ${value}`);
        console.log('Selected element ', event);
        // if (product.sizes.includes(value)) {
        // update the value of the selector
        // setSelectedSize(value);
        // // update the size in Klarna buy button
        // let item = KLARNA_PRODUCT_OBJECT;
        // item.product_attributes = [{

        //     "identifier": "size",
        //     "identifier_label": "Size",
        //     "value": value,
        //     "value_label": value
        // }];
        // Klarna.InstantShopping.update({
        //     "setup": {
        //         "instance_id": "purchase-1"
        //     },
        //     "items": [item]
        // }, function (response: any) {
        //     console.log('Klarna.InstantShopping.update callback with data:' + JSON.stringify(response))
        // });
        // } else {
        //     // If size is unavailable, show popup
        setSizePopupVisible(true);
        setRequestSize(value);
        // }
    }

    // When close popup, reset the popupSuccess state
    useEffect(() => {
        if (!sizePopupVisible) {
            setTimeout(() => {
                setPopupSuccess(false);
            }, 1000);
        }
    }, [sizePopupVisible]);


    // Init Klarna on load
    useEffect(() => {
        // Check if window exist and screen is small
        if (typeof window !== 'undefined') {
            window.klarnaAsyncCallback = function () {
                try {
                    let item = KLARNA_PRODUCT_OBJECT;
                    item.product_attributes = [{
                        "identifier": "size",
                        "identifier_label": "Size",
                        "value": product.sizes[0],
                        "value_label": product.sizes[0]
                    }];
                    Klarna.InstantShopping.load({
                        "setup": {
                            "instance_id": "purchase-1",
                            "key": "e2313452-03b3-4e95-9697-27fc37c7dd05",
                            "environment": "production",
                            "region": "eu"
                        },
                        "purchase_country": "FI",
                        "locale": "en-US",
                        "items": [item]
                    }, function (response: any) {
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
            <Modal
                centered footer={null}
                visible={sizePopupVisible}
                onCancel={() => setSizePopupVisible(false)}
            >
                <h1>Send me this dress offer</h1>
                <div className={styles.form}>
                    {popupSuccess ? (
                        <React.Fragment>
                            <div className={styles.successMessage}>
                                <Icon type="check-circle" theme="filled" style={{ color: '#0f7d4a' }} />
                                <span>Thank you for your order. We will contact you promptly.</span>
                            </div>
                            <Button size="large" onClick={() => setSizePopupVisible(false)}>Continue Shopping</Button>
                        </React.Fragment>
                    ) : (
                            <PurchaseForm
                                productName={product.name} size={requestSize}
                                popupSuccess={popupSuccess} setPopupSuccess={setPopupSuccess} />
                            // <SizeRequestForm
                            //     productName={product.name} size={requestSize}
                            //     popupSuccess={popupSuccess} setPopupSuccess={setPopupSuccess} />
                        )
                    }
                </div>
                {/* <h1>Fully booked up</h1>
                <p>Let me know when it becomes available again!</p>
                <div className={styles.form}>
                    {popupSuccess ? (
                        <React.Fragment>
                            <div className={styles.successMessage}>
                                <Icon type="check-circle" theme="filled" style={{ color: '#0f7d4a' }} />
                                <span>We will email you if your size becomes available again.</span>
                            </div>
                            <Button size="large" onClick={() => setSizePopupVisible(false)}>Continue Shopping</Button>
                        </React.Fragment>
                    ) : (
                            <SizeRequestForm
                                productName={product.name} size={requestSize}
                                popupSuccess={popupSuccess} setPopupSuccess={setPopupSuccess} />
                        )
                    }
                </div> */}
            </Modal>
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
                        {(product.salePrice && parseInt(product.salePrice) < parseInt(product.price)) ? (
                            <div>
                                <span className={[styles.salePrice, 'grayText'].join(' ')}>{_.round((product.salePrice), 2).toFixed(0)}&nbsp;€</span>&nbsp;&nbsp;
                                <span className={[styles.oldPrice, 'grayText'].join(' ')}>{_.round((product.price), 2).toFixed(0)}&nbsp;€</span>
                            </div>
                        ) : (
                                <span className={[styles.price, 'grayText'].join(' ')}>{_.round((product.price), 2).toFixed(0)}&nbsp;€</span>
                            )}

                        <p className={styles.description}>{product.description}</p>
                        <div className={styles.borderBlock}>
                            <div>
                                <Link className={styles.checkSize} to='/size-guide'><span className="link">Check your size</span></Link>

                                {/* <h3>Details And Fit</h3>
                                            <p className='leftAlign grayText'>
                                                {product.detailsAndFit.map((line, index) => {
                                                    return (<React.Fragment key={index}>{`- ${line}`}<br /></React.Fragment>)
                                                })}
                                            </p> */}
                                <hr className='divider' />
                                <Select style={{ width: '300px' }} size="large"
                                    // onSelect={(value, event) => handleSizeSelect(value, event)}
                                    tokenSeparators={[',']} placeholder="Select Size" value={selectedSize || undefined}>
                                    {sizes}
                                </Select>
                                <hr className='divider' />
                                <Button type='primary' block style={{ width: '150px' }} onClick={handleSizeSelect}>
                                    Send me offer
                                </Button>
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
                        <klarna-instant-shopping data-instance-id="purchase-1" />
                    </div>
                </div>
            </div >

            <VisibilitySensor onChange={visiblity => {
                setFooterVisible(visiblity);
            }}>
                <div id="footerSensor" className={styles.sensor} />
            </VisibilitySensor>
        </React.Fragment >
    );
}

export default Product;