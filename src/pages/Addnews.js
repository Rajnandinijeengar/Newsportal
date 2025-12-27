import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AddNews() {
  const [categories, setCategories] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [news, setNews] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null); // ✅ for showing preview image

  // ✅ Fetch categories
  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Category Fetch Error:", err));
  }, []);

  // ✅ Fetch news
  const fetchNews = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/news");
      const data = await res.json();
      setNewsList(data);
    } catch (err) {
      console.error("News Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
  };

  // ✅ Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a local preview
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);

      // Convert image to Base64 for saving
      const reader = new FileReader();
      reader.onloadend = () => {
        setNews({ ...news, image: reader.result }); // Base64 encoded image
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Add or Update news
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:4000/api/news/${editId}`
      : "http://localhost:4000/api/news";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(news),
      });

      if (res.ok) {
        alert(isEditing ? "✅ News updated successfully!" : "✅ News added successfully!");
        setNews({ title: "", content: "", category: "", image: "" });
        setPreview(null);
        setIsEditing(false);
        setEditId(null);
        fetchNews();
      } else {
        alert("❌ Failed to save news!");
      }
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  // ✅ Edit news
  const handleEdit = (item) => {
    setNews({
      title: item.title,
      content: item.content,
      category: item.category?._id || item.category || "",
      image: item.image,
    });
    setPreview(item.image);
    setIsEditing(true);
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete news
  const handleDelete = async (id) => {
    if (!window.confirm("🗑️ Are you sure you want to delete this news?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("✅ News deleted successfully!");
        fetchNews();
      } else {
        alert("❌ Failed to delete news!");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // ✅ Cancel edit
  const cancelEdit = () => {
    setNews({ title: "", content: "", category: "", image: "" });
    setPreview(null);
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row mt-3 mb-3">
        {/* ✅ Left Column: Add/Edit Form */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card shadow p-4">
            <h3
              className="mb-4 text-center"
              style={{ fontSize: "50px", color: "#ff8247" }}
            >
              {isEditing ? "✏️ Edit News" : "📰 Add News"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "20px", color: "#ff8247" }}>
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={news.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "20px", color: "#ff8247" }}>
                  Content
                </label>
                <textarea
                  name="content"
                  value={news.content}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "20px", color: "#ff8247" }}>
                  Category
                </label>
                <select
                  name="category"
                  value={news.category}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ✅ Image Upload Section */}
              <div className="mb-3">
                <label style={{ fontSize: "20px", color: "#ff8247" }}>Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                />

                {/* ✅ Preview */}
                {preview && (
                  <div className="mt-3 text-center">
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: "300px",
                        height: "auto",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary w-50 me-2">
                  {isEditing ? "Update" : "Add"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    className="btn btn-secondary w-50"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* ✅ Right Column: Display News */}
        <div className="col-lg-6 col-md-12">
          <div className="card shadow p-4">
            <h3
              className="mb-4 text-center"
              style={{ fontSize: "50px", color: "#ff8247" }}
            >
              🗞️ All News
            </h3>

            {newsList.length === 0 ? (
              <p className="text-center text-muted">No news available.</p>
            ) : (
              newsList.map((item) => (
                <div
                  key={item._id}
                  className="border-bottom mb-3 pb-3 d-flex align-items-start"
                >
                  <img
                    src={item.image || "https://via.placeholder.com/100x80?text=No+Image"}
                    alt="news"
                    className="rounded me-3"
                    style={{ width: "100px", height: "80px", objectFit: "cover" }}
                  />
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.title}</h5>
                    <small className="text-muted">
                      Category: {item.category}
                    </small>
                    <p className="mt-2 mb-1">
                      {item.content.length > 80
                        ? item.content.slice(0, 80) + "..."
                        : item.content}
                    </p>
                    <div>
                      <button
                        className="btn me-2"
                        style={{ backgroundColor: "#ff8247", color: "white" }}
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        style={{ backgroundColor: "#ff8247", color: "white" }}
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddNews;
