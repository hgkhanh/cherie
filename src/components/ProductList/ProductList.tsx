import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';
import { Link } from 'gatsby';
import { Spring, config } from 'react-spring/renderprops'
import VisibilitySensor from 'react-visibility-sensor';

const ProductCard = ({ product, index }) => (
    <VisibilitySensor partialVisibility>
        {({ isVisible }) => (
            <Spring
                delay={index * 100}
                config={config.slow}
                to={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0px)' : 'translateY(' + (10 * index + 50) + 'px)'
                }}
            >
                {props => (
                    <Link to={product.fields.slug} key={product.name} className={styles.card} style={{ ...props }}>
                        <img src={product.frontmatter.featureImage} />
                        <div className={styles.description}>
                            <h1>{product.frontmatter.name}</h1>
                            <h3 className='sansSerif'>£ {product.frontmatter.price}</h3>
                        </div>
                    </Link>
                )}
            </Spring>
        )}
    </VisibilitySensor>
);

const ProductList = ({ products }) => {
    return (
        <React.Fragment>
            {products.map((product, index) =>
                <ProductCard product={product.node} key={product.node.frontmatter.name} index={index} />
            )}
        </React.Fragment>
    );
}

export default ProductList;