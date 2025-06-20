import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseUrl, get } from '../services/Endpoint';
import { FaRegUser } from "react-icons/fa6";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function LatestPost() {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const request = await get('/blog/GetPosts');
        const response = request.data;
        setBlogs(response.posts.reverse());
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (isBottom && visibleCount < blogs.length) {
        setVisibleCount(prev => prev + 6);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount, blogs.length]);

  const truncateText = (text = '', wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  const BlogSkeletonCard = () => (
    <div className="col-12 d-flex mb-4">
      <div className="card p-3 w-100">
        <Skeleton height={200} />
        <div className="mt-3">
          <Skeleton height={25} width={`80%`} />
          <Skeleton count={2} />
          <div className="d-flex justify-content-between mt-3">
            <Skeleton width={60} height={20} />
            <Skeleton width={60} height={20} />
          </div>
          <Skeleton height={35} className="mt-2" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row g-4">
        {loading
          ? Array(6).fill(0).map((_, i) => <BlogSkeletonCard key={i} />)
          : blogs.slice(0, visibleCount).map((elem) => (

            <div className="col-12 d-flex mb-4" key={elem._id}>
              <Link
                to={`/blog/${elem._id}`}
                className="text-decoration-none text-dark w-100"
              >


                <div
                  className="card custom-card h-100 d-flex flex-column"
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    width: "100%",
                    backgroundColor: "transparent",
                    transition: "box-shadow 0.3s ease",
                    cursor: "pointer"
                  }}
                >
                  <img
                    src={elem.image.startsWith('http') ? elem.image : `${BaseUrl}/images/${elem.image}`}
                    className="card-img-top img-fluid border-bottom"
                    alt="Blog Post"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-3 fw-normal">{elem.title}</h5>
                    <p className="card-text  fs-9 flex-grow-1 mb-5 mt-4">
                      {truncateText(elem.desc, 40)}
                    </p>
                    <div className="d-flex justify-content-between">
                      <p className="card-text " style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                        <FaRegUser /> {elem.author && elem.author.FullName}
                      </p>
                      <p className="card-text " style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                        {new Date(elem.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
}
