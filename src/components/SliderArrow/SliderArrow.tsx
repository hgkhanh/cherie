import React from 'react';
import styles from './SliderArrow.module.scss';

const SliderArrow = ({ className, to, onClick }) => (
    <button type="button" onClick={onClick} className={`${styles.arrow} ${className}`} aria-label={to} >
        <svg viewBox="0 0 100 100">
            <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" transform={to === 'next' ? 'translate(100, 100) rotate(180)' : ''}></path>
        </svg>
    </button >
)

export default SliderArrow;