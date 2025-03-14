import React, { useContext, useEffect } from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/Auth';

const Login = () => {
    const { login,user } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    
    useEffect(() => {
        if (user) {
            
            toast.success("Login Successfully.");
            navigate("/admin/dashboard"); // Redirect if already logged in
        }
    }, [user, navigate]);

    const onSubmit = async (data) => {
        //console.log(data)
        const res = await fetch("http://127.0.0.1:8000/api/authenticate",
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        const result = await res.json();

        //Using toast for notification
        if (result.status === "false") {            
            toast.error(result.message);
        } else {
            const userInfo = {
                id: result.id,
                token:result.token
            }

            localStorage.setItem('userInfo',JSON.stringify(userInfo))
            login(userInfo);
            navigate('/admin/dashboard');
        }
    }
  return (
      <>
          <Header/>
          <main>
              <div className='container my-5 d-flex justify-content-center '>
                  <div className="login-form my-5">
                      <div className="card border-0 shadow">
                          <div className="card-body p-4 ">
                              <form onSubmit={handleSubmit(onSubmit)}>
                                  <h4 className='mb-3'>Login Here</h4>
                                  <div className='mbm-3'>
                                      <label  className='form-label'>Email</label>
                                      <input
                                          {
                                          ...register('email', {
                                              required: "This field is required.",
                                              pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Please enter a valid email address'
                                            }
                                            })
                                          }
                                          
                                          type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder='Enter Email' />
                                      
                                      {
                                          errors.email && <p className='invalid-feedback'>{ errors.email?.message}</p>
                                      }

                                  </div>
                                  <div className='mb-3'>
                                      <label  className='form-label'>Password</label>
                                      <input
                                      
                                      {
                                        ...register('password', {
                                              required:"This field is required."
                                          })
                                          } type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder='Enter Password' />
                                      {
                                          errors.password && <p className='invalid-feedback'>{ errors.password?.message}</p>
                                      }
                                  </div>
                                  <button type="submit" className='btn btn-primary'>Login</button>
                              </form>
                          </div>
                      </div>
                  </div>
                   
              </div>
          </main>
      <Footer/>
      </>
  )
}

export default Login
