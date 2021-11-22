import React, { useContext, useState, useEffect } from 'react';
import { Link, useStaticQuery } from 'gatsby';
import VisibilitySensor from 'react-visibility-sensor';
import styles from './Header.module.scss';
import { WindowDimensionsContext } from '../../shared/WindowDimensionsProvider';
import { Drawer, Icon } from 'antd';
import Image from 'gatsby-image';
import debounce from 'lodash/debounce';

const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";
const Header = ({ location }) => {
  const logo = useStaticQuery(graphql`
    query LogoQuery {
      dark_large: file(name: { eq: "logo-dark" }) {
        childImageSharp {
          fixed(width: 160) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      dark_medium: file(name: { eq: "logo-dark" }) {
        childImageSharp {
          fixed(width: 140) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      dark_small: file(name: { eq: "logo-dark" }) {
        childImageSharp {
          fixed(width: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      light_large: file(name: { eq: "logo-light" }) {
        childImageSharp {
          fixed(width: 160) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      light_medium: file(name: { eq: "logo-light" }) {
        childImageSharp {
          fixed(width: 140) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      light_small: file(name: { eq: "logo-light" }) {
        childImageSharp {
          fixed(width: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
    `)

  const { width } = useContext(WindowDimensionsContext);
  const [isDownScroll, setDownScroll] = useState(false);

  /**
   * Do a scroll check to hide header on mobile
   * Addlistner for scroll cause Warning memory leak,
   * Because we trying to setState when it is already unmounted
   * To fixed this, we keep a _mounted variable to know if component is unmounted
   * If unmounted, we do not setState
   */

  // Min amount of scrolling to handle
  let lastScrollTop = 0;
  let _mounted = true;
  useEffect(() => {
    // Check if window exist and screen is small
    if (typeof window !== 'undefined' && width <= 600) {
      lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      _mounted = false;
      window.removeEventListener("scroll", handleScroll, true);
    }
  }, []);

  const handleScroll = debounce(() => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (_mounted) {
      if (scrollTop > lastScrollTop) {
        setDownScroll(true);
      } else {
        setDownScroll(false);
      }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

  }, 200, { leading: true });

  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  let dark = logo.dark_large;
  let light = logo.light_large;
  if (width < 600) {
    dark = logo.dark_small;
    light = logo.light_small;
  } else if (width < 900) {
    dark = logo.dark_medium;
    light = logo.light_medium;
  }
  const isHomePage = (location && location.pathname === '/');
  const getHeaderClassNames = () => {
    const isAtTop = isHeaderVisible ? styles.isAtTop : '';
    const homepage = isHomePage ? styles.homepage : '';
    const downScroll = isDownScroll && width < 600 ? styles.downScroll : '';

    return `${styles.header} ${isAtTop} ${homepage} ${downScroll}`;
  }


  return (
    <React.Fragment>
      <VisibilitySensor onChange={(visible) => setHeaderVisible(visible)}>
        <div id="headerSensor" className={styles.sensor} />
      </VisibilitySensor>
      <header className={getHeaderClassNames()}>
        {/* <div className={styles.ribbon}>
          <Link to="/special">
            <span className={isHeaderVisible ? 'uppercase darkTone' : 'uppercase'}>Free Shipping - Special price up to 50% Off</span>
          </Link>
        </div> */}
        {false && activeEnv !== 'production' &&
          <div className={styles.ribbon}>
            <span>Development</span>
          </div>
        }
        <div className={styles.container}>
          {width < 600 && (
            <Drawer
              className='darkTone'
              placement="left"
              closable={true}
              onClose={() => setDrawerOpen(false)}
              visible={drawerOpen}
            >
              <Link to="/collection"><h2>Collection</h2></Link>
              {/*<Link to="/booking"><h2>Booking</h2></Link>*/}
              <Link to="/special"><h2>Special Offers</h2></Link>
              <Link to="/stylist-pick"><h2>Stylist Pick</h2></Link>
              {/* <Link to="/blog"><h2>Blog</h2></Link> */}
              <Link to="/about"><h2>About</h2></Link>
            </Drawer>
          )}
          <div className={`${styles.block} ${styles.fill}`}>
            {width < 600 && (
              <Icon type="menu" style={{ fontSize: '20px' }} onClick={() => setDrawerOpen(true)} />
            )}
            {width >= 600 && (
              <nav>
                <ul className="horizontalList">
                  <li>
                    <a href="/collection">Collection</a>
                  </li>
                  {/* <li>
                    <a href="/special">Special</a>
                  </li> */}
                  {/* <li>
                    <a href="/blog">Blog</a>
                  </li> */}
                  <li>
                    <a href="/about">About</a>
                  </li>
                </ul>
              </nav>
            )}
          </div>

          <div className={styles.block}>
            <Link to='/'>
              <Image fixed={isHeaderVisible && isHomePage ? light.childImageSharp.fixed : dark.childImageSharp.fixed} />
            </Link>
          </div>

          <div className={`${styles.block} ${styles.fill} ${width < 900 ? styles.transparent : ''}`}>
            {false && (width < 600) && (
              <a href="/booking">
                <Icon type="calendar" style={{ fontSize: '20px' }} />
              </a>
            )}
            {(width >= 600) && (
              <nav>
                <ul className="horizontalList">
                  <li>
                    <a href="/stylist-pick">Stylist Pick</a>
                  </li>
                  {/*<li>*/}
                  {/*  <a href="/booking">Book an Appointment</a>*/}
                  {/*</li>*/}
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