import React, { useEffect, useState } from "react";
import Footer from "../../common/Footer";
import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import { apiUrl, token } from "../../common/Http";
import { toast } from "react-toastify";

const Show = () => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const res = await fetch(apiUrl + "members", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`, // Use backticks here
      },
    });

    const result = await res.json();
    setMembers(result.data);
    // console.log(result);
  };
  useEffect(() => {
    fetchMembers();
  }, []);

  const deleteMember = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      const res = await fetch(apiUrl + "members/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`, // Use backticks here
        },
      });
      const result = await res.json();

      if (result.status == true) {
        const newMembers = members.filter((member) => member.id != id);
        setMembers(newMembers);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
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
                    <h4 className="h5">Members</h4>
                    <Link
                      to="/admin/members/create"
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
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members &&
                        members.map((member) => {
                          return (
                            <tr key={`member-${member.id}`}>
                              <td>{member.id}</td>
                              <td>{member.name}</td>
                              <td>{member.job_title}</td>
                              <td>{member.status == 1 ? "Active" : "Block"}</td>
                              <td>
                                <Link
                                  to={`/admin/members/edit/${member.id}`}
                                  className="btn btn-primary btn-sm "
                                  rel="noopener noreferrer"
                                >
                                  Edit
                                </Link>
                                <Link
                                  onClick={() => deleteMember(member.id)}
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
