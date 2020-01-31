import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';
import { Link } from 'gatsby';
import { Spring, config } from 'react-spring/renderprops'
import VisibilitySensor from 'react-visibility-sensor';
import { Row, Col } from "antd";
import Image from 'gatsby-image';

const ProductCard = ({ product, index }) => {
    const [isVisible, setVisible] = useState(false);
    return (
        <VisibilitySensor partialVisibility onChange={(visible) => {
            if (visible) {
                setVisible(visible);
            }
        }}>
            <Spring
                delay={100}
                config={config.slow}
                to={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0px)' : 'translateY(' + (20 * index + 50) + 'px)'
                }}
            >
                {props => (
                    <Col span={12} lg={8} style={{ ...props }}>
                        <Link to={product.fields.slug} key={product.name} className={styles.card}>
                            <Image fluid={product.frontmatter.featureImage.childImageSharp.fluid} alt="" />
                            <div className={styles.description}>
                                <h1>{product.frontmatter.name}</h1>
                                <h3 className='sansSerif'>£ {product.frontmatter.price}</h3>
                            </div>
                        </Link>
                    </Col>
                )}
            </Spring>
        </VisibilitySensor>
    )
};

const ProductList = ({ products }) => {
    return (
        <div className={styles.list}>
            <Row gutter={[{xs: 10, sm: 20, md: 30, lg: 40, xl: 60, xxl: 80 }, {md: 10, lg: 0 }]} type="flex">
                {products.map((product, index) =>
                    <ProductCard product={product.node} key={product.node.frontmatter.name} index={index} />
                )}
            </Row>
        </div>
    );
}

export default ProductList;