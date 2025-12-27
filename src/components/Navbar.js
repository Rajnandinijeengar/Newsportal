import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  const styles = {
    navbar: {
      backgroundColor: "#ff8247",
      padding: "10px 20px",
      height: "100px",
    },
    logo: {
      fontWeight: "bold",
      fontSize: "50px",
      color: "white",
      textDecoration: "none",
    },
    navItem: {
      color: "white",
      fontSize: "18px",
    
      marginRight: "20px",
      textDecoration: "none",
    },
  };

  return (

  
    <nav className="navbar navbar-expand-lg navbar-dark" style={styles.navbar}>
      <div className="container-fluid">
        <Link to="/" style={styles.logo} className="navbar-brand">
          📰 Newsworld
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" style={styles.navItem} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/latestnews" style={styles.navItem} className="nav-link">
                Latest News
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Addnews" style={styles.navItem} className="nav-link">
             AddNews
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Opendata" style={styles.navItem} className="nav-link">
           Userdata
              </Link>
            </li>
           
            <li className="nav-item">
              <Link to="/contact" style={styles.navItem} className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" style={styles.navItem} className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
