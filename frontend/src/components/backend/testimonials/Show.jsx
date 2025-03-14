import React, { useEffect, useState } from "react";
import { apiUrl, token } from "../../common/Http";
import { toast } from "react-toastify";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";
import Footer from "../../common/Footer";

const Show = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    const res = await fetch(apiUrl + "testimonials", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`, // Use backticks here
      },
    });

    const result = await res.json();
    setTestimonials(result.data);
    console.log(result);
  };

  const deleteTestimonial = async (id) => {
    if (confirm("Are you sure! Delete this record?")) {
      const res = await fetch(apiUrl + "testimonials/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`, // Use backticks here
        },
      });

      const result = await res.json();

      if (result.status == true) {
        const newTestimonials = testimonials.filter(
          (testimonial) => testimonial.id != id
        );
        setTestimonials(newTestimonials);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <>
      <Header />
      <main className="">
        <div className="container my-5">
          <div className="row  ">
            <div className="col-md-3">
              {/* SideBar */}
              <Sidebar />
            </div>
            <div className="col-md-9 dashboard">
              {/* Dashboard */}
              <div className="card shadow border-0">
                <div className="card-body   align-items-center ">
                  <div className="d-flex justify-content-between">
                    <h4 className="h5">Testimonials</h4>
                    <Link
                      to="/admin/testimonials/create"
                      className="btn btn-secondary"
                    >
                      Create
                    </Link>
                  </div>
                  <hr />
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Testimonials</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials &&
                        testimonials.map((testimonial) => {
                          return (
                            <tr key={`testimonial-${testimonial.id}`}>
                              <td>{testimonial.id}</td>
                              <td>{testimonial.testimonial}</td>
                              <td>{testimonial.citation}</td>
                              <td>
                                {testimonial.status == 1 ? "Active" : "Block"}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/testimonials/edit/${testimonial.id}`}
                                  className="btn btn-primary btn-sm "
                                  rel="noopener noreferrer"
                                >
                                  Edit
                                </Link>
                                <Link
                                  onClick={() =>
                                    deleteTestimonial(testimonial.id)
                                  }
                                  className="btn btn-secondary btn-sm ms-2"
                                  rel="noopener noreferrer "
                                >
                                  Delete
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Show;
