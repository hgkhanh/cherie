import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';

const ProductCard = ({ product }) => (
    <div className={styles.card}>
        <h1>{product.frontmatter.title}</h1>
        <p>{product.excerpt}</p>
    </div>
);

const ProductList = ({ products }) => {
    return (
        <React.Fragment>
            {products.map((product) => <ProductCard product={product.node}/>)}
        </React.Fragment>
    );
}

export default ProductList;