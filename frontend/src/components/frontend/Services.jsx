import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import HeroBanner from "../common/HeroBanner";
import ServiceImage from "../../assets/images/construction121.jpg";
import { apiUrl, fileUrl } from "../common/Http";
import { Link } from "react-router-dom";
import ServiceDetail from "./ServiceDetail";

const Services = () => {
  const [services, setServices] = useState([]);

  const fetchLatestServices = async (data) => {
    //         const newData = {...data, "content":content,"imageId":imageId }
    const res = await fetch(apiUrl + "get-services", {
      method: "GET",
      // 'headers': {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //     'Authorization': `Bearer ${token()}`  // Use backticks here
      // },
    });
    const result = await res.json();
    //console.log(result);
    setServices(result.data);
  };
  useEffect(() => {
    fetchLatestServices();
  }, []);

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
                            fileUrl + "uploads/services/small/" + service.image
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
                          <Link
                            to={`/service/${service.id}`}
                            className="btn btn-primary small"
                          >
                            Read More
                          </Link>
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

export default Services;
