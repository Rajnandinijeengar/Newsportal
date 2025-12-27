import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Bloglist = () => {
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setLatest(data[0]); // latest (first one)
      })
      .catch((err) => console.error("Error fetching latest news:", err));
  }, []);

  return (
    <div className="container my-5">
      {latest ? (
        <div className="card shadow-lg border-0">
          <img
          src={latest.image || "https://via.placeholder.com/100x80?text=No+Image"}
            alt={latest.title}
            className="card-img-top"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h3 className="card-title">{latest.title}</h3>
            <p className="card-text">{latest.description}</p>
            <a href="/blogs" className="btn btn-dark">Read More</a>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading latest news...</p>
      )}
    </div>
  );
};

export default Bloglist;
