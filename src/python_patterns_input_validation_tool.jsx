import React, { useState, useEffect } from 'react';
import { GraduationCap, CheckCircle, Circle, Trophy, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import './PracticeTools.css';


const InputValidationPracticeTool = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showSyntax, setShowSyntax] = useState(false);
  const [mode, setMode] = useState('full');
  
  // Collapsible section states
  const [showScenario, setShowScenario] = useState(true);
  const [showTask, setShowTask] = useState(true);
  const [showMistakes, setShowMistakes] = useState(true);

  const exercises = [
    {
      id: 0,
      title: "Exercise 1: Validate Number Input",
      difficulty: "Beginner",
      points: 10,
      concept: "Using .isdigit() Method",
      scenario: "You need to get an age from the user, ensuring they enter a valid number.",
      task: "Use while True to create a validation loop. Get input, check if it's a digit with .isdigit(). If yes, convert to int and break. If no, print 'Please enter a number!' and loop again. Print the age.",
      hint: "while True:, age_input = input(...), if age_input.isdigit():, age = int(age_input), break, else: print error",
      skeleton: "# Validation loop\nwhile _____:\n    age_input = input('Enter age: ')\n    \n    if age_input._____():\n        age = _____(age_input)\n        _____  # Exit loop\n    else:\n        print('Please enter a number!')\n\n# Use validated age\nprint(f'Age: {age}')",
      solution: "while True:\n    age_input = input('Enter age: ')\n    \n    if age_input.isdigit():\n        age = int(age_input)\n        break\n    else:\n        print('Please enter a number!')\n\nprint(f'Age: {age}')",
      commonMistakes: [
        "❌ Not using while True (loop doesn't repeat!)",
        "❌ Forgetting break statement (infinite loop!)",
        "❌ Converting to int before checking isdigit() (crashes!)",
        "❌ Not storing input in variable before checking"
      ],
      validate: (answer) => {
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use 'while True:' to create a validation loop" };
        }
        
        if (!answer.includes('input(')) {
          return { valid: false, message: "Get input from user" };
        }
        
        if (!answer.includes('.isdigit()')) {
          return { valid: false, message: "Use .isdigit() to check if input is a number" };
        }
        
        if (!answer.includes('int(')) {
          return { valid: false, message: "Convert valid input to int" };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Use 'break' to exit the loop when input is valid" };
        }
        
        if (!answer.includes('else:')) {
          return { valid: false, message: "Use else to handle invalid input" };
        }
        
        const breakIndex = answer.indexOf('break');
        const intIndex = answer.indexOf('int(');
        
        if (breakIndex < intIndex) {
          return { valid: false, message: "❌ Convert to int BEFORE break!" };
        }
        
        return { valid: true, message: "Perfect! You validated number input! ✓" };
      }
    },
    {
      id: 1,
      title: "Exercise 2: Validate Yes/No",
      difficulty: "Beginner",
      points: 10,
      concept: "Checking Against Valid Options",
      scenario: "You need a yes/no answer and want to accept y, n, Y, or N.",
      task: "Use while True. Get input, convert to lowercase with .lower(). Check if it's in ['y', 'n']. If yes, break. If no, print error. Print the answer.",
      hint: "while True:, answer = input(...).lower(), if answer in ['y', 'n']:, break, else: error",
      skeleton: "# Get valid yes/no\nwhile True:\n    answer = input('Continue? (y/n): ')._____\n    \n    if answer _____ ['y', 'n']:\n        break\n    else:\n        print('Please enter y or n!')\n\nprint(f'You chose: {answer}')",
      solution: "while True:\n    answer = input('Continue? (y/n): ').lower()\n    \n    if answer in ['y', 'n']:\n        break\n    else:\n        print('Please enter y or n!')\n\nprint(f'You chose: {answer}')",
      commonMistakes: [
        "❌ Not using .lower() (Y and N rejected!)",
        "❌ Using == instead of in (only checks one value)",
        "❌ Forgetting break",
        "❌ Checking before converting to lowercase"
      ],
      validate: (answer) => {
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use while True for validation loop" };
        }
        
        if (!answer.includes('.lower()')) {
          return { valid: false, message: "Use .lower() to handle both uppercase and lowercase" };
        }
        
        if (!answer.includes('in ')) {
          return { valid: false, message: "Use 'in' to check if answer is in the valid list" };
        }
        
        if (!answer.includes("['y', 'n']") && !answer.includes('["y", "n"]')) {
          return { valid: false, message: "Check if answer is in ['y', 'n']" };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Use break to exit when input is valid" };
        }
        
        if (!answer.includes('else:')) {
          return { valid: false, message: "Use else to handle invalid input" };
        }
        
        return { valid: true, message: "Excellent! You validated yes/no input! ✓" };
      }
    },
    {
      id: 2,
      title: "Exercise 3: Validate Range",
      difficulty: "Intermediate",
      points: 15,
      concept: "Checking Value Boundaries",
      scenario: "You need a grade between 0 and 100.",
      task: "Use while True. Get input, check if it's a digit. If yes, convert to int and check if 0 <= grade <= 100. If valid, break. Otherwise print appropriate error. Print the grade.",
      hint: "Two validation checks: isdigit() first, then range check. Two different error messages!",
      skeleton: "# Validate grade range\nwhile True:\n    grade_input = input('Grade (0-100): ')\n    \n    if grade_input.isdigit():\n        grade = int(grade_input)\n        if _____ <= grade <= _____:\n            break\n        else:\n            print('Grade must be 0-100!')\n    else:\n        print('Please enter a number!')\n\nprint(f'Grade: {grade}')",
      solution: "while True:\n    grade_input = input('Grade (0-100): ')\n    \n    if grade_input.isdigit():\n        grade = int(grade_input)\n        if 0 <= grade <= 100:\n            break\n        else:\n            print('Grade must be 0-100!')\n    else:\n        print('Please enter a number!')\n\nprint(f'Grade: {grade}')",
      commonMistakes: [
        "❌ Only checking range, not if it's a number (crashes on text!)",
        "❌ Using and instead of chained comparison",
        "❌ Wrong order: checking range before isdigit()",
        "❌ Not having two different error messages"
      ],
      validate: (answer) => {
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use while True for validation" };
        }
        
        if (!answer.includes('.isdigit()')) {
          return { valid: false, message: "First check if input is a digit with .isdigit()" };
        }
        
        if (!answer.includes('int(')) {
          return { valid: false, message: "Convert to int after validating it's a digit" };
        }
        
        if (!answer.includes('0 <=') || !answer.includes('<= 100')) {
          return { valid: false, message: "Check if 0 <= grade <= 100" };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Break when input is valid" };
        }
        
        const printCount = (answer.match(/print\(/g) || []).length;
        if (printCount < 3) {
          return { valid: false, message: "Need at least 3 prints: two error messages + final grade" };
        }
        
        return { valid: true, message: "Perfect! You validated both type and range! ✓" };
      }
    },
    {
      id: 3,
      title: "Exercise 4: Validate Positive Number",
      difficulty: "Intermediate",
      points: 15,
      concept: "Multiple Conditions",
      scenario: "You need a positive number (greater than 0).",
      task: "Get input, validate it's a digit, convert to int, check if > 0. If all valid, break. Print appropriate error for each problem. Print the number.",
      hint: "Check isdigit() first, then convert, then check > 0. Three different conditions!",
      skeleton: "# Get positive number\nwhile True:\n    num_input = input('Enter positive number: ')\n    \n    if num_input.isdigit():\n        num = int(num_input)\n        if num _____ 0:\n            break\n        else:\n            print('Must be positive!')\n    else:\n        print('Please enter a number!')\n\nprint(f'Number: {num}')",
      solution: "while True:\n    num_input = input('Enter positive number: ')\n    \n    if num_input.isdigit():\n        num = int(num_input)\n        if num > 0:\n            break\n        else:\n            print('Must be positive!')\n    else:\n        print('Please enter a number!')\n\nprint(f'Number: {num}')",
      commonMistakes: [
        "❌ Using >= instead of > (0 is not positive!)",
        "❌ Checking positive before converting to int",
        "❌ Not handling both digit check AND positive check",
        "❌ Only one error message for both problems"
      ],
      validate: (answer) => {
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use while True" };
        }
        
        if (!answer.includes('.isdigit()')) {
          return { valid: false, message: "Check if input is a digit" };
        }
        
        if (!answer.includes('int(')) {
          return { valid: false, message: "Convert to int" };
        }
        
        if (!answer.includes('> 0')) {
          return { valid: false, message: "Check if number > 0 (greater than 0, not >=)" };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Break when valid" };
        }
        
        const printCount = (answer.match(/print\(/g) || []).length;
        if (printCount < 3) {
          return { valid: false, message: "Need different error messages for different problems" };
        }
        
        return { valid: true, message: "Excellent! Multiple validation checks! ✓" };
      }
    },
    {
      id: 4,
      title: "Exercise 5: Validate Float with try/except",
      difficulty: "Advanced",
      points: 20,
      concept: "Exception Handling",
      scenario: "You need to accept decimal numbers (floats), not just integers.",
      task: "Use try/except to handle float conversion. Inside try: convert to float and check if > 0. If valid, break. In except ValueError: print error. Print the number.",
      hint: "try: num = float(input), check if > 0, break, except ValueError: error message",
      skeleton: "# Get positive float\nwhile True:\n    _____:\n        num = _____(input('Enter positive decimal: '))\n        if num > 0:\n            _____\n        else:\n            print('Must be positive!')\n    except _____:\n        print('Please enter a number!')\n\nprint(f'Number: {num}')",
      solution: "while True:\n    try:\n        num = float(input('Enter positive decimal: '))\n        if num > 0:\n            break\n        else:\n            print('Must be positive!')\n    except ValueError:\n        print('Please enter a number!')\n\nprint(f'Number: {num}')",
      commonMistakes: [
        "❌ Using isdigit() (doesn't work for floats!)",
        "❌ Forgetting except ValueError clause",
        "❌ Not checking if positive inside try block",
        "❌ Breaking before checking if positive"
      ],
      validate: (answer) => {
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use while True" };
        }
        
        if (!answer.includes('try:')) {
          return { valid: false, message: "Use try block to catch conversion errors" };
        }
        
        if (!answer.includes('except ValueError')) {
          return { valid: false, message: "Catch ValueError exception" };
        }
        
        if (!answer.includes('float(')) {
          return { valid: false, message: "Convert to float to accept decimals" };
        }
        
        if (!answer.includes('> 0')) {
          return { valid: false, message: "Check if number > 0" };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Break when valid" };
        }
        
        return { valid: true, message: "Outstanding! You used try/except for validation! ✓" };
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

  const currentExerciseData = exercises[currentExercise];
  const totalPoints = completedExercises.reduce((sum, id) => sum + exercises.find(ex => ex.id === id).points, 0);
  const maxPoints = exercises.reduce((sum, ex) => sum + ex.points, 0);

  const handleCheckAnswer = () => {
    const result = currentExerciseData.validate(userAnswer);
    setFeedback(result);
    
    if (result.valid && !completedExercises.includes(currentExerciseData.id)) {
      setCompletedExercises([...completedExercises, currentExerciseData.id]);
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      setShowSolution(false);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      setShowSolution(false);
    }
  };

  const handleLoadSkeleton = () => {
    setUserAnswer(currentExerciseData.skeleton);
    setMode('skeleton');
  };

  const handleStartFresh = () => {
    setUserAnswer('');
    setMode('full');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-orange-600 to-yellow-500 rounded-lg shadow-xl p-8 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <GraduationCap className="w-10 h-10" />
                Input Validation Practice
              </h1>
              <p className="text-xl text-orange-100">Master while loops, validation checks, and error handling</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{totalPoints}/{maxPoints}</div>
              <div className="text-orange-100">Points</div>
            </div>
          </div>

          <div className="mt-6 bg-white bg-opacity-20 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedExercises.length / exercises.length) * 100}%` }}
            />
          </div>
          <p className="text-center mt-2 text-orange-100">
            {completedExercises.length} of {exercises.length} exercises completed
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{currentExerciseData.title}</h2>
                  <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                      {currentExerciseData.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                      {currentExerciseData.points} points
                    </span>
                    {completedExercises.includes(currentExerciseData.id) && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                  <p className="font-semibold text-gray-700 mb-1">💡 Concept:</p>
                  <p className="text-gray-700">{currentExerciseData.concept}</p>
                </div>
              </div>

              {/* Scenario - Collapsible */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg mb-4">
                <CollapsibleHeader 
                  title="Scenario"
                  icon="📚"
                  isOpen={showScenario}
                  onToggle={() => setShowScenario(!showScenario)}
                />
                {showScenario && (
                  <div className="p-4 pt-0">
                    <p className="text-gray-700">{currentExerciseData.scenario}</p>
                  </div>
                )}
              </div>

              {/* Task - Collapsible */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg mb-4">
                <CollapsibleHeader 
                  title="Your Task"
                  icon="🎯"
                  isOpen={showTask}
                  onToggle={() => setShowTask(!showTask)}
                />
                {showTask && (
                  <div className="p-4 pt-0">
                    <p className="text-gray-700">{currentExerciseData.task}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleStartFresh}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    mode === 'full' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Start Fresh
                </button>
                <button
                  onClick={handleLoadSkeleton}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    mode === 'skeleton' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Skeleton Mode
                </button>
              </div>

              <textarea
                ref={(el) => el && adjustTextareaHeight(el)}
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                  adjustTextareaHeight(e.target);
                }}
                style={{ minHeight: '250px', maxHeight: '500px' }}
                placeholder="Write your Python code here..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-orange-500 focus:outline-none mb-4 bg-gray-50 resize-y"
              />

              {/* Common Mistakes - Collapsible */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                <CollapsibleHeader 
                  title="Common Mistakes to Avoid"
                  icon="⚠️"
                  isOpen={showMistakes}
                  onToggle={() => setShowMistakes(!showMistakes)}
                />
                {showMistakes && (
                  <div className="p-4 pt-0">
                    <ul className="space-y-1">
                      {currentExerciseData.commonMistakes.map((mistake, index) => (
                        <li key={index} className="text-sm text-gray-700">{mistake}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={handleCheckAnswer}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  {showHint ? 'Hide' : 'Show'} Hint
                </button>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  {showSolution ? 'Hide' : 'Show'} Solution
                </button>
              </div>

              {feedback && (
                <div className={`p-4 rounded-lg mb-4 ${
                  feedback.valid ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'
                }`}>
                  <p className={`font-semibold ${feedback.valid ? 'text-green-700' : 'text-red-700'}`}>
                    {feedback.message}
                  </p>
                </div>
              )}

              {/* Hint - Collapsible */}
              {showHint && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg mb-4">
                  <CollapsibleHeader 
                    title="Hint"
                    icon="💡"
                    isOpen={showHint}
                    onToggle={() => setShowHint(!showHint)}
                  />
                  <div className="p-4 pt-0">
                    <p className="text-gray-700">{currentExerciseData.hint}</p>
                  </div>
                </div>
              )}

              {/* Solution - Collapsible */}
              {showSolution && (
                <div className="bg-gray-50 border-l-4 border-gray-500 rounded-lg mb-4">
                  <CollapsibleHeader 
                    title="Solution"
                    icon="✅"
                    isOpen={showSolution}
                    onToggle={() => setShowSolution(!showSolution)}
                  />
                  <div className="p-4 pt-0">
                    <pre className="bg-gray-800 text-green-400 p-3 rounded overflow-x-auto whitespace-pre-wrap">
                      {currentExerciseData.solution}
                    </pre>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={handlePreviousExercise}
                  disabled={currentExercise === 0}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNextExercise}
                  disabled={currentExercise === exercises.length - 1}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <button
                onClick={() => setShowSyntax(!showSyntax)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-lg font-bold text-gray-800">Quick Reference</h3>
                {showSyntax ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {showSyntax && (
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Basic Validation</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      while True:<br />
                      &nbsp;&nbsp;# get input<br />
                      &nbsp;&nbsp;# validate<br />
                      &nbsp;&nbsp;# if valid: break<br />
                      &nbsp;&nbsp;# else: error
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Check if Number</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      if input.isdigit():<br />
                      &nbsp;&nbsp;num = int(input)
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Float with try/except</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      try:<br />
                      &nbsp;&nbsp;num = float(input)<br />
                      except ValueError:<br />
                      &nbsp;&nbsp;# handle error
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Check Options</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      if choice in ['a', 'b', 'c']
                    </code>
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="font-semibold text-gray-700 mb-2">Remember:</h4>
                    <ul className="text-xs space-y-1 text-gray-600">
                      <li>✓ while True for validation</li>
                      <li>✓ break when valid</li>
                      <li>✓ .isdigit() for integers</li>
                      <li>✓ try/except for floats</li>
                      <li>✓ .strip() for strings</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {completedExercises.length === exercises.length && (
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-lg p-8 mt-6 text-center text-white">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Excellent Work! 🎉</h2>
            <p className="text-xl mb-4">You've mastered Input Validation!</p>
            <p className="text-lg mb-2">Total Points: {totalPoints}/{maxPoints}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputValidationPracticeTool;
