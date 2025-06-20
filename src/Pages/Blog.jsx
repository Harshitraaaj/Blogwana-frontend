import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseUrl, get, post } from '../services/Endpoint';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function Blog() {
  const { postId } = useParams(); 
  const user = useSelector((state) => state.auth.user);

  const [singlePost, setSinglePost] = useState(null);
  const [comment, setComment] = useState('');
  const [loaddata, setLoaddata] = useState(false);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const request = await get(`/public/Singlepost/${postId}`);
        const response = request.data;
        setSinglePost(response.Post);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePost();
  }, [loaddata, postId]); 

  const onSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('please Login')
    }else{
      try {
        const request = await post("/comment/addcomment", {
          comment,
          postId,
          userId: user._id,
        });
        const response = request.data;
        console.log(response);
        setLoaddata((prevState) => !prevState); // Toggle loaddata
        if (response.success) {
          // alert(response.message);
          toast.success(response.message)
          setComment('')
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
          // setError(error.response.data.message); // Set error message from server response
          toast.error(error.response.data.message)
      } else {
          toast.error("An unexpected error occurred. Please try again.");
      }
      }
    }
    
  };
  console.log(singlePost);

  return (
    <div className="container  mt-5 mb-5">
      <div className="row">
        <div className="col-md-12">
          
          <img 
            src={singlePost && `${BaseUrl}/images/${singlePost.image}`} 
            alt="Exploring the Art of Writing" 
            className="img-fluid mb-4" 
            style={{ borderRadius: "10px", maxHeight: "500px", objectFit: "cover", width: "100%" }}
          />

          <h1 className="fw-bold mt-5 mb-5 display-4" style={{
            fontSize: '3rem',
           
          }}>{singlePost && singlePost.title}</h1>
          
          <p className="mt-5 mb-5 m-5 ">{singlePost && singlePost.desc}</p>

            <div className="line " style={{
          height: '3px',
          flexGrow: 1,
          background: 'linear-gradient(to left, black, #67C9CF)',
          borderRadius: '10px',
          marginTop:'10rem'
        }}></div>

        

       

          <h3 className="mt-5 mb-4">Comments</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Comment</label>
              <textarea className="form-control" id="comment" rows="4" placeholder="Write your comment here" required
               value={ comment} onChange={(e)=>setComment(e.target.value)}></textarea>
            </div>
            <button type="submit" className="btn btn-outline-primary" onClick={onSubmitComment}>Submit Comment</button>
          </form>

         

         
         {singlePost && singlePost.comments && singlePost.comments.map((elem)=>{
          return(
            <div className="bg-transparent p-3 rounded mb-3 d-flex mt-5">
            <img 
             src={`${BaseUrl}/images/${elem.userId.profile}`}
              alt="John Doe" 
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px", objectFit: "cover" ,fontSize: "0.2rem"}}
            />
            <div>
              <h5 className="mb-1">{elem.userId.FullName}</h5>
              <p className="mb-0">{elem.comment}</p>
            </div>
          </div>
          )
         })}
       
      
        </div>
      </div>
    </div>
  )
}
