import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"; // Icons for menu toggle

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Track dropdown state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleAddStudentClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/add-student");
    }
  };

  return (
    <nav className="fixed top-3 left-1/2 transform -translate-x-1/2 w-11/12 max-w-screen-xl bg-blue-600 px-5 py-4 font-poppins flex flex-wrap md:flex-nowrap justify-between items-center shadow-md rounded-md">
      <h1 className="text-xl md:text-3xl font-bold text-white">Student Dashboard</h1>

      {/* Menu Toggle Button (Mobile) */}
      <button 
        className="md:hidden text-white text-2xl" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
      </button>

      {/* Dropdown Menu (Mobile) */}
      <div className={`absolute top-full left-0 w-full bg-blue-600 p-5 space-y-2 transition-all duration-300 ${isOpen ? "block" : "hidden"} md:hidden`}>
        <Link to="/" className="block text-white text-lg hover:underline">Home</Link>
        <Link to="/about" className="block text-white text-lg hover:underline">About Us</Link>
        <button 
          onClick={handleAddStudentClick} 
          className="block bg-white px-4 py-2 rounded-md text-blue-600 hover:bg-gray-200"
        >
          Add Student
        </button>
      </div>

      {/* Standard Menu (Desktop) */}
      <div className="hidden md:flex md:items-center md:space-x-5">
        <Link to="/" className="hover:underline text-white text-lg">Home</Link>
        <Link to="/about" className="hover:underline text-white text-lg">About Us</Link>
        <button 
          onClick={handleAddStudentClick} 
          className="bg-white px-4 py-2 rounded-md text-blue-600 hover:bg-gray-200"
        >
          Add Student
        </button>
      </div>
    </nav>
  );
};

export default Navbar;