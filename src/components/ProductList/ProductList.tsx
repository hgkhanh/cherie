import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';
import { Link } from 'gatsby';

const ProductCard = ({ product }) => (
    <Link to={product.fields.slug} key={product.name} className={styles.card}>
        <img src={product.frontmatter.featureImage}/>
        <div className={styles.description}>
            <h1>{product.frontmatter.name}</h1>
            <h3 className='sansSerif'>£ {product.frontmatter.price}</h3>
        </div>
    </Link>
);

const ProductList = ({ products }) => {
    return (
        <React.Fragment>
            {products.map((product) => <ProductCard product={product.node} key={product.node.frontmatter.name}/>)}
        </React.Fragment>
    );
}

export default ProductList;