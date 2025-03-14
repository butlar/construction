import React, { useEffect, useState } from "react";
import ServiceImage from "../../assets/images/construction1.jpg";
import { apiUrl, fileUrl } from "./Http";
import { Link } from "react-router-dom";

const LatestServices = () => {
  const [services, setServices] = useState([]);

  const fetchLatestServices = async (data) => {
    //         const newData = {...data, "content":content,"imageId":imageId }
    const res = await fetch(apiUrl + "get-latest-services?limit=4", {
      method: "GET",
      // 'headers': {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //     'Authorization': `Bearer ${token()}`  // Use backticks here
      // },
    });
    const result = await res.json();
    console.log(result);
    setServices(result.data);
  };
  useEffect(() => {
    fetchLatestServices();
  }, []);

  return (
    <>
      <section className="section-3 bg-light py-5">
        <div className="container-fluid py-5">
          <div className="section-header text-center">
            <span>Our Services</span>
            <h2>Our Contruction Services</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
          </div>
          <div className="row pt-4">
            {services &&
              services.map((service) => {
                return (
                  <div className="col-md-3 col-lg-3" key={service.id}>
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

            {/* <div className="col-md-3 col-lg-3">
                                          <div className="item">
                                              <div className="service-image">
                                                  <img src={ServiceImage} alt="" className="w-100" />
                                              </div>
                                              <div className="service-body">
                                                  <div className="service-title">
                                                      <h3>Specialty Construction</h3>
                                                      <div className="service-content">
                                                          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque voluptate sequi accusamus praesentium rem illum.</p>
                                                      </div>
                                                      <a href="http://" className='btn btn-primary small'>Read More</a>
          
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-3 col-lg-3">
                                          <div className="item">
                                              <div className="service-image">
                                                  <img src={ServiceImage} alt="" className="w-100" />
                                              </div>
                                              <div className="service-body">
                                                  <div className="service-title">
                                                      <h3>Specialty Construction</h3>
                                                      <div className="service-content">
                                                          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque voluptate sequi accusamus praesentium rem illum.</p>
                                                      </div>
                                                      <a href="http://" className='btn btn-primary small'>Read More</a>
          
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-3 col-lg-3">
                                          <div className="item">
                                              <div className="service-image">
                                                  <img src={ServiceImage} alt="" className="w-100" />
                                              </div>
                                              <div className="service-body">
                                                  <div className="service-title">
                                                      <h3>Specialty Construction</h3>
                                                      <div className="service-content">
                                                          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque voluptate sequi accusamus praesentium rem illum.</p>
                                                      </div>
                                                      <a href="http://" className='btn btn-primary small'>Read More</a>
          
                                                  </div>
                                              </div>
                                          </div>
                                      </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestServices;
