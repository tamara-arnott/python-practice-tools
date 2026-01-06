import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Trophy, Target, Book, Code, Eye, EyeOff, Lightbulb, AlertTriangle } from 'lucide-react';
import './PracticeTools.css';


const HigherEdLevel1BBasicDictionaries = () => {
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
      title: "Create Your First Dictionary",
      difficulty: "Beginner",
      points: 10,
      conceptBox: {
        title: "What is a Dictionary?",
        content: "A dictionary stores key-value pairs. Keys are labels, values are data. Use curly braces {} with key:value format.",
        syntax: "student = {'name': 'Alice', 'gpa': 3.8}",
        rule: "Curly braces {}. Format: key:value. Comma between pairs. Strings need quotes."
      },
      description: "Create a dictionary called student with two key-value pairs: 'name' with value 'Emma' and 'major' with value 'Computer Science'. Print the dictionary.",
      scenario: "You're building a student information system that stores multiple pieces of data about each student.",
      
      skeleton: `student = {_____: _____, _____: _____}
print(_____)`,
      
      hint: "Curly braces create dict. Format: student = {'name': 'Emma', 'major': 'Computer Science'}",
      
      solution: `student = {'name': 'Emma', 'major': 'Computer Science'}
print(student)`,
      
      commonMistakes: [
        "Using square brackets [] instead of curly braces {} (creates list, not dict!)",
        "Using = instead of : between key and value",
        "Forgetting quotes around string keys: {name: 'Emma'} won't work",
        "Missing comma between key-value pairs",
        "Printing 'student' as string instead of variable student"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('student')) {
          return { 
            valid: false, 
            message: "❌ Need to create a variable called 'student'!",
            mistake: "missing_variable"
          };
        }
        
        if (trimmed.includes('student = [')) {
          return { 
            valid: false, 
            message: "❌ Wrong brackets! Use curly braces {} for dictionaries, not square brackets []",
            mistake: "wrong_brackets"
          };
        }
        
        if (!trimmed.includes('{')) {
          return { 
            valid: false, 
            message: "❌ Dictionaries need curly braces {}! Format: student = {...}",
            mistake: "missing_braces"
          };
        }
        
        if (!trimmed.includes(':')) {
          return { 
            valid: false, 
            message: "❌ Use colon : between key and value! Format: 'name': 'Emma'",
            mistake: "missing_colon"
          };
        }
        
        if (!trimmed.includes("'name'") && !trimmed.includes('"name"')) {
          return { 
            valid: false, 
            message: "❌ String keys need quotes! Use 'name' not name",
            mistake: "missing_key_quotes"
          };
        }
        
        if (!trimmed.includes('Emma') || !trimmed.includes('Computer Science')) {
          return { 
            valid: false, 
            message: "❌ Dictionary must contain: 'name': 'Emma' and 'major': 'Computer Science'",
            mistake: "wrong_values"
          };
        }
        
        if (!trimmed.includes('print(student)')) {
          if (trimmed.includes("print('student')")) {
            return { 
              valid: false, 
              message: "❌ Don't print 'student' as a string! Print the variable: print(student)",
              mistake: "printing_string"
            };
          }
          return { 
            valid: false, 
            message: "❌ Need to print the dictionary: print(student)",
            mistake: "missing_print"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You created your first dictionary!" };
      }
    },
    
    {
      id: 2,
      title: "Access Value by Key",
      difficulty: "Beginner",
      points: 12,
      conceptBox: {
        title: "Accessing Dictionary Values",
        content: "Use square brackets with the key to get its value. The key goes in brackets, like dict[key].",
        syntax: "student['name']  # Gets 'Alice'",
        rule: "Square brackets for accessing. Key must match exactly (case-sensitive!)."
      },
      description: "Given: course = {'code': 'CS101', 'credits': 4}. Access and print only the credits value using the 'credits' key.",
      scenario: "The registrar needs to extract just the credit hours from a course record.",
      
      skeleton: `course = {'code': 'CS101', 'credits': 4}
print(course[_____])`,
      
      hint: "Access with square brackets and the key: course['credits']",
      
      solution: `course = {'code': 'CS101', 'credits': 4}
print(course['credits'])`,
      
      commonMistakes: [
        "Using dot notation: course.credits (doesn't work with dicts!)",
        "Forgetting quotes around key: course[credits] causes NameError",
        "Wrong key case: course['Credits'] won't find 'credits'",
        "Printing whole dict instead of just the value",
        "Using parentheses instead of brackets: course('credits')"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes("course = {'code': 'CS101', 'credits': 4}")) {
          return { 
            valid: false, 
            message: "❌ Must start with: course = {'code': 'CS101', 'credits': 4}",
            mistake: "wrong_dict"
          };
        }
        
        if (trimmed.includes('course.credits')) {
          return { 
            valid: false, 
            message: "❌ Don't use dot notation! Use brackets: course['credits']",
            mistake: "dot_notation"
          };
        }
        
        if (trimmed.includes('course[credits]') && !trimmed.includes("'credits'")) {
          return { 
            valid: false, 
            message: "❌ Key must be in quotes! Use course['credits'] not course[credits]",
            mistake: "missing_quotes"
          };
        }
        
        if (trimmed.includes("course['Credits']") || trimmed.includes('course["Credits"]')) {
          return { 
            valid: false, 
            message: "❌ Keys are case-sensitive! Use 'credits' not 'Credits'",
            mistake: "wrong_case"
          };
        }
        
        if (!trimmed.includes("course['credits']") && !trimmed.includes('course["credits"]')) {
          return { 
            valid: false, 
            message: "❌ Access the credits value: course['credits']",
            mistake: "wrong_access"
          };
        }
        
        if (!trimmed.includes("print(course['credits'])") && !trimmed.includes('print(course["credits"])')) {
          return { 
            valid: false, 
            message: "❌ Print the credits value: print(course['credits'])",
            mistake: "wrong_print"
          };
        }
        
        return { valid: true, message: "✅ Excellent! You accessed a dictionary value by key!" };
      }
    },
    
    {
      id: 3,
      title: "Add New Key-Value Pair",
      difficulty: "Intermediate",
      points: 13,
      conceptBox: {
        title: "Adding to Dictionaries",
        content: "Add new key-value pairs by assigning to a new key: dict[new_key] = value",
        syntax: "student['email'] = 'alice@college.edu'",
        rule: "Use assignment with brackets. If key exists, it updates. If new, it adds."
      },
      description: "Given: professor = {'name': 'Dr. Smith', 'department': 'Math'}. Add a new key 'office' with value 'Room 301'. Print the updated dictionary.",
      scenario: "Faculty records need to be updated with new office assignments.",
      
      skeleton: `professor = {'name': 'Dr. Smith', 'department': 'Math'}
professor[_____] = _____
print(_____)`,
      
      hint: "Add with assignment: professor['office'] = 'Room 301'. Then print(professor)",
      
      solution: `professor = {'name': 'Dr. Smith', 'department': 'Math'}
professor['office'] = 'Room 301'
print(professor)`,
      
      commonMistakes: [
        "Trying to use .append() like lists (dicts don't have append!)",
        "Forgetting quotes around the new key: professor[office]",
        "Forgetting quotes around string value: 'Room 301'",
        "Using = between key and value inside assignment (wrong syntax)",
        "Not printing the updated dictionary"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes("professor = {'name': 'Dr. Smith', 'department': 'Math'}")) {
          return { 
            valid: false, 
            message: "❌ Must start with: professor = {'name': 'Dr. Smith', 'department': 'Math'}",
            mistake: "wrong_dict"
          };
        }
        
        if (trimmed.includes('.append')) {
          return { 
            valid: false, 
            message: "❌ Dictionaries don't have .append()! Use assignment: professor['office'] = 'Room 301'",
            mistake: "using_append"
          };
        }
        
        if (trimmed.includes('professor[office]') && !trimmed.includes("'office'")) {
          return { 
            valid: false, 
            message: "❌ Key must be in quotes! Use professor['office'] not professor[office]",
            mistake: "missing_key_quotes"
          };
        }
        
        if (!trimmed.includes("'Room 301'") && !trimmed.includes('"Room 301"')) {
          return { 
            valid: false, 
            message: "❌ String value needs quotes! Use 'Room 301'",
            mistake: "missing_value_quotes"
          };
        }
        
        if (!trimmed.includes("professor['office'] = 'Room 301'") && !trimmed.includes('professor["office"] = "Room 301"')) {
          return { 
            valid: false, 
            message: "❌ Add the office key: professor['office'] = 'Room 301'",
            mistake: "wrong_addition"
          };
        }
        
        if (!trimmed.includes('print(professor)')) {
          return { 
            valid: false, 
            message: "❌ Print the updated dictionary: print(professor)",
            mistake: "missing_print"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You added a new key-value pair!" };
      }
    },
    
    {
      id: 4,
      title: "Check if Key Exists",
      difficulty: "Intermediate",
      points: 13,
      conceptBox: {
        title: "The 'in' Operator with Dictionaries",
        content: "Use 'in' to check if a KEY exists in a dictionary. Returns True or False. CRITICAL: 'in' checks KEYS only, not values!",
        syntax: "if 'email' in student:\n    print('Has email')",
        rule: "'in' operator checks keys. For values, use: if value in dict.values()"
      },
      description: "Given: grades = {'math': 85, 'science': 92}. Check if the key 'english' exists. If it exists, print 'Has English grade'. If not, print 'No English grade'.",
      scenario: "Verify whether a student has completed a specific course before processing.",
      
      skeleton: `grades = {'math': 85, 'science': 92}
if _____ in _____:
    print('Has English grade')
else:
    print('No English grade')`,
      
      hint: "Check with 'in': if 'english' in grades: - Remember quotes around the key!",
      
      solution: `grades = {'math': 85, 'science': 92}
if 'english' in grades:
    print('Has English grade')
else:
    print('No English grade')`,
      
      commonMistakes: [
        "Checking the value instead of key: if 85 in grades (checks values!)",
        "Forgetting quotes around key: if english in grades",
        "Using square brackets: if grades['english'] causes KeyError if missing!",
        "Missing colon after if statement",
        "Not indenting the print statements"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes("grades = {'math': 85, 'science': 92}")) {
          return { 
            valid: false, 
            message: "❌ Must start with: grades = {'math': 85, 'science': 92}",
            mistake: "wrong_dict"
          };
        }
        
        if (!trimmed.includes(' in ')) {
          return { 
            valid: false, 
            message: "❌ Use 'in' operator to check: if 'english' in grades:",
            mistake: "missing_in"
          };
        }
        
        if (!trimmed.includes("'english'") && !trimmed.includes('"english"')) {
          return { 
            valid: false, 
            message: "❌ Key must be in quotes! Use if 'english' in grades:",
            mistake: "missing_quotes"
          };
        }
        
        if (trimmed.includes("if 'english' in grades") && !trimmed.includes(':')) {
          return { 
            valid: false, 
            message: "❌ Missing colon after if statement: if 'english' in grades:",
            mistake: "missing_colon"
          };
        }
        
        const lines = trimmed.split('\n');
        const ifLine = lines.find(line => line.includes('if '));
        const ifIndex = lines.indexOf(ifLine);
        
        if (ifIndex >= 0 && ifIndex < lines.length - 1) {
          const nextLine = lines[ifIndex + 1];
          if (!nextLine.startsWith('    ') && !nextLine.startsWith('\t')) {
            return { 
              valid: false, 
              message: "❌ Print statements must be INDENTED under if/else!",
              mistake: "missing_indent"
            };
          }
        }
        
        if (!trimmed.includes("print('Has English grade')")) {
          return { 
            valid: false, 
            message: "❌ Need print('Has English grade') in if block",
            mistake: "wrong_if_print"
          };
        }
        
        if (!trimmed.includes("print('No English grade')")) {
          return { 
            valid: false, 
            message: "❌ Need print('No English grade') in else block",
            mistake: "wrong_else_print"
          };
        }
        
        return { valid: true, message: "✅ Excellent! You used 'in' to check for a key!" };
      }
    },
    
    {
      id: 5,
      title: "Loop Through Dictionary Items",
      difficulty: "Advanced",
      points: 17,
      conceptBox: {
        title: "Looping with .items()",
        content: "Use .items() to loop through both keys AND values together. Each iteration gives you a key-value pair.",
        syntax: "for key, value in dict.items():\n    print(key, value)",
        rule: ".items() returns pairs. Use two variables in for loop to unpack key and value."
      },
      description: "Given: scores = {'Alice': 95, 'Bob': 87, 'Carol': 92}. Loop through using .items() and print each name and score in format 'NAME: SCORE'.",
      scenario: "Generate a grade report showing each student's name with their score.",
      
      skeleton: `scores = {'Alice': 95, 'Bob': 87, 'Carol': 92}
for _____, _____ in scores._____():
    print(f'{_____}: {_____}')`,
      
      hint: "for name, score in scores.items(): then print with f-string: print(f'{name}: {score}')",
      
      solution: `scores = {'Alice': 95, 'Bob': 87, 'Carol': 92}
for name, score in scores.items():
    print(f'{name}: {score}')`,
      
      commonMistakes: [
        "Forgetting .items(): for name in scores only gives keys!",
        "Using only one variable: for item in scores.items() gives tuples",
        "Missing parentheses on .items: scores.items not scores.items()",
        "Missing f before f-string: print('{name}: {score}') won't work",
        "Missing colon after for statement"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes("scores = {'Alice': 95, 'Bob': 87, 'Carol': 92}")) {
          return { 
            valid: false, 
            message: "❌ Must start with: scores = {'Alice': 95, 'Bob': 87, 'Carol': 92}",
            mistake: "wrong_dict"
          };
        }
        
        if (!trimmed.includes('.items()')) {
          if (trimmed.includes('.items')) {
            return { 
              valid: false, 
              message: "❌ Missing parentheses! Use .items() not .items",
              mistake: "missing_parens"
            };
          }
          return { 
            valid: false, 
            message: "❌ Use .items() to loop through key-value pairs: for name, score in scores.items():",
            mistake: "missing_items"
          };
        }
        
        if (!trimmed.includes('for ') || !trimmed.includes(' in ')) {
          return { 
            valid: false, 
            message: "❌ Need for loop: for name, score in scores.items():",
            mistake: "missing_for"
          };
        }
        
        const forLine = trimmed.split('\n').find(line => line.includes('for '));
        if (forLine && !forLine.includes(':')) {
          return { 
            valid: false, 
            message: "❌ Missing colon after for statement!",
            mistake: "missing_colon"
          };
        }
        
        // Check for two variables in for loop
        const hasCommaInFor = forLine && forLine.includes(',') && forLine.includes('in scores.items()');
        if (!hasCommaInFor) {
          return { 
            valid: false, 
            message: "❌ Use TWO variables: for name, score in scores.items():",
            mistake: "missing_two_variables"
          };
        }
        
        if (!trimmed.includes('print(f') && !trimmed.includes('print(F')) {
          return { 
            valid: false, 
            message: "❌ Use f-string! Format: print(f'{name}: {score}')",
            mistake: "missing_fstring"
          };
        }
        
        const lines = trimmed.split('\n');
        const forIndex = lines.findIndex(line => line.includes('for '));
        if (forIndex >= 0 && forIndex < lines.length - 1) {
          const nextLine = lines[forIndex + 1];
          if (!nextLine.startsWith('    ') && !nextLine.startsWith('\t')) {
            return { 
              valid: false, 
              message: "❌ Print statement must be INDENTED under the for loop!",
              mistake: "missing_indent"
            };
          }
        }
        
        return { valid: true, message: "✅ Outstanding! You looped through dictionary items!" };
      }
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tool 1B: Basic Dictionaries</h1>
              <p className="text-purple-100 text-lg">Master Python dictionary fundamentals • 65 points total</p>
            </div>
            <Trophy className="w-16 h-16 text-purple-200" />
          </div>
          
          {/* Progress Bar */}
          <div className="bg-purple-800 bg-opacity-30 rounded-full h-8 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-300 to-pink-200 h-full flex items-center justify-center font-bold text-purple-900 transition-all duration-500"
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
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                    : completedExercises.has(idx)
                    ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
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
            {/* Concept Box */}
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Book className="w-6 h-6 text-purple-700" />
                <h3 className="text-xl font-bold text-purple-900">{currentEx.conceptBox.title}</h3>
              </div>
              <p className="text-purple-900 mb-3">{currentEx.conceptBox.content}</p>
              <div className="bg-white bg-opacity-50 p-3 rounded-lg mb-2">
                <code className="text-purple-700 font-mono text-sm">{currentEx.conceptBox.syntax}</code>
              </div>
              <p className="text-sm text-purple-800 font-medium">💡 {currentEx.conceptBox.rule}</p>
            </div>

            {/* Exercise Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentEx.title}</h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {currentEx.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                      {currentEx.points} points
                    </span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4 rounded">
                <p className="text-sm text-purple-800 font-medium mb-2">📚 Scenario:</p>
                <p className="text-purple-900">{currentEx.scenario}</p>
              </div>

              <div className="prose max-w-none mb-4">
                <p className="text-gray-700 text-lg leading-relaxed">{currentEx.description}</p>
              </div>

              {/* Common Mistakes */}
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-pink-600" />
                  <h3 className="font-bold text-pink-900">Common Mistakes to Avoid:</h3>
                </div>
                <ul className="space-y-1 text-sm text-pink-900">
                  {currentEx.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-pink-600 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hint Toggle */}
              <div className="mb-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
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
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                >
                  {showSolution ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
                {showSolution && (
                  <div className="mt-3 p-4 bg-pink-50 border border-pink-200 rounded-lg">
                    <pre className="text-sm font-mono text-pink-900 whitespace-pre-wrap">{currentEx.solution}</pre>
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
                        ? 'bg-purple-500 text-white'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
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
                className="w-full h-96 p-4 font-mono text-sm border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="Write your code here or click 'Skeleton' for guided practice..."
                spellCheck="false"
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCheckAnswer}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
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
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-purple-900 mb-3">🔑 Dictionaries Quick Reference</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-purple-700 font-mono">dict = {"{"}<code className="text-purple-700 font-mono">{`dict = {'key': 'value'}</code>#39;key<code className="text-purple-700 font-mono">dict = {'key': 'value'}`}</code>#39;: <code className="text-purple-700 font-mono">{`dict = {'key': 'value'}</code>#39;value<code className="text-purple-700 font-mono">dict = {'key': 'value'}`}</code>#39;{"}"}</code>
                  <p className="text-gray-700 mt-1">Create dict with curly braces</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-purple-700 font-mono">dict['key']</code>
                  <p className="text-gray-700 mt-1">Access value by key</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-purple-700 font-mono">dict['new'] = value</code>
                  <p className="text-gray-700 mt-1">Add or update key-value pair</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-purple-700 font-mono">'key' in dict</code>
                  <p className="text-gray-700 mt-1">Check if key exists (checks KEYS!)</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-purple-700 font-mono">for k, v in dict.items():</code>
                  <p className="text-gray-700 mt-1">Loop through key-value pairs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherEdLevel1BBasicDictionaries;
