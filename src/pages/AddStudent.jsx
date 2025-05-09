import React, { useState } from "react";
import { auth } from "../firebase"; // Firebase authentication only
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import Navbar from "../components/Navbar";
import { addStudent } from "../services/mockApi"; // Import correct API function

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Current User:", auth.currentUser); // Debugging Firebase authentication
    if (!auth.currentUser) {
      toast.error("Login required to add a student.");
      return;
    }

    setLoading(true);
    try {
      const studentData = { name, email, course };
      console.log("Submitting student:", studentData); // Debugging API request

      await addStudent(studentData); // ✅ Correct function call

      toast.success("Student added successfully! 🎉");

      // ✅ Reset form before navigation
      setName("");
      setEmail("");
      setCourse("");

      // ✅ Redirect to StudentList.jsx after success
      navigate("/student-list");
    } catch (error) {
      toast.error("Failed to add student. Please try again.");
      console.error("Error adding student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 font-poppins text-black bg-white min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-blue-600 text-center">Add New Student</h2>
        <form onSubmit={handleSubmit} className="mt-4 p-6 bg-white rounded-lg shadow-md w-96">
          <input 
            type="text" placeholder="Name" 
            className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-600" 
            value={name}
            onChange={(e) => setName(e.target.value)} required 
          />
          <input 
            type="email" placeholder="Email" 
            className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-600" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} required 
          />
          <select 
            className="w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-600" 
            value={course}
            onChange={(e) => setCourse(e.target.value)} required
          >
            <option value="">Select Course</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Computer Science">Computer Science</option>
          </select>
          <button 
            type="submit" 
            className={`bg-blue-600 text-white py-2 px-4 mt-4 w-full rounded-lg transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500"}`} 
            disabled={loading}
          >
            {loading ? "Adding Student..." : "Add Student"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddStudent;