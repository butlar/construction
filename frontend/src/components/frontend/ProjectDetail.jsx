import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import { Link, useParams } from "react-router-dom";
import HeroBanner from "../common/HeroBanner";
import Header from "../common/Header";
import { apiUrl, fileUrl } from "../common/Http";
import ShowTestimonials from "../common/ShowTestimonials";

const ProjectDetail = () => {
  const params = useParams();
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchProjects = async (data) => {
    // const res = await fetch(apiUrl + "get-services/" + params.id, {
    const res = await fetch(`${apiUrl}get-projects`, {
      method: "GET",
    });
    const result = await res.json();
    setProjects(result.data);
    console.log(result);
  };

  const fetchProject = async (data) => {
    // const res = await fetch(apiUrl + "get-services/" + params.id, {
    const res = await fetch(`${apiUrl}get-project/${params.id}`, {
      method: "GET",
    });
    const result = await res.json();
    setProject(result.data);
    console.log(result);
  };

  useEffect(() => {
    fetchProject();
    fetchProjects();
  }, [params.id]);

  return (
    <>
      <Header />
      <main>
        <HeroBanner
          preHeading="Quality, Integrity and Value"
          heading={`${project.title}`}
        />
        <section className="section-10 py-5">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-4">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body px-4 py-4">
                    <h3 className="mt-2 mb-3">Insights</h3>
                    <ul className="list-group list-group-flush">
                      {project.location && (
                        <li className=" border-0 mb-2">
                          <span class="text-body-secondary">Location</span>
                          <p>{project.location}</p>
                        </li>
                      )}
                      {project.construction_type && (
                        <li className=" border-0 mb-2">
                          <span class="text-body-secondary">
                            Construction Type
                          </span>
                          <p>{project.construction_type}</p>
                        </li>
                      )}
                      {project.sector && (
                        <li className=" border-0 mb-2">
                          <span class="text-body-secondary">Sector</span>
                          <p>{project.sector}</p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div>
                  <img
                    className="w-100"
                    src={`${fileUrl}uploads/projects/large/${project.image}`}
                    alt=""
                  />
                </div>
                <h3 className="py-3">{project.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: project.content }}
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

export default ProjectDetail;
