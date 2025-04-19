import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          PollutionTracker
        </Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            </li>
            <li>
              <Link to="/data-entry" className="text-gray-600 hover:text-blue-600">Data Entry</Link>
            </li>
            <li>
              <Link to="/visualization" className="text-gray-600 hover:text-blue-600">Visualization</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

