import React from 'react';
import PropTypes from 'prop-types';
import styles from './Product.module.scss';
import ProductTags from "../ProductTags/ProductTags";
import SocialLinks from "../SocialLinks/SocialLinks";
import { Row, Col } from "antd";

const Product = ({ product }) => {
    return (
        <div className={['grid', 'flexSection', styles.container].join(' ')}>
            <Row type="flex" justify="center" align="top" gutter={20}>
                <Col span={12}>
                    {product.galleryImages.map((image, index) =>
                        <img key={index} src={image} />
                    )}
                </Col>
                <Col span={12}>
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
        </div>
    );
}

export default Product;