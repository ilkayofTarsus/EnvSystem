import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';

const PollutionForm = ({ onSuccess }) => {
  const [dataType, setDataType] = useState('AirQuality');

  const initialFormData = {
    recordedDate: new Date().toISOString().slice(0, 16),
    location: '',
    // AirQuality
    airQualityIndex: '',
    pm25: '',
    pm10: '',
    ozone: '',
    carbonMonoxide: '',
    sulfurDioxide: '',
    nitrogenDioxide: '',
    // WaterQuality
    ph: '',
    dissolvedOxygen: '',
    turbidity: '',
    lead: '',
    mercury: '',
    // Waste
    wasteType: '',
    weight: '',
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleTypeChange = (e) => {
    setDataType(e.target.value);
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      let apiData = {
        recordedDate: new Date(formData.recordedDate).toISOString(),
        location: formData.location
      };

      if (dataType === 'AirQuality') {
        apiData = {
          ...apiData,
          airQualityIndex: parseFloat(formData.airQualityIndex),
          pm25: formData.pm25 ? parseFloat(formData.pm25) : null,
          pm10: formData.pm10 ? parseFloat(formData.pm10) : null,
          ozone: formData.ozone ? parseFloat(formData.ozone) : null,
          carbonMonoxide: formData.carbonMonoxide ? parseFloat(formData.carbonMonoxide) : null,
          sulfurDioxide: formData.sulfurDioxide ? parseFloat(formData.sulfurDioxide) : null,
          nitrogenDioxide: formData.nitrogenDioxide ? parseFloat(formData.nitrogenDioxide) : null,
          notes: formData.notes
        };
      }

      if (dataType === 'WaterQuality') {
        apiData = {
          ...apiData,
          ph: parseFloat(formData.ph),
          dissolvedOxygen: parseFloat(formData.dissolvedOxygen),
          turbidity: parseFloat(formData.turbidity),
          lead: parseFloat(formData.lead),
          mercury: parseFloat(formData.mercury),
          notes: formData.notes
        };
      }

      if (dataType === 'Waste') {
        apiData = {
          ...apiData,
          wasteType: formData.wasteType,
          weight: parseFloat(formData.weight),
          notes: formData.notes
        };
      }

      const response = await fetch(`${API_BASE_URL}/api/${dataType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData)
      });

      if (!response.ok) throw new Error('Failed to save data');

      setFormData(initialFormData);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Type Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Data Type</label>
        <select
          value={dataType}
          onChange={handleTypeChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="AirQuality">Air Quality</option>
          <option value="WaterQuality">Water Quality</option>
          <option value="Waste">Waste</option>
        </select>
      </div>

      {/* Common Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date and Time *</label>
          <input
            type="datetime-local"
            name="recordedDate"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={formData.recordedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
          <input
            type="text"
            name="location"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Dynamic Fields */}
      {dataType === 'AirQuality' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['airQualityIndex', 'pm25', 'pm10', 'ozone', 'carbonMonoxide', 'sulfurDioxide', 'nitrogenDioxide'].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
              <input
                type="number"
                name={field}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      )}

      {dataType === 'WaterQuality' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['ph', 'dissolvedOxygen', 'turbidity', 'lead', 'mercury'].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
              <input
                type="number"
                name={field}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      )}

      {dataType === 'Waste' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
            <input
              type="text"
              name="wasteType"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.wasteType}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          name="notes"
          rows="3"
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center"
        >
          {submitting ? 'Submitting...' : 'Submit Data'}
        </button>
      </div>
    </form>
  );
};

export default PollutionForm;
