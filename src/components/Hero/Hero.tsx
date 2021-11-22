import React, { useContext, useState, useRef } from 'react';
import BackgroundImage from 'gatsby-background-image';
import styles from './Hero.module.scss';
import { Spring, config } from 'react-spring/renderprops';
import { Parallax } from 'react-parallax';
import { WindowDimensionsContext } from '../../shared/WindowDimensionsProvider';

const Hero = ({ overlay, overlayAlpha, hasScroll, isParallax, imageWide, imageVertical, mobileFullHeight, verticalAlign, children }) => {
  // mobileFullHeight: if true, the hero height will fullscreen (on mobile)
  // verticalAlign: how to align the text content on the hero: top, center, bottom
  const [active, setActive] = useState(false);
  const { width } = useContext(WindowDimensionsContext);

  let heroImage = imageWide;
  if (imageVertical && width <= 900) {
    heroImage = imageVertical;
  }

  const scrollBtn = useRef(null);
  const scrollToContent = () => {
    if (scrollBtn && scrollBtn.current) {
      scrollBtn.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };

  if (isParallax) {
    return (
      <Parallax bgImage={heroImage.childCloudinaryAsset.fluid.src}
        bgImageSrcSet={heroImage.childCloudinaryAsset.fluid.srcSet}
        strength={500}>
        <div className={mobileFullHeight ? `${styles.hero} ${styles.mobileFullHeight}` : styles.hero}>
          {overlay && (
            <div className={styles.overlay} style={{ backgroundColor: `rgba(0,0,0, ${overlayAlpha ? overlayAlpha : 0.3})` }} />
          )}
          <div className={verticalAlign ? `${styles.contentWrapper} ${styles[verticalAlign]}` : styles.contentWrapper}>
            {(verticalAlign === 'bottom') && (<div className={styles.filler}></div>)}
            <div className={styles.content}>{children}</div>
            {(verticalAlign === 'top') && (<div className={styles.filler}></div>)}
          </div>
        </div>
      </Parallax>
    )
  } else {
    return (
      <BackgroundImage
        className={mobileFullHeight ? `${styles.hero} ${styles.mobileFullHeight}` : styles.hero}
        fluid={heroImage.childCloudinaryAsset.fluid}
        loading='eager' backgroundColor={`#040e18`}>
        {overlay && (
          <div className={styles.overlay} style={{ backgroundColor: `rgba(0,0,0, ${overlayAlpha ? overlayAlpha : 0.3})` }} />
        )}
        <div className={verticalAlign ? `${styles.contentWrapper} ${styles[verticalAlign]}` : styles.contentWrapper}>
          {(verticalAlign === 'bottom') && (<div className={styles.filler}></div>)}
          <div className={styles.content}>{children}</div>
          {(verticalAlign === 'top') && (<div className={styles.filler}></div>)}
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
    )
  }
};


export default Hero;