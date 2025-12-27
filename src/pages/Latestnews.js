import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


function Latestnews() {
  const [newsList, setNewsList] = useState([]);

  // ✅ Fetch news from backend
  useEffect(() => {
    fetch("http://localhost:4000/api/news")
      .then((res) => res.json())
      .then((data) => setNewsList(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container my-5">
        <div className="row g-4">
          {newsList.length > 0 ? (
            newsList.map((news) => (
              <div className="col-lg-4 col-md-6" key={news._id}>
                <div className="blog-card shadow-sm border rounded h-100 p-3">
                  {/* Image Section */}
                  {news.image ? (
                    <img
                    src={news.image || "https://via.placeholder.com/100x80?text=No+Image"}
                    alt="news"
                    className="rounded me-3"
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center bg-light text-muted mb-3 rounded"
                      style={{ height: 200 }}
                    >
                  
                    </div>
                  )}

                  {/* Title */}
                  <h5 className="blog-title mb-2">{news.title}</h5>

                  {/* Read More Link */}
                 <Link
  to="/Bloglist"
  className="text-primary text-decoration-none fw-semibold"
>
  Read More →
</Link>

                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No news available</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Latestnews;
