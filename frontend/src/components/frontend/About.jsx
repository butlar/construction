import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { default as AboutUs } from "../common/About";
import HeroBanner from "../common/HeroBanner";
import ShowTestimonials from "../common/ShowTestimonials";
import { default as Team } from "../common/Team";

const About = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}

        <HeroBanner
          preHeading="Quality, Integrity and Value"
          heading={"About Us"}
          text="We excel at transforming vision into reality through outstanding craftsman precision and excelence <br/>We excel at transforming vision into reality through outstanding craftsman"
        />
        {/* About Us section */}
        <AboutUs />

        {/* Our Team */}
        <Team />

        {/* Services */}
        <ShowTestimonials />
      </main>
      <Footer />
    </>
  );
};

export default About;
