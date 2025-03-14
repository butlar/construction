import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiUrl, fileUrl, token } from "../../common/Http";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Footer from "../../common/Footer";

const Edit = () => {
  const [member, setMember] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const params = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(apiUrl + "members/" + params.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();

      setMember(result.data);
      return {
        name: result.data.name,
        job_title: result.data.job_title,
        linkedin: result.data.linkedin,
        status: result.data.status,
      };
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const newData = { ...data, imageId: imageId };
    const res = await fetch(apiUrl + "members/" + params.id, {
      method: "PUT",
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
      navigate("/admin/members");
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
                    <h4 className="h5">Members/Edit</h4>
                    <Link to="/admin/members" className="btn btn-secondary">
                      Back
                    </Link>
                  </div>
                  <hr />
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        placeholder="Name"
                        {...register("name", {
                          required: "Name field is required.",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="invalid-feedback">
                          {errors.name?.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Job Title</label>
                      <input
                        placeholder="job title"
                        {...register("job_title", {
                          required: "Job title field is required.",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.job_title ? "is-invalid" : ""
                        }`}
                      />
                      {errors.job_title && (
                        <p className="invalid-feedback">
                          {errors.job_title?.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">LinkedIn Link</label>
                      <input
                        placeholder="Linkedin"
                        {...register("linkedin")}
                        type="text"
                        className={`form-control ${
                          errors.linkedin ? "is-invalid" : ""
                        }`}
                      />
                      {errors.linkedin && (
                        <p className="invalid-feedback">
                          {errors.linkedin?.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Status
                      </label>
                      <select className="form-control" {...register("status")}>
                        <option value="1">Active</option>
                        <option value="0">Block</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="">
                        Image
                      </label>
                      <br />
                      <input type="file" onChange={handleFile} name="" id="" />
                    </div>
                    <div className="pb-3">
                      {member.image && (
                        <img
                          src={fileUrl + "uploads/members/" + member.image}
                          alt=""
                          width={100}
                        />
                      )}
                    </div>

                    <button disabled={isDisable} className="btn btn-primary">
                      Update
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

export default Edit;
