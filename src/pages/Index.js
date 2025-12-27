import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Index() {
  return (
    <div>
      <Navbar />

      <img
        src="/img/AA1P7clR.jpeg"   // ✅ Correct path (no 'public/')
        alt="News Portal"
        style={{
          width: "100%",
          height: "900px",
          objectFit: "cover",
   
          display: "block",
        }}
      />
<div
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  
    color: "white",
    padding: "30px 50px",
    borderRadius: "5px",
    fontSize: "45px",
    textAlign:"center",
    fontWeight: "bold",
    border:"3px solid white"

  }}
>
  Welcome to News World 🌍
  <p style={{fontSize:"30px", fontWeight:"normal"}}>where stories matter</p>
</div>
<Footer/>
    </div>
  );
}

export default Index;
