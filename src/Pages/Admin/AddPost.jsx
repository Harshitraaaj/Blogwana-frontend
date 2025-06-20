import React, { useState, useEffect } from 'react';
import CreateBlogModal from '../../Components/CreateBlogModal';
import { BaseUrl, delet, get, patch } from '../../services/Endpoint';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';


export default function AddPost() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const handleNewPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  useEffect(() => {
    if (user?._id) {
      get(`/blog/getpost/user/${user._id}`)
        .then((res) => {
          if (res.data.success) setPosts(res.data.posts);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const deletepost = async (postId) => {
    try {
      const response = await delet(`/blog/delete/${postId}`);
      if (response.data.success) {
        setPosts(posts.filter(post => post._id !== postId));
        toast.success("Post deleted successfully");
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  return (
    <div className="container ">

      <div className=" text-1 mt-4 text-start fw-bold fs-1">Create Your Blog</div>
      <div className=" mt-5 ">
        <button className="btn btn-lg fw-semibold mb-5 custom-blog-button" onClick={() => setShowModal(true)} >
          New Blog </button>

        <CreateBlogModal
          show={showModal}
          handleClose={() => { setShowModal(false) }}
          onPostCreated={handleNewPost} />
      </div>
      <div className="container d-flex align-items-center gap-3 " style={{ marginTop: '7rem' }}>
        <h2 className="fw-bold mb-0">Your Created Blogs</h2>
        <div style={{
          height: '3px',
          flexGrow: 1,
          background: 'linear-gradient(to left, black, #67C9CF)',
          borderRadius: '10px'
        }}></div>
      </div>
      <div className="mt-4 px-3">

        <div className="row">
          {posts.length === 0 ? (
            <p className='mt-5 text-center'> You haven't created any posts yet.</p>
          ) : (
            posts.map((post) => (
              <div className="col-md-4 col-lg-6 mb-4" key={post._id}>
                <div className="card h-100">
                  {console.log("post sdnaksjd", post)}
                  <img
                    src={post.image.startsWith('http') ? post.image : `${BaseUrl}/images/${post.image}`}
                    className="card-img-top img-fluid border-bottom"
                    alt="Blog Post"
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <div className="card-body">
                    <h5 className="card-title fw-semibold fs-5">{post.title}</h5>
                    <hr style={{ border: '1px solid gray', marginTop: '1rem' }} />
                    <small >  <p className="card-text ">{post.desc}</p></small>
                  </div>
                  <div className="button d-flex justify-content-between p-3">
                    <button className='btn btn-sm btn-outline-danger' onClick={() => deletepost(post._id)}>Delete post</button>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>








  );
}
