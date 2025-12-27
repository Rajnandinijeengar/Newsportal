import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:4000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:4000/api/users/${editId}`
      : "http://localhost:4000/api/users";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      alert(isEditing ? "User updated" : "User added");
      setUser({ username: "", email: "", password: "" });
      setIsEditing(false);
      setEditId(null);
      fetchUsers();
    }
  };

  // Edit user
  const handleEdit = (u) => {
    setUser({ username: u.username, email: u.email, password: u.password });
    setIsEditing(true);
    setEditId(u._id);
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await fetch(`http://localhost:4000/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="container-fluid" >
        <Navbar/>
     <div className="row mt-5 mb-5
     ">
        <div className="col-lg-3"></div>
        <div className="col-lg-8">
 <h3 style={{fontSize:"50px", color:"#ff8247", textAlign:"center"}}>All Users</h3>
      {users.map((u) => (
        <div
          key={u._id}
          className=" p-2 mb-2 d-flex justify-content-between align-items-center" style={{border:"2px solid #ff8247", borderRadius:"10px"}}
        >
          <div>
            <strong>{u.username}</strong> - {u.email}
          </div>
          <div>
            <button
              className="btn  me-2"style={{backgroundColor:"#ff8247", color:"white"}}
              onClick={() => handleEdit(u)}
            >
              Edit
            </button>
            <button
              className="btn "style={{backgroundColor:"#ff8247", color:"white"}}
              onClick={() => handleDelete(u._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
        </div>
         <div className="col-lg-3"></div>
     </div>

     <Footer/>
    </div>
  );
}

export default UserPage;
