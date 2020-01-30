import React, { createContext, useContext, useState, useEffect } from 'react';

export const WindowDimensionsContext = createContext(null);
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
        <WindowDimensionsContext.Provider value={ dimensions }>
            {children}
        </WindowDimensionsContext.Provider>
    );
}

export default WindowDimensionsProvider

export const useWindowDimensions = () => {
  return useContext(WindowDimensionsContext)
}