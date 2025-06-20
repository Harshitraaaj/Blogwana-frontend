import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseUrl, get } from '../services/Endpoint';
import { FaRegUser } from "react-icons/fa6";

export default function FeaturedPost() {
  const [blogs, setBlogs] = useState([]);

  const randomBlogs = blogs?.length >= 2
    ? [...blogs].sort(() => 0.5 - Math.random()).slice(0, 2)
    : blogs || [];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const request = await get('/blog/GetPosts');
        const response = request.data;
        setBlogs(response.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  const truncateText = (text = '', wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  return (
    <div className="container-fluid">
      <div className="row g-4">
        {randomBlogs.map((elem) => (
          <div className="col-12 col-sm-6 col-lg-6 d-flex" key={elem._id}>
            {console.log("BURRRRRRRRRRRRRRRRRRRRRRRRRRRR", elem)}
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
                  <h5 className="card-title mb-4">{elem.title}</h5>
                  <p className="card-text flex-grow-1 fs-9 mb-5">
                    {truncateText(elem.desc, 20)}
                  </p>

                  <div className="d-flex justify-content-between">
                    <p className="card-text text-muted">
                      <FaRegUser /> {elem.author && elem.author.FullName}
                    </p>
                    <p className="card-text text-muted">
                      {new Date(elem.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
