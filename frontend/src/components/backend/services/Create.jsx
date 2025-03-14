import React, { useState, useRef, useMemo } from 'react'
import Header from '../../common/Header';
import Sidebar from '../../common/Sidebar';
import Footer from '../../common/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { apiUrl, token } from '../../common/Http';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';

const Create = ({placeholder}) => {

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);


    const config = useMemo(() => ({
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: placeholder || 'Content...'
        }),
        [placeholder]
    );


    const {
        register,
        handleSubmit, 
        watch,
        formState: { errors },
      } = useForm()
    
    const navigate = useNavigate(); 
    const onSubmit = async (data) => {
        const newData = {...data, "content":content,"imageId":imageId }
        const res = await fetch(apiUrl + 'services', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`  // Use backticks here
            },
            body: JSON.stringify(newData)
        });
        const result = await res.json();
        // console.log(result);
        if (result.status == true) {
            toast.success(result.message);
            navigate('/admin/services');
        } else {
            toast.error(result.message);
        }
    }

    const handleFile = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image", file);
        setIsDisable(true);
        // image store temp url http://127.0.0.1:8000/api/temp-images
        await fetch(apiUrl + 'temp-images', {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`  // Use backticks here
            },
            body: formData
        })
            .then(Response => Response.json())
        
            .then(result => {
                setIsDisable(false);
                if (result.status == false) {
                    toast.error(result.errors.image[0])
                } else {
                    setImageId(result.data.id)
                }
            });

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
                                        <h4 className='h5'>Services</h4>
                                        <Link to="/admin/services" className='btn btn-secondary'>Back</Link>
                                        
                                    </div>
                                    <hr />
                                    <form   onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label className='form-label'>Title</label>
                                            <input
                                            placeholder='Title'
                                                {
                                                    ...register('title', {
                                                    required: "Title field is required."
                                                })
                                                }
                                                type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`}  />
                                                    {
                                                        errors.title && <p className='invalid-feedback'>{ errors.title?.message }</p>
                                                    }
                                        </div>
                                        <div className="mb-3">
                                            <label className='form-label'>Slug</label>
                                            <input
                                            placeholder='Slug'
                                                {
                                                    ...register('slug', {
                                                        required: "Slug field is required."
                                                    })
                                                    }
                                                type="text" className={`form-control ${errors.slug ? 'is-invalid' : ''}`}  />
                                                    {
                                                        errors.slug && <p className='invalid-feedback'>{ errors.slug?.message }</p>
                                                    }
                                        </div>
                                        
                                        <div className="mb-3">
                                            <label
                                                
                                                className='form-label'>Short Description</label>
                                            <textarea
                                                placeholder='Short Description'
                                                {
                                                    ...register('short_desc')
                                                    } className='form-control'  rows={4}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                
                                                className='form-label'>Content</label>
                                                    
                                                    <JoditEditor
                                                        ref={editor}
                                                        value={content}
                                                        config={config}
                                                        tabIndex={3} // tabIndex of textarea
                                                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                                        onChange={newContent => {}}
                                                    />
                                        </div>
                                        <div className="mb-3">
                                            <label className='form-label' htmlFor="">Image</label>
                                            <br />
                                            <input type="file" onChange={handleFile} name="" id="" />
                                            
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="">Status</label>
                                            <select className='form-control'
                                                {
                                                    ...register('status')
                                                }
                                            >
                                                <option value="1">Active</option>
                                                <option value="0">Block</option>
                                            </select>
                                        </div>

                                        <button disabled={isDisable} className='btn btn-primary'>Submit</button>




                                    </form>
                                    
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

export default Create
