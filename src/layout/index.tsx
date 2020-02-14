import React from 'react';
import Helmet from 'react-helmet';
import config from '../../data/SiteConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './index.scss';
import WindowDimensionsProvider from '../shared/WindowDimensionsProvider';

const MainLayout = (props) => {
  const { children, path } = props;
  return (
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
        <Header path={path} />
        <main>{children}</main>
        <Footer config={config} />
      </React.Fragment>
    </WindowDimensionsProvider>
  );
}

export default MainLayout;
