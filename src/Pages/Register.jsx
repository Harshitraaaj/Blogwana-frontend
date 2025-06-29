import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/Endpoint';
import toast from 'react-hot-toast';
import Navbar from '../Components/Navbar';

export default function Register() {
  const navigate=useNavigate()
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null, // To store the selected image
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue({ ...value, image: file });
  };

  const handleImageClick = () => {
    document.getElementById('image').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object
    const formData = new FormData();
    formData.append('FullName', value.fullName);
    formData.append('email', value.email);
    formData.append('password', value.password);
    formData.append('profile', value.image); // Using 'profile' as the key for the image

    try {
      const response = await post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;
      if (data.success) {
        console.log(data.message)
        navigate('/login')
        toast.success(data.message)

       }
      console.log('register api', data);
    } catch (error) {
      console.log(error);
      console.error("login error", error);
      if (error.response && error.response.data && error.response.data.message) {
          // setError(error.response.data.message); // Set error message from server response
          toast.error(error.response.data.message)
      } else {
          toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
    <Navbar />
      <section className="Container">
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
         
          <div className="card shadow-sm w-100" style={{ maxWidth: '700px' }}>
            <div className="card-body p-4">
              <h1 className="h5  fw-bold text-center fs-2">Create a new account</h1>
              <p className='text-center fs-10'>It's quick and easy.</p>
              <form onSubmit={handleSubmit}>
                <div className=" text-center">
                  
                  <div className="d-flex justify-content-center ">
                    <img 
                      src={value.image ? URL.createObjectURL(value.image) : 'OIP.jpg'} // Default avatar if no image is selected
                      alt="avatar" 
                      className="rounded-circle" 
                      width="100" 
                      height="100"
                      style={{ cursor: 'pointer' }}
                      onClick={handleImageClick} // Click event to trigger file input
                    />
                  </div>
                  <label htmlFor="image" className="form-label" style={{fontSize:"0.67rem"}}>Select Profile</label>
                  <input 
                    type="file" 
                    className="form-control d-none" // Hide the file input
                    id="image" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="fullName" 
                    placeholder="John Doe" 
                    required 
                    value={value.fullName} 
                    onChange={(e) => setValue({ ...value, fullName: e.target.value })} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="name@company.com" 
                    required 
                    value={value.email} 
                    onChange={(e) => setValue({ ...value, email: e.target.value })} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="••••••••" 
                    required 
                    value={value.password} 
                    onChange={(e) => setValue({ ...value, password: e.target.value })} 
                  />
                </div>
                <button type="submit" className="btn btn-outline-primary w-100">Sign up</button>
              </form>
              <p className="mt-3 mb-0 ">
                Already have an account? <Link to="/login" className="text-primary text-decoration-none">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
