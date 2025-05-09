import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";
import About from "./pages/About";
import AddStudent from "./pages/AddStudent";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;