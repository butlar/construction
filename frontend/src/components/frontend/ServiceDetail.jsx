import React, { useEffect, useState } from "react";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import HeroBanner from "../common/HeroBanner";
import { apiUrl, fileUrl } from "../common/Http";
import { Link, useParams } from "react-router-dom";
import ShowTestimonials from "./../common/ShowTestimonials";

const ServiceDetail = () => {
  const params = useParams();
  const [service, setService] = useState([]);
  const [services, setServices] = useState([]);

  const fetchServices = async (data) => {
    // const res = await fetch(apiUrl + "get-services/" + params.id, {
    const res = await fetch(`${apiUrl}get-services`, {
      method: "GET",
    });
    const result = await res.json();
    setServices(result.data);
    console.log(result);
  };

  const fetchService = async (data) => {
    // const res = await fetch(apiUrl + "get-services/" + params.id, {
    const res = await fetch(`${apiUrl}get-service/${params.id}`, {
      method: "GET",
    });
    const result = await res.json();
    setService(result.data);
    console.log(result);
  };

  useEffect(() => {
    fetchService();
    fetchServices();
  }, [params.id]);

  return (
    <>
      <Header />
      <main>
        <HeroBanner
          preHeading="Quality, Integrity and Value"
          heading={`${service.title}`}
        />
        <section className="section-10 py-5">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-3">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body px-4 py-4">
                    <h3 className="mt-2 mb-3">Our Services</h3>
                    <ul className="list-group list-group-flush">
                      {services.map((service) => {
                        return (
                          <li
                            className="list-group-item border-0"
                            key={service.id}
                          >
                            <Link to={`/service/${service.id}`}>
                              {service.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div>
                  <img
                    className="w-100"
                    src={`${fileUrl}uploads/services/large/${service.image}`}
                    alt=""
                  />
                </div>
                <h3 className="py-3">{service.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: service.content }}
                ></div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-11 bg-light py-5">
          <ShowTestimonials />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ServiceDetail;
