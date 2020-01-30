import React, { useState } from 'react';
import { Link } from 'gatsby';
import VisibilitySensor from 'react-visibility-sensor';
import * as styles from './Header.module.scss';
import { useWindowDimensions } from '../../shared/WindowDimensionsProvider';

const Header = () => {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const { width } = useWindowDimensions();
  const leftItems = [
    { to: '/shop', label: 'Shop' },
    // { to: '/category/', label: 'Categories' },
    // { to: '/', label: 'About' }
  ];
  const rightItems = [
    { to: '/', label: 'Contact' }
    // { to: '/search/', label: 'Search', icon: FaSearch }
  ];

  const getHeaderClassNames = (device) => {
    let classArray = device === 'desktop' ?
      [styles.headerContent] :
      [styles.headerContent, styles.mobile];
    if (!isHeaderVisible) {
      classArray.push(styles.fixed);
    }
    return classArray.join(' ');
  };

  const renderDesktopHeader = () => (
    <div className={getHeaderClassNames('desktop')}>
      <Link to='/' className={styles.logoContainer}>
        <h1>Chérie</h1>
      </Link>
      <nav className={['grid', styles.menu].join(' ')}>
        <ul className={styles.menuLink}>
          {leftItems.map(item => (
            <Link to={item.to} key={item.label} className='grayText'>
              {item.label}
            </Link>
          ))}
        </ul>
        <ul className={styles.menuLink}>
          {rightItems.map(item => (
            <Link to={item.to} key={item.label}>
              {item.label}
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  )

  const renderMobileHeader = () => (
    <div className={getHeaderClassNames('mobile')}>
      <Link to='/' className={styles.logoContainer}>
        <h1>Chérie</h1>
      </Link>
      <nav className={styles.menu}>
        <ul className={styles.menuLink}>
          {leftItems.map(item => (
            <Link to={item.to} key={item.label} className='grayText'>
              {item.label}
            </Link>
          ))}
        </ul>
        <ul className={styles.menuLink}>
          {rightItems.map(item => (
            <Link to={item.to} key={item.label}>
              {item.label}
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  )

  return (
    <React.Fragment>
      <VisibilitySensor onChange={(visible) => setHeaderVisible(visible)}>
        <div className={styles.sensor} />
      </VisibilitySensor>
      <header className={styles.header}>
        {width < 770 ? renderMobileHeader() : renderDesktopHeader()}
      </header>
    </React.Fragment>
  );
}

export default Header;
