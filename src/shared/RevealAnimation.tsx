/**
 * Wrap children in Spring and VisibilitySensor 
 * to provide Reveal Animation 
 * */
import React from "react";
import { Spring, config } from 'react-spring/renderprops';
import VisibilitySensor from 'react-visibility-sensor';

const RevealAnimation = (outerProps) => {
    const { opacity, transform, index } = outerProps;
    return (
        <VisibilitySensor partialVisibility key={index}>
            {({ isVisible }) => (
                <Spring
                    config={config.slow}
                    to={{
                        opacity: isVisible && opacity ? 1 : 0,
                        transform: isVisible  && transform ? 'translateY(-50px)' : 'translateY(0px)'
                    }}
                >
                    {props => (
                        <div style={{...props}}>
                            {outerProps.children}
                        </div>
                    )}
                </Spring>
            )}
        </VisibilitySensor>
    )
};

export default RevealAnimation;