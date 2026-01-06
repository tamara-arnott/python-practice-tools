import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Trophy, Target, Book, Code, Eye, EyeOff, Lightbulb, AlertTriangle } from 'lucide-react';
import './PracticeTools.css';


const HigherEdLevel3BStringValidation = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [mode, setMode] = useState('full');
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(new Set());

  const exercises = [
    {
      id: 1,
      title: "Check Non-Empty with .strip()",
      difficulty: "Beginner",
      points: 13,
      conceptBox: {
        title: "Removing Whitespace Before Validation",
        content: ".strip() removes leading and trailing spaces. ALWAYS use before checking if string is empty!",
        syntax: "name = input()\nname = name.strip()\nif name != '':\n    print('Valid')",
        rule: "Strip FIRST, then check. '   ' looks non-empty but after .strip() it's ''."
      },
      description: "Get student name from input. Use .strip() to remove spaces. Check if result is not empty. If valid, print 'Valid name'. Otherwise print 'Name required'.",
      scenario: "Registration form requires student name - can't be blank or just spaces.",
      
      skeleton: `name = input()
name = name._____()
if name ___ '':
    print('Valid name')
else:
    print('Name required')`,
      
      hint: ".strip() removes leading/trailing spaces. Check if name != '' after stripping.",
      
      solution: `name = input()
name = name.strip()
if name != '':
    print('Valid name')
else:
    print('Name required')`,
      
      commonMistakes: [
        "Not using .strip() (spaces count as valid!)",
        "Checking before stripping (validates wrong string)",
        "Using == instead of != (backwards logic)",
        "Forgetting parentheses on .strip()",
        "Using len() unnecessarily (name != '' is simpler)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('.strip()')) {
          return { 
            valid: false, 
            message: "❌ Use .strip() to remove spaces!",
            mistake: "not_using_strip"
          };
        }
        
        if (trimmed.includes('.strip') && !trimmed.includes('.strip()')) {
          return { 
            valid: false, 
            message: "❌ Need parentheses! name.strip() not name.strip",
            mistake: "missing_parentheses"
          };
        }
        
        // Check if strip happens before the if statement
        const lines = trimmed.split('\n');
        let stripLineIndex = -1;
        let ifLineIndex = -1;
        
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('.strip()')) {
            stripLineIndex = i;
          }
          if (lines[i].includes('if name')) {
            ifLineIndex = i;
          }
        }
        
        if (stripLineIndex > ifLineIndex && ifLineIndex !== -1) {
          return { 
            valid: false, 
            message: "❌ Strip BEFORE checking! Use .strip() on the line before the if statement.",
            mistake: "strip_after_check"
          };
        }
        
        if (!trimmed.includes("name = name.strip()")) {
          return { 
            valid: false, 
            message: "❌ Store the stripped version: name = name.strip()",
            mistake: "not_storing_strip"
          };
        }
        
        if (trimmed.includes("if name == ''")) {
          return { 
            valid: false, 
            message: "❌ Use != not ==! Check if NOT empty for valid.",
            mistake: "wrong_operator"
          };
        }
        
        if (!trimmed.includes("if name != ''")) {
          return { 
            valid: false, 
            message: "❌ Check if not empty: if name != '':",
            mistake: "wrong_check"
          };
        }
        
        return { valid: true, message: "✅ Perfect! String validation with .strip() mastered!" };
      }
    },
    
    {
      id: 2,
      title: "Length Validation",
      difficulty: "Intermediate",
      points: 15,
      conceptBox: {
        title: "Checking String Length",
        content: "len() returns the number of characters. Use == for exact length, >= for minimum, <= for maximum.",
        syntax: "code = input()\nif len(code) == 6:\n    print('Valid')\nelse:\n    print('Must be 6 characters')",
        rule: "Use == for EXACT length. Use >= or <= for minimum/maximum."
      },
      description: "Get course code from input. Must be exactly 6 characters (e.g., 'CS101A'). Print 'Valid code' or 'Must be 6 characters'.",
      scenario: "Course codes must follow standard 6-character format.",
      
      skeleton: `code = input()
if _____(code) ___ 6:
    print('Valid code')
else:
    print('Must be 6 characters')`,
      
      hint: "len(code) returns character count. Check if == 6.",
      
      solution: `code = input()
if len(code) == 6:
    print('Valid code')
else:
    print('Must be 6 characters')`,
      
      commonMistakes: [
        "Using >= or <= instead of == (wrong - must be exactly 6)",
        "Forgetting to use len() (can't compare string to number)",
        "Checking code == 6 directly (TypeError)",
        "Using .strip() before len() (depends on requirements)",
        "Wrong number (checking for 7 or 5)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('len(')) {
          return { 
            valid: false, 
            message: "❌ Use len() to get character count!",
            mistake: "not_using_len"
          };
        }
        
        if (!trimmed.includes('len(code)')) {
          return { 
            valid: false, 
            message: "❌ Check length of code: len(code)",
            mistake: "wrong_variable"
          };
        }
        
        if (trimmed.includes('>=') || trimmed.includes('<=')) {
          return { 
            valid: false, 
            message: "❌ Use == not >= or <=! Must be EXACTLY 6 characters.",
            mistake: "wrong_operator"
          };
        }
        
        if (!trimmed.includes('len(code) == 6')) {
          return { 
            valid: false, 
            message: "❌ Check if exactly 6: len(code) == 6",
            mistake: "wrong_check"
          };
        }
        
        if (!trimmed.includes("print('Valid code')")) {
          return { 
            valid: false, 
            message: "❌ Print 'Valid code' when length is correct!",
            mistake: "wrong_success_message"
          };
        }
        
        return { valid: true, message: "✅ Excellent! Length validation mastered!" };
      }
    },
    
    {
      id: 3,
      title: "Case-Insensitive Check",
      difficulty: "Intermediate",
      points: 15,
      conceptBox: {
        title: "Ignoring Case in Comparisons",
        content: "Use .lower() or .upper() to convert before comparing. This makes 'Science', 'SCIENCE', 'science' all match.",
        syntax: "dept = input()\nif dept.lower() == 'science':\n    print('Match')",
        rule: "Convert to same case BEFORE comparing. Compare lowercase to lowercase."
      },
      description: "Get department name. Check if it equals 'science' (case-insensitive). Print 'Science dept' if match, 'Other dept' if not.",
      scenario: "Department routing - accept 'Science', 'SCIENCE', 'science', etc.",
      
      skeleton: `dept = input()
if dept._____ ___ 'science':
    print('Science dept')
else:
    print('Other dept')`,
      
      hint: ".lower() converts to lowercase. Compare: dept.lower() == 'science'",
      
      solution: `dept = input()
if dept.lower() == 'science':
    print('Science dept')
else:
    print('Other dept')`,
      
      commonMistakes: [
        "Not using .lower() (case-sensitive comparison fails)",
        "Using .upper() then comparing to 'science' (case mismatch!)",
        "Comparing to 'Science' with capital S (defeats purpose)",
        "Forgetting () after .lower",
        "Using = instead of == for comparison"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('.lower()')) {
          return { 
            valid: false, 
            message: "❌ Use .lower() to convert to lowercase!",
            mistake: "not_using_lower"
          };
        }
        
        if (trimmed.includes('.lower') && !trimmed.includes('.lower()')) {
          return { 
            valid: false, 
            message: "❌ Need parentheses! dept.lower() not dept.lower",
            mistake: "missing_parentheses"
          };
        }
        
        if (trimmed.includes('.upper()')) {
          return { 
            valid: false, 
            message: "❌ Use .lower() and compare to lowercase 'science'!",
            mistake: "using_upper"
          };
        }
        
        if (!trimmed.includes("dept.lower() == 'science'") && !trimmed.includes('dept.lower() == "science"')) {
          return { 
            valid: false, 
            message: "❌ Compare: dept.lower() == 'science'",
            mistake: "wrong_comparison"
          };
        }
        
        if (trimmed.includes("== 'Science'")) {
          return { 
            valid: false, 
            message: "❌ Compare to lowercase 'science' not 'Science'!",
            mistake: "wrong_case_in_comparison"
          };
        }
        
        return { valid: true, message: "✅ Perfect! Case-insensitive comparison mastered!" };
      }
    },
    
    {
      id: 4,
      title: "Check for Specific Characters",
      difficulty: "Intermediate",
      points: 15,
      conceptBox: {
        title: "Finding Characters in Strings",
        content: "Use 'in' operator to check if a character exists in string. Combine with 'and' for multiple requirements.",
        syntax: "email = input()\nif '@' in email and '.' in email:\n    print('Valid format')",
        rule: "Use 'in' to check. Use 'and' when ALL characters must be present."
      },
      description: "Get email from input. Check if it contains BOTH '@' and '.'. Print 'Valid format' or 'Invalid email'.",
      scenario: "Basic email format validation.",
      
      skeleton: `email = input()
if _____ in email ___ _____ in email:
    print('Valid format')
else:
    print('Invalid email')`,
      
      hint: "Use 'in' operator. Check: '@' in email and '.' in email",
      
      solution: `email = input()
if '@' in email and '.' in email:
    print('Valid format')
else:
    print('Invalid email')`,
      
      commonMistakes: [
        "Using 'or' instead of 'and' (need BOTH characters!)",
        "Checking only one character",
        "Wrong syntax: email in '@' (backwards!)",
        "Forgetting quotes on characters",
        "Missing 'and' keyword (syntax error)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('in email')) {
          return { 
            valid: false, 
            message: "❌ Use 'in' operator to check if character is in string!",
            mistake: "not_using_in"
          };
        }
        
        if (trimmed.includes('email in')) {
          return { 
            valid: false, 
            message: "❌ Wrong direction! Check: '@' in email (not email in '@')",
            mistake: "backwards_in"
          };
        }
        
        if (!trimmed.includes('and')) {
          return { 
            valid: false, 
            message: "❌ Use 'and' to combine both conditions!",
            mistake: "missing_and"
          };
        }
        
        if (trimmed.includes('or') && !trimmed.includes('and')) {
          return { 
            valid: false, 
            message: "❌ Use 'and' not 'or'! Email needs BOTH @ and .",
            mistake: "using_or"
          };
        }
        
        if (!trimmed.includes("'@'") && !trimmed.includes('"@"')) {
          return { 
            valid: false, 
            message: "❌ Check for @ symbol: '@' in email",
            mistake: "missing_at_check"
          };
        }
        
        if (!trimmed.includes("'.'") && !trimmed.includes('"."')) {
          return { 
            valid: false, 
            message: "❌ Check for . symbol: '.' in email",
            mistake: "missing_dot_check"
          };
        }
        
        return { valid: true, message: "✅ Excellent! Character checking mastered!" };
      }
    },
    
    {
      id: 5,
      title: "Multi-Condition String Validation",
      difficulty: "Advanced",
      points: 17,
      conceptBox: {
        title: "Multiple String Requirements",
        content: "Check EACH requirement separately with if/elif to give specific error messages. Check simplest first!",
        syntax: "id = input()\nif len(id) != 7:\n    print('Must be 7 chars')\nelif not id.isupper():\n    print('Must be uppercase')\nelif not id.isalnum():\n    print('Must be alphanumeric')\nelse:\n    print('Valid')",
        rule: "Check length FIRST (fastest). Use 'not' with boolean methods. if/elif for specific errors."
      },
      description: "Get student ID from input. Valid if: (1) exactly 7 characters, (2) all uppercase, (3) all alphanumeric. Check all three. Print 'Valid ID' or specific error.",
      scenario: "Student ID format: 7 uppercase alphanumeric characters (e.g., 'STU1234').",
      
      skeleton: `student_id = input()
if _____(student_id) ___ 7:
    print('Must be 7 characters')
elif ___ student_id._____():
    print('Must be uppercase')
elif ___ student_id._____():
    print('Must be alphanumeric')
else:
    print('Valid ID')`,
      
      hint: "Check len() == 7, .isupper(), .isalnum(). Use elif to show specific error first, else for valid.",
      
      solution: `student_id = input()
if len(student_id) != 7:
    print('Must be 7 characters')
elif not student_id.isupper():
    print('Must be uppercase')
elif not student_id.isalnum():
    print('Must be alphanumeric')
else:
    print('Valid ID')`,
      
      commonMistakes: [
        "Wrong order (check length first!)",
        "Using 'and' to combine (gives generic error, not specific)",
        "Forgetting 'not' (backwards logic)",
        "Missing () on string methods",
        "Using == True instead of just checking boolean"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('len(student_id)')) {
          return { 
            valid: false, 
            message: "❌ Check length first: len(student_id)",
            mistake: "not_checking_length"
          };
        }
        
        if (!trimmed.includes('len(student_id) != 7')) {
          return { 
            valid: false, 
            message: "❌ Check if length is NOT 7: len(student_id) != 7",
            mistake: "wrong_length_check"
          };
        }
        
        if (!trimmed.includes('.isupper()')) {
          return { 
            valid: false, 
            message: "❌ Use .isupper() to check if all uppercase!",
            mistake: "missing_isupper"
          };
        }
        
        if (!trimmed.includes('.isalnum()')) {
          return { 
            valid: false, 
            message: "❌ Use .isalnum() to check if alphanumeric!",
            mistake: "missing_isalnum"
          };
        }
        
        if (!trimmed.includes('not student_id.isupper()')) {
          return { 
            valid: false, 
            message: "❌ Use 'not' to check if NOT uppercase: not student_id.isupper()",
            mistake: "missing_not"
          };
        }
        
        if (!trimmed.includes('elif')) {
          return { 
            valid: false, 
            message: "❌ Use elif for subsequent checks to give specific error messages!",
            mistake: "missing_elif"
          };
        }
        
        if (trimmed.includes('and')) {
          return { 
            valid: false, 
            message: "❌ Don't use 'and'! Use if/elif to show SPECIFIC error for each problem.",
            mistake: "using_and"
          };
        }
        
        // Check order: length should come before isupper
        const lines = trimmed.split('\n');
        let lengthIndex = -1;
        let isupperIndex = -1;
        
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('len(student_id)')) {
            lengthIndex = i;
          }
          if (lines[i].includes('.isupper()')) {
            isupperIndex = i;
          }
        }
        
        if (lengthIndex > isupperIndex && isupperIndex !== -1) {
          return { 
            valid: false, 
            message: "❌ Check length FIRST, then other conditions! Length check is fastest.",
            mistake: "wrong_order"
          };
        }
        
        return { valid: true, message: "✅ Perfect! Multi-condition string validation mastered!" };
      }
    }
  ];

  const currentEx = exercises[currentExercise];

  const handleCheckAnswer = () => {
    const result = currentEx.validate(userAnswer);
    setFeedback(result);
    
    if (result.valid && !completedExercises.has(currentEx.id)) {
      setScore(score + currentEx.points);
      setCompletedExercises(new Set([...completedExercises, currentEx.id]));
    }
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      setShowSolution(false);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      setShowSolution(false);
    }
  };

  const loadSkeleton = () => {
    setUserAnswer(currentEx.skeleton);
    setMode('skeleton');
  };

  const clearAnswer = () => {
    setUserAnswer('');
    setMode('full');
  };

  const totalPoints = exercises.reduce((sum, ex) => sum + ex.points, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-lime-600 to-green-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tool 3B: String Validation</h1>
              <p className="text-lime-100 text-lg">Master string validation techniques</p>
            </div>
            <Trophy className="w-16 h-16 text-yellow-300" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-lime-100 text-sm">Your Score</div>
              <div className="text-3xl font-bold">{score} / {totalPoints}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-lime-100 text-sm">Progress</div>
              <div className="text-3xl font-bold">{completedExercises.size} / {exercises.length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-lime-100 text-sm">Current Exercise</div>
              <div className="text-3xl font-bold">{currentExercise + 1} of {exercises.length}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-white bg-opacity-20 rounded-full h-3">
            <div 
              className="bg-yellow-300 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(score / totalPoints) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={prevExercise}
            disabled={currentExercise === 0}
            className="px-6 py-3 bg-white rounded-lg shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
          >
            ← Previous
          </button>
          <button
            onClick={nextExercise}
            disabled={currentExercise === exercises.length - 1}
            className="px-6 py-3 bg-white rounded-lg shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
          >
            Next →
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Instructions */}
          <div className="space-y-6">
            {/* Concept Box */}
            <div className="bg-gradient-to-br from-lime-100 to-green-100 border-2 border-lime-300 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Book className="w-6 h-6 text-lime-700" />
                <h3 className="text-xl font-bold text-lime-900">{currentEx.conceptBox.title}</h3>
              </div>
              <p className="text-lime-900 mb-3">{currentEx.conceptBox.content}</p>
              <div className="bg-white bg-opacity-50 p-3 rounded-lg mb-2">
                <code className="text-lime-700 font-mono text-sm whitespace-pre-wrap">{currentEx.conceptBox.syntax}</code>
              </div>
              <p className="text-sm text-lime-800 font-medium">💡 {currentEx.conceptBox.rule}</p>
            </div>

            {/* Exercise Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentEx.title}</h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded-full text-sm font-medium">
                      {currentEx.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {currentEx.points} points
                    </span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-lime-500" />
              </div>

              <div className="bg-lime-50 border-l-4 border-lime-500 p-4 mb-4 rounded">
                <p className="text-sm text-lime-800 font-medium mb-2">📚 Scenario:</p>
                <p className="text-lime-900">{currentEx.scenario}</p>
              </div>

              <div className="prose max-w-none mb-4">
                <p className="text-gray-700 text-lg leading-relaxed">{currentEx.description}</p>
              </div>

              {/* Common Mistakes */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-green-900">Common Mistakes to Avoid:</h3>
                </div>
                <ul className="space-y-1 text-sm text-green-900">
                  {currentEx.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hint Toggle */}
              <div className="mb-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-lime-600 hover:text-lime-700 font-medium"
                >
                  <Lightbulb className="w-5 h-5" />
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
                {showHint && (
                  <div className="mt-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-900">{currentEx.hint}</p>
                  </div>
                )}
              </div>

              {/* Solution Toggle */}
              <div>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center gap-2 text-lime-600 hover:text-lime-700 font-medium"
                >
                  {showSolution ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
                {showSolution && (
                  <div className="mt-3 p-4 bg-lime-50 border border-lime-200 rounded-lg">
                    <pre className="text-sm font-mono text-lime-900 whitespace-pre-wrap">{currentEx.solution}</pre>
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
                        ? 'bg-lime-500 text-white'
                        : 'bg-lime-100 text-lime-700 hover:bg-lime-200'
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
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full h-96 p-4 font-mono text-sm border-2 border-gray-200 rounded-lg focus:border-lime-500 focus:ring-2 focus:ring-lime-200 transition-all"
                placeholder="Write your code here or click 'Skeleton' for guided practice..."
                spellCheck="false"
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCheckAnswer}
                  className="flex-1 bg-gradient-to-r from-lime-500 to-green-600 text-white py-3 rounded-lg font-bold hover:from-lime-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
                >
                  ▶ Check Answer
                </button>
              </div>
            </div>

            
            {/* Feedback - Repositioned */}
            {feedback && (
              <div className={`rounded-xl shadow-lg p-6 ${feedback.valid ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
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

            {/* Quick Reference */}
            <div className="bg-gradient-to-br from-lime-100 to-green-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-lime-900 mb-3">🔑 String Validation Quick Reference</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-lime-700 font-mono">.strip()</code>
                  <p className="text-gray-700 mt-1">Removes leading/trailing spaces</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-lime-700 font-mono">len(text)</code>
                  <p className="text-gray-700 mt-1">Returns character count</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-lime-700 font-mono">.lower()</code>
                  <p className="text-gray-700 mt-1">Converts to lowercase</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-lime-700 font-mono">'char' in text</code>
                  <p className="text-gray-700 mt-1">Checks if character exists</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-lime-700 font-mono">.isupper() .isalnum() .isdigit()</code>
                  <p className="text-gray-700 mt-1">Boolean checks for string properties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherEdLevel3BStringValidation;
