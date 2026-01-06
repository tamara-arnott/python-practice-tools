import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Trophy, Target, Book, Code, Eye, EyeOff, Lightbulb, AlertTriangle, ChevronDown } from 'lucide-react';
import './PracticeTools.css';

const HigherEdLevel1ABasicLists = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [mode, setMode] = useState('full');
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  
  // Collapsible section states
  const [showConceptBox, setShowConceptBox] = useState(true);
  const [showScenario, setShowScenario] = useState(true);
  const [showMistakes, setShowMistakes] = useState(true);
  const [showReference, setShowReference] = useState(true);

  const exercises = [
    {
      id: 1,
      title: "Create Your First List",
      difficulty: "Beginner",
      points: 10,
      conceptBox: {
        title: "What is a List?",
        content: "A list stores multiple values in ONE variable. Lists keep items in order and can be changed after creation.",
        syntax: "courses = ['Math', 'Science', 'English']",
        rule: "Use square brackets []. Separate items with commas. Strings need quotes."
      },
      description: "Create a variable called courses that contains three course names: 'Python', 'Database', 'Statistics'. Then print the entire list.",
      scenario: "You're building a course registration system and need to store available courses.",
      
      skeleton: `courses = [_____, _____, _____]
print(_____)`,
      
      hint: "Square brackets create a list. Each string needs quotes. Format: courses = ['Python', 'Database', 'Statistics']",
      
      solution: `courses = ['Python', 'Database', 'Statistics']
print(courses)`,
      
      commonMistakes: [
        "Using parentheses () instead of square brackets [] (creates tuple, not list)",
        "Forgetting quotes around course names",
        "Missing commas between list items",
        "Printing 'courses' as a string instead of the variable courses",
        "Misspelling the variable name in print()"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('courses')) {
          return { 
            valid: false, 
            message: "❌ Need to create a variable called 'courses'!",
            mistake: "missing_variable"
          };
        }
        
        if (trimmed.includes('courses = (')) {
          return { 
            valid: false, 
            message: "❌ Wrong brackets! Use square brackets [] for lists, not parentheses ()",
            mistake: "wrong_brackets"
          };
        }
        
        if (!trimmed.includes('[')) {
          return { 
            valid: false, 
            message: "❌ Lists need square brackets []! Format: courses = [...]",
            mistake: "missing_brackets"
          };
        }
        
        if (!trimmed.includes('Python') || !trimmed.includes('Database') || !trimmed.includes('Statistics')) {
          return { 
            valid: false, 
            message: "❌ List must contain exactly: 'Python', 'Database', 'Statistics'",
            mistake: "wrong_values"
          };
        }
        
        if (!trimmed.includes("'Python'") && !trimmed.includes('"Python"')) {
          return { 
            valid: false, 
            message: "❌ Strings need quotes! Use 'Python' not Python",
            mistake: "missing_quotes"
          };
        }
        
        if (!trimmed.includes('print(courses)')) {
          if (trimmed.includes("print('courses')")) {
            return { 
              valid: false, 
              message: "❌ Don't print 'courses' as a string! Print the variable: print(courses)",
              mistake: "printing_string"
            };
          }
          return { 
            valid: false, 
            message: "❌ Need to print the list: print(courses)",
            mistake: "missing_print"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You created your first list!" };
      }
    },
    
    {
      id: 2,
      title: "Access Item by Index",
      difficulty: "Beginner",
      points: 12,
      conceptBox: {
        title: "List Indexing",
        content: "Lists are indexed starting at 0. The first item is [0], second is [1], third is [2], etc.",
        syntax: "students[0]  # Gets first item",
        rule: "Index in square brackets. Python counts from 0, not 1!"
      },
      description: "Given the list: students = ['Alice', 'Bob', 'Carol']. Print only the FIRST student using index 0.",
      scenario: "The registrar needs to identify the first student who registered for a course.",
      
      skeleton: `students = ['Alice', 'Bob', 'Carol']
print(students[_____])`,
      
      hint: "Lists start counting at 0. The first item is at index 0. Use: students[0]",
      
      solution: `students = ['Alice', 'Bob', 'Carol']
print(students[0])`,
      
      commonMistakes: [
        "Using students[1] (gets second item, not first!)",
        "Using students['0'] with quotes (index must be number, not string)",
        "Using students.0 with dot notation (wrong - use brackets)",
        "Forgetting brackets entirely: students0",
        "Printing the whole list instead of just first item"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes("students = ['Alice', 'Bob', 'Carol']")) {
          return { 
            valid: false, 
            message: "❌ Must start with: students = ['Alice', 'Bob', 'Carol']",
            mistake: "wrong_list"
          };
        }
        
        if (trimmed.includes('students[1]')) {
          return { 
            valid: false, 
            message: "❌ Index 1 is the SECOND item! First item is index 0.",
            mistake: "wrong_index"
          };
        }
        
        if (trimmed.includes("students['0']") || trimmed.includes('students["0"]')) {
          return { 
            valid: false, 
            message: "❌ Index must be a number, not a string! Use students[0] not students['0']",
            mistake: "string_index"
          };
        }
        
        if (trimmed.includes('students.0')) {
          return { 
            valid: false, 
            message: "❌ Don't use dot notation! Use brackets: students[0]",
            mistake: "dot_notation"
          };
        }
        
        if (!trimmed.includes('[0]')) {
          return { 
            valid: false, 
            message: "❌ Need to access index 0: students[0]",
            mistake: "missing_index"
          };
        }
        
        if (!trimmed.includes('print(students[0])')) {
          return { 
            valid: false, 
            message: "❌ Print the first student: print(students[0])",
            mistake: "wrong_print"
          };
        }
        
        return { valid: true, message: "✅ Excellent! You accessed the first item!" };
      }
    },
    
    {
      id: 3,
      title: "Append New Item",
      difficulty: "Beginner",
      points: 15,
      conceptBox: {
        title: "Adding to Lists",
        content: "The .append() method adds ONE item to the END of a list. The list grows by one item.",
        syntax: "grades.append('A')",
        rule: "Use .append(item). Parentheses required. Item is added at the end."
      },
      description: "Start with: grades = ['B', 'A', 'C']. Add a new grade 'A+' to the end using .append(). Then print the list.",
      scenario: "A student completed an extra credit assignment and earned an 'A+' grade that needs to be added to their record.",
      
      skeleton: `grades = ['B', 'A', 'C']
grades.append(_____)
print(grades)`,
      
      hint: "Method format: list_name.append(item). The item needs quotes: grades.append('A+')",
      
      solution: `grades = ['B', 'A', 'C']
grades.append('A+')
print(grades)`,
      
      commonMistakes: [
        "Forgetting parentheses: grades.append 'A+' (needs parentheses!)",
        "Using brackets instead: grades.append['A+'] (wrong - use parentheses)",
        "Forgetting quotes: grades.append(A+) (A+ is a string, needs quotes)",
        "Trying to assign: grades.append = 'A+' (wrong - it's a method call)",
        "Printing before appending (order matters!)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes("grades = ['B', 'A', 'C']")) {
          return { 
            valid: false, 
            message: "❌ Must start with: grades = ['B', 'A', 'C']",
            mistake: "wrong_list"
          };
        }
        
        if (!trimmed.includes('.append')) {
          return { 
            valid: false, 
            message: "❌ Need to use the .append() method!",
            mistake: "missing_append"
          };
        }
        
        if (trimmed.includes('.append[')) {
          return { 
            valid: false, 
            message: "❌ Use parentheses, not brackets! .append('A+') not .append['A+']",
            mistake: "wrong_brackets"
          };
        }
        
        if (trimmed.includes('.append =')) {
          return { 
            valid: false, 
            message: "❌ .append() is a method, not an assignment! Use grades.append('A+')",
            mistake: "trying_assignment"
          };
        }
        
        if (!trimmed.includes("'A+'") && !trimmed.includes('"A+"')) {
          return { 
            valid: false, 
            message: "❌ Need to append 'A+' with quotes!",
            mistake: "missing_value"
          };
        }
        
        const lines = trimmed.split('\n');
        const appendLine = lines.findIndex(line => line.includes('.append'));
        const printLine = lines.findIndex(line => line.includes('print(grades)'));
        
        if (appendLine > printLine) {
          return { 
            valid: false, 
            message: "❌ Append before printing! Otherwise you print the old list.",
            mistake: "wrong_order"
          };
        }
        
        if (!trimmed.includes('print(grades)')) {
          return { 
            valid: false, 
            message: "❌ Need to print the list after appending!",
            mistake: "missing_print"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You added an item to the list!" };
      }
    },
    
    {
      id: 4,
      title: "Get List Length",
      difficulty: "Beginner",
      points: 15,
      conceptBox: {
        title: "Counting Items",
        content: "The len() function returns HOW MANY items are in a list. It counts the number of elements.",
        syntax: "len(departments)  # Returns count",
        rule: "len(list_name). Returns a number. Useful for knowing list size."
      },
      description: "Given: departments = ['Math', 'Science', 'English', 'History']. Find and print how many departments there are using len().",
      scenario: "The college needs to know the total number of academic departments for a report.",
      
      skeleton: `departments = ['Math', 'Science', 'English', 'History']
count = len(_____)
print(_____)`,
      
      hint: "Pass the list name to len(). Store result in count. Format: count = len(departments)",
      
      solution: `departments = ['Math', 'Science', 'English', 'History']
count = len(departments)
print(count)`,
      
      commonMistakes: [
        "Using count() instead of len() (different functions!)",
        "Forgetting parentheses: len departments (needs parentheses)",
        "Using length instead of len (Python uses len)",
        "Printing departments instead of count (prints list, not number)",
        "Trying departments.len() (wrong - it's len(departments))"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes("departments = ['Math', 'Science', 'English', 'History']")) {
          return { 
            valid: false, 
            message: "❌ Must start with: departments = ['Math', 'Science', 'English', 'History']",
            mistake: "wrong_list"
          };
        }
        
        if (!trimmed.includes('len(')) {
          return { 
            valid: false, 
            message: "❌ Need to use len() function!",
            mistake: "missing_len"
          };
        }
        
        if (trimmed.includes('.len()')) {
          return { 
            valid: false, 
            message: "❌ len() is a function, not a method! Use len(departments) not departments.len()",
            mistake: "wrong_syntax"
          };
        }
        
        if (trimmed.includes('length(') || trimmed.includes('.length')) {
          return { 
            valid: false, 
            message: "❌ Python uses len() not length()!",
            mistake: "wrong_function"
          };
        }
        
        if (!trimmed.includes('len(departments)')) {
          return { 
            valid: false, 
            message: "❌ Pass the list to len(): len(departments)",
            mistake: "wrong_argument"
          };
        }
        
        if (!trimmed.includes('count = len(departments)')) {
          return { 
            valid: false, 
            message: "❌ Store result in count variable: count = len(departments)",
            mistake: "missing_assignment"
          };
        }
        
        if (!trimmed.includes('print(count)')) {
          if (trimmed.includes('print(departments)')) {
            return { 
              valid: false, 
              message: "❌ Print the count, not the list! Use print(count)",
              mistake: "printing_list"
            };
          }
          return { 
            valid: false, 
            message: "❌ Need to print the count!",
            mistake: "missing_print"
          };
        }
        
        return { valid: true, message: "✅ Excellent! You counted the list items!" };
      }
    },
    
    {
      id: 5,
      title: "Loop Through List",
      difficulty: "Intermediate",
      points: 20,
      conceptBox: {
        title: "For Loops with Lists",
        content: "A for loop visits each item in a list, one at a time. The loop variable takes on each value.",
        syntax: "for student in students:",
        rule: "Format: for item in list_name: Use singular/plural naming."
      },
      description: "Given: professors = ['Dr. Smith', 'Dr. Lee', 'Dr. Johnson']. Use a for loop to print each professor's name on a separate line.",
      scenario: "The department needs to print name badges for all professors.",
      
      skeleton: `professors = ['Dr. Smith', 'Dr. Lee', 'Dr. Johnson']
for _____ in _____:
    print(_____)`,
      
      hint: "Choose a loop variable (like prof or professor). Loop through professors. Print the loop variable each time.",
      
      solution: `professors = ['Dr. Smith', 'Dr. Lee', 'Dr. Johnson']
for professor in professors:
    print(professor)`,
      
      commonMistakes: [
        "Forgetting colon after for statement",
        "Not indenting the print statement (Python requires indentation!)",
        "Printing professors (the whole list) instead of professor (one item)",
        "Using wrong variable name in print that doesn't match loop variable",
        "Forgetting the 'in' keyword: for professor professors (needs 'in')"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes("professors = ['Dr. Smith', 'Dr. Lee', 'Dr. Johnson']")) {
          return { 
            valid: false, 
            message: "❌ Must start with: professors = ['Dr. Smith', 'Dr. Lee', 'Dr. Johnson']",
            mistake: "wrong_list"
          };
        }
        
        if (!trimmed.includes('for ')) {
          return { 
            valid: false, 
            message: "❌ Need a for loop!",
            mistake: "missing_for"
          };
        }
        
        if (!trimmed.includes(' in ')) {
          return { 
            valid: false, 
            message: "❌ For loop needs 'in' keyword: for professor in professors",
            mistake: "missing_in"
          };
        }
        
        if (!trimmed.includes('professors:')) {
          return { 
            valid: false, 
            message: "❌ Loop through professors: for professor in professors:",
            mistake: "wrong_list_name"
          };
        }
        
        const forLine = trimmed.split('\n').find(line => line.includes('for '));
        if (forLine && !forLine.includes(':')) {
          return { 
            valid: false, 
            message: "❌ For statement needs colon at the end!",
            mistake: "missing_colon"
          };
        }
        
        // Check for proper indentation
        const lines = trimmed.split('\n');
        const forIndex = lines.findIndex(line => line.includes('for '));
        if (forIndex >= 0 && forIndex < lines.length - 1) {
          const nextLine = lines[forIndex + 1];
          if (!nextLine.startsWith('    ') && !nextLine.startsWith('\t')) {
            return { 
              valid: false, 
              message: "❌ Print statement must be indented inside the loop!",
              mistake: "missing_indent"
            };
          }
        }
        
        // Extract loop variable name
        const match = trimmed.match(/for\s+(\w+)\s+in\s+professors:/);
        if (match) {
          const loopVar = match[1];
          if (trimmed.includes('print(professors)')) {
            return { 
              valid: false, 
              message: `❌ Print the loop variable (${loopVar}), not the whole list (professors)!`,
              mistake: "printing_list"
            };
          }
          if (!trimmed.includes(`print(${loopVar})`)) {
            return { 
              valid: false, 
              message: `❌ Print the loop variable: print(${loopVar})`,
              mistake: "wrong_print_var"
            };
          }
        }
        
        return { valid: true, message: "✅ Outstanding! You looped through the list!" };
      }
    }
  ];

  // Collapsible Header Component
  const CollapsibleHeader = ({ title, isOpen, onToggle, icon = "📝" }) => (
    <div 
      onClick={onToggle}
      className="flex items-center justify-between cursor-pointer p-3 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg hover:from-purple-200 hover:to-indigo-200 transition-all mb-2"
      role="button"
      aria-expanded={isOpen}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onToggle()}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <h4 className="font-bold text-purple-900">{title}</h4>
      </div>
      <ChevronDown 
        className={`w-5 h-5 text-purple-700 transition-transform duration-300 ${
          isOpen ? 'rotate-0' : '-rotate-90'
        }`}
        aria-hidden="true"
      />
    </div>
  );

  // Auto-grow textarea based on content
  const adjustTextareaHeight = (textarea) => {
    if (!textarea) return;
    textarea.style.height = 'auto';
    const newHeight = Math.max(250, textarea.scrollHeight);
    textarea.style.height = Math.min(500, newHeight) + 'px';
  };

  // Auto-adjust when userAnswer changes
  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) adjustTextareaHeight(textarea);
  }, [userAnswer]);

  const currentEx = exercises[currentExercise];

  const handleCheckAnswer = () => {
    const result = currentEx.validate(userAnswer);
    setFeedback(result);
    
    if (result.valid && !completedExercises.has(currentEx.id)) {
      setScore(score + currentEx.points);
      setCompletedExercises(new Set([...completedExercises, currentEx.id]));
    }
  };

  const loadSkeleton = () => {
    setUserAnswer(currentEx.skeleton);
    setMode('skeleton');
    setFeedback(null);
  };

  const clearAnswer = () => {
    setUserAnswer('');
    setMode('full');
    setFeedback(null);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      setShowSolution(false);
      setMode('full');
    }
  };

  const previousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      setShowSolution(false);
      setMode('full');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-8 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Level 1A: Basic Lists</h1>
              <p className="text-blue-100 text-lg">Learn to create and work with Python lists</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-300" />
                  <span className="text-2xl font-bold">{score}</span>
                </div>
                <p className="text-sm text-blue-100">Total Points</p>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{currentExercise + 1} / {exercises.length}</span>
            </div>
            <div className="w-full bg-blue-400 bg-opacity-30 rounded-full h-3">
              <div 
                className="bg-yellow-300 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Instructions */}
          <div className="space-y-6">
            {/* Concept Box - Collapsible */}
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-blue-300 rounded-xl shadow-lg">
              <CollapsibleHeader 
                title={currentEx.conceptBox.title}
                icon="📚"
                isOpen={showConceptBox}
                onToggle={() => setShowConceptBox(!showConceptBox)}
              />
              {showConceptBox && (
                <div className="p-6 pt-0">
                  <p className="text-blue-900 mb-3">{currentEx.conceptBox.content}</p>
                  <div className="bg-white bg-opacity-50 p-3 rounded-lg mb-2">
                    <code className="text-blue-700 font-mono text-sm">{currentEx.conceptBox.syntax}</code>
                  </div>
                  <p className="text-sm text-blue-800 font-medium">💡 {currentEx.conceptBox.rule}</p>
                </div>
              )}
            </div>

            {/* Exercise Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentEx.title}</h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {currentEx.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {currentEx.points} points
                    </span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>

              {/* Scenario - Collapsible */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded mb-4">
                <CollapsibleHeader 
                  title="Scenario"
                  icon="📚"
                  isOpen={showScenario}
                  onToggle={() => setShowScenario(!showScenario)}
                />
                {showScenario && (
                  <div className="p-4 pt-0">
                    <p className="text-blue-900">{currentEx.scenario}</p>
                  </div>
                )}
              </div>

              {/* Task Description */}
              <div className="prose max-w-none mb-4">
                <p className="text-gray-700 text-lg leading-relaxed font-medium">🎯 Your Task:</p>
                <p className="text-gray-700 text-lg leading-relaxed">{currentEx.description}</p>
              </div>

              {/* Common Mistakes - Collapsible */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg mb-4">
                <CollapsibleHeader 
                  title="Common Mistakes to Avoid"
                  icon="⚠️"
                  isOpen={showMistakes}
                  onToggle={() => setShowMistakes(!showMistakes)}
                />
                {showMistakes && (
                  <div className="p-4 pt-0">
                    <ul className="space-y-1 text-sm text-indigo-900">
                      {currentEx.commonMistakes.map((mistake, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-indigo-600 font-bold">•</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Hint - Collapsible */}
              <div className="mb-4">
                <CollapsibleHeader 
                  title={showHint ? 'Hide Hint' : 'Show Hint'}
                  icon="💡"
                  isOpen={showHint}
                  onToggle={() => setShowHint(!showHint)}
                />
                {showHint && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-900">{currentEx.hint}</p>
                  </div>
                )}
              </div>

              {/* Solution - Collapsible */}
              <div>
                <CollapsibleHeader 
                  title={showSolution ? 'Hide Solution' : 'Show Solution'}
                  icon="✅"
                  isOpen={showSolution}
                  onToggle={() => setShowSolution(!showSolution)}
                />
                {showSolution && (
                  <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <pre className="text-sm font-mono text-indigo-900 whitespace-pre-wrap">{currentEx.solution}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Code Editor */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Your Code</h3>
                <div className="flex gap-2">
                  <button
                    onClick={loadSkeleton}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      mode === 'skeleton'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    <Code className="w-4 h-4 inline mr-1" />
                    Skeleton
                  </button>
                  <button
                    onClick={clearAnswer}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
                  >
                    Clear
                  </button>
                </div>
              </div>
              
              <textarea
                ref={(el) => el && adjustTextareaHeight(el)}
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                  adjustTextareaHeight(e.target);
                }}
                style={{ minHeight: '250px', maxHeight: '500px' }}
                className="w-full p-4 font-mono text-sm border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                placeholder="Write your code here or click 'Skeleton' for guided practice..."
                spellCheck="false"
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCheckAnswer}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                >
                  ▶ Check Answer
                </button>
              </div>

              {/* Feedback - Repositioned */}
              {feedback && (
                <div className={`rounded-xl shadow-lg p-6 mt-4 ${feedback.valid ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {feedback.valid ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                    <h3 className="text-lg font-bold">{feedback.valid ? 'Correct!' : 'Not Quite Right'}</h3>
                  </div>
                  <p className={`text-lg ${feedback.valid ? 'text-green-900' : 'text-red-900'}`}>
                    {feedback.message}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={previousExercise}
                  disabled={currentExercise === 0}
                  className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                    currentExercise === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  ← Previous
                </button>
                <button
                  onClick={nextExercise}
                  disabled={currentExercise === exercises.length - 1}
                  className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                    currentExercise === exercises.length - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Quick Reference - Collapsible */}
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-lg">
              <CollapsibleHeader 
                title="Lists Quick Reference"
                icon="🔑"
                isOpen={showReference}
                onToggle={() => setShowReference(!showReference)}
              />
              {showReference && (
                <div className="p-6 pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="bg-white bg-opacity-50 p-3 rounded">
                      <code className="text-blue-700 font-mono">list = [item1, item2]</code>
                      <p className="text-gray-700 mt-1">Create list with square brackets</p>
                    </div>
                    <div className="bg-white bg-opacity-50 p-3 rounded">
                      <code className="text-blue-700 font-mono">list[0]</code>
                      <p className="text-gray-700 mt-1">Access first item (zero-indexed)</p>
                    </div>
                    <div className="bg-white bg-opacity-50 p-3 rounded">
                      <code className="text-blue-700 font-mono">list.append(item)</code>
                      <p className="text-gray-700 mt-1">Add item to end of list</p>
                    </div>
                    <div className="bg-white bg-opacity-50 p-3 rounded">
                      <code className="text-blue-700 font-mono">len(list)</code>
                      <p className="text-gray-700 mt-1">Get number of items in list</p>
                    </div>
                    <div className="bg-white bg-opacity-50 p-3 rounded">
                      <code className="text-blue-700 font-mono">for item in list:</code>
                      <p className="text-gray-700 mt-1">Loop through each item</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherEdLevel1ABasicLists;
