import React from "react";
import BackgroundImage from 'gatsby-background-image';
import styles from './Hero.module.scss';

const Hero = ({ image }) => {
    return (
        <BackgroundImage
            className={styles.hero}
            fluid={image.childCloudinaryAsset.fluid}
            backgroundColor={`#040e18`}
        >
            <h2>Face of love</h2>
            <button className={styles.scrollButton}>
                <svg class="Icon Icon--arrow-bottom" role="presentation" viewBox="0 0 21 11">
                    <polyline fill="none" stroke="currentColor" points="0.5 0.5 10.5 10.5 20.5 0.5" stroke-width="1.25"></polyline>
                </svg>
            </button>
        </BackgroundImage>
    );
};


export default Hero;
