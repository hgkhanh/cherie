import React, { useContext, useState, useRef } from 'react';
import BackgroundImage from 'gatsby-background-image';
import styles from './Hero.module.scss';
import { Spring, config } from 'react-spring/renderprops';
import { WindowDimensionsContext } from '../../shared/WindowDimensionsProvider';

const Hero = ({ overlay, overlayAlpha, hasScroll, imageWide, imageVertical, children }) => {


  const [active, setActive] = useState(false);
  const { width } = useContext(WindowDimensionsContext);

  const heroImage = width <= 992 ? imageVertical : imageWide;

  const scrollBtn = useRef(null);
  const scrollToContent = () => {
    if (scrollBtn && scrollBtn.current) {
      scrollBtn.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };
  return (
    <BackgroundImage
      className={styles.hero}
      fluid={heroImage.childCloudinaryAsset.fluid}
      loading='eager'
      backgroundColor={`#040e18`}>
      {overlay && (
        <div className={styles.overlay} style={{ backgroundColor: `rgba(0,0,0, ${overlayAlpha ? overlayAlpha : 0.3})` }} />
      )}
      <div className={`${styles.textWrapper} darkTone centerAlign`}>
        {children}
      </div>
      {hasScroll && (
        <Spring
          config={config.slow}
          to={{
            transform: active ? 'scale(1.1)' : 'scale(1.0)'
          }}>
          {springStyles => (
            <button ref={scrollBtn} className={styles.scrollButton} style={{ ...springStyles }}
              onMouseEnter={() => setActive(true)}
              onMouseLeave={() => setActive(false)}
              onClick={scrollToContent}>
              <svg viewBox="0 0 21 11">
                <polyline fill="none" stroke="currentColor" points="0.5 0.5 10.5 10.5 20.5 0.5" strokeWidth="1.25"></polyline>
              </svg>
            </button>
          )}
        </Spring>
      )}
    </BackgroundImage>
  );
};


export default Hero;
