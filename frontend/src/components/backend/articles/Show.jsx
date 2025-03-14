import React, { useEffect, useState } from "react";
import Footer from "../../common/Footer";
import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import { apiUrl, token } from "../../common/Http";

const Show = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const res = await fetch(apiUrl + "articles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`, // Use backticks here
      },
    });

    const result = await res.json();
    setArticles(result.data);
    // console.log(result);
  };
  const deleteServices = async (id) => {
    if (confirm("Are you sure! Delete this record?")) {
      const res = await fetch(apiUrl + "articles/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`, // Use backticks here
        },
      });

      const result = await res.json();

      if (result.status == true) {
        const newArticles = articles.filter((article) => article.id != id);
        setArticles(newArticles);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };
  useEffect(() => {
    fetchArticles();
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
                    <h4 className="h5">Articles</h4>
                    <Link
                      to="/admin/articles/create"
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
                        <th>Title</th>
                        <th>content</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles &&
                        articles.map((article) => {
                          return (
                            <tr key={`article-${article.id}`}>
                              <td>{article.id}</td>
                              <td>{article.title}</td>
                              <td>{article.content}</td>
                              <td>
                                {article.status == 1 ? "Active" : "Block"}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/articles/edit/${article.id}`}
                                  className="btn btn-primary btn-sm "
                                  rel="noopener noreferrer"
                                >
                                  Edit
                                </Link>
                                <Link
                                  onClick={() => deleteServices(article.id)}
                                  className="btn btn-secondary btn-sm ms-2"
                                  rel="noopener noreferrer "
                                >
                                  Del
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
