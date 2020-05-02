import React, { useState, useContext } from 'react';
import styles from './ProductList.module.scss';
import { Link } from 'gatsby';
import { Spring, config } from 'react-spring/renderprops'
import VisibilitySensor from 'react-visibility-sensor';
import { Row, Col } from "antd";
import Image from 'gatsby-image';
import { WindowDimensionsContext } from "../../shared/WindowDimensionsProvider";

const ProductCard = ({ product, index }) => {
    const [isVisible, setVisible] = useState(false);
    const { width } = useContext(WindowDimensionsContext);
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
                    <Col span={12} md={8} style={{ ...props }}>
                        <Link to={product.fields.slug} key={product.name} className={styles.card}>
                            <Image fluid={product.frontmatter.featureImage.childCloudinaryAsset.fluid} alt={product.name} />
                            <div className={`${styles.description} ${width <= 576 && styles.vertical}`}>
                                <h3>
                                    {product.frontmatter.name}
                                </h3>
                                {/* <span className={styles.price}>
                                    From € {product.frontmatter.price}
                                </span> */}
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
            <Row gutter={[{ xs: 10, sm: 15, md: 30, lg: 40, xl: 60, xxl: 80 }, { md: 10, lg: 0 }]} type="flex">
                {products.map((product, index) =>
                    <ProductCard product={product.node} key={product.node.frontmatter.name} index={index} />
                )}
            </Row>
        </div>
    );
}

export default ProductList;