import React from "react";
import Header from "../common/Header";
import HeroBanner from "../common/HeroBanner";
import Footer from "../common/Footer";
import { fileUrl } from "../common/Http";

const Articles = () => {
  return (
    <>
      <Header />
      <HeroBanner
        preHeading="Quality, Integrity and Value"
        heading="Services"
        text="We excel at transforming vision into reality through outstanding craftsman precision and excelence <br/>We excel at transforming vision into reality through outstanding craftsman"
      />
      {/* Our Services Section  */}
      <section className="section-3 bg-light py-5">
        <div className="container py-5">
          <div className="section-header text-center">
            <span>Our Services</span>
            <h2>Our Contruction Services</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
          </div>
          <div className="row pt-4">
            {services &&
              services.map((service) => {
                return (
                  <div className="col-md-4 col-lg-4" key={service.id}>
                    <div className="item">
                      <div className="service-image">
                        <img
                          src={
                            fileUrl + "uploads/articles/small/" + service.image
                          }
                          alt=""
                          className="w-100"
                        />
                      </div>
                      <div className="service-body">
                        <div className="service-title">
                          <h3>{service.title}</h3>
                          <div className="service-content">
                            <p>{service.short_desc}</p>
                          </div>
                          <a href="http://" className="btn btn-primary small">
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Articles;
