import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const PollutionChart = ({ data, metric, dateRange }) => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('line');
  
  useEffect(() => {
    if (!data || data.length === 0) {
      setChartData([]);
      return;
    }
    
    // Veriyi işleme
    const processData = () => {
      const sortedData = [...data].sort((a, b) => 
        new Date(a.recordeddate) - new Date(b.recordeddate)
      );
      
      return sortedData.map(item => ({
        date: new Date(item.recordeddate).toLocaleDateString(),
        value: item[metric.toLowerCase()],
        location: item.location
      }));
    };
    
    setChartData(processData());
  }, [data, metric, dateRange]);
  
  const getMetricName = () => {
    const metricMap = {
      'airqualityindex': 'Air Quality Index',
      'pm25': 'PM2.5 (μg/m³)',
      'pm10': 'PM10 (μg/m³)',
      'ozone': 'Ozone (ppb)',
      'carbonmonoxide': 'Carbon Monoxide (ppm)',
      'sulfurdioxide': 'Sulfur Dioxide (ppb)',
      'nitrogendioxide': 'Nitrogen Dioxide (ppb)'
    };
    
    return metricMap[metric.toLowerCase()] || metric;
  };
  
  if (chartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 text-gray-400 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
          />
        </svg>
        <p className="text-gray-500">No data available for the selected criteria</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              chartType === 'line' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setChartType('line')}
          >
            Line Chart
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-md border-l ${
              chartType === 'bar' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setChartType('bar')}
          >
            Bar Chart
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        {chartType === 'line' ? (
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: getMetricName(), angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              name={getMetricName()}
              stroke="#2563eb" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
            />
          </LineChart>
        ) : (
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: getMetricName(), angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="value" 
              name={getMetricName()} 
              fill="#2563eb" 
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default PollutionChart;