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

      <div className="tools-menu">
        <Link to="/input-validation" className="tool-card">
          <h2>Input Validation Practice</h2>
          <p>Practice validating user input with Python</p>
        </Link>

        <Link to="/loop-accumulators" className="tool-card">
          <h2>Loop Accumulators Practice</h2>
          <p>Master loops and accumulator patterns</p>
        </Link>

        <Link to="/lists-dictionaries" className="tool-card">
          <h2>Lists & Dictionaries Practice</h2>
          <p>Work with Python data structures</p>
        </Link>

        <Link to="/strings-statistics" className="tool-card">
          <h2>Strings & Statistics Practice</h2>
          <p>String manipulation and statistical operations</p>
        </Link>
      </div>

      <footer className="home-footer">
        <p>Created by Tamara Arnott | ATCC Workforce Development</p>
      </footer>
    </div>
  );
}

export default HomePage;
