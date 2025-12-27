import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Opendata() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("User Fetch Error:", err);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:4000/api/users/${editId}`
      : "http://localhost:4000/api/users";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        alert(isEditing ? "✅ User updated!" : "✅ User added!");
        setUser({ name: "", email: "", role: "" });
        setIsEditing(false);
        setEditId(null);
        fetchUsers();
      } else {
        alert("❌ Failed to save user!");
      }
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  // Edit user
  const handleEdit = (u) => {
    setUser({ name: u.name, email: u.email, role: u.role });
    setIsEditing(true);
    setEditId(u._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("🗑️ Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("✅ User deleted!");
        fetchUsers();
      } else {
        alert("❌ Failed to delete user!");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setUser({ name: "", email: "", role: "" });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="container-fluid  ">
        <Navbar/>
      <div className="row  mt-2 mb-2">
        {/* Add / Edit Form */}
        <div className="col-lg-6 mb-4">
          <div className="card p-4 shadow">
            <h4 className="mb-4 text-center" style={{fontSize:"50px", color:"#ff8247", textAlign:"center"}}>{isEditing ? "Edit User" : "Add User"}</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" style={{fontSize:"20px", color:"#ff8247"}}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{fontSize:"20px", color:"#ff8247"}}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{fontSize:"20px", color:"#ff8247"}}>Role</label>
                <select
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Select Role --</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn me-2" style={{backgroundColor:"#ff8247", color:"white"}}>
                  {isEditing ? "Update" : "Add"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    className="btn  w-50" style={{backgroundColor:"#ff8247", color:"white"}}
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Display Users */}
        <div className="col-lg-6">
          <div className="card p-4 shadow">
            <h4 className="mb-4 text-center" style={{fontSize:"50px", color:"#ff8247", textAlign:"center"}}>All Users</h4>
            {users.length === 0 ? (
              <p className="text-center text-muted">No users available.</p>
            ) : (
              <ul className="list-group">
                {users.map((u) => (
                  <li
                    key={u._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{u.name}</strong> ({u.role}) <br />
                      <small>{u.email}</small>
                    </div>
                    <div>
                      <button
                        className="btn btn-sm  me-2" style={{backgroundColor:"#ff8247", color:"white"}}
                        onClick={() => handleEdit(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm " style={{backgroundColor:"#ff8247", color:"white"}}
                        onClick={() => handleDelete(u._id)}
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
      <Footer/>
    </div>
  );
}

export default Opendata;
