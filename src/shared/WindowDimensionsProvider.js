import React, { createContext, useState, useEffect } from 'react';

const WindowDimensionsContext = createContext(null);
export { WindowDimensionsContext }

const WindowDimensionsProvider = ({ children }) => {
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        window.addEventListener('resize', handleResize)
        return () => { window.removeEventListener('resize', handleResize) }
    }, []);

    return (
        <WindowDimensionsContext.Provider value={dimensions}>
            {children}
        </WindowDimensionsContext.Provider>
    );
}

export default WindowDimensionsProvider;