import React, { useEffect, useState } from "react";
import { apiUrl, fileUrl } from "./Http";
import { Link } from "react-router-dom";

const LatestArticles = () => {
  const [articles, setArticles] = useState([]);

  const fetchLatestArticles = async (data) => {
    //         const newData = {...data, "content":content,"imageId":imageId }
    const res = await fetch(apiUrl + "get-latest-articles?limit=3", {
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
    fetchLatestArticles();
  }, []);
  return (
    <>
      <section className="section-3 bg-light py-5">
        <div className="container-fluid py-5">
          <div className="section-header text-center">
            <span>Blog & News</span>
            <h2>Articles and Blog Posts</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
          </div>
          <div className="row pt-4">
            {articles &&
              articles.map((article) => {
                return (
                  <div className="col-md-4 col-lg-4" key={article.id}>
                    <div className="card shadow border-0">
                      <div className="card-img-top">
                        <img
                          src={
                            fileUrl + "uploads/articles/small/" + article.image
                          }
                          alt=""
                          className="w-100"
                        />
                      </div>
                      <div className="card-body p-4">
                        <div>
                          <Link to={`/blog/${article.id}`} className="title ">
                            {article.title}e
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
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestArticles;
