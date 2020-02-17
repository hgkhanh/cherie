import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import Booking from "../components/Booking";
import config from "../../data/SiteConfig";

const BookingPage = () => {
  return (
    <Layout>
      <Helmet title={`Booking | ${config.siteTitle}`} />
      <hr className='divider' />
      <div className='grid centerAlign sansSerif'>
        <h1>Booking Page</h1>
        <p>This is the instruction of booking page blah blah blah</p>
        <p>
          first step of booking
          </p>
        <p>
          the next step of booking
        </p>
        <Booking />
      </div>
      <hr className='divider' />
    </Layout>
  );
}

export default BookingPage;
