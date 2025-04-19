import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PollutionForm from '../components/PollutionForm';

const DataEntryPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleFormSuccess = () => {
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };
  
  return (
    <div className="container mx-auto px-4 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="mb-6 flex items-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold">Pollution Data Entry</h1>
        </div>
        
        {formSubmitted && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong>Success!</strong> Pollution data has been recorded.
          </div>
        )}
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <PollutionForm onSuccess={handleFormSuccess} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};


export default DataEntryPage;