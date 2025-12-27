import React from "react";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#ff8247",
        color: "#fff",
        textAlign: "center",
        padding: "15px 0",
        fontFamily: "Arial, sans-serif",
       

      }}
    >
      <h3 style={{ margin: 0, fontSize: "30px", color: "#f5f5f5" }}>
        📰 NewsPortal
      </h3>
      <p style={{ margin: "5px 0", fontSize: "18px", color: "white" }}>
        Bringing you the latest and most trusted news updates.
      </p>
      <p style={{ margin: "5px 0", fontSize: "15px", color: "white" }}>
        © {new Date().getFullYear()} NewsPortal | All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
