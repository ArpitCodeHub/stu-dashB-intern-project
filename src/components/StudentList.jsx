import React, { useEffect, useState } from "react";
import { fetchStudents } from "../services/mockApi";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");  

  useEffect(() => {
    const getStudents = async () => {
      const data = await fetchStudents();
      setStudents(data);
      setFilteredStudents(data); // Ensure filtered students are initialized
    };
    getStudents();
  }, []);

  // Filter students by course
  const handleFilter = (course) => {
    setSelectedCourse(course);
    setFilteredStudents(course ? students.filter((s) => s.course === course) : students);
  };

  return (
    <div id="student-list-page" className="p-6 font-poppins text-black bg-light mt-28">
      <h2 className="text-3xl font-bold text-blue-600 text-center">Student List</h2>

      {/* Course Filter Dropdown */}
      <div className="my-4 flex justify-center">
        <select 
          className="px-3 py-2 border rounded-lg bg-white text-blue-600 hover:bg-gray-200 "
          value={selectedCourse}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="">All Courses</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="Computer Science">Computer Science</option>
        </select>
      </div>

      {/* Student List */}
      <ul className="mt-4 space-y-3">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <li key={student.id} className="p-4 border rounded-lg shadow-md bg-white">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Course:</strong> {student.course}</p>
            </li>
          ))
        ) : (
          <p className="text-center text-blue-600 text-xl">No students found.</p>
        )}
      </ul>
    </div>
  );
};

export default StudentList;