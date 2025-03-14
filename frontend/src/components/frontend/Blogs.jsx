import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import BlogImage from "../../assets/images/construction1212.jpg";
import { apiUrl, fileUrl } from "../common/Http";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async (data) => {
    //         const newData = {...data, "content":content,"imageId":imageId }
    const res = await fetch(apiUrl + "get-articles", {
      method: "GET",
      // 'headers': {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //     'Authorization': `Bearer ${token()}`  // Use backticks here
      // },
    });
    const result = await res.json();
    console.log(result);
    setArticles(result.data);
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="section-6 bg-light py-5">
          <div className="container">
            <div className="section-header text-center">
              <span>Blog & News</span>
              <h2>Articles and Blog Posts</h2>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
            </div>
            <div className="row pt-3">
              {/* <div className="row pt-4"> */}
              {articles &&
                articles.map((article) => {
                  return (
                    <div className="col-md-4   mb-4" key={article.id}>
                      <div className="card shadow border-0">
                        <div className="card-img-top">
                          <img
                            src={`${fileUrl}uploads/articles/small/${article.image}`}
                            alt=""
                            className="w-100"
                          />
                        </div>
                        <div className="card-body p-4">
                          <div className="mb-3">
                            <Link to={`/blog/${article.id}`} className="title">
                              {article.title}
                            </Link>
                          </div>
                          <Link
                            to={`/blog/${article.id}`}
                            className="btn btn-primary small"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                      {/* <div className="item">
                          <div className="service-image">
                            <img
                              src={
                                fileUrl +
                                "uploads/articles/small/" +
                                article.image
                              }
                              alt=""
                              className="w-100"
                            />
                          </div>
                          <div className="service-body">
                            <div className="service-title">
                              <h3>{article.title}</h3>
                              <div className="service-content">
                                <p>{article.content}</p>
                              </div>
                              <Link
                                to={`/blog/${article.id}`}
                                className="btn btn-primary small"
                              >
                                Read More
                              </Link>
                            </div>
                          </div>
                        </div> */}
                    </div>
                  );
                })}
              {/* </div> */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blogs;
