import React, { useEffect, useState } from 'react'
import Footer from '../../common/Footer'
import { Link } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import Header from '../../common/Header'
import { apiUrl, token } from '../../common/Http'
import { toast } from 'react-toastify'

const Show = () => {

    const [projects, setProjects] = useState([]);
    
        const fetchServices = async () => {
            const res = await fetch(apiUrl + 'projects', {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`  // Use backticks here
                }
            });
    
            const result = await res.json();
            setProjects(result.data);
            // console.log(result);
    }
    
    useEffect(() => {
        fetchServices();
    }, []);

    const deleteServices = async (id) => {
        if (confirm('Are you sure! Delete this record?')) {
            const res = await fetch(apiUrl + 'projects/'+id, {
                'method': 'DELETE',
                'headers': {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`  // Use backticks here
                }
            });
    
            const result = await res.json();
    
            if (result.status == true) {
                const newProjects = projects.filter(project => project.id != id);
                setProjects(newProjects);
                toast.success(result.message);                
            } else {
                toast.error(result.message);
            }
        }
    }   

  return (
    <>
    <Header />
    <main className=''>
        <div className="container my-5">
          <div className="row  ">
              
              <div className='col-md-3'>
                  {/* SideBar */}
                 <Sidebar/>
              </div>
              <div className='col-md-9 dashboard'>
                  {/* Dashboard */}
                  <div className="card shadow border-0">
                      <div className="card-body   align-items-center ">
                                  <div className="d-flex justify-content-between">
                                      <h4 className='h5'>Projects</h4>
                                      <Link to="/admin/projects/create" className='btn btn-secondary'>Create</Link>
                                      
                                  </div>
                                  <hr />
                                  <table className='table table-striped'>
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
                                          {
                                              projects && projects.map(project => {
                                                  return (
                                                    <tr key={`project-${project.id}`}>
                                                        <td>{project.id}</td>
                                                        <td>{project.title}</td>
                                                        <td>{project.slug}</td>
                                                          <td>{
                                                              (project.status == 1) ? 'Active' : 'Block'
                                                          }</td>
                                                          <td>
                                                              
                                                              <Link to={`/admin/projects/edit/${project.id}`} className="btn btn-primary btn-sm "   rel="noopener noreferrer">Edit</Link>
                                                              <Link onClick={()=> deleteServices(project.id)}  className="btn btn-secondary btn-sm ms-2"  rel="noopener noreferrer ">Del</Link>
                                                         </td>
                                                    </tr> 
                                                  )
                                              })
                                          }
                                          
                                      </tbody>
                                      
                                  </table>
                      </div>
                  </div>
              </div>
          </div>
        </div>
       
    </main>

    <Footer/>
    </>
  )
}

export default Show
