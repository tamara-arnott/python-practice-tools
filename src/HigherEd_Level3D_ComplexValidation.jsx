import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Trophy, Target, Book, Code, Eye, EyeOff, Lightbulb, AlertTriangle } from 'lucide-react';
import './PracticeTools.css';


const HigherEdLevel3DComplexValidation = () => {
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
      title: "Validate from list of options",
      difficulty: "Intermediate",
      points: 15,
      description: "Get major from input. Valid majors: ['CS', 'Math', 'Science', 'English']. Check if input is in list (case-sensitive). Print valid or invalid.",
      scenario: "Major selection must match available programs.",
      
      skeleton: `valid_majors = ['CS', 'Math', 'Science', 'English']
major = input()
if major ___ valid_majors:
    print('Valid major')
else:
    print('Invalid major')`,
      
      hint: "Use 'in' operator to check if major is in the list",
      
      solution: `valid_majors = ['CS', 'Math', 'Science', 'English']
major = input()
if major in valid_majors:
    print('Valid major')
else:
    print('Invalid major')`,
      
      commonMistakes: [
        "Using == to compare (wrong - compares to whole list)",
        "Checking backwards (valid_majors in major)",
        "Case-insensitive check when not requested",
        "Using 'or' with multiple comparisons (verbose)",
        "Not defining valid list first"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes("valid_majors = ['CS', 'Math', 'Science', 'English']")) {
          return { 
            valid: false, 
            message: "❌ Must define valid_majors list with exact values: ['CS', 'Math', 'Science', 'English']",
            mistake: "missing_list_definition"
          };
        }
        
        if (!trimmed.includes('major in valid_majors')) {
          if (trimmed.includes('valid_majors in major')) {
            return { 
              valid: false, 
              message: "❌ Backwards! Check if major in valid_majors (not valid_majors in major)",
              mistake: "backwards_in"
            };
          }
          if (trimmed.includes('major == valid_majors')) {
            return { 
              valid: false, 
              message: "❌ Can't use == to compare to list! Use 'in' operator: major in valid_majors",
              mistake: "using_equality"
            };
          }
          return { 
            valid: false, 
            message: "❌ Use 'in' operator to check membership: major in valid_majors",
            mistake: "missing_in_operator"
          };
        }
        
        if (!trimmed.includes("print('Valid major')")) {
          return { 
            valid: false, 
            message: "❌ Missing print('Valid major') message!",
            mistake: "missing_valid_message"
          };
        }
        
        if (!trimmed.includes("print('Invalid major')")) {
          return { 
            valid: false, 
            message: "❌ Missing print('Invalid major') message!",
            mistake: "missing_invalid_message"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You validated input against a list of options!" };
      }
    },
    
    {
      id: 2,
      title: "Email validation",
      difficulty: "Intermediate",
      points: 17,
      description: "Get email. Valid if: (1) contains '@', (2) contains '.', (3) length >= 5. Check all with 'and'. Print valid or 'Invalid email format'.",
      scenario: "Basic email format check with minimum length.",
      
      skeleton: `email = input()
if '@' ___ email ___ '.' ___ email ___ _____(email) ___ 5:
    print('Valid email')
else:
    print('Invalid email format')`,
      
      hint: "Combine three conditions with 'and': '@' in email and '.' in email and len(email) >= 5",
      
      solution: `email = input()
if '@' in email and '.' in email and len(email) >= 5:
    print('Valid email')
else:
    print('Invalid email format')`,
      
      commonMistakes: [
        "Using 'or' instead of 'and' (too permissive!)",
        "Only checking one or two conditions",
        "Using > instead of >= for length",
        "Wrong order of operations",
        "Not checking all three conditions"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes("'@' in email") && !trimmed.includes('"@" in email')) {
          return { 
            valid: false, 
            message: "❌ Must check if '@' in email!",
            mistake: "missing_at_check"
          };
        }
        
        if (!trimmed.includes("'.' in email") && !trimmed.includes('"." in email')) {
          return { 
            valid: false, 
            message: "❌ Must check if '.' in email!",
            mistake: "missing_dot_check"
          };
        }
        
        if (!trimmed.includes('len(email)')) {
          return { 
            valid: false, 
            message: "❌ Must check len(email) for minimum length!",
            mistake: "missing_length_check"
          };
        }
        
        if (!trimmed.includes('>= 5')) {
          if (trimmed.includes('> 5')) {
            return { 
              valid: false, 
              message: "❌ Use >= not > (5 characters should be valid!)",
              mistake: "wrong_length_operator"
            };
          }
          return { 
            valid: false, 
            message: "❌ Check if len(email) >= 5!",
            mistake: "missing_length_comparison"
          };
        }
        
        // Check for 'and' operators (should have 2)
        const andCount = (trimmed.match(/\sand\s/g) || []).length;
        if (andCount < 2) {
          if (trimmed.includes(' or ')) {
            return { 
              valid: false, 
              message: "❌ Use 'and' not 'or'! ALL three conditions must be true!",
              mistake: "using_or"
            };
          }
          return { 
            valid: false, 
            message: "❌ Combine all three conditions with 'and'!",
            mistake: "missing_and"
          };
        }
        
        if (!trimmed.includes("print('Valid email')")) {
          return { 
            valid: false, 
            message: "❌ Missing print('Valid email') message!",
            mistake: "missing_valid_message"
          };
        }
        
        if (!trimmed.includes("print('Invalid email format')")) {
          return { 
            valid: false, 
            message: "❌ Missing print('Invalid email format') message!",
            mistake: "missing_invalid_message"
          };
        }
        
        return { valid: true, message: "✅ Excellent! You combined multiple validation conditions!" };
      }
    },
    
    {
      id: 3,
      title: "Password strength",
      difficulty: "Intermediate",
      points: 17,
      description: "Get password. Valid if: (1) length >= 8, (2) has a digit, (3) has a letter. Use .isdigit() and .isalpha() in a loop to check. Print valid or specific error.",
      scenario: "Password must meet security requirements.",
      
      skeleton: `password = input()
has_digit = False
has_letter = False
for char in _____:
    if char._____:
        has_digit = True
    if char._____:
        has_letter = True
if _____(password) ___ 8:
    print('Too short')
elif ___ has_digit:
    print('Needs a digit')
elif ___ has_letter:
    print('Needs a letter')
else:
    print('Valid password')`,
      
      hint: "Loop through password chars, check each with .isdigit() and .isalpha(), set flags to True",
      
      solution: `password = input()
has_digit = False
has_letter = False
for char in password:
    if char.isdigit():
        has_digit = True
    if char.isalpha():
        has_letter = True
if len(password) < 8:
    print('Too short')
elif not has_digit:
    print('Needs a digit')
elif not has_letter:
    print('Needs a letter')
else:
    print('Valid password')`,
      
      commonMistakes: [
        "Checking length after other checks (wrong order!)",
        "Using 'and' to combine flags (gives wrong errors)",
        "Forgetting 'not' in elif conditions",
        "Using elif for flag settings (use if for both!)",
        "Not initializing flags to False"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('has_digit = False') || !trimmed.includes('has_letter = False')) {
          return { 
            valid: false, 
            message: "❌ Must initialize both flags: has_digit = False and has_letter = False",
            mistake: "missing_flag_initialization"
          };
        }
        
        if (!trimmed.includes('for char in password:')) {
          return { 
            valid: false, 
            message: "❌ Need to loop through password characters: for char in password:",
            mistake: "missing_loop"
          };
        }
        
        if (!trimmed.includes('char.isdigit()')) {
          return { 
            valid: false, 
            message: "❌ Use char.isdigit() to check for digits!",
            mistake: "missing_isdigit"
          };
        }
        
        if (!trimmed.includes('char.isalpha()')) {
          return { 
            valid: false, 
            message: "❌ Use char.isalpha() to check for letters!",
            mistake: "missing_isalpha"
          };
        }
        
        if (!trimmed.includes('if len(password) < 8:')) {
          if (trimmed.includes('len(password) > 8') || trimmed.includes('len(password) >= 8')) {
            return { 
              valid: false, 
              message: "❌ Check if too SHORT: len(password) < 8",
              mistake: "wrong_length_operator"
            };
          }
          return { 
            valid: false, 
            message: "❌ Check length FIRST: if len(password) < 8:",
            mistake: "missing_length_check"
          };
        }
        
        if (!trimmed.includes('elif not has_digit:')) {
          return { 
            valid: false, 
            message: "❌ Check if missing digit: elif not has_digit:",
            mistake: "missing_digit_check"
          };
        }
        
        if (!trimmed.includes('elif not has_letter:')) {
          return { 
            valid: false, 
            message: "❌ Check if missing letter: elif not has_letter:",
            mistake: "missing_letter_check"
          };
        }
        
        if (!trimmed.includes("print('Too short')")) {
          return { 
            valid: false, 
            message: "❌ Missing print('Too short') message!",
            mistake: "missing_short_message"
          };
        }
        
        if (!trimmed.includes("print('Valid password')")) {
          return { 
            valid: false, 
            message: "❌ Missing print('Valid password') in else block!",
            mistake: "missing_valid_message"
          };
        }
        
        return { valid: true, message: "✅ Outstanding! You validated password strength with flags!" };
      }
    },
    
    {
      id: 4,
      title: "Build list with validation",
      difficulty: "Advanced",
      points: 18,
      description: "Use while True to get 3 student names. Each name must be non-empty after .strip(). Add valid names to list. When 3 collected, break and print list.",
      scenario: "Collect team of 3 students - all names required.",
      
      skeleton: `team = []
while _____(team) ___ 3:
    name = input()
    name = name._____()
    if name ___ '':
        team._____(name)
    else:
        print('Name required')
print(team)`,
      
      hint: "while len(team) < 3:, strip input, append if not empty",
      
      solution: `team = []
while len(team) < 3:
    name = input()
    name = name.strip()
    if name != '':
        team.append(name)
    else:
        print('Name required')
print(team)`,
      
      commonMistakes: [
        "Using while True with manual counter (works but clunky)",
        "Not using .strip() (accepts spaces as valid)",
        "Checking before stripping",
        "Using break instead of counting in while condition",
        "Appending before validation"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('team = []')) {
          return { 
            valid: false, 
            message: "❌ Must initialize empty list: team = []",
            mistake: "missing_list_init"
          };
        }
        
        if (!trimmed.includes('while len(team) < 3:')) {
          if (trimmed.includes('while True:')) {
            return { 
              valid: false, 
              message: "❌ Use while len(team) < 3: instead of while True (more elegant!)",
              mistake: "using_while_true"
            };
          }
          return { 
            valid: false, 
            message: "❌ Loop while list has fewer than 3 items: while len(team) < 3:",
            mistake: "missing_while_condition"
          };
        }
        
        if (!trimmed.includes('name.strip()')) {
          return { 
            valid: false, 
            message: "❌ Must use .strip() to remove leading/trailing spaces!",
            mistake: "missing_strip"
          };
        }
        
        if (!trimmed.includes("if name != '':")) {
          if (trimmed.includes("if name == '':")) {
            return { 
              valid: false, 
              message: "❌ Backwards logic! Use != to check non-empty",
              mistake: "backwards_logic"
            };
          }
          return { 
            valid: false, 
            message: "❌ Check if name is NOT empty: if name != '':",
            mistake: "missing_empty_check"
          };
        }
        
        if (!trimmed.includes('team.append(name)')) {
          return { 
            valid: false, 
            message: "❌ Must append valid name to list: team.append(name)",
            mistake: "missing_append"
          };
        }
        
        // Check that append is AFTER validation
        const ifIndex = trimmed.indexOf("if name != '':");
        const appendIndex = trimmed.indexOf('team.append(name)');
        if (appendIndex < ifIndex) {
          return { 
            valid: false, 
            message: "❌ Append AFTER validation (inside the if block)!",
            mistake: "append_before_validation"
          };
        }
        
        if (!trimmed.includes("print('Name required')")) {
          return { 
            valid: false, 
            message: "❌ Missing print('Name required') in else block!",
            mistake: "missing_error_message"
          };
        }
        
        if (!trimmed.includes('print(team)')) {
          return { 
            valid: false, 
            message: "❌ Must print the final team list!",
            mistake: "missing_final_print"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You built a validated list with a loop!" };
      }
    },
    
    {
      id: 5,
      title: "Multi-field registration",
      difficulty: "Advanced",
      points: 18,
      description: "Get name (non-empty), student ID (7 digits with .isdigit()), email (has @ and .). All must be valid. Create dict with all three. Print the dict.",
      scenario: "Complete student registration with multiple validated fields.",
      
      skeleton: `# Get and validate name
name = input()
name = name._____()
if name ___ '':
    # Get and validate ID
    student_id = input()
    if _____(student_id) ___ 7 ___ student_id._____:
        # Get and validate email
        email = input()
        if '@' ___ email ___ '.' ___ email:
            student = {_____: _____, _____: _____, _____: _____}
            print(student)
        else:
            print('Invalid email')
    else:
        print('Invalid ID')
else:
    print('Name required')`,
      
      hint: "Nested if statements - validate each field before moving to next",
      
      solution: `# Get and validate name
name = input()
name = name.strip()
if name != '':
    # Get and validate ID
    student_id = input()
    if len(student_id) == 7 and student_id.isdigit():
        # Get and validate email
        email = input()
        if '@' in email and '.' in email:
            student = {'name': name, 'id': student_id, 'email': email}
            print(student)
        else:
            print('Invalid email')
    else:
        print('Invalid ID')
else:
    print('Name required')`,
      
      commonMistakes: [
        "Getting all input before validating (wrong - validate each step)",
        "Using == 7 without 'and' .isdigit() (doesn't check if digits)",
        "Not nesting if statements (wrong structure)",
        "Creating dict before all validated",
        "Using try/except when not needed"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('name.strip()')) {
          return { 
            valid: false, 
            message: "❌ Must strip the name: name = name.strip()",
            mistake: "missing_strip"
          };
        }
        
        if (!trimmed.includes("if name != '':")) {
          return { 
            valid: false, 
            message: "❌ Check if name is not empty: if name != '':",
            mistake: "missing_name_check"
          };
        }
        
        if (!trimmed.includes('len(student_id) == 7')) {
          return { 
            valid: false, 
            message: "❌ Check if ID is exactly 7 characters: len(student_id) == 7",
            mistake: "missing_length_check"
          };
        }
        
        if (!trimmed.includes('student_id.isdigit()')) {
          return { 
            valid: false, 
            message: "❌ Check if ID is all digits: student_id.isdigit()",
            mistake: "missing_isdigit"
          };
        }
        
        if (!trimmed.includes('and')) {
          return { 
            valid: false, 
            message: "❌ Combine ID checks with 'and': len(student_id) == 7 and student_id.isdigit()",
            mistake: "missing_and"
          };
        }
        
        if (!trimmed.includes("'@' in email") && !trimmed.includes('"@" in email')) {
          return { 
            valid: false, 
            message: "❌ Check if email contains '@': '@' in email",
            mistake: "missing_at_check"
          };
        }
        
        if (!trimmed.includes("'.' in email") && !trimmed.includes('"." in email')) {
          return { 
            valid: false, 
            message: "❌ Check if email contains '.': '.' in email",
            mistake: "missing_dot_check"
          };
        }
        
        if (!trimmed.includes("'name': name") && !trimmed.includes('"name": name')) {
          return { 
            valid: false, 
            message: "❌ Dictionary must include 'name': name",
            mistake: "missing_name_in_dict"
          };
        }
        
        if (!trimmed.includes("'id': student_id") && !trimmed.includes('"id": student_id')) {
          return { 
            valid: false, 
            message: "❌ Dictionary must include 'id': student_id",
            mistake: "missing_id_in_dict"
          };
        }
        
        if (!trimmed.includes("'email': email") && !trimmed.includes('"email": email')) {
          return { 
            valid: false, 
            message: "❌ Dictionary must include 'email': email",
            mistake: "missing_email_in_dict"
          };
        }
        
        if (!trimmed.includes('print(student)')) {
          return { 
            valid: false, 
            message: "❌ Must print the student dictionary!",
            mistake: "missing_print"
          };
        }
        
        if (!trimmed.includes("print('Invalid email')")) {
          return { 
            valid: false, 
            message: "❌ Missing email error message!",
            mistake: "missing_email_error"
          };
        }
        
        if (!trimmed.includes("print('Invalid ID')")) {
          return { 
            valid: false, 
            message: "❌ Missing ID error message!",
            mistake: "missing_id_error"
          };
        }
        
        if (!trimmed.includes("print('Name required')")) {
          return { 
            valid: false, 
            message: "❌ Missing name error message!",
            mistake: "missing_name_error"
          };
        }
        
        return { valid: true, message: "✅ Incredible! You built a complete multi-field validation system!" };
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tool 3D: Complex Validation</h1>
              <p className="text-sky-100 text-lg">Master advanced validation patterns • 85 points total</p>
            </div>
            <Trophy className="w-16 h-16 text-sky-200" />
          </div>
          
          {/* Progress Bar */}
          <div className="bg-sky-800 bg-opacity-30 rounded-full h-8 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-sky-300 to-blue-200 h-full flex items-center justify-center font-bold text-sky-900 transition-all duration-500"
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
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg'
                    : completedExercises.has(idx)
                    ? 'bg-sky-100 text-sky-700 hover:bg-sky-200'
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
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                      {currentEx.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {currentEx.points} points
                    </span>
                  </div>
                </div>
                <Book className="w-8 h-8 text-sky-500" />
              </div>

              <div className="bg-sky-50 border-l-4 border-sky-500 p-4 mb-4 rounded">
                <p className="text-sm text-sky-800 font-medium mb-2">📚 Scenario:</p>
                <p className="text-sky-900">{currentEx.scenario}</p>
              </div>

              <div className="prose max-w-none mb-4">
                <p className="text-gray-700 text-lg leading-relaxed">{currentEx.description}</p>
              </div>

              {/* Common Mistakes */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900">Common Mistakes to Avoid:</h3>
                </div>
                <ul className="space-y-1 text-sm text-blue-900">
                  {currentEx.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hint Toggle */}
              <div className="mb-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium"
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
                  className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium"
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
                        ? 'bg-sky-500 text-white'
                        : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
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
                className="w-full p-4 font-mono text-sm border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all resize-y"
                placeholder="Write your code here or click 'Skeleton' for guided practice..."
                spellCheck="false"
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCheckAnswer}
                  className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-sky-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
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
            <div className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-sky-900 mb-3">🔑 Complex Validation Quick Reference</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-sky-700 font-mono">'item' in list</code>
                  <p className="text-gray-700 mt-1">Check membership in list</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-sky-700 font-mono">'@' in email</code>
                  <p className="text-gray-700 mt-1">Check for character</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-sky-700 font-mono">len(text) >= 5</code>
                  <p className="text-gray-700 mt-1">Minimum length check</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-sky-700 font-mono">.isdigit() / .isalpha()</code>
                  <p className="text-gray-700 mt-1">Character type checking</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-sky-700 font-mono">Use 'and' for ALL true</code>
                  <p className="text-gray-700 mt-1">Combine multiple conditions</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-sky-700 font-mono">Nested if statements</code>
                  <p className="text-gray-700 mt-1">Sequential validation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherEdLevel3DComplexValidation;
