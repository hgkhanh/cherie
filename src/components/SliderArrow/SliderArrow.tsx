import React, { useState } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import styles from './SliderArrow.module.scss';

const SliderArrow = ({ directionClassName, to, onClick }) => {
    const [active, setActive] = useState(false);
    return (
        <Spring
            config={config.slow}
            to={{
                transform: active ? 'scale(1.1)' : 'scale(1.0)'
            }}>
            {springStyles => (
                <button type="button" onClick={onClick} className={`${styles.scrollButton} ${styles[to]}`}
                    style={{ ...springStyles }} aria-label={to}
                    onMouseEnter={() => setActive(true)}
                    onMouseLeave={() => setActive(false)}>
                    <svg viewBox="0 0 21 11">
                        <polyline fill="none" stroke="currentColor" points="0.5 0.5 10.5 10.5 20.5 0.5" strokeWidth="1.25"></polyline>
                    </svg>
                </button>
            )}
        </Spring>
    )
};

export default SliderArrow;