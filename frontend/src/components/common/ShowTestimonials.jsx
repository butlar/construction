import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AvtarImage from "../../assets/images/author-2.jpg";
import { apiUrl, fileUrl } from "./Http";

const ShowTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchLatestTestimonials = async (data) => {
    //         const newData = {...data, "content":content,"imageId":imageId }
    const res = await fetch(apiUrl + "get-testimonials", {
      method: "GET",
      // 'headers': {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //     'Authorization': `Bearer ${token()}`  // Use backticks here
      // },
    });
    const result = await res.json();
    console.log(result);
    setTestimonials(result.data);
  };

  useEffect(() => {
    fetchLatestTestimonials();
  }, []);

  return (
    <section className="section-5 py-5">
      <div className="container">
        <div className="section-header text-center">
          <span>Testimonials</span>
          <h2>What People Say About Us</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
        </div>
        <Swiper
          modules={[Pagination, Scrollbar]}
          spaceBetween={50}
          slidesPerView={3}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            200: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 50 },
          }}
        >
          {testimonials &&
            testimonials.map((testimonial) => {
              return (
                <SwiperSlide key={testimonial.id}>
                  <div className="card shadow border-0">
                    <div className="card-body p-5">
                      <div className="rating">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      </div>
                      <div className="content  pt-4 pb-2">
                        <p>{testimonial.testimonial}</p>
                      </div>
                      <hr />
                      <div className="d-flex meta">
                        <div>
                          <img
                            src={
                              fileUrl +
                              "uploads/testimonials/" +
                              testimonial.image
                            }
                            alt=""
                            width={50}
                          />
                        </div>
                        <div className="ps-3">
                          <div className="author-name">
                            {testimonial.citation}
                          </div>
                          <div>{testimonial.designation}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </section>
  );
};

export default ShowTestimonials;
