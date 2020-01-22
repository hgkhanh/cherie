import React from 'react';
import PropTypes from 'prop-types';
import styles from './Product.module.scss';
import ProductTags from "../ProductTags/ProductTags";
import SocialLinks from "../SocialLinks/SocialLinks";

const Product = ({ product }) => {
    return (
        <div className={['grid', styles.container].join(' ')}>
            <div className={[styles.column, styles.left].join(' ')}>
                <img src={product.featureImage}/>
                
            </div>
            <div className={[styles.column, styles.right].join(' ')}>
                <h1>{product.name}</h1>
                <h3 className='sansSerif'>£ {product.price}</h3>
                <p>{product.description}</p>
                {product.sizes.map(size => <span>{`${size + ','}`}</span>)}
                Tags: <ProductTags tags={product.tags} />
                {/* <SocialLinks productPath={slug} productNode={productNode} /> */}
            </div>
        </div>
    );
}

export default Product;