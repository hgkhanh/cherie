import React, { useState } from 'react';
import Helmet from 'react-helmet';
import config from '../../data/SiteConfig';
import Header from '../components/Header';
import FloatButton from '../components/FloatButton';
import Footer from '../components/Footer';
import './index.scss';
import WindowDimensionsProvider from '../shared/WindowDimensionsProvider';
import FirebaseProvider from '../shared/FirebaseProvider';
import VisibilitySensor from 'react-visibility-sensor';

const MainLayout = ({ children, location }) => {
  const [isFooterVisible, setFooterVisible] = useState(false);

  return (
    <FirebaseProvider>
      <WindowDimensionsProvider>
        <React.Fragment>
          <Helmet>
            <meta name='viewport' content='height=device-height, 
                        width=device-width, initial-scale=1.0, 
                        minimum-scale=1.0, maximum-scale=1.0, 
                        user-scalable=no, target-densitydpi=device-dpi'/>
            <meta name='description' content={config.siteDescription} />
            <html lang='en' />
          </Helmet>
          <Header location={location} />
          {location && location.pathname !== "/booking" && !isFooterVisible && (
            <FloatButton to="/booking" />
          )}
          <main>{children}</main>
          <VisibilitySensor onChange={visiblity => {
            console.log('onChange:' + visiblity);
            setFooterVisible(visiblity);
          }}>
            <div id="footerAtLayoutSensor" className="sensor" />
          </VisibilitySensor>
          <Footer config={config} />
        </React.Fragment>
      </WindowDimensionsProvider>
    </FirebaseProvider>
  );
}

export default MainLayout;
