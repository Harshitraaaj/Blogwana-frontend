import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl, post } from '../services/Endpoint';
import { removeUser } from '../redux/AuthSlice';
import toast from 'react-hot-toast';
import Logo from './Logo';
import "@theme-toggles/react/css/Expand.css";
import { Expand } from "@theme-toggles/react";
import { ThemeContext } from '../Context/ThemeContext';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await post("/auth/logout");
      if (response.status === 200) {
        navigate('/');
        dispatch(removeUser());
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg px-3 py-2 shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Left: Hamburger + Logo */}
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler me-2"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon "></span>
          </button>

          <Link to="/" className="navbar-brand d-flex align-items-center">
            <Logo width={300} height={80} animate={true} />
          </Link>
        </div>

        {/* Center: Navigation links (collapsible) */}
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto fw-semibold gap-lg-4 ">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/addpost" onClick={() => setMenuOpen(false)}>Create Post</Link>
            </li>
          </ul>
        </div>

        {/* Right: Theme toggle + Login/Profile */}
        <div className="d-flex align-items-center gap-3 ms-auto gum">
          <Expand
            duration={850}
            toggled={darkMode}
            onToggle={toggleTheme}
            style={{ fontSize: '1.5rem', cursor: 'pointer' }}
          />

          {!user ? (
            <Link to="/login" >
              <button className="btn fw-bold">Sign in</button>
            </Link>
          ) : (
            <div className="dropdown">
              <div
                className="avatar-container pointer rounded-circle overflow-hidden"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: '40px', height: '40px', cursor: "pointer" }}
              >
                
                <img
                  src={user.profile.startsWith('http') ? user.profile : `${BaseUrl}/images/${user.profile}`}
                  className="img-fluid h-100 w-100 "
                  alt="profile"
                  style={{ objectFit: "cover" }}

                />
              </div>
              <ul className="dropdown-menu dropdown-menu-end">
                {user.role === 'admin' && (
                  <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                )}
                <li><Link className="dropdown-item" to={`/profile/${user._id}`}>Profile</Link></li>
                <li><span className="dropdown-item" style={{ cursor: "pointer" }} onClick={handleLogout}>Sign Out</span></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
