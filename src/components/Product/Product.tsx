import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styles from './Product.module.scss';
import ProductTags from "../ProductTags/ProductTags";
// import SocialLinks from "../SocialLinks/SocialLinks";
import { Row, Col } from "antd";
import { Spring } from "react-spring/renderprops";
import VisibilitySensor from "react-visibility-sensor";
import 'lazysizes';

const Picture = ({ image }) => {
    const [isVisible, setView] = useState(false);

    return (
        <div className={styles.imageContainer}>
            <VisibilitySensor offset={{ top: 10 }} onChange={visible => {
                if (visible) {
                    setView(visible);
                    console.log('picVisible:' + visible);
                }
            }}>
                <div className={styles.sensor} />
            </VisibilitySensor>
            <Spring to={{
                opacity: isVisible ? 1 : 0,
            }}>
                {props => <img style={{ ...props }} src={image} />}
            </Spring>
        </div>
    )
};

const Product = ({ product }) => {
    const [isFooterVisible, setFooterView] = useState(false);
    const onChange = visiblity => {
        setFooterView(visiblity);
        console.log('footerVisible: ' + visiblity);
    };
    return (
        <React.Fragment>
            <div className={['grid', 'flexSection', styles.container].join(' ')}>
                <Row type="flex" justify="center" align="stretch" gutter={20}>
                    <Col span={12}>
                        {product.galleryImages.map((image, index) =>
                            <Picture key={index} image={image} />
                        )}
                    </Col>
                    <Col span={12} className={isFooterVisible ?
                        [styles.infoContainer, styles.isPastFooter].join(' ') : styles.infoContainer}>
                        <Row type="flex" justify="center" align="middle">
                            <Col className={styles.info} span={12}>
                                <h1>{product.name}</h1>
                                <h3 className='sansSerif'>£ {product.price}</h3>
                                <p>{product.description}</p>
                                <div>
                                    Sizes:&nbsp;
                                {product.sizes.map((size, index) => <span key={index}>{`${size + ', '}`}</span>)}
                                </div>
                                <div>
                                    Tags: <ProductTags tags={product.tags} />
                                </div>
                                {/* <SocialLinks productPath={slug} productNode={productNode} /> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div >

            <VisibilitySensor onChange={onChange}>
                <div className={styles.sensor} />
            </VisibilitySensor>
        </React.Fragment>
    );
}

export default Product;