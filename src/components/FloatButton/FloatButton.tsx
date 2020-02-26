import React, { useState, useContext } from 'react';
import styles from './FloatButton.module.scss';
import { Link } from "gatsby";
import { Icon } from "antd";
import VisibilitySensor from 'react-visibility-sensor';
import { Spring, config } from 'react-spring/renderprops';
import { WindowDimensionsContext } from "../../shared/WindowDimensionsProvider";

const FloatButton = ({ to, icon, offsetTop }) => {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const { width } = useContext(WindowDimensionsContext);

  if (width <= 768) {
    return (
      <React.Fragment>
        <Spring
          config={config.slow}
          to={{
            opacity: visible ? '1' : '0',
            transform: active ? 'scale(1.1)' : 'scale(1.0)'
          }}>
          {springStyles => (
            <Link to={to}>
              <button className={styles.button} style={{ ...springStyles }}
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}>
                <Icon type={icon}></Icon>
              </button>
            </Link>
          )}
        </Spring>
        <VisibilitySensor onChange={visiblity => {

          // do not hide float button if is scrolling down past the sensor
          if (visiblity === false) {
            if (typeof window !== 'undefined') {
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              if (scrollTop <= offsetTop) {
                setVisible(false);
              }
            }
          } else {
            setVisible(true);
          }
        }}>
          <div className={styles.sensor} style={{ top: offsetTop + 'px' }} />
        </VisibilitySensor>
      </React.Fragment>
    );
  }
  return '';
};


export default FloatButton;
