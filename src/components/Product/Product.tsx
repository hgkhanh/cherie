import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styles from './Product.module.scss';
// import SocialLinks from '../SocialLinks/SocialLinks';
import { Row, Col, Carousel } from "antd";
import { Spring } from 'react-spring/renderprops';
import VisibilitySensor from 'react-visibility-sensor';
import { Link } from 'gatsby';
import _ from 'lodash';
import { useWindowDimensions } from '../../shared/WindowDimensionsProvider';
import SliderArrow from '../SliderArrow';
import Image from "gatsby-image";
import RevealAnimation from '../../shared/RevealAnimation';

const Product = ({ product }) => {
    const [isHeaderVisible, setHeaderVisible] = useState(false);
    const [isFooterVisible, setFooterVisible] = useState(false);
    const { width } = useWindowDimensions();
    const settings = {
        dots: true,
        infinite: true,
        autoplay: false,
        arrows: true,
        prevArrow: <SliderArrow to="prev" />,
        nextArrow: <SliderArrow to="next" />,
        autoplaySpeed: 4000,
        speed: 1000,
        easing: "ease-in-out",
        lazyLoad: 'progressive'
    };
    const getContainerClassName = () => {
        if (width < 770) {
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
            <div className={getContainerClassName()}>
                <Row type='flex' justify='center' align='stretch'>
                    {width < 770 ? (
                        <Col span={24}>
                            <Carousel {...settings}>
                                {product.galleryImages.map((image, index) => 
                                    <Image key={index} fluid={image.childImageSharp.fluid} alt='' />
                                )}
                            </Carousel>
                        </Col>
                    ) :
                        (
                            <Col span={0} md={12}>
                                {product.galleryImages.map((image, index) =>
                                    <RevealAnimation key={index} opacity>
                                        <Image key={index} fluid={image.childImageSharp.fluid} alt='' />
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
                                <h4 className={[styles.price, 'sansSerif grayText'].join(' ')}>£{_.round((product.price), 2).toFixed(2)}</h4>
                                <p className='grayText'>{product.description}</p>
                                <div className={styles.borderBlock}>
                                    <Row type='flex' justify='start' align='middle'
                                    >
                                        <Col className='leftAlign' span={24}>
                                            <h3>Details And Fit</h3>
                                            <p className='leftAlign grayText'>
                                                {product.detailsAndFit.map((line, index) => {
                                                    return (<React.Fragment key={index}>{`- ${line}`}<br /></React.Fragment>)
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
                setFooterVisible(visiblity);
            }}>
                <div className={styles.sensor} />
            </VisibilitySensor>
        </React.Fragment>
    );
}

export default Product;