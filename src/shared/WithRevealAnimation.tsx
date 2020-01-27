import React from "react";
import { Spring, config } from 'react-spring/renderprops';
import VisibilitySensor from 'react-visibility-sensor';

const withRevealAnimation = (WrappedComponent) => (
    <VisibilitySensor partialVisibility>
        {({ isVisible }) => (
            <Spring
                config={config.slow}
                to={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0px)' : 'translateY(50px)'
                }}
            >
                {props => (
                    <WrappedComponent {...props} />
                )}
            </Spring>
        )}
    </VisibilitySensor>
);

export default withRevealAnimation;