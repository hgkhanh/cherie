import React, { useState, useContext } from 'react';
import styles from './FloatButton.module.scss';
import { Link } from "gatsby";
import { Button } from "antd";
import { WindowDimensionsContext } from "../../shared/WindowDimensionsProvider";

const FloatButton = ({ to }) => {
  const { width } = useContext(WindowDimensionsContext);

  // Show on tablet down
  if (width < 900) {
    return (
      <React.Fragment>
        <div className={styles.container}>
          <Link to={to}>
            <Button className={styles.button} type="primary">Tap here to book appointment
                </Button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
  return '';
};


export default FloatButton;
