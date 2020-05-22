import React, { useState, useContext } from 'react';
import styles from './ProductList.module.scss';
import { Link } from 'gatsby';
import { Spring, config } from 'react-spring/renderprops'
import VisibilitySensor from 'react-visibility-sensor';
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
                    <div className={styles.card} style={{ ...props }}>
                        <Link to={product.fields.slug} key={product.name}>
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
                    </div>
                )}
            </Spring>
        </VisibilitySensor>
    )
};

const ProductList = ({ products }) => {
    return (
        <div className={styles.list}>
            {products.map((product, index) =>
                <ProductCard product={product.node} key={product.node.frontmatter.name} index={index} />
            )}
        </div>
    );
}

export default ProductList;