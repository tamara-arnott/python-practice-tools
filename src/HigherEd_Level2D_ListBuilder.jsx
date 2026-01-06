import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Trophy, Target, Book, Code, Eye, EyeOff, Lightbulb, AlertTriangle } from 'lucide-react';
import './PracticeTools.css';


const HigherEdLevel2DListBuilder = () => {
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
      title: "Filter List",
      difficulty: "Beginner",
      points: 12,
      conceptBox: {
        title: "Building Lists with Conditions",
        content: "Start with empty list. Loop through items. When condition is true, append item to new list.",
        syntax: "result = []\nfor item in items:\n    if condition:\n        result.append(item)",
        rule: "Always initialize empty list FIRST. Then loop, check condition, append."
      },
      description: "Given: grades = [85, 67, 92, 55, 78, 90]. Build a new list called passing that contains only grades >= 70. Print the passing list.",
      scenario: "Create honor roll list from all grades.",
      
      skeleton: `grades = [85, 67, 92, 55, 78, 90]
passing = ___
for grade in _____:
    if grade ___ 70:
        passing._____(grade)
print(passing)`,
      
      hint: "Start with empty list: passing = []. Use passing.append(grade) when condition is true.",
      
      solution: `grades = [85, 67, 92, 55, 78, 90]
passing = []
for grade in grades:
    if grade >= 70:
        passing.append(grade)
print(passing)`,
      
      commonMistakes: [
        "Not initializing empty list",
        "Creating new list instead of appending (passing = [grade])",
        "Appending outside if statement (adds all grades)",
        "Using += instead of .append() (passing += grade adds characters!)",
        "Using > instead of >= (70 should pass!)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('passing = []')) {
          return { 
            valid: false, 
            message: "❌ Initialize empty list first: passing = []",
            mistake: "missing_empty_list"
          };
        }
        
        if (!trimmed.includes('for grade in grades')) {
          return { 
            valid: false, 
            message: "❌ Loop through grades: for grade in grades:",
            mistake: "wrong_loop"
          };
        }
        
        if (!trimmed.includes('if ')) {
          return { 
            valid: false, 
            message: "❌ Need if statement to check passing grade!",
            mistake: "missing_condition"
          };
        }
        
        if (trimmed.includes('if grade > 70') && !trimmed.includes('>=')) {
          return { 
            valid: false, 
            message: "❌ Use >= not >! Grade of 70 should pass!",
            mistake: "wrong_operator"
          };
        }
        
        if (!trimmed.includes('passing.append(grade)')) {
          if (trimmed.includes('passing += grade')) {
            return { 
              valid: false, 
              message: "❌ Don't use += with single item! Use .append(grade)",
              mistake: "using_plus_equals"
            };
          }
          return { 
            valid: false, 
            message: "❌ Append to list: passing.append(grade)",
            mistake: "not_appending"
          };
        }
        
        if (!trimmed.includes('print(passing)')) {
          return { 
            valid: false, 
            message: "❌ Print the passing list!",
            mistake: "missing_print"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You filtered a list!" };
      }
    },
    
    {
      id: 2,
      title: "Extract Field from Dicts",
      difficulty: "Beginner",
      points: 13,
      conceptBox: {
        title: "Extracting Values from Dictionaries",
        content: "Loop through list of dictionaries. Extract one field from each. Build list of just those values.",
        syntax: "names = []\nfor student in students:\n    names.append(student['name'])",
        rule: "Append the FIELD VALUE, not the whole dictionary!"
      },
      description: "Given: students = [{'name': 'Alice', 'id': '001'}, {'name': 'Bob', 'id': '002'}, {'name': 'Carol', 'id': '003'}]. Build a list of just the names. Print the names list.",
      scenario: "Email system needs list of student names only.",
      
      skeleton: `students = [{'name': 'Alice', 'id': '001'}, {'name': 'Bob', 'id': '002'}, {'name': 'Carol', 'id': '003'}]
names = ___
for student in _____:
    names._____(student[_____])
print(names)`,
      
      hint: "Empty list names = []. Append student['name'] for each student.",
      
      solution: `students = [{'name': 'Alice', 'id': '001'}, {'name': 'Bob', 'id': '002'}, {'name': 'Carol', 'id': '003'}]
names = []
for student in students:
    names.append(student['name'])
print(names)`,
      
      commonMistakes: [
        "Appending whole dictionary (names.append(student))",
        "Wrong key access (student.name or student[name])",
        "Not initializing empty list first",
        "Appending wrong field (id instead of name)",
        "Missing quotes on dictionary key"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('names = []')) {
          return { 
            valid: false, 
            message: "❌ Initialize empty list: names = []",
            mistake: "missing_empty_list"
          };
        }
        
        if (!trimmed.includes('for student in students')) {
          return { 
            valid: false, 
            message: "❌ Loop through students: for student in students:",
            mistake: "wrong_loop"
          };
        }
        
        if (trimmed.includes('names.append(student)') && !trimmed.includes("student['name']")) {
          return { 
            valid: false, 
            message: "❌ Don't append whole dictionary! Append just the name: student['name']",
            mistake: "appending_whole_dict"
          };
        }
        
        if (trimmed.includes('student.name')) {
          return { 
            valid: false, 
            message: "❌ Use brackets not dot! student['name']",
            mistake: "dot_notation"
          };
        }
        
        if (trimmed.includes('student[name]') && !trimmed.includes("'name'")) {
          return { 
            valid: false, 
            message: "❌ Keys need quotes! student['name']",
            mistake: "missing_quotes"
          };
        }
        
        if (!trimmed.includes("student['name']") && !trimmed.includes('student["name"]')) {
          return { 
            valid: false, 
            message: "❌ Access the name with student['name']",
            mistake: "wrong_access"
          };
        }
        
        return { valid: true, message: "✅ Excellent! You extracted fields from dictionaries!" };
      }
    },
    
    {
      id: 3,
      title: "Conditional Filter",
      difficulty: "Intermediate",
      points: 14,
      conceptBox: {
        title: "Filtering with Dictionary Values",
        content: "Check dictionary values. If condition met, append specific field (not whole dict!).",
        syntax: "codes = []\nfor course in courses:\n    if course['credits'] == 4:\n        codes.append(course['code'])",
        rule: "Check one field. Append different field. Not the whole dictionary!"
      },
      description: "Given: courses = [{'code': 'CS101', 'credits': 4}, {'code': 'MATH203', 'credits': 3}, {'code': 'ENG105', 'credits': 4}, {'code': 'HIST150', 'credits': 3}]. Build list of course codes that have 4 credits. Print the result.",
      scenario: "Generate list of high-credit courses for advising.",
      
      skeleton: `courses = [{'code': 'CS101', 'credits': 4}, {'code': 'MATH203', 'credits': 3}, {'code': 'ENG105', 'credits': 4}, {'code': 'HIST150', 'credits': 3}]
high_credit = ___
for course in _____:
    if course[_____] ___ 4:
        high_credit._____(course[_____])
print(high_credit)`,
      
      hint: "Check if credits == 4, then append the code (not whole dict!).",
      
      solution: `courses = [{'code': 'CS101', 'credits': 4}, {'code': 'MATH203', 'credits': 3}, {'code': 'ENG105', 'credits': 4}, {'code': 'HIST150', 'credits': 3}]
high_credit = []
for course in courses:
    if course['credits'] == 4:
        high_credit.append(course['code'])
print(high_credit)`,
      
      commonMistakes: [
        "Appending whole dictionary instead of just code",
        "Using >= instead of == (only want exactly 4)",
        "Wrong field in append (appending credits instead of code)",
        "Checking wrong condition",
        "Not initializing empty list"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('high_credit = []')) {
          return { 
            valid: false, 
            message: "❌ Initialize empty list: high_credit = []",
            mistake: "missing_empty_list"
          };
        }
        
        if (!trimmed.includes('for course in courses')) {
          return { 
            valid: false, 
            message: "❌ Loop through courses: for course in courses:",
            mistake: "wrong_loop"
          };
        }
        
        if (trimmed.includes('>=') && !trimmed.includes('==')) {
          return { 
            valid: false, 
            message: "❌ Use == not >=! Want exactly 4 credits.",
            mistake: "wrong_operator"
          };
        }
        
        if (!trimmed.includes("course['credits']") && !trimmed.includes('course["credits"]')) {
          return { 
            valid: false, 
            message: "❌ Check credits: course['credits']",
            mistake: "not_checking_credits"
          };
        }
        
        if (trimmed.includes('high_credit.append(course)') && !trimmed.includes("course['code']")) {
          return { 
            valid: false, 
            message: "❌ Append just the CODE, not whole dictionary! Use course['code']",
            mistake: "appending_whole_dict"
          };
        }
        
        if (!trimmed.includes("course['code']") && !trimmed.includes('course["code"]')) {
          return { 
            valid: false, 
            message: "❌ Append the course code: high_credit.append(course['code'])",
            mistake: "wrong_field"
          };
        }
        
        return { valid: true, message: "✅ Perfect! Conditional filtering mastered!" };
      }
    },
    
    {
      id: 4,
      title: "Transform While Building",
      difficulty: "Intermediate",
      points: 14,
      conceptBox: {
        title: "Transforming Data as You Build",
        content: "Apply a transformation (like .upper(), .lower(), or math) BEFORE appending to new list.",
        syntax: "uppercase = []\nfor name in names:\n    uppercase.append(name.upper())",
        rule: "Transform THEN append. Don't modify original list!"
      },
      description: "Given: students = ['alice', 'bob', 'carol']. Build a new list with all names in UPPERCASE. Print the uppercase list.",
      scenario: "Name badges need all-caps formatting.",
      
      skeleton: `students = ['alice', 'bob', 'carol']
uppercase_names = ___
for name in _____:
    uppercase_names._____(name._____)
print(uppercase_names)`,
      
      hint: "Use .upper() to convert to uppercase. Append the transformed version.",
      
      solution: `students = ['alice', 'bob', 'carol']
uppercase_names = []
for name in students:
    uppercase_names.append(name.upper())
print(uppercase_names)`,
      
      commonMistakes: [
        "Modifying original list instead of building new one",
        "Forgetting () after .upper (name.upper not name.upper())",
        "Appending name instead of name.upper()",
        "Using .capitalize() instead of .upper() (different results)",
        "Not initializing empty list"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('uppercase_names = []')) {
          return { 
            valid: false, 
            message: "❌ Initialize empty list: uppercase_names = []",
            mistake: "missing_empty_list"
          };
        }
        
        if (!trimmed.includes('for name in students')) {
          return { 
            valid: false, 
            message: "❌ Loop through students: for name in students:",
            mistake: "wrong_loop"
          };
        }
        
        if (trimmed.includes('name.upper') && !trimmed.includes('name.upper()')) {
          return { 
            valid: false, 
            message: "❌ Need parentheses! name.upper() not name.upper",
            mistake: "missing_parentheses"
          };
        }
        
        if (!trimmed.includes('.upper()')) {
          return { 
            valid: false, 
            message: "❌ Use .upper() to convert to uppercase!",
            mistake: "not_using_upper"
          };
        }
        
        if (trimmed.includes('uppercase_names.append(name)') && !trimmed.includes('name.upper()')) {
          return { 
            valid: false, 
            message: "❌ Append the TRANSFORMED version! uppercase_names.append(name.upper())",
            mistake: "appending_original"
          };
        }
        
        if (trimmed.includes('.capitalize()')) {
          return { 
            valid: false, 
            message: "❌ Use .upper() not .capitalize()! They give different results.",
            mistake: "wrong_method"
          };
        }
        
        return { valid: true, message: "✅ Excellent! You transformed data while building!" };
      }
    },
    
    {
      id: 5,
      title: "Complex Filter with Multiple Conditions",
      difficulty: "Advanced",
      points: 17,
      conceptBox: {
        title: "Multiple Conditions in List Building",
        content: "Use 'and' to combine conditions. Check BOTH before appending. Extract specific field.",
        syntax: "honors = []\nfor s in students:\n    if s['major'] == 'CS' and s['gpa'] > 3.5:\n        honors.append(s['name'])",
        rule: "Use 'and' for ALL conditions. Append specific field, not whole dict!"
      },
      description: "Given: students = [{'name': 'Alice', 'major': 'CS', 'gpa': 3.8}, {'name': 'Bob', 'major': 'Math', 'gpa': 3.5}, {'name': 'Carol', 'major': 'CS', 'gpa': 3.2}, {'name': 'David', 'major': 'CS', 'gpa': 3.9}]. Build list of names of CS majors with GPA > 3.5. Print the list.",
      scenario: "Dean's list for Computer Science department only.",
      
      skeleton: `students = [{'name': 'Alice', 'major': 'CS', 'gpa': 3.8}, {'name': 'Bob', 'major': 'Math', 'gpa': 3.5}, {'name': 'Carol', 'major': 'CS', 'gpa': 3.2}, {'name': 'David', 'major': 'CS', 'gpa': 3.9}]
cs_honors = ___
for student in _____:
    if student[_____] ___ 'CS' ___ student[_____] ___ 3.5:
        cs_honors._____(student[_____])
print(cs_honors)`,
      
      hint: "Use 'and' to combine conditions. Check major == 'CS' AND gpa > 3.5.",
      
      solution: `students = [{'name': 'Alice', 'major': 'CS', 'gpa': 3.8}, {'name': 'Bob', 'major': 'Math', 'gpa': 3.5}, {'name': 'Carol', 'major': 'CS', 'gpa': 3.2}, {'name': 'David', 'major': 'CS', 'gpa': 3.9}]
cs_honors = []
for student in students:
    if student['major'] == 'CS' and student['gpa'] > 3.5:
        cs_honors.append(student['name'])
print(cs_honors)`,
      
      commonMistakes: [
        "Using 'or' instead of 'and' (wrong logic - need BOTH conditions)",
        "Using >= instead of > (should be strictly greater than 3.5)",
        "Appending whole dict instead of just name",
        "Checking only one condition",
        "Wrong dictionary key access"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('cs_honors = []')) {
          return { 
            valid: false, 
            message: "❌ Initialize empty list: cs_honors = []",
            mistake: "missing_empty_list"
          };
        }
        
        if (!trimmed.includes('for student in students')) {
          return { 
            valid: false, 
            message: "❌ Loop through students: for student in students:",
            mistake: "wrong_loop"
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
            message: "❌ Use 'and' not 'or'! Need BOTH conditions to be true.",
            mistake: "using_or"
          };
        }
        
        if (!trimmed.includes("student['major']") && !trimmed.includes('student["major"]')) {
          return { 
            valid: false, 
            message: "❌ Check the major: student['major']",
            mistake: "not_checking_major"
          };
        }
        
        if (!trimmed.includes("student['gpa']") && !trimmed.includes('student["gpa"]')) {
          return { 
            valid: false, 
            message: "❌ Check the GPA: student['gpa']",
            mistake: "not_checking_gpa"
          };
        }
        
        if (trimmed.includes('>= 3.5') && !trimmed.includes('> 3.5')) {
          return { 
            valid: false, 
            message: "❌ Use > not >=! Should be strictly greater than 3.5.",
            mistake: "wrong_operator"
          };
        }
        
        if (trimmed.includes('cs_honors.append(student)') && !trimmed.includes("student['name']")) {
          return { 
            valid: false, 
            message: "❌ Append just the NAME, not whole dict! Use student['name']",
            mistake: "appending_whole_dict"
          };
        }
        
        if (!trimmed.includes("student['name']") && !trimmed.includes('student["name"]')) {
          return { 
            valid: false, 
            message: "❌ Append the name: cs_honors.append(student['name'])",
            mistake: "wrong_field"
          };
        }
        
        return { valid: true, message: "✅ Perfect! Complex filtering with multiple conditions mastered!" };
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tool 2D: List Builder</h1>
              <p className="text-indigo-100 text-lg">Build new lists by filtering and transforming data</p>
            </div>
            <Trophy className="w-16 h-16 text-yellow-300" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-indigo-100 text-sm">Your Score</div>
              <div className="text-3xl font-bold">{score} / {totalPoints}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-indigo-100 text-sm">Progress</div>
              <div className="text-3xl font-bold">{completedExercises.size} / {exercises.length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-indigo-100 text-sm">Current Exercise</div>
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
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-indigo-300 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Book className="w-6 h-6 text-indigo-700" />
                <h3 className="text-xl font-bold text-indigo-900">{currentEx.conceptBox.title}</h3>
              </div>
              <p className="text-indigo-900 mb-3">{currentEx.conceptBox.content}</p>
              <div className="bg-white bg-opacity-50 p-3 rounded-lg mb-2">
                <code className="text-indigo-700 font-mono text-sm whitespace-pre-wrap">{currentEx.conceptBox.syntax}</code>
              </div>
              <p className="text-sm text-indigo-800 font-medium">💡 {currentEx.conceptBox.rule}</p>
            </div>

            {/* Exercise Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentEx.title}</h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {currentEx.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {currentEx.points} points
                    </span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-indigo-500" />
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4 rounded">
                <p className="text-sm text-indigo-800 font-medium mb-2">📚 Scenario:</p>
                <p className="text-indigo-900">{currentEx.scenario}</p>
              </div>

              <div className="prose max-w-none mb-4">
                <p className="text-gray-700 text-lg leading-relaxed">{currentEx.description}</p>
              </div>

              {/* Common Mistakes */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-purple-900">Common Mistakes to Avoid:</h3>
                </div>
                <ul className="space-y-1 text-sm text-purple-900">
                  {currentEx.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hint Toggle */}
              <div className="mb-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
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
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  {showSolution ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
                {showSolution && (
                  <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
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
                        ? 'bg-indigo-500 text-white'
                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
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
                className="w-full h-96 p-4 font-mono text-sm border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="Write your code here or click 'Skeleton' for guided practice..."
                spellCheck="false"
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCheckAnswer}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-bold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
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
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-indigo-900 mb-3">🔑 List Builder Quick Reference</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-indigo-700 font-mono">result = []</code>
                  <p className="text-gray-700 mt-1">Empty list to build</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-indigo-700 font-mono">for item in list:</code>
                  <p className="text-gray-700 mt-1">Loop through items</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-indigo-700 font-mono">if condition: result.append(item)</code>
                  <p className="text-gray-700 mt-1">Optional filter</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-indigo-700 font-mono">.append(dict['key'])</code>
                  <p className="text-gray-700 mt-1">Extract specific field</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-indigo-700 font-mono">.append(item.upper())</code>
                  <p className="text-gray-700 mt-1">Transform before adding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherEdLevel2DListBuilder;
