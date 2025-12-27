import React, { useState, useEffect } from "react";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // ✅ Fetch all categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Category Fetch Error:", err);
    }
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  // ✅ Add or Update Category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:4000/api/categories/${editId}`
      : "http://localhost:4000/api/categories";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });

      if (res.ok) {
        alert(isEditing ? "✅ Category updated successfully!" : "✅ Category added successfully!");
        setCategory({ name: "" });
        setIsEditing(false);
        setEditId(null);
        fetchCategories();
      } else {
        alert("❌ Failed to save category!");
      }
    } catch (error) {
      console.error("Category Save Error:", error);
    }
  };

  // ✅ Edit Category
  const handleEdit = (cat) => {
    setCategory({ name: cat.name });
    setIsEditing(true);
    setEditId(cat._id);
  };

  // ✅ Delete Category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("🗑️ Category deleted successfully!");
        fetchCategories();
      } else {
        alert("❌ Failed to delete category!");
      }
    } catch (error) {
      console.error("Category Delete Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* ✅ Left Side: Add/Edit Form */}
        <div className="col-lg-6">
          <h4>{isEditing ? "Edit Category" : "Add Category"}</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
                placeholder="Enter Category Name"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn  w-100" style={{backgroundColor:"#ff8247", color:"white"}}>
              {isEditing ? "Update Category" : "Add Category"}
            </button>
          </form>
        </div>

        {/* ✅ Right Side: Display All Categories */}
        <div className="col-lg-6">
          <h4 className="mb-3">All Categories</h4>
          {categories.length === 0 ? (
            <p>No categories added yet.</p>
          ) : (
            <ul className="list-group">
              {categories.map((cat) => (
                <li
                  key={cat._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {cat.name}
                  <div>
                    <button
                      className="btn btn-sm me-2" style={{backgroundColor:"#ff8247", color:"white"}}
                      onClick={() => handleEdit(cat)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm " style={{backgroundColor:"#ff8247", color:"white"}}
                      onClick={() => handleDelete(cat._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
