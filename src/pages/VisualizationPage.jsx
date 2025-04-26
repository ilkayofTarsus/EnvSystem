import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PollutionChart from '../components/PollutionChart';
import { API_BASE_URL } from '../config/api';

const VisualizationPage = () => {
  const [pollutionData, setPollutionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('airqualityindex');
  const [dateRange, setDateRange] = useState('week');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/Pollution`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPollutionData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const metrics = [
    { id: 'airqualityindex', name: 'Air Quality Index' },
    { id: 'pm25', name: 'PM2.5' },
    { id: 'pm10', name: 'PM10' },
    { id: 'ozone', name: 'Ozone' },
    { id: 'carbonmonoxide', name: 'Carbon Monoxide' },
    { id: 'sulfurdioxide', name: 'Sulfur Dioxide' },
    { id: 'nitrogendioxide', name: 'Nitrogen Dioxide' }
  ];
  
  return (
    <div className="h-screen w-screen flex items-center justify-center">
    <div className="container mx-auto px-4 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="mb-6 flex items-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold">Pollution Data Visualization</h1>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
            <div>
              <label htmlFor="metric" className="block text-sm font-medium text-gray-700 mb-1">Pollution Metric</label>
              <select
                id="metric"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                {metrics.map(metric => (
                  <option key={metric.id} value={metric.id}>{metric.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                id="dateRange"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="day">Last 24 Hours</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong>Error:</strong> {error}
            </div>
          ) : (
            <div className="h-96">
              <PollutionChart 
                data={pollutionData}
                metric={selectedMetric}
                dateRange={dateRange}
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
    </div>
  );
};

export default VisualizationPage;
