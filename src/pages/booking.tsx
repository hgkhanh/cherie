import React, { Component } from "react";
import Helmet from "react-helmet";
import { Router } from "@reach/router"
import Layout from "../layout";
import Booking from "../components/Booking";
import Details from "../components/Booking/Details";
import config from "../../data/SiteConfig";

const BookingPage = () => {
  return (
    <Layout>
      <Helmet title={`Booking | ${config.siteTitle}`} />
      <hr className='divider' />
      <div className='grid centerAlign sansSerif'>
      <Router basepath="/booking">
        <Details path="/details/:bookingId" />
        <Booking path="/" default/>
      </Router>
        <hr className='divider' />
      </div>
    </Layout>
  );
}

export default BookingPage;
