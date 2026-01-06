import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Python Practice Tools</h1>
        <p>Interactive exercises to practice Python programming patterns</p>
      </header>

{/* Quick Reference Download Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">📚 Python Patterns Quick Reference</h2>
            <p className="text-gray-600">Comprehensive guide covering all 10 essential patterns - print it and keep it handy!</p>
          </div>
          
	 <a href="/Python_Patterns_Quick_Reference_Professional.docx"
            download
            style={{
              padding: '12px 24px',
              backgroundColor: '#4F46E5',
              color: 'white',
              borderRadius: '8px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '16px'
            }}
          >
            <span>📄</span>
            Download Quick Reference
          </a>
           
        </div>
      </div>

      <div className="learning-path-intro">
        <h2>📚 Recommended Learning Path</h2>
        <p><strong>Start with Individual Skills Practice</strong> to master one concept at a time, then move to <strong>Comprehensive Challenges</strong> to combine skills in complete programs.</p>
      </div>

      {/* SECTION 1: Individual Skills Practice */}
      <section className="tools-section">
        <div className="section-header">
          <h2 className="section-title">🎯 Individual Skills Practice</h2>
          <p className="section-description">Master one skill at a time with focused drills</p>
        </div>

        {/* Level 1 - Basics */}
        <h3 className="level-subtitle">Level 1 - Basics</h3>
        <div className="tools-menu">
          <Link to="/level1-basic-lists" className="tool-card level-1">
            <h4>Basic Lists</h4>
            <p>Introduction to Python lists</p>
          </Link>

          <Link to="/level1-basic-dictionaries" className="tool-card level-1">
            <h4>Basic Dictionaries</h4>
            <p>Introduction to Python dictionaries</p>
          </Link>

          <Link to="/level1-basic-dictionaries" className="tool-card level-1">
            <h4>Basic Dictionaries</h4>
            <p>Introduction to Python dictionaries</p>
          </Link>

          <Link to="/level1-lists-dicts-together" className="tool-card level-1">
            <h4>Lists & Dicts Together</h4>
            <p>Combine lists and dictionaries</p>
          </Link>
        </div>

        {/* Level 2 - Accumulators */}
        <h3 className="level-subtitle">Level 2 - Accumulators</h3>
        <div className="tools-menu">
          <Link to="/level2-sum-accumulator" className="tool-card level-2">
            <h4>Sum Accumulator</h4>
            <p>Practice sum accumulation patterns</p>
          </Link>

          <Link to="/level2-sum-accumulator" className="tool-card level-2">
            <h4>Sum Accumulator</h4>
            <p>Practice sum accumulation patterns</p>
          </Link>

          <Link to="/level2-count-accumulator" className="tool-card level-2">
            <h4>Count Accumulator</h4>
            <p>Practice counting patterns</p>
          </Link>

          <Link to="/level2-maxmin-finder" className="tool-card level-2">
            <h4>Max/Min Finder</h4>
            <p>Find maximum and minimum values</p>
          </Link>

          <Link to="/level2-list-builder" className="tool-card level-2">
            <h4>List Builder</h4>
            <p>Build lists with accumulation</p>
          </Link>
        </div>

        {/* Level 3 - Validation */}
        <h3 className="level-subtitle">Level 3 - Validation</h3>
        <div className="tools-menu">
          <Link to="/level3-number-validation" className="tool-card level-3">
            <h4>Number Validation</h4>
            <p>Validate numeric input</p>
          </Link>

          <Link to="/level3-string-validation" className="tool-card level-3">
            <h4>String Validation</h4>
            <p>Validate string input</p>
          </Link>

          <Link to="/level3-try-except" className="tool-card level-3">
            <h4>Try/Except Pattern</h4>
            <p>Error handling with try/except</p>
          </Link>

          <Link to="/level3-complex-validation" className="tool-card level-3">
            <h4>Complex Validation</h4>
            <p>Advanced validation techniques</p>
          </Link>
        </div>
      </section>

      {/* SECTION 2: Comprehensive Challenges */}
      <section className="tools-section comprehensive-section">
        <div className="section-header">
          <h2 className="section-title">🚀 Comprehensive Challenges</h2>
          <p className="section-description">Apply multiple skills together in complete programs</p>
        </div>

        <div className="tools-menu">
          <Link to="/input-validation" className="tool-card comprehensive">
            <h4>Input Validation Practice</h4>
            <p>Build complete validation loops combining multiple concepts</p>
          </Link>

          <Link to="/loop-accumulators" className="tool-card comprehensive">
            <h4>Loop Accumulators Practice</h4>
            <p>Create full programs using accumulator patterns</p>
          </Link>

          <Link to="/lists-dictionaries" className="tool-card comprehensive">
            <h4>Lists & Dictionaries Practice</h4>
            <p>Integrate data structures in complete solutions</p>
          </Link>

          <Link to="/strings-statistics" className="tool-card comprehensive">
            <h4>Strings & Statistics Practice</h4>
            <p>Combine string manipulation and statistical operations</p>
          </Link>
        </div>
      </section>

      <footer className="home-footer">
        <p>Created by Tamara Arnott | ATCC EDGE Center of Innovation</p>
      </footer>
    </div>
  );
}

export default HomePage;
