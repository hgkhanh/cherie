import React, { useContext, useState, useEffect } from 'react';
import { Link, useStaticQuery } from 'gatsby';
import VisibilitySensor from 'react-visibility-sensor';
import styles from './Header.module.scss';
import { WindowDimensionsContext } from '../../shared/WindowDimensionsProvider';
import { Drawer, Icon } from 'antd';
import Image from 'gatsby-image';
import debounce from 'lodash/debounce';

const Header = ({ path }) => {
  const logo = useStaticQuery(graphql`
    query LogoQuery {
      dark: file(name: { eq: "logo-dark" }) {
        childCloudinaryAsset {
          fluid(maxWidth: 500) {
            ...CloudinaryAssetFluid
          }
        }
      }
      light: file(name: { eq: "logo-light" }) {
        childCloudinaryAsset {
          fluid(maxWidth: 500) {
            ...CloudinaryAssetFluid
          }
        }
      }
    }
    `)

  const { width } = useContext(WindowDimensionsContext);
  const [isDownScroll, setDownScroll] = useState(false);
  /**
   * Do a scroll check to hide header on mobile
   */

  // Min amount of scrolling to handle
  let lastScrollTop = 0;
  useEffect(() => {
    // Check if window exist and screen is small
    if (typeof window !== 'undefined' && width < 576) {
      lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.onscroll = (e) => {
        debounce(handleScroll, 200, { leading: true });
      }
    }
  }, []);

  const handleScroll = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      setDownScroll(true);
    } else {
      setDownScroll(false)
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }

  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { dark, light } = logo;
  let logoSize = 160;

  if (width <= 576) {
    logoSize = 125;
  } else if (width < 769) {
    logoSize = 140;
  }

  const isHomePage = path === '/';
  const getHeaderClassNames = () => {
    const isAtTop = isHeaderVisible ? styles.isAtTop : '';
    const homepage = isHomePage ? styles.homepage : '';
    const downScroll = isDownScroll ? styles.downScroll : '';

    return `${styles.header} ${isAtTop} ${homepage} ${downScroll}`;
  }


  return (
    <React.Fragment>
      <VisibilitySensor onChange={(visible) => setHeaderVisible(visible)}>
        <div className={styles.sensor} />
      </VisibilitySensor>
      <header className={getHeaderClassNames()}>
        <div className={styles.container}>
          {width <= 992 && (
            <Drawer
              placement="left"
              closable={true}
              onClose={() => setDrawerOpen(false)}
              visible={drawerOpen}
            >
              <Link to="/collection" className="Heading u-h6"><h1>Collection</h1></Link>
              <Link to="/booking" className="Heading u-h6"><h1>Booking</h1></Link>
              <Link to="/about" className="Heading u-h6"><h1>About</h1></Link>
            </Drawer>
          )}
          <div className={`${styles.block} ${styles.fill}`}>
            {width <= 992 && (
              <Icon type="menu" style={{ fontSize: '20px' }} onClick={() => setDrawerOpen(true)} />
            )}
            {width >= 993 && (
              <nav>
                <ul className="horizontalList">
                  <li>
                    <a href="/collection">Collection</a>
                  </li>
                  <li>
                    <a href="/about">About</a>
                  </li>
                </ul>
              </nav>
            )}
          </div>

          <div className={styles.block}>
            <Link to='/' className={styles.logoContainer} style={{ width: logoSize }}>
              <Image loading='eager' fluid={isHeaderVisible && isHomePage ? light.childCloudinaryAsset.fluid : dark.childCloudinaryAsset.fluid} />
            </Link>
          </div>

          <div className={`${styles.block} ${styles.fill}`}>
            {(width <= 992) && (
              <a href="/booking">
                <Icon type="calendar" style={{ fontSize: '20px' }} />
              </a>
            )}
            {(width >= 993) && (
              <nav>
                <ul className="horizontalList">
                  <li>
                    <a href="/booking">Book an Appointment</a>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}

export default Header;