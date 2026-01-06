import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';

// Original 4 tools
import InputValidationPracticeTool from './python_patterns_input_validation_tool';
import LoopAccumulatorsPracticeTool from './python_patterns_loop_accumulators_tool';
import ListsDictionariesPracticeTool from './python_patterns_lists_dictionaries_tool';
import StringStatisticsPracticeTool from './python_patterns_strings_statistics_tool';

// Level 1 - Basics
import HigherEdLevel1ABasicLists from './HigherEd_Level1A_BasicLists';
import HigherEdLevel1CListsDictsTogether from './HigherEd_Level1C_ListsDictsTogether';
import HigherEdLevel1BBasicDictionaries from './HigherEd_Level1B_BasicDictionaries';


// Level 2 - Accumulators
import HigherEdLevel2ASumAccumulator from './HigherEd_Level2A_SumAccumulator';

import HigherEdLevel2BCountAccumulator from './HigherEd_Level2B_CountAccumulator';
import HigherEdLevel2CMaxMinFinder from './HigherEd_Level2C_MaxMinFinder';
import HigherEdLevel2DListBuilder from './HigherEd_Level2D_ListBuilder';

// Level 3 - Validation
import HigherEdLevel3ANumberValidation from './HigherEd_Level3A_NumberValidation';
import HigherEdLevel3BStringValidation from './HigherEd_Level3B_StringValidation';
import HigherEdLevel3CTryExceptPattern from './HigherEd_Level3C_TryExceptPattern';
import HigherEdLevel3DComplexValidation from './HigherEd_Level3D_ComplexValidation';

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
          
          {/* Original 4 tools */}
          <Route path="/input-validation" element={<InputValidationPracticeTool />} />
          <Route path="/loop-accumulators" element={<LoopAccumulatorsPracticeTool />} />
          <Route path="/lists-dictionaries" element={<ListsDictionariesPracticeTool />} />
          <Route path="/strings-statistics" element={<StringStatisticsPracticeTool />} />
          
          {/* Level 1 - Basics */}
          <Route path="/level1-basic-lists" element={<HigherEdLevel1ABasicLists />} />
          <Route path="/level1-lists-dicts-together" element={<HigherEdLevel1CListsDictsTogether />} />
          <Route path="/level1-basic-dictionaries" element={<HigherEdLevel1BBasicDictionaries />} />
          
          {/* Level 2 - Accumulators */}
          <Route path="/level2-sum-accumulator" element={<HigherEdLevel2ASumAccumulator />} />
          <Route path="/level2-count-accumulator" element={<HigherEdLevel2BCountAccumulator />} />
          <Route path="/level2-maxmin-finder" element={<HigherEdLevel2CMaxMinFinder />} />
          <Route path="/level2-list-builder" element={<HigherEdLevel2DListBuilder />} />
          
          {/* Level 3 - Validation */}
          <Route path="/level3-number-validation" element={<HigherEdLevel3ANumberValidation />} />
          <Route path="/level3-string-validation" element={<HigherEdLevel3BStringValidation />} />
          <Route path="/level3-try-except" element={<HigherEdLevel3CTryExceptPattern />} />
          <Route path="/level3-complex-validation" element={<HigherEdLevel3DComplexValidation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
