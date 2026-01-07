import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Trophy, Target, Book, Code, Eye, EyeOff, Lightbulb, AlertTriangle, ChevronDown } from 'lucide-react';
import './PracticeTools.css';


const HigherEdLevel3ANumberValidation = () => {
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
      title: "Basic int() Conversion",
      difficulty: "Beginner",
      points: 12,
      conceptBox: {
        title: "Converting Strings to Numbers",
        content: "input() always returns a STRING. Use int() to convert to integer for math operations.",
        syntax: "age = int(input())\nprint(age + 1)",
        rule: "Convert BEFORE doing math! String '5' + 1 causes error. int('5') + 1 = 6."
      },
      description: "Get age from input. Convert it to an integer. Print the age.",
      scenario: "Student registration needs age as a number for eligibility checks.",
      
      skeleton: `age = _____(input())
print(age)`,
      
      hint: "Use int() to convert: age = int(input())",
      
      solution: `age = int(input())
print(age)`,
      
      commonMistakes: [
        "Not converting (keeps as string)",
        "Converting during print instead of storage (int(input()) but not saving)",
        "Using float() instead of int() (gives decimal when whole number needed)",
        "Trying to do math before converting",
        "Spelling int wrong (Int, INT)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('int(')) {
          return { 
            valid: false, 
            message: "❌ Need to convert to integer! Use int(input())",
            mistake: "not_converting"
          };
        }
        
        if (trimmed.includes('float(')) {
          return { 
            valid: false, 
            message: "❌ Use int() not float() for whole numbers!",
            mistake: "using_float"
          };
        }
        
        if (!trimmed.includes('age = int(input())')) {
          if (trimmed.includes('print(int(input()))')) {
            return { 
              valid: false, 
              message: "❌ Convert and STORE in age variable: age = int(input())",
              mistake: "not_storing"
            };
          }
          return { 
            valid: false, 
            message: "❌ Store converted value: age = int(input())",
            mistake: "wrong_conversion"
          };
        }
        
        if (!trimmed.includes('print(age)')) {
          return { 
            valid: false, 
            message: "❌ Print the age variable!",
            mistake: "missing_print"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You converted input to integer!" };
      }
    },
    
    {
      id: 2,
      title: "Range Check",
      difficulty: "Beginner",
      points: 13,
      conceptBox: {
        title: "Validating Numeric Ranges",
        content: "After converting to int, use if/elif to check if value is in valid range.",
        syntax: "age = int(input())\nif age < 18:\n    print('Too young')\nelif age > 65:\n    print('Too old')\nelse:\n    print('Valid')",
        rule: "Convert FIRST, then check range. Use if/elif/else for three outcomes."
      },
      description: "Get age from input. Convert to int. Check if between 18-65 (inclusive). Print 'Too young' if < 18, 'Too old' if > 65, 'Valid age' otherwise.",
      scenario: "Employment system checks working age eligibility.",
      
      skeleton: `age = _____(input())
if age ___ 18:
    print('Too young')
elif age ___ 65:
    print('Too old')
else:
    print('Valid age')`,
      
      hint: "Convert first: age = int(input()). Check age < 18 and age > 65.",
      
      solution: `age = int(input())
if age < 18:
    print('Too young')
elif age > 65:
    print('Too old')
else:
    print('Valid age')`,
      
      commonMistakes: [
        "Checking before converting (crashes on non-numeric input)",
        "Using <= or >= wrong direction",
        "Missing elif or else blocks",
        "Not converting at all",
        "Using 'and' to combine conditions (wrong logic)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('int(')) {
          return { 
            valid: false, 
            message: "❌ Convert to int first: age = int(input())",
            mistake: "not_converting"
          };
        }
        
        if (!trimmed.includes('age = int(input())')) {
          return { 
            valid: false, 
            message: "❌ Convert and store: age = int(input())",
            mistake: "wrong_storage"
          };
        }
        
        if (!trimmed.includes('if age < 18')) {
          return { 
            valid: false, 
            message: "❌ Check if too young: if age < 18:",
            mistake: "wrong_first_check"
          };
        }
        
        if (!trimmed.includes('elif')) {
          return { 
            valid: false, 
            message: "❌ Need elif for second condition!",
            mistake: "missing_elif"
          };
        }
        
        if (!trimmed.includes('elif age > 65')) {
          return { 
            valid: false, 
            message: "❌ Check if too old: elif age > 65:",
            mistake: "wrong_second_check"
          };
        }
        
        if (!trimmed.includes('else:')) {
          return { 
            valid: false, 
            message: "❌ Need else block for valid case!",
            mistake: "missing_else"
          };
        }
        
        return { valid: true, message: "✅ Excellent! Range validation mastered!" };
      }
    },
    
    {
      id: 3,
      title: "While Loop Validation",
      difficulty: "Intermediate",
      points: 14,
      conceptBox: {
        title: "Retry Until Valid Input",
        content: "Use while True loop. Try to convert and validate. If valid, break. If not, loop continues.",
        syntax: "while True:\n    age = int(input())\n    if age >= 0:\n        break\n    print('Invalid')",
        rule: "Convert inside loop. Check condition. break when valid. Loop repeats if invalid."
      },
      description: "Keep asking for age until user enters a valid number (>= 0). When valid, print 'Valid: X' where X is the age, then stop.",
      scenario: "Registration won't proceed until valid age is entered.",
      
      skeleton: `while True:
    age = _____(input())
    if age ___ 0:
        print(f'Valid: {_____}')
        _____
    else:
        print('Must be 0 or greater')`,
      
      hint: "Convert to int inside loop. Check if age >= 0. Use break to exit loop.",
      
      solution: `while True:
    age = int(input())
    if age >= 0:
        print(f'Valid: {age}')
        break
    else:
        print('Must be 0 or greater')`,
      
      commonMistakes: [
        "Missing break (infinite loop!)",
        "Converting before loop (only converts once)",
        "Using > instead of >= (0 should be valid)",
        "break outside if block (always exits immediately)",
        "Forgetting to print the valid age"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('while True:')) {
          return { 
            valid: false, 
            message: "❌ Need while True loop for retry logic!",
            mistake: "missing_while"
          };
        }
        
        if (!trimmed.includes('int(input())')) {
          return { 
            valid: false, 
            message: "❌ Convert to int inside loop: age = int(input())",
            mistake: "not_converting"
          };
        }
        
        if (!trimmed.includes('break')) {
          return { 
            valid: false, 
            message: "❌ Need break to exit loop when valid!",
            mistake: "missing_break"
          };
        }
        
        if (trimmed.includes('if age > 0') && !trimmed.includes('>=')) {
          return { 
            valid: false, 
            message: "❌ Use >= not >! Zero should be valid.",
            mistake: "wrong_operator"
          };
        }
        
        if (!trimmed.includes('if age >= 0')) {
          return { 
            valid: false, 
            message: "❌ Check if age >= 0",
            mistake: "wrong_condition"
          };
        }
        
        const breakLine = trimmed.split('\n').find(line => line.includes('break'));
        if (breakLine && !breakLine.includes('    ')) {
          return { 
            valid: false, 
            message: "❌ break must be INSIDE the if block (indented)!",
            mistake: "break_not_indented"
          };
        }
        
        return { valid: true, message: "✅ Perfect! Validation with retry mastered!" };
      }
    },
    
    {
      id: 4,
      title: "Multiple Conditions",
      difficulty: "Intermediate",
      points: 14,
      conceptBox: {
        title: "Checking Multiple Requirements",
        content: "Convert, then check EACH condition separately. Use if/elif for specific error messages.",
        syntax: "credits = int(input())\nif credits < 1:\n    print('Too few')\nelif credits > 20:\n    print('Too many')\nelse:\n    print('Valid')",
        rule: "Check minimum first, then maximum, then valid. Each gets specific message."
      },
      description: "Get credits from input. Convert to int. Must be 1-20 (inclusive). Print 'Minimum 1 credit' if < 1, 'Maximum 20 credits' if > 20, 'Valid credits' otherwise.",
      scenario: "Course registration validates credit load per semester.",
      
      skeleton: `credits = _____(input())
if credits ___ 1:
    print('Minimum 1 credit')
elif credits ___ 20:
    print('Maximum 20 credits')
else:
    print('Valid credits')`,
      
      hint: "Convert: credits = int(input()). Check credits < 1, then credits > 20.",
      
      solution: `credits = int(input())
if credits < 1:
    print('Minimum 1 credit')
elif credits > 20:
    print('Maximum 20 credits')
else:
    print('Valid credits')`,
      
      commonMistakes: [
        "Using 'and' to combine (gives generic error, not specific)",
        "Wrong operators (<= or >= instead of < and >)",
        "Checking maximum before minimum",
        "Not converting to int",
        "Missing elif or else"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('int(')) {
          return { 
            valid: false, 
            message: "❌ Convert to int: credits = int(input())",
            mistake: "not_converting"
          };
        }
        
        if (!trimmed.includes('credits = int(input())')) {
          return { 
            valid: false, 
            message: "❌ Store converted value: credits = int(input())",
            mistake: "wrong_storage"
          };
        }
        
        if (!trimmed.includes('if credits < 1')) {
          return { 
            valid: false, 
            message: "❌ Check minimum first: if credits < 1:",
            mistake: "wrong_min_check"
          };
        }
        
        if (!trimmed.includes('elif credits > 20')) {
          return { 
            valid: false, 
            message: "❌ Check maximum with elif: elif credits > 20:",
            mistake: "wrong_max_check"
          };
        }
        
        if (trimmed.includes('and')) {
          return { 
            valid: false, 
            message: "❌ Don't use 'and'! Use separate if/elif for specific error messages.",
            mistake: "using_and"
          };
        }
        
        if (!trimmed.includes('else:')) {
          return { 
            valid: false, 
            message: "❌ Need else block for valid case!",
            mistake: "missing_else"
          };
        }
        
        return { valid: true, message: "✅ Excellent! Multiple condition validation mastered!" };
      }
    },
    
    {
      id: 5,
      title: "Build Valid List",
      difficulty: "Advanced",
      points: 17,
      conceptBox: {
        title: "Collecting Valid Inputs",
        content: "Use while loop with counter. Get input, validate, if valid append and continue. Loop until you have enough.",
        syntax: "scores = []\nwhile len(scores) < 3:\n    num = int(input())\n    if num > 0:\n        scores.append(num)\n    else:\n        print('Invalid')",
        rule: "Loop while list too small. Validate BEFORE appending. Only valid items go in list."
      },
      description: "Collect exactly 3 positive integers from user. Keep asking until you have 3 VALID numbers (> 0). Print 'Invalid' for invalid inputs. After collecting 3, print the list.",
      scenario: "Quiz system needs 3 valid scores before calculating average.",
      
      skeleton: `scores = ___
while _____(scores) ___ 3:
    num = _____(input())
    if num ___ 0:
        scores._____(num)
    else:
        print('Invalid')
print(scores)`,
      
      hint: "Start with scores = []. Loop while len(scores) < 3. Validate num > 0 before appending.",
      
      solution: `scores = []
while len(scores) < 3:
    num = int(input())
    if num > 0:
        scores.append(num)
    else:
        print('Invalid')
print(scores)`,
      
      commonMistakes: [
        "Appending before validation (invalid numbers get in!)",
        "Using while True without proper exit (infinite loop)",
        "Not initializing empty list",
        "Using >= instead of > (0 should be invalid)",
        "Forgetting to convert to int"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('scores = []')) {
          return { 
            valid: false, 
            message: "❌ Initialize empty list: scores = []",
            mistake: "missing_empty_list"
          };
        }
        
        if (!trimmed.includes('while len(scores) < 3')) {
          return { 
            valid: false, 
            message: "❌ Loop while list is too small: while len(scores) < 3:",
            mistake: "wrong_loop_condition"
          };
        }
        
        if (!trimmed.includes('int(input())')) {
          return { 
            valid: false, 
            message: "❌ Convert to int: num = int(input())",
            mistake: "not_converting"
          };
        }
        
        if (!trimmed.includes('if num > 0')) {
          return { 
            valid: false, 
            message: "❌ Check if positive: if num > 0:",
            mistake: "wrong_validation"
          };
        }
        
        // Check that append comes AFTER the if check
        const lines = trimmed.split('\n');
        let ifLineIndex = -1;
        let appendLineIndex = -1;
        
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('if num > 0')) {
            ifLineIndex = i;
          }
          if (lines[i].includes('scores.append(num)')) {
            appendLineIndex = i;
          }
        }
        
        if (appendLineIndex < ifLineIndex) {
          return { 
            valid: false, 
            message: "❌ Append INSIDE the if block (after validation)! Invalid numbers shouldn't be added.",
            mistake: "appending_before_validation"
          };
        }
        
        if (!trimmed.includes('scores.append(num)')) {
          return { 
            valid: false, 
            message: "❌ Append valid numbers: scores.append(num)",
            mistake: "not_appending"
          };
        }
        
        if (!trimmed.includes('print(scores)')) {
          return { 
            valid: false, 
            message: "❌ Print the final list!",
            mistake: "missing_print"
          };
        }
        
        return { valid: true, message: "✅ Perfect! Building validated lists mastered!" };
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tool 3A: Number Validation</h1>
              <p className="text-blue-100 text-lg">Validate numeric input with error handling</p>
            </div>
            <Trophy className="w-16 h-16 text-yellow-300" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-blue-100 text-sm">Your Score</div>
              <div className="text-3xl font-bold">{score} / {totalPoints}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-blue-100 text-sm">Progress</div>
              <div className="text-3xl font-bold">{completedExercises.size} / {exercises.length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-blue-100 text-sm">Current Exercise</div>
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
            className="px-6 py-3 bg-white rounded-lg shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all resize-y"
          >
            ← Previous
          </button>
          <button
            onClick={nextExercise}
            disabled={currentExercise === exercises.length - 1}
            className="px-6 py-3 bg-white rounded-lg shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all resize-y"
          >
            Next →
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Instructions */}
          <div className="space-y-6">
            {/* Concept Box */}
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-300 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Book className="w-6 h-6 text-blue-700" />
                <h3 className="text-xl font-bold text-blue-900">{currentEx.conceptBox.title}</h3>
              </div>
              <p className="text-blue-900 mb-3">{currentEx.conceptBox.content}</p>
              <div className="bg-white bg-opacity-50 p-3 rounded-lg mb-2">
                <code className="text-blue-700 font-mono text-sm whitespace-pre-wrap">{currentEx.conceptBox.syntax}</code>
              </div>
              <p className="text-sm text-blue-800 font-medium">💡 {currentEx.conceptBox.rule}</p>
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
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                      {currentEx.points} points
                    </span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>

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

              <div className="prose max-w-none mb-4">
                <p className="text-gray-700 text-lg leading-relaxed">{currentEx.description}</p>
              </div>

              {/* Common Mistakes */}
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-cyan-600" />
                  <h3 className="font-bold text-cyan-900">Common Mistakes to Avoid:</h3>
                </div>
                <ul className="space-y-1 text-sm text-cyan-900">
                  {currentEx.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hint Toggle */}
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

              {/* Solution Toggle */}
              <div>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showSolution ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
                {showSolution && (
                  <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <pre className="text-sm font-mono text-blue-900 whitespace-pre-wrap">{currentEx.solution}</pre>
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
                className="w-full p-4 font-mono text-sm border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                placeholder="Write your code here or click 'Skeleton' for guided practice..."
                spellCheck="false"
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCheckAnswer}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-lg font-bold hover:from-blue-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
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
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">🔑 Number Validation Quick Reference</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-blue-700 font-mono">age = int(input())</code>
                  <p className="text-gray-700 mt-1">Convert string to integer</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-blue-700 font-mono">if value {'<'} min:</code>
                  <p className="text-gray-700 mt-1">Check minimum</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-blue-700 font-mono">elif value > max:</code>
                  <p className="text-gray-700 mt-1">Check maximum</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-blue-700 font-mono">while True: ... break</code>
                  <p className="text-gray-700 mt-1">Retry until valid</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-blue-700 font-mono">float() for decimals</code>
                  <p className="text-gray-700 mt-1">int() for whole numbers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherEdLevel3ANumberValidation;
