import React, { useRef } from 'react';
import LatestPost from '../Components/LatestPost';
import FeaturedPost from '../Components/FeaturedPost';


export default function Home() {

  const featuredRef = useRef(null);
  const latestRef = useRef(null);

 
  return (
    <>

      {/* Hero Section */}
      <div className="container-fluid text-center" style={{ marginTop: "5rem" }} >
        <h1 className="fw-bold" style={{ fontSize: '4.5rem' }}>
          <span>Welcome to Blog</span>
          <span style={{ color: '#67C9CF' }}>wana</span>
        </h1>
        <p className="fs-4 mt-3 fw-semibold" style={{ color: '#4B5563' }}>
          Discover amazing stories, insights, and the latest trends in technology,<br />
          design, and development from our community of passionate writers.
        </p>


        <div className="mt-5 ">

          <button className='btn btn-primary btn-lg fs-6 rounded-pill me-3'  onClick={() => featuredRef.current?.scrollIntoView({ behavior: 'smooth' })}>Start Reading</button>
          <button className='btn btn-light btn-lg fs-6 rounded-pill me-3'  onClick={() => latestRef.current?.scrollIntoView({ behavior: 'smooth' })}> Browse Collection </button>

        </div>
      </div>
      <div className="container d-flex align-items-center gap-3 " style={{ marginTop: '7rem' }} ref={featuredRef}>
        <h2 className="fw-bold mb-0">Featured Articles</h2>
        <div style={{
          height: '3px',
          flexGrow: 1,
          background: 'linear-gradient(to left, black, #67C9CF)',
          borderRadius: '10px'
        }}></div>
      </div>

      {/* Featured Posts Section */}
      <div className="container p-5">
        <FeaturedPost />
      </div>

      <div className="container d-flex align-items-center gap-3 " ref={latestRef}>
        <h2 className="fw-bold mb-0" style={{ marginTop: '7rem' }} >Latest Articles</h2>
       </div>
        <div style={{
          height: '3px',
          flexGrow: 1,
          background: 'linear-gradient(to left, black, #67C9CF)',
          borderRadius: '10px'
        }}>
      </div>

      {/* Latest Posts Section */}
      <div className="container p-5">
        <LatestPost />
      </div>
    </>
  );
}