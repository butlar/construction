import React, { useState } from "react";
import Footer from "../../common/Footer";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import { apiUrl, token } from "../../common/Http";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Create = () => {
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const newData = { ...data, imageId: imageId };
    const res = await fetch(apiUrl + "testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`, // Use backticks here
      },
      body: JSON.stringify(newData),
    });
    const result = await res.json();
    // console.log(result);
    if (result.status == true) {
      toast.success(result.message);
      navigate("/admin/testimonials");
    } else {
      toast.error(result.message);
    }
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    setIsDisable(true);
    // image store temp url http://127.0.0.1:8000/api/temp-images
    await fetch(apiUrl + "temp-images", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token()}`, // Use backticks here
      },
      body: formData,
    })
      .then((Response) => Response.json())

      .then((result) => {
        setIsDisable(false);
        if (result.status == false) {
          toast.error(result.errors.image[0]);
        } else {
          setImageId(result.data.id);
        }
      });
  };

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
                      to="/admin/testimonials"
                      className="btn btn-secondary"
                    >
                      Back
                    </Link>
                  </div>
                  <hr />
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label className="form-label">Testimonials</label>
                      <textarea
                        placeholder="Testimonials"
                        {...register("testimonial", {
                          required: "Testimonial field is required.",
                        })}
                        className={`form-control ${
                          errors.testimonial ? "is-invalid" : ""
                        }`}
                        rows={5}
                      ></textarea>
                      {errors.testimonial && (
                        <p className="invalid-feedback">
                          {errors.testimonial?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Citation</label>
                      <input
                        placeholder="Citation (Author Name)"
                        {...register("citation", {
                          required: "Citation field is required.",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.citation ? "is-invalid" : ""
                        }`}
                      />
                      {errors.citation && (
                        <p className="invalid-feedback">
                          {errors.citation?.message}
                        </p>
                      )}
                    </div>
                    <label className="form-label">Designation</label>
                    <input
                      placeholder="Designation"
                      {...register("designation")}
                      type="text"
                      className="form-control"
                    />

                    <div className="mb-3">
                      <label className="form-label" htmlFor="">
                        Image
                      </label>
                      <br />
                      <input type="file" onChange={handleFile} name="" id="" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="">Status</label>
                      <select className="form-control" {...register("status")}>
                        <option value="1">Active</option>
                        <option value="0">Block</option>
                      </select>
                    </div>

                    <button disabled={isDisable} className="btn btn-primary">
                      Submit
                    </button>
                  </form>
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

export default Create;
