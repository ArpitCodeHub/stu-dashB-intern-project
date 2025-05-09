import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Track authentication state updates
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, []);

  const handleAddStudentClick = () => {
    if (!user) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      navigate("/add-student"); // Navigate if logged in
    }
  };

  return (
    <nav id="navbar" className="fixed top-3 left-1/2 transform -translate-x-1/2 w-full max-w-screen-xl bg-blue-600 px-5 md:px-6 py-4 font-poppins flex flex-wrap md:flex-nowrap justify-between items-center shadow-md rounded-md">
      <h1 className="text-xl md:text-3xl font-bold text-white">Student Dashboard</h1>

      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-0 md:space-x-5">
        <Link to="/" className="hover:underline transition duration-200 text-white text-lg md:text-lg">
          Home
        </Link>
        <Link to="/about" className="hover:underline transition duration-200 text-white text-lg         md:text-lg">
          About Us
        </Link>
        <button 
          onClick={handleAddStudentClick}
          className="bg-white px-2 md:px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300 text-lg md:text-lg text-blue-600"
        >
          Add Student
        </button>
      </div>
    </nav>
  );
};

export default Navbar;