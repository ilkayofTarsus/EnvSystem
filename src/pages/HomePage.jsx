import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
    <div className="container mx-auto px-4 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Pollution Tracking System</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <Link to="/data-entry" 
                className="bg-blue-600 hover:bg-blue-700 text-white p-8 rounded-lg shadow-lg flex flex-col items-center transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-2xl font-semibold mb-2">Data Entry</h2>
            <p className="text-center">Record new pollution measurements and observations</p>
          </Link>
          
          <Link to="/visualization" 
                className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-lg shadow-lg flex flex-col items-center transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-2xl font-semibold mb-2">Data Visualization</h2>
            <p className="text-center">View pollution data trends and analytics</p>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
    </div>
  );
};

export default HomePage;
