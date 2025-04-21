import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';

const PollutionForm = ({ onSuccess }) => {
  const initialFormData = {
    recordedDate: new Date().toISOString().slice(0, 16),
    location: '',
    airQualityIndex: '',
    pm25: '',
    pm10: '',
    ozone: '',
    carbonMonoxide: '',
    sulfurDioxide: '',
    nitrogenDioxide: '',
    notes: ''
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      // Convert form data to match API model
      const apiData = {
        recordedDate: new Date(formData.recordedDate).toISOString(),
        location: formData.location,
        airQualityIndex: parseFloat(formData.airQualityIndex),
        pm25: formData.pm25 ? parseFloat(formData.pm25) : null,
        pm10: formData.pm10 ? parseFloat(formData.pm10) : null,
        ozone: formData.ozone ? parseFloat(formData.ozone) : null,
        carbonMonoxide: formData.carbonMonoxide ? parseFloat(formData.carbonMonoxide) : null,
        sulfurDioxide: formData.sulfurDioxide ? parseFloat(formData.sulfurDioxide) : null,
        nitrogenDioxide: formData.nitrogenDioxide ? parseFloat(formData.nitrogenDioxide) : null,
        notes: formData.notes
      };
      
      const response = await fetch(`${API_BASE_URL}/api/Pollution`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save data');
      }
      
      // Reset form
      setFormData(initialFormData);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="recordedDate" className="block text-sm font-medium text-gray-700 mb-1">
            Date and Time *
          </label>
          <input
            type="datetime-local"
            id="recordedDate"
            name="recordedDate"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={formData.recordedDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Downtown, Industrial Zone"
            required
          />
        </div>
        
        <div>
          <label htmlFor="airQualityIndex" className="block text-sm font-medium text-gray-700 mb-1">
            Air Quality Index (AQI) *
          </label>
          <input
            type="number"
            id="airQualityIndex"
            name="airQualityIndex"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={formData.airQualityIndex}
            onChange={handleChange}
            min="0"
            max="500"
            step="0.1"
            placeholder="0-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="pm25" className="block text-sm font-medium text-gray-700 mb-1">
            PM2.5 (μg/m³)
          </label>
          <input
            type="number"
            id="pm25"
            name="pm25"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={formData.pm25}
            onChange={handleChange}
            min="0"
            step="0.1"
          />
        </div>
        
        <div>
          <label htmlFor="pm10" className="block text-sm font-medium text-gray-700 mb-1">
            PM10 (μg/m³)
          </label>
          <input
            type="number"
            id="pm10"
            name="pm10"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={formData.pm10}
            onChange={handleChange}
            min="0"
            step="0.1"
          />
        </div>
        
        <div>
          <label htmlFor="ozone" className="block text-sm font-medium text-gray-700 mb-1">
            Ozone (ppb)
          </label>
          <input
            type="number"
            id="ozone"
            name="ozone"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={formData.ozone}
            onChange={handleChange}
            min="0"
            step="0.1"
          />
        </div>
        
        <div>
          <label htmlFor="carbonMonoxide" className="block text-sm font-medium text-gray-700 mb-1">
            Carbon Monoxide (ppm)
          </label>
          <input
            type="number"
            id="carbonMonoxide"
            name="carbonMonoxide"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={formData.carbonMonoxide}
            onChange={handleChange}
            min="0"
            step="0.1"
          />
        </div>
        
        <div>
          <label htmlFor="sulfurDioxide" className="block text-sm font-medium text-gray-700 mb-1">
            Sulfur Dioxide (ppb)
          </label>
          <input
            type="number"
            id="sulfurDioxide"
            name="sulfurDioxide"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={formData.sulfurDioxide}
            onChange={handleChange}
            min="0"
            step="0.1"
          />
        </div>
        
        <div>
          <label htmlFor="nitrogenDioxide" className="block text-sm font-medium text-gray-700 mb-1">
            Nitrogen Dioxide (ppb)
          </label>
          <input
            type="number"
            id="nitrogenDioxide"
            name="nitrogenDioxide"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={formData.nitrogenDioxide}
            onChange={handleChange}
            min="0"
            step="0.1"
          />
        </div>
      </div>
      
      <div className="mt-6">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional observations, weather conditions, etc."
        ></textarea>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : "Submit Data"}
        </button>
      </div>
    </form>
  );
};

export default PollutionForm;