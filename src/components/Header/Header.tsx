import React, { useContext, useState } from 'react';
import { Link, useStaticQuery } from 'gatsby';
import VisibilitySensor from 'react-visibility-sensor';
import styles from './Header.module.scss';
import { WindowDimensionsContext } from '../../shared/WindowDimensionsProvider';
import { Drawer, Icon } from 'antd';
import Image from 'gatsby-image';

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
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { width } = useContext(WindowDimensionsContext);
  const { dark, light } = logo;
  let logoSize = 160;

  if (width < 577) {
    logoSize = 125;
  } else if (width < 769) {
    logoSize = 140;
  }

  const isHomePage = path === '/';
  const getHeaderClassNames = () => {
    const isAtTop = isHeaderVisible ? styles.isAtTop : '';
    const homepage = isHomePage ? styles.homepage : '';

    return `${styles.header} ${isAtTop} ${homepage}`;
  }

  return (
    <React.Fragment>
      <VisibilitySensor onChange={(visible) => setHeaderVisible(visible)}>
        <div className={styles.sensor} />
      </VisibilitySensor>
      <header className={getHeaderClassNames()}>
        <div className={styles.container}>
          {width < 993 && (
            <Drawer
              placement="left"
              closable={true}
              onClose={() => setDrawerOpen(false)}
              visible={drawerOpen}
            >
              <Link to="/shop" className="Heading u-h6"><h1>Shop</h1></Link>
              <Link to="/booking" className="Heading u-h6"><h1>Booking</h1></Link>
              <Link to="/about" className="Heading u-h6"><h1>About</h1></Link>
            </Drawer>
          )}
          <div className={`${styles.block} ${styles.fill}`}>
            {width < 993 && (
              <Icon type="menu" style={{ fontSize: '20px' }} onClick={() => setDrawerOpen(true)} />
            )}
            {width >= 993 && (
              <nav>
                <ul className="horizontalList">
                  <li>
                    <a href="/shop">Shop</a>
                  </li>
                  <li>
                    <a href="/about">About</a>
                  </li>
                </ul>
              </nav>
            )}
          </div>

          <div className={styles.block}>
            <Link to='/' className={styles.logoContainer} style={{width: logoSize}}>
              <Image loading='eager' fluid={isHeaderVisible && isHomePage ? light.childCloudinaryAsset.fluid : dark.childCloudinaryAsset.fluid} />
            </Link>
          </div>

          <div className={`${styles.block} ${styles.fill}`}>
            {(width < 993) && (
              <a href="/booking">
                <Icon type="book" style={{ fontSize: '20px' }} />
              </a>
            )}
            {(width >= 993) && (
              <nav>
                <ul className="horizontalList">
                  <li>
                    <a href="/booking">Booking</a>
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