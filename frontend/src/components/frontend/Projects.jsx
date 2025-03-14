import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import HeroBanner from "../common/HeroBanner";
import ConstructionImage from "../../assets/images/construction11.jpg";
import { apiUrl, fileUrl } from "../common/Http";
import { token } from "../common/Http";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async (data) => {
    //         const newData = {...data, "content":content,"imageId":imageId }
    const res = await fetch(apiUrl + "get-projects", {
      method: "GET",
      // 'headers': {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //     'Authorization': `Bearer ${token()}`  // Use backticks here
      // },
    });
    const result = await res.json();
    console.log(result);
    setProjects(result.data);
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroBanner
          preHeading="Quality, Integrity and Value"
          heading={"Our Projects"}
          text="We excel at transforming vision into reality through outstanding craftsman precision and excelence <br/>We excel at transforming vision into reality through outstanding craftsman"
        />

        <section className="section-3 bg-light py-5">
          <div className="container py-5">
            <div className="section-header text-center">
              <span>Our Projects</span>
              <h2>Our Projects Services</h2>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
            </div>
            <div className="row pt-4">
              {projects &&
                projects.map((project) => {
                  return (
                    <div className="col-md-4 col-lg-4" key={project.id}>
                      <div className="item">
                        <div className="service-image">
                          <img
                            src={
                              fileUrl +
                              "uploads/projects/small/" +
                              project.image
                            }
                            alt=""
                            className="w-100"
                          />
                        </div>
                        <div className="service-body">
                          <div className="service-title">
                            <h3>{project.title}</h3>
                            <div className="service-content">
                              <p>{project.short_desc}</p>
                            </div>
                            <Link
                              to={`/project/${project.id}`}
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
      </main>

      <Footer />
    </>
  );
};

export default Projects;
