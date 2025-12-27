import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Opendata from "./pages/Opendata";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import UserPage from "./pages/UserPage";
import AddNews from "./pages/Addnews";
import Latestnews from "./pages/Latestnews";
import BlogList from "./pages/Bloglist";
// Page import

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
                <Route path="/Addnews" element={<AddNews />} />
                <Route path="/Latestnews" element={<Latestnews />} />
                                <Route path="/Bloglist" element={<BlogList />} />



        
        <Route path="/Categories" element={<Categories />} />
          <Route path="/Opendata" element={<Opendata />} />
            <Route path="/Contact" element={<Contact />} />
              <Route path="/Login" element={<Login />} />
                <Route path="/UserPage" element={<UserPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;