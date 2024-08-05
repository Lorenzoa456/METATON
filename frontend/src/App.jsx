import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadMusic from './pages/UploadMusic';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/uploadMusic" element={<UploadMusic />} />
        </Routes>
      </Router>
  );
}

export default App;
