import React, { Component } from "react";
import Helmet from "react-helmet";
import { Router } from "@reach/router"
import Layout from "../layout";
import Booking from "../components/Booking";
import Details from "../components/Booking/Details";
import Cancel from "../components/Booking/Cancel";
import config from "../../data/SiteConfig";
import { Location } from '@reach/router';

const BookingPage = ({ location }) => {
  return (
    <Layout location={location}>
      <Helmet title={`Booking | ${config.siteTitle}`} />
      <hr className='divider' />
      <div className='grid narrow centerAlign'>
        <Location>
          {locationProps =>
            <Router basepath="/booking">
              <Details path="/details/:bookingId" {...locationProps} />
              <Cancel path="/cancel/:bookingId" {...locationProps} />
              <Booking path="/" default />
            </Router>}
        </Location>
        <hr className='divider' />
      </div>
    </Layout>
  );
}

export default BookingPage;
