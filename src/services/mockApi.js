import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://mockapi.com/", // Not real, just an example
});

// Create mock adapter
const mock = new MockAdapter(api);

// Sample student data
const studentsData = [
  { id: 1, name: "Pramita", course: "English", email: "pramita@example.com" },
  { id: 2, name: "Aradhya", course: "Math", email: "aradhya@example.com" },
  { id: 3, name: "Arpit", course: "Computer Science", email: "arpit@example.com" },
  { id: 4, name: "Vansh", course: "Science", email: "vansh@example.com" },
];

// Mock GET request for fetching students
mock.onGet("/students").reply(200, studentsData);

// ✅ New: Mock POST request for adding students
mock.onPost("/students").reply((config) => {
  const newStudent = JSON.parse(config.data);
  console.log("Mock API received:", newStudent); // Debugging
  studentsData.push({ id: studentsData.length + 1, ...newStudent });
  return [201, newStudent];
});

// ✅ New function for adding students
export const addStudent = async (studentData) => {
  try {
    const response = await api.post("/students", studentData);
    return response.data;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

export const fetchStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};