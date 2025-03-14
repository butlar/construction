import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import HeroBanner from "../common/HeroBanner";
import { useForm } from "react-hook-form";
import { apiUrl } from "./../common/Http";
import { toast } from "react-toastify";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await fetch(apiUrl + "contact-now", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.status == true) {
      toast.success(result.message);
      reset();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <Header />
      <main>
        <HeroBanner
          preHeading="Quality, Integrity and Value"
          heading="Services"
          text="We excel at transforming vision into reality through outstanding craftsman precision and excelence <br/>We excel at transforming vision into reality through outstanding craftsman"
        />
        <section className="section-9">
          <div className="section-header text-center">
            <span></span>
            <h1>Contact Us</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A sint
              nobis pariatur similique tenetur, quisquam est. Velit nesciunt
              excepturi esse exercitationem est? Quam maiores perferendis
              quaerat. Distinctio harum esse labore!
            </p>
          </div>
          <div className="row mt-5 ">
            <div className="col-md-3">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4 ">
                  <h3>Call Us</h3>
                  <div>
                    <a href="http://">(888-999-5555)</a>
                  </div>
                  <div>
                    <a href="http://">(232-333-4343)</a>
                  </div>

                  <h3 className="mt-4">You can write us</h3>
                  <div>
                    <a href="">example@urbanedge.com</a>
                  </div>
                  <div>
                    <a href="">example@urbanedge.com</a>
                  </div>

                  <h3 className="mt-4">Address</h3>
                  <div>
                    B-45, Rahaki Puram
                    <br />
                    Lucknow, Uttar Pardesh,226014
                    <br />
                    9988558899
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9 pb-5">
              <div className="card shadow border-0 pb-4">
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-md-6  mb-4">
                        <label htmlFor="" className="form-label">
                          Name
                        </label>
                        <input
                          {...register("name", {
                            required: "Name field is required.",
                          })}
                          type="text"
                          className={` form-control form-control-lg ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Name"
                        />
                        {errors.name && (
                          <p className="invalid-feedback">
                            {errors.name?.message}
                          </p>
                        )}
                      </div>
                      <div className="col-md-6  mb-4">
                        <label htmlFor="" className="form-label">
                          Email
                        </label>
                        <input
                          {...register("email", {
                            required: "This field is required.",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Please enter a valid email address",
                            },
                          })}
                          type="text"
                          className={` form-control form-control-lg ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Name"
                        />
                        {errors.email && (
                          <p className="invalid-feedback">
                            {errors.email?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="" className="form-label">
                          Phone
                        </label>
                        <input
                          {...register("phone")}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Phone Number"
                        />
                      </div>
                      <div className="col-md-6  mb-4">
                        <label htmlFor="" className="form-label">
                          Subject
                        </label>
                        <input
                          {...register("subject")}
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="" className="form-label">
                        Message
                      </label>
                      <textarea
                        {...register("message")}
                        name="message"
                        rows={4}
                        className=" form-control form-control-lg"
                        placeholder="message"
                      ></textarea>
                    </div>
                    <button
                      className="btn btn-primary large mt-4 "
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;
