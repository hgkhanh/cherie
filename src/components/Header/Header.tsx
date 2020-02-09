import React, { useState } from 'react';
import { Link, useStaticQuery } from 'gatsby';
import VisibilitySensor from 'react-visibility-sensor';
import styles from './Header.module.scss';
import { useWindowDimensions } from '../../shared/WindowDimensionsProvider';
import { Drawer, Icon } from 'antd';
import Image from 'gatsby-image';

const Header = (props) => {
  const logo = useStaticQuery(graphql`
    query LogoQuery {
      dark: file(name: { eq: "logo-dark" }) {
        childCloudinaryAsset {
          fluid {
            ...CloudinaryAssetFluid
          }
        }
      }
      light: file(name: { eq: "logo-light" }) {
        childCloudinaryAsset {
          fluid {
            ...CloudinaryAssetFluid
          }
        }
      }
    }
    `)
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { width } = useWindowDimensions();
  const { dark, light } = logo;
  let logoSize = 160;
  console.log(logo);

  if (width < 577) {
    logoSize = 125;
  } else if (width < 769) {
    logoSize = 140;
  }

  return (
    <React.Fragment>
      <VisibilitySensor onChange={(visible) => setHeaderVisible(visible)}>
        <div className={styles.sensor} />
      </VisibilitySensor>
      <header className={`${styles.header} ${isHeaderVisible ? styles.transparent : ''}`}>
        <div className={styles.container}>
          {width < 993 && (
            <Drawer
              placement="left"
              closable={true}
              onClose={() => setDrawerOpen(false)}
              visible={drawerOpen}
            >
              <Link to="/shop" className="Heading u-h6"><h1>Shop</h1></Link>
            </Drawer>
          )}
          <div className={`${styles.block} ${styles.fill}`}>
            {width < 993 && (
              <Icon type="menu" style={{ fontSize: '20px' }} onClick={() => setDrawerOpen(true)} />
            )}
            {width >= 993 && (
              <nav>
                <ul className="horizontalList">
                  <li className="HorizontalList__Item">
                    <a href="/shop" className="Heading u-h6">Shop</a>
                  </li>
                </ul>
              </nav>
            )}
          </div>

          <div className={styles.block}>
            <Link to='/' className={styles.logoContainer} style={{width: logoSize}}>
              <Image loading='eager' fluid={isHeaderVisible ? light.childCloudinaryAsset.fluid : dark.childCloudinaryAsset.fluid} />
            </Link>
          </div>

          <div className={`${styles.block} ${styles.fill}`}>
            {(width < 993) && (
              <Icon type="search" style={{ fontSize: '20px' }} />
            )}
            {(width >= 993) && (
              <nav>
                <ul className="horizontalList">
                  <li>
                    <a href="/" >Search</a>
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