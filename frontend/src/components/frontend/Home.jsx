import React, { useEffect, useState } from "react";

import Header from "../common/Header";
import Footer from "../common/Footer";
import ServiceImage from "../../assets/images/construction1.jpg";
import ConstructionImage from "../../assets/images/construction2.jpg";
import BlogImage from "../../assets/images/construction3.jpg";
import Icon1 from "../../assets/images/icon-1.svg";
// import AvtarImage from "../../assets/images/author-2.jpg";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Scrollbar } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
import About from "../common/About";
import { apiUrl, token } from "../common/Http";
import LatestServices from "./../common/LatestServices";
import LatestProjects from "./../common/LatestProjects";
import LatestArticles from "../common/LatestArticles";
import ShowTestimonials from "../common/ShowTestimonials";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero Top section */}
        <section className="section-1">
          <div className="hero d-flex align-items-center">
            <div className="container-fluid">
              <div className="text-center">
                <span>Welcome Amazing Contructions</span>
                <h1>
                  Crafting dreams with <br />
                  precision and excelence.
                </h1>
                <p>
                  We excel at transforming vision into reality through
                  outstanding craftsman precision and excelence <br />
                  We excel at transforming vision into reality through
                  outstanding craftsman
                </p>
                <div className="mt-4">
                  <a className="btn btn-primary large">Contact Now</a>
                  <a className="btn btn-secondary ms-2 large">View Projects</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}

        <About />

        {/* Our Services Section  */}
        <LatestServices />

        {/* Why Choose Us */}
        <div className="section-4 py-5">
          <div className="container">
            <div className="section-header text-center py-4">
              <span>Why Choose Us</span>
              <h2>Discover Our Wide Variaty of Projects.</h2>
              <p>
                {" "}
                Nisi commodi similique ipsum reprehenderit itaque? Placeat
                reprehenderit officiis, <br />
                quos nisi, dignissimos fugiat non dicta autem, exercitationem
                accusantium harum velit doloribus soluta!
              </p>
            </div>
            <div className="row pt-4">
              <div className="col-md-4 ">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon">
                    <img src={Icon1} alt="" />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Cutting Edge Solutions</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem sapiente ducimus iure tempore nostrum reiciendis
                    debitis!
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon">
                    <img src={Icon1} alt="" />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Cutting Edge Solutions</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem sapiente ducimus iure tempore nostrum reiciendis
                    debitis!
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon">
                    <img src={Icon1} alt="" />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Cutting Edge Solutions</h3>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem sapiente ducimus iure tempore nostrum reiciendis
                    debitis!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Projects Section */}
        <LatestProjects />

        {/* Testimony */}
        <ShowTestimonials />

        {/*  Blogs section    */}
        <LatestArticles />
      </main>

      <Footer />
    </>
  );
};

export default Home;
