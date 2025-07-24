import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
    <div className="max-w-2xl w-full bg-gray-900 bg-opacity-90 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-gray-800">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m0 0V7a4 4 0 00-4-4H7a4 4 0 00-4 4v10a4 4 0 004 4h4" /></svg>
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-2 text-center">Welcome to SkillSpot</h1>
        <p className="text-lg text-gray-300 text-center max-w-xl">Showcase your skills, match with jobs, and manage your professional portfolio with ease.</p>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <Link to="/login" className="w-full md:w-auto px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 transition">Login</Link>
        <Link to="/register" className="w-full md:w-auto px-8 py-3 rounded-xl bg-purple-600 text-white font-semibold text-lg shadow-md hover:bg-purple-700 transition">Register</Link>
      </div>
      <div className="w-full mt-4">
        <h2 className="text-2xl font-bold text-white mb-2">Project Goals</h2>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          <li>Empower users to present their skills and projects effectively.</li>
          <li>Provide intelligent job matching based on user profiles.</li>
          <li>Enable easy resume export and portfolio sharing.</li>
        </ul>
        <h2 className="text-2xl font-bold text-white mb-2">Key Features</h2>
        <ul className="list-disc list-inside text-gray-300">
          <li>Interactive skill graph visualization</li>
          <li>Job match dashboard</li>
          <li>Project timeline management</li>
          <li>Resume PDF export</li>
          <li>Public portfolio page</li>
          <li>User authentication and settings</li>
        </ul>
      </div>
    </div>
    <footer className="mt-8 text-gray-500 text-sm">&copy; {new Date().getFullYear()} SkillSpot. All rights reserved.</footer>
  </div>
);

export default Home; 