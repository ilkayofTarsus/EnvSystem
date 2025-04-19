import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DataEntryPage from './pages/DataEntryPage';
import VisualizationPage from './pages/VisualizationPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/data-entry" element={<DataEntryPage />} />
                <Route path="/visualization" element={<VisualizationPage />} />
            </Routes>
        </Router>
    );
}

export default App;