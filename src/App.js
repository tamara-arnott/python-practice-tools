import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import InputValidationPracticeTool from './python_patterns_input_validation_tool';
import LoopAccumulatorsPracticeTool from './python_patterns_loop_accumulators_tool';
import ListsDictionariesPracticeTool from './python_patterns_lists_dictionaries_tool';
import StringStatisticsPracticeTool from './python_patterns_strings_statistics_tool';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="main-nav">
          <Link to="/" className="nav-home">← Home</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/input-validation" element={<InputValidationPracticeTool />} />
          <Route path="/loop-accumulators" element={<LoopAccumulatorsPracticeTool />} />
          <Route path="/lists-dictionaries" element={<ListsDictionariesPracticeTool />} />
          <Route path="/strings-statistics" element={<StringStatisticsPracticeTool />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
