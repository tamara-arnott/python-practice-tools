import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Trophy, Target, Book, Code, Eye, EyeOff, Lightbulb, AlertTriangle } from 'lucide-react';
import './PracticeTools.css';


const HigherEdLevel3CTryExceptPattern = () => {
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
      title: "Basic try/except",
      difficulty: "Beginner",
      points: 12,
      description: "Get age from input. Use try/except to convert to int. Print 'Valid age' if successful, 'Must be a number' if it fails.",
      scenario: "Age validation - handle non-numeric input gracefully.",
      
      skeleton: `age_input = input()
try:
    age = _____(age_input)
    print('Valid age')
except _____:
    print('Must be a number')`,
      
      hint: "try: int(age_input), except ValueError: for conversion errors",
      
      solution: `age_input = input()
try:
    age = int(age_input)
    print('Valid age')
except ValueError:
    print('Must be a number')`,
      
      commonMistakes: [
        "Converting before try block (defeats purpose - will crash!)",
        "Using except: without specifying ValueError (too broad)",
        "Using 'pass' instead of printing error message",
        "Wrong exception type (TypeError instead of ValueError)",
        "Not storing the converted value"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('try:')) {
          return { 
            valid: false, 
            message: "❌ Need try: block to handle potential errors!",
            mistake: "missing_try"
          };
        }
        
        if (!trimmed.includes('int(age_input)')) {
          if (trimmed.match(/age\s*=\s*int\s*\(/)) {
            return { 
              valid: false, 
              message: "❌ Convert age_input not just any variable!",
              mistake: "wrong_variable"
            };
          }
          return { 
            valid: false, 
            message: "❌ Need to convert age_input using int()!",
            mistake: "missing_int_conversion"
          };
        }
        
        const tryIndex = trimmed.indexOf('try:');
        const intIndex = trimmed.indexOf('int(age_input)');
        if (tryIndex > intIndex) {
          return { 
            valid: false, 
            message: "❌ Converting BEFORE try block defeats the purpose! Put int() inside try:",
            mistake: "conversion_before_try"
          };
        }
        
        if (!trimmed.includes('except ValueError:')) {
          if (trimmed.includes('except:')) {
            return { 
              valid: false, 
              message: "❌ Too broad! Specify except ValueError: for number conversion errors",
              mistake: "generic_except"
            };
          }
          if (trimmed.includes('except TypeError:')) {
            return { 
              valid: false, 
              message: "❌ Wrong error type! Use ValueError not TypeError for conversion",
              mistake: "wrong_exception_type"
            };
          }
          return { 
            valid: false, 
            message: "❌ Missing except ValueError: to catch conversion errors!",
            mistake: "missing_except"
          };
        }
        
        if (!trimmed.includes("print('Valid age')")) {
          return { 
            valid: false, 
            message: "❌ Missing print('Valid age') in try block!",
            mistake: "missing_success_message"
          };
        }
        
        if (!trimmed.includes("print('Must be a number')")) {
          return { 
            valid: false, 
            message: "❌ Missing print('Must be a number') in except block!",
            mistake: "missing_error_message"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You handled conversion errors with try/except!" };
      }
    },
    
    {
      id: 2,
      title: "try/except with float",
      difficulty: "Beginner",
      points: 13,
      description: "Get GPA from input. Try converting to float. Print the GPA if successful, 'Invalid GPA' if it fails.",
      scenario: "GPA entry must be numeric decimal.",
      
      skeleton: `gpa_input = input()
try:
    gpa = _____(gpa_input)
    print(f'GPA: {_____}')
except ValueError:
    print('Invalid GPA')`,
      
      hint: "Use float() instead of int() for decimals",
      
      solution: `gpa_input = input()
try:
    gpa = float(gpa_input)
    print(f'GPA: {gpa}')
except ValueError:
    print('Invalid GPA')`,
      
      commonMistakes: [
        "Using int() instead of float() (loses decimal)",
        "Not printing the actual value on success",
        "Converting before try (crashes on invalid input)",
        "Missing colon after except ValueError",
        "Using except Exception: (too broad)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('try:')) {
          return { 
            valid: false, 
            message: "❌ Need try: block to handle errors!",
            mistake: "missing_try"
          };
        }
        
        if (!trimmed.includes('float(gpa_input)')) {
          if (trimmed.includes('int(gpa_input)')) {
            return { 
              valid: false, 
              message: "❌ Use float() not int()! GPAs have decimals (3.8 not 3)",
              mistake: "using_int_not_float"
            };
          }
          return { 
            valid: false, 
            message: "❌ Need to convert gpa_input using float()!",
            mistake: "missing_float_conversion"
          };
        }
        
        if (!trimmed.includes('except ValueError:')) {
          return { 
            valid: false, 
            message: "❌ Need except ValueError: to catch conversion errors!",
            mistake: "missing_except"
          };
        }
        
        if (!trimmed.includes("print(f'GPA: {gpa}')") && !trimmed.includes('print(f"GPA: {gpa}")')) {
          if (!trimmed.includes('{gpa}')) {
            return { 
              valid: false, 
              message: "❌ Must print the GPA value! Use f'GPA: {gpa}'",
              mistake: "not_printing_value"
            };
          }
          return { 
            valid: false, 
            message: "❌ Use f-string format: print(f'GPA: {gpa}')",
            mistake: "wrong_format"
          };
        }
        
        if (!trimmed.includes("print('Invalid GPA')")) {
          return { 
            valid: false, 
            message: "❌ Missing print('Invalid GPA') in except block!",
            mistake: "missing_error_message"
          };
        }
        
        return { valid: true, message: "✅ Excellent! You validated decimal input with try/except!" };
      }
    },
    
    {
      id: 3,
      title: "Multiple except blocks",
      difficulty: "Intermediate",
      points: 14,
      description: "Get two numbers and divide them. Handle ValueError for non-numeric and ZeroDivisionError for division by zero. Print result or appropriate error.",
      scenario: "Calculator needs to handle both invalid input and division by zero.",
      
      skeleton: `num1 = input()
num2 = input()
try:
    n1 = _____(num1)
    n2 = _____(num2)
    result = n1 ___ n2
    print(f'Result: {_____}')
except _____:
    print('Must be numbers')
except _____:
    print('Cannot divide by zero')`,
      
      hint: "Two separate except blocks - ValueError first, then ZeroDivisionError",
      
      solution: `num1 = input()
num2 = input()
try:
    n1 = float(num1)
    n2 = float(num2)
    result = n1 / n2
    print(f'Result: {result}')
except ValueError:
    print('Must be numbers')
except ZeroDivisionError:
    print('Cannot divide by zero')`,
      
      commonMistakes: [
        "Only one except block (doesn't catch all errors)",
        "Wrong order of except blocks (order can matter for some errors)",
        "Using int() instead of float() (less flexible)",
        "Doing division before conversion (wrong order)",
        "Single except for both errors (less specific messaging)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('try:')) {
          return { 
            valid: false, 
            message: "❌ Need try: block!",
            mistake: "missing_try"
          };
        }
        
        if (!trimmed.includes('float(num1)') || !trimmed.includes('float(num2)')) {
          return { 
            valid: false, 
            message: "❌ Must convert both num1 and num2 using float()!",
            mistake: "missing_conversions"
          };
        }
        
        if (!trimmed.includes('n1 / n2')) {
          return { 
            valid: false, 
            message: "❌ Need to divide: result = n1 / n2",
            mistake: "missing_division"
          };
        }
        
        const divIndex = trimmed.indexOf('n1 / n2');
        const convertIndex = Math.max(trimmed.indexOf('float(num1)'), trimmed.indexOf('float(num2)'));
        if (divIndex < convertIndex) {
          return { 
            valid: false, 
            message: "❌ Convert numbers BEFORE dividing them!",
            mistake: "division_before_conversion"
          };
        }
        
        if (!trimmed.includes('except ValueError:')) {
          return { 
            valid: false, 
            message: "❌ Need except ValueError: to catch conversion errors!",
            mistake: "missing_valueerror"
          };
        }
        
        if (!trimmed.includes('except ZeroDivisionError:')) {
          return { 
            valid: false, 
            message: "❌ Need except ZeroDivisionError: to catch division by zero!",
            mistake: "missing_zerodivisionerror"
          };
        }
        
        if (!trimmed.includes("print('Must be numbers')")) {
          return { 
            valid: false, 
            message: "❌ Missing print('Must be numbers') message!",
            mistake: "missing_valueerror_message"
          };
        }
        
        if (!trimmed.includes("print('Cannot divide by zero')")) {
          return { 
            valid: false, 
            message: "❌ Missing print('Cannot divide by zero') message!",
            mistake: "missing_zero_message"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You handled multiple error types!" };
      }
    },
    
    {
      id: 4,
      title: "try/except in while loop",
      difficulty: "Intermediate",
      points: 14,
      description: "Use while True loop. Get age, try converting to int. If valid and >= 18, break. If ValueError, print error and continue. If < 18, print error and continue.",
      scenario: "Age verification loop - keep asking until valid adult age entered.",
      
      skeleton: `while True:
    age_input = input()
    try:
        age = _____(age_input)
        if age ___ 18:
            print('Valid adult age')
            _____
        else:
            print('Must be 18+')
    except _____:
        print('Must be a number')`,
      
      hint: "Convert to int in try block, check age in try block after conversion, break on success",
      
      solution: `while True:
    age_input = input()
    try:
        age = int(age_input)
        if age >= 18:
            print('Valid adult age')
            break
        else:
            print('Must be 18+')
    except ValueError:
        print('Must be a number')`,
      
      commonMistakes: [
        "Checking age before converting (wrong order!)",
        "Missing break (infinite loop!)",
        "Putting age check in except block (wrong logic)",
        "Using > instead of >= (18 should be valid!)",
        "Breaking on invalid age (should continue asking)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('while True:')) {
          return { 
            valid: false, 
            message: "❌ Need while True: loop to keep asking!",
            mistake: "missing_while_true"
          };
        }
        
        if (!trimmed.includes('try:')) {
          return { 
            valid: false, 
            message: "❌ Need try: block inside the loop!",
            mistake: "missing_try"
          };
        }
        
        if (!trimmed.includes('int(age_input)')) {
          return { 
            valid: false, 
            message: "❌ Must convert age_input using int()!",
            mistake: "missing_conversion"
          };
        }
        
        if (!trimmed.includes('if age >= 18:')) {
          if (trimmed.includes('if age > 18:')) {
            return { 
              valid: false, 
              message: "❌ Age 18 should be valid! Use >= not >",
              mistake: "wrong_comparison"
            };
          }
          return { 
            valid: false, 
            message: "❌ Need to check if age >= 18!",
            mistake: "missing_age_check"
          };
        }
        
        const ageCheckIndex = trimmed.indexOf('if age >= 18:');
        const convertIndex = trimmed.indexOf('int(age_input)');
        if (ageCheckIndex < convertIndex) {
          return { 
            valid: false, 
            message: "❌ Convert to int BEFORE checking age value!",
            mistake: "check_before_conversion"
          };
        }
        
        if (!trimmed.includes('break')) {
          return { 
            valid: false, 
            message: "❌ Missing break! Loop will never end on valid input!",
            mistake: "missing_break"
          };
        }
        
        if (!trimmed.includes('except ValueError:')) {
          return { 
            valid: false, 
            message: "❌ Need except ValueError: to handle non-numeric input!",
            mistake: "missing_except"
          };
        }
        
        if (!trimmed.includes("print('Valid adult age')")) {
          return { 
            valid: false, 
            message: "❌ Missing success message!",
            mistake: "missing_success_message"
          };
        }
        
        return { valid: true, message: "✅ Excellent! You created a validation loop with error handling!" };
      }
    },
    
    {
      id: 5,
      title: "Complete validation with try/except",
      difficulty: "Advanced",
      points: 17,
      description: "Get credits. Must be a number AND between 1-20. Use try/except for conversion, then if/elif for range. Print specific error for each issue or 'Valid credits'.",
      scenario: "Credit registration - verify numeric and within allowed range.",
      
      skeleton: `credits_input = input()
try:
    credits = _____(credits_input)
    if credits ___ 1:
        print('Minimum 1 credit')
    elif credits ___ 20:
        print('Maximum 20 credits')
    else:
        print('Valid credits')
except _____:
    print('Must be a number')`,
      
      hint: "Convert in try, validate range in if/elif after successful conversion",
      
      solution: `credits_input = input()
try:
    credits = int(credits_input)
    if credits < 1:
        print('Minimum 1 credit')
    elif credits > 20:
        print('Maximum 20 credits')
    else:
        print('Valid credits')
except ValueError:
    print('Must be a number')`,
      
      commonMistakes: [
        "Checking range before converting (crashes on invalid input!)",
        "Using <= or >= in wrong direction",
        "Not handling all three cases (too low, too high, valid)",
        "Using 'and' to combine conditions (gives wrong error messages)",
        "Putting range checks in except block (wrong structure)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('try:')) {
          return { 
            valid: false, 
            message: "❌ Need try: block to handle conversion errors!",
            mistake: "missing_try"
          };
        }
        
        if (!trimmed.includes('int(credits_input)')) {
          return { 
            valid: false, 
            message: "❌ Must convert credits_input using int()!",
            mistake: "missing_conversion"
          };
        }
        
        if (!trimmed.includes('if credits < 1:')) {
          if (trimmed.includes('if credits <= 1:')) {
            return { 
              valid: false, 
              message: "❌ 1 credit IS valid! Use < not <=",
              mistake: "wrong_minimum_operator"
            };
          }
          return { 
            valid: false, 
            message: "❌ Need to check if credits < 1 for minimum!",
            mistake: "missing_minimum_check"
          };
        }
        
        if (!trimmed.includes('elif credits > 20:')) {
          if (trimmed.includes('elif credits >= 20:')) {
            return { 
              valid: false, 
              message: "❌ 20 credits IS valid! Use > not >=",
              mistake: "wrong_maximum_operator"
            };
          }
          if (trimmed.includes('if credits > 20:')) {
            return { 
              valid: false, 
              message: "❌ Use elif for second condition, not separate if!",
              mistake: "using_if_not_elif"
            };
          }
          return { 
            valid: false, 
            message: "❌ Need elif credits > 20: for maximum check!",
            mistake: "missing_maximum_check"
          };
        }
        
        const rangeCheckIndex = Math.min(
          trimmed.indexOf('if credits < 1:'),
          trimmed.indexOf('elif credits > 20:')
        );
        const convertIndex = trimmed.indexOf('int(credits_input)');
        if (rangeCheckIndex < convertIndex) {
          return { 
            valid: false, 
            message: "❌ Convert FIRST, then check range! Can't check credits before converting!",
            mistake: "range_check_before_conversion"
          };
        }
        
        if (!trimmed.includes('except ValueError:')) {
          return { 
            valid: false, 
            message: "❌ Need except ValueError: to catch conversion errors!",
            mistake: "missing_except"
          };
        }
        
        if (!trimmed.includes("print('Minimum 1 credit')")) {
          return { 
            valid: false, 
            message: "❌ Missing minimum credit error message!",
            mistake: "missing_min_message"
          };
        }
        
        if (!trimmed.includes("print('Maximum 20 credits')")) {
          return { 
            valid: false, 
            message: "❌ Missing maximum credit error message!",
            mistake: "missing_max_message"
          };
        }
        
        if (!trimmed.includes("print('Valid credits')")) {
          return { 
            valid: false, 
            message: "❌ Missing success message in else block!",
            mistake: "missing_success_message"
          };
        }
        
        return { valid: true, message: "✅ Outstanding! You combined try/except with range validation!" };
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
    
    if (result.valid && !completedExercises.has(currentExercise)) {
      const newCompleted = new Set(completedExercises);
      newCompleted.add(currentExercise);
      setCompletedExercises(newCompleted);
      setScore(score + currentEx.points);
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

  const totalPoints = exercises.reduce((sum, ex) => sum + ex.points, 0);
  const progressPercent = (score / totalPoints) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-red-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tool 3C: Try/Except Pattern</h1>
              <p className="text-rose-100 text-lg">Master error handling with try/except blocks • 70 points total</p>
            </div>
            <Trophy className="w-16 h-16 text-rose-200" />
          </div>
          
          {/* Progress Bar */}
          <div className="bg-rose-800 bg-opacity-30 rounded-full h-8 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-rose-300 to-red-200 h-full flex items-center justify-center font-bold text-rose-900 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            >
              {score > 0 && `${score}/${totalPoints} pts`}
            </div>
          </div>
        </div>

        {/* Exercise Navigation */}
        <div className="mb-8">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {exercises.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => {
                  setCurrentExercise(idx);
                  setUserAnswer('');
                  setFeedback(null);
                  setShowHint(false);
                  setShowSolution(false);
                  setMode('full');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  currentExercise === idx
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg'
                    : completedExercises.has(idx)
                    ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {completedExercises.has(idx) && <CheckCircle2 className="w-4 h-4" />}
                <span>Ex {ex.id}</span>
                <span className="text-xs opacity-75">({ex.points}pts)</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Instructions */}
          <div className="space-y-6">
            {/* Exercise Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentEx.title}</h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                      {currentEx.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      {currentEx.points} points
                    </span>
                  </div>
                </div>
                <Book className="w-8 h-8 text-rose-500" />
              </div>

              <div className="bg-rose-50 border-l-4 border-rose-500 p-4 mb-4 rounded">
                <p className="text-sm text-rose-800 font-medium mb-2">📚 Scenario:</p>
                <p className="text-rose-900">{currentEx.scenario}</p>
              </div>

              <div className="prose max-w-none mb-4">
                <p className="text-gray-700 text-lg leading-relaxed">{currentEx.description}</p>
              </div>

              {/* Common Mistakes */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="font-bold text-red-900">Common Mistakes to Avoid:</h3>
                </div>
                <ul className="space-y-1 text-sm text-red-900">
                  {currentEx.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hint Toggle */}
              <div className="mb-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium"
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
                  className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium"
                >
                  {showSolution ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
                {showSolution && (
                  <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <pre className="text-sm font-mono text-red-900 whitespace-pre-wrap">{currentEx.solution}</pre>
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
                        ? 'bg-rose-500 text-white'
                        : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                    }`}
                  >
                    <Code className="w-4 h-4 inline mr-1" />
                    Skeleton
                  </button>
                  <button
                    onClick={clearAnswer}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all resize-y"
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
                className="w-full p-4 font-mono text-sm border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all resize-y"
                placeholder="Write your code here or click 'Skeleton' for guided practice..."
                spellCheck="false"
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCheckAnswer}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-red-600 text-white py-3 rounded-lg font-bold hover:from-rose-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
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
            <div className="bg-gradient-to-br from-rose-100 to-red-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-rose-900 mb-3">🔑 Try/Except Quick Reference</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-rose-700 font-mono">try:</code>
                  <p className="text-gray-700 mt-1">Code that might cause errors</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-rose-700 font-mono">except ValueError:</code>
                  <p className="text-gray-700 mt-1">Catches int/float conversion errors</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-rose-700 font-mono">except ZeroDivisionError:</code>
                  <p className="text-gray-700 mt-1">Catches division by zero</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-rose-700 font-mono">Validate AFTER conversion</code>
                  <p className="text-gray-700 mt-1">Convert in try, check range after</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-rose-700 font-mono">while True + break</code>
                  <p className="text-gray-700 mt-1">Retry loop pattern</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherEdLevel3CTryExceptPattern;
