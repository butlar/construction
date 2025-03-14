import React, { useEffect, useState } from "react";
import ServiceImage from "../../assets/images/construction1.jpg";
import { apiUrl, fileUrl } from "./Http";

const LatestProjects = () => {
  const [projects, setProjects] = useState([]);

  const fetchLatestProjects = async (data) => {
    //         const newData = {...data, "content":content,"imageId":imageId }
    const res = await fetch(apiUrl + "get-latest-projects?limit=4", {
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
    fetchLatestProjects();
  }, []);

  return (
    <>
      <section className="section-3 bg-light py-5">
        <div className="container-fluid py-5">
          <div className="section-header text-center">
            <span>Our Projects</span>
            <h2>Our Contruction Projects</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
          </div>
          <div className="row pt-4">
            {projects &&
              projects.map((project) => {
                return (
                  <div className="col-md-3 col-lg-3" key={project.id}>
                    <div className="item">
                      <div className="service-image">
                        <img
                          src={
                            fileUrl + "uploads/projects/small/" + project.image
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
    </>
  );
};

export default LatestProjects;
