import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchScreen from './components/SearchScreen';
import SearchResults from './components/SearchResults';
import CandidateDetails from './components/CandidateDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchScreen />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/candidate/:id" element={<CandidateDetails />} />
      </Routes>
    </Router>
  );
}

export default App;