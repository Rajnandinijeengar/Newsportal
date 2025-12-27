import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const styles = {
    sectionHero: {
      backgroundColor: "#fff8f2",
      padding: "60px 0",
      textAlign: "center",
    },
    helloText: {
      color: "#ff8247",
      fontWeight: "600",
      fontSize: "18px",
    },
    title: {
      fontSize: "40px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    subtitle: {
      color: "#555",
      fontSize: "18px",
      lineHeight: "1.7",
      maxWidth: "800px",
      margin: "0 auto",
    },
    infoBox: {
      borderRadius: "10px",
      backgroundColor: "rgb(255, 130, 71)",
      padding: "30px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    infoTitle: {
      fontSize:"20px",
      color: "white",
      fontWeight:"bold",
    },
    infoText: {
      color: "White",
      marginBottom: "0",
      fontWeight:"normal",
    },
    icon: {
      color: "#ff8247",
      fontSize: "25px",
      marginRight: "15px",
    },
    formBox: {
      borderRadius: "10px",
      backgroundColor: "#fff",
      padding: "30px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    input: {
      borderRadius: "6px",
      border: "1px solid #ccc",
      padding: "10px",
      width: "100%",
      marginBottom: "15px",
    },
    textarea: {
      borderRadius: "6px",
      border: "1px solid #ccc",
      padding: "10px",
      width: "100%",
      height: "120px",
      resize: "none",
      marginBottom: "15px",
    },
    button: {
      backgroundColor: "#ff8247",
      color: "#fff",
      border: "none",
      padding: "10px 25px",
      borderRadius: "5px",
      fontWeight: "500",
      float: "right",
    },
    buttonHover: {
      backgroundColor: "#e86b32",
    },
    mapContainer: {
      marginTop: "40px",
      marginBottom: "40px",
    },
  };

  return (
    <div>
        <Navbar/>
      {/* --- SAY HELLO SECTION --- */}
      <section style={styles.sectionHero}>
        <p style={styles.helloText}>--- SAY HELLO</p>
        <h2 style={styles.title}>Get In Touch</h2>
        <p style={styles.subtitle}>
          We’d love to hear from you! Whether it’s feedback, story ideas, or partnership
          opportunities — feel free to reach out to Newsworld.
        </p>
      </section>

      {/* --- CONTACT INFO + FORM SECTION --- */}
      <section className="container ">
        <div className="row">
          {/* ✅ Left Column: Contact Info */}
          <div className="col-lg-5 mb-4">
            <div style={styles.infoBox}>
              <div className="d-flex align-items-start mb-4">
                <i className="fa fa-phone" style={styles.icon}></i>
                <div>
                  <span style={styles.infoTitle}>Phone Number</span>
                  <p style={styles.infoText}>+91 98765 43210</p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <i className="fa fa-envelope" style={styles.icon}></i>
                <div>
                  <span style={styles.infoTitle}>Email Us</span>
                  <p style={styles.infoText}>contact@newsworld.com</p>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <i className="fa fa-map-marker" style={styles.icon}></i>
                <div>
                  <span style={styles.infoTitle}>Office Address</span>
                  <p style={styles.infoText}>
                    Newsworld Headquarters, 123 Media Street, New Delhi, India – 110001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Right Column: Form */}
          <div className="col-lg-7  ">
             <img
        src="/img/OIP.jpeg"   // ✅ Correct path (no 'public/')
        alt="News Portal"
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
   
          display: "block",
        }} />
          </div>
        </div>
      </section>

      {/* --- GOOGLE MAP SECTION --- */}
      <section style={styles.mapContainer}>
        <div className="container">
          <iframe
            title="Newsworld Location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1268529.114512213!2d-1.340307!3d51.612292000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2spl!4v1743766570425!5m2!1sen!2spl"
            width="100%"
            height="450"
            style={{ border: "0", borderRadius: "10px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Contact;
