import React, { useState } from 'react';
import { Link } from 'gatsby';
import VisibilitySensor from 'react-visibility-sensor';
import styles from './Header.module.scss';
import { useWindowDimensions } from '../../shared/WindowDimensionsProvider';
import { Drawer, Icon } from 'antd';

const Header = () => {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { width } = useWindowDimensions();

  const renderDesktopHeader = () => (
    <div className={styles.container}>
      {width <= 768 && (
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
        {width <= 768 && (
          <Icon type="menu" style={{ fontSize: '20px'}} onClick={() => setDrawerOpen(true)}/>
        )}
        {width > 768 && (
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
        <Link to='/' className={styles.logoContainer}>
          <h1>Chérie</h1>
        </Link>
      </div>

      <div className={`${styles.block} ${styles.fill}`}>
        {(width < 769) && (
          <Icon type="search" style={{ fontSize: '20px'}}/>
        )}
        {(width >= 769) && (
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
  )

  return (
    <React.Fragment>
      <VisibilitySensor onChange={(visible) => setHeaderVisible(visible)}>
        <div className={styles.sensor} />
      </VisibilitySensor>
      <header className={`${styles.header} ${isHeaderVisible ? styles.transparent : ''}`}>
        {renderDesktopHeader()}
        {/* {width < 770 ? renderMobileHeader() : renderDesktopHeader()} */}
      </header>
    </React.Fragment>
  );
}

export default Header;
