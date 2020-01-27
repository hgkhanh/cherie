import React, { useState } from 'react';
import { Link } from 'gatsby';
import VisibilitySensor from 'react-visibility-sensor';
import * as styles from './Header.module.scss';

const Header = () => {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const leftItems = [
    { to: '/shop', label: 'Shop' },
    { to: '/category/', label: 'Categories' },
    { to: '/about/', label: 'About' }
  ];
  const rightItems = [
    { to: '/contact/', label: 'Contact' }
    // { to: '/search/', label: 'Search', icon: FaSearch }
  ];

  const getHeaderClassNames = () => {
    let classArray = [styles.headerContent];
    if (!isHeaderVisible) {
      classArray.push(styles.fixed);
    }
    return classArray.join(' ');
  };

  return (
    <React.Fragment>
      <VisibilitySensor onChange={(visible) => setHeaderVisible(visible)}>
        <div className={styles.sensor} />
      </VisibilitySensor>
      <header className={styles.header}>
        <div className={getHeaderClassNames()}>
          <div className={styles.logoContainer}>
            <Link to='/'>
              <h1>Cherie</h1>
            </Link>
          </div>
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
      </header>
    </React.Fragment>
  );
}

export default Header;
