import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import HeroBanner from "../common/HeroBanner";
import { apiUrl, fileUrl } from "../common/Http";
import { Link, useParams } from "react-router-dom";

const BlogDetail = () => {
  const params = useParams();
  const [article, setArticle] = useState([]);
  const [articles, setArticles] = useState([]);

  const fetchLatestArticles = async (data) => {
    // const res = await fetch(apiUrl + "get-services/" + params.id, {
    const res = await fetch(`${apiUrl}get-latest-articles`, {
      method: "GET",
    });
    const result = await res.json();
    setArticles(result.data);
    console.log(result);
  };

  const fetchArticle = async (data) => {
    // const res = await fetch(apiUrl + "get-services/" + params.id, {
    const res = await fetch(`${apiUrl}get-article/${params.id}`, {
      method: "GET",
    });
    const result = await res.json();
    setArticle(result.data);
    console.log(result);
  };

  useEffect(() => {
    fetchArticle();
    fetchLatestArticles();
  }, [params.id]);

  return (
    <>
      <Header />
      <main>
        <HeroBanner
          preHeading="Quality, Integrity and Value"
          heading="Blog and News"
        />
        <section className="section-12 ">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-8">
                <h2>{article.title}</h2>
                <div className="pb-3">
                  by <strong>{article.author}</strong> on {article.created_at}
                </div>
                <div className="pe-md-3 pb-3">
                  <img
                    src={`${fileUrl}uploads/articles/large/${article.image}`}
                    alt=""
                    className="w-100"
                  />
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: article.content }}
                ></div>
              </div>
              <div className="col-md-4">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body px-5 py-4">
                    <h3 className="mt-2 mb-3">Latest Blogs</h3>
                    {articles &&
                      articles.map((article) => {
                        return (
                          <div
                            className="d-flex border-bottom mb-3 pb-2"
                            key={article.id}
                          >
                            <div className="pe-3 pb-2">
                              <Link to={`/blog/${article.id}`}>
                                <img
                                  src={`${fileUrl}uploads/articles/small/${article.image}`}
                                  alt=""
                                  width={100}
                                />
                              </Link>
                            </div>
                            <div className="pb-2">
                              <Link
                                to={`/blog/${article.id}`}
                                className="title"
                              >
                                {article.title}
                              </Link>
                              <h6></h6>
                              {/* <p>{article.created_at}</p>
                            <a href={`/blog/${article.id}`}>Read More</a> */}
                            </div>
                          </div>
                        );
                      })}
                    <hr />
                    {/* <div className="d-flex">
                    <div className="pe-3 pb-2"></div>
                    <a href=""></a>
                  </div> */}
                  </div>
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

export default BlogDetail;
