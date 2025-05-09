import React from "react";

const About = () => {
  return (
    <>
      <div id="about-page" className="p-6 font-poppins text-gray-900 bg-blue-50 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600">About Us</h2>
          <p className="mt-4 text-lg text-gray-700">
            Welcome to <span className="font-semibold text-blue-500">Student Dashboard</span>, a seamless and efficient platform designed to streamline student management.
            Built with <span className="font-semibold text-blue-500">Firebase Authentication</span> and <span className="font-semibold text-blue-500">Mock API</span>,
            our project ensures secure login and dynamic student handling while keeping simplicity at its core.
          </p>

          <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
            <div className="p-4 bg-blue-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-blue-600">Secure Authentication</h3>
              <p className="text-gray-700 text-sm">Powered by Firebase to ensure data security.</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-blue-600">Mock API Integration</h3>
              <p className="text-gray-700 text-sm">Smooth student record handling for testing.</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-blue-600">User-Friendly Interface</h3>
              <p className="text-gray-700 text-sm">Designed for intuitive navigation and efficiency.</p>
            </div>
          </div>

          <button
            onClick={() => window.location.href = "/student-list"}
            className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
          >
            View Students
          </button>
        </div>
      </div>
    </>
  );
};

export default About;