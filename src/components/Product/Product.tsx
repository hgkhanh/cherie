import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styles from './Product.module.scss';
import ProductTags from '../ProductTags/ProductTags';
// import SocialLinks from '../SocialLinks/SocialLinks';
import { Row, Col } from 'antd';
import { Spring } from 'react-spring/renderprops';
import VisibilitySensor from 'react-visibility-sensor';
import { Link } from 'gatsby';
import _ from 'lodash';

const Picture = ({ image }) => {
    const [isVisible, setView] = useState(false);

    return (
        <div className={styles.imageContainer}>
            <VisibilitySensor onChange={visible => {
                if (visible) {
                    setView(visible);
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
    return (
        <React.Fragment>
            <div className={['grid', 'flexSection', styles.container].join(' ')}>
                <Row type='flex' justify='center' align='stretch' gutter={20}>
                    <Col span={12}>
                        {product.galleryImages.map((image, index) =>
                            <Picture key={index} image={image} />
                        )}
                    </Col>
                    <Col span={12} className={isFooterVisible ?
                        [styles.infoContainer, styles.isPastFooter].join(' ') : styles.infoContainer}>
                        <Row type='flex' justify='center' align='middle'>
                            <Col className={styles.info} span={24}>
                                <h1 className={styles.name}>{product.name}</h1>
                                <h4 className={[styles.price, 'sansSerif grayText'].join(' ')}>£{_.round((product.price), 2).toFixed(2)}</h4>
                                <p className='grayText'>{product.description}</p>
                                <div className={styles.borderBlock}>
                                    <Row type='flex' justify='start' align='middle'
                                        >
                                        <Col className='leftAlign' span={24}>
                                            <h3>Details And Fit</h3>
                                            <p className='leftAlign grayText'>
                                                {product.detailsAndFit.map((line, index) => {
                                                    return (<React.Fragment key={index}>{`- ${line}`}<br/></React.Fragment>)
                                                })}
                                            </p>    
                                            <Link className={styles.checkSize} to='#'>Check your size</Link>                                        
                                        </Col>                                        
                                    </Row>
                                    <Row type='flex' justify='space-between' align='middle'
                                        className='sansSerif'>
                                        <Col className='leftAlign' span={8}>
                                            Sizes
                                        </Col>
                                        <Col className='rightAlign' span={8}>
                                            {product.sizes.map((size, index) => {
                                                let text = size;
                                                if (index < product.sizes.length - 1) {
                                                    text += ', ';
                                                }
                                                return (<span className='grayText' key={index}>{text}</span>)
                                            })}
                                        </Col>
                                    </Row>
                                    <Row type='flex' justify='space-between' align='middle'
                                        className='sansSerif'>
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
                                    </Row>
                                </div>
                                {/* <div>
                                Tags: <ProductTags tags={product.tags} />
                            </div> */}
                                {/* <SocialLinks productPath={slug} productNode={productNode} /> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div >

            <VisibilitySensor onChange={visiblity => {
                setFooterView(visiblity);
            }}>
                <div className={styles.sensor} />
            </VisibilitySensor>
        </React.Fragment>
    );
}

export default Product;