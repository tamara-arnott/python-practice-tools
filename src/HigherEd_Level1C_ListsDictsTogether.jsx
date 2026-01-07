import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Trophy, Target, Book, Code, Eye, EyeOff, Lightbulb, AlertTriangle } from 'lucide-react';
import './PracticeTools.css';


const HigherEdLevel1CListsDictsTogether = () => {
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
      title: "List of Dictionaries - Basic",
      difficulty: "Beginner",
      points: 10,
      conceptBox: {
        title: "Combining Lists and Dictionaries",
        content: "A list can contain dictionaries as items. Each dictionary represents one complete record (like one student).",
        syntax: "students = [{'name': 'Alice', 'id': '001'}, {'name': 'Bob', 'id': '002'}]",
        rule: "Use square brackets [] for the list. Each item is a complete dictionary with curly braces {}."
      },
      description: "Create a list called courses containing two dictionaries. First: {'name': 'Python', 'credits': 4}. Second: {'name': 'Math', 'credits': 3}. Then print the list.",
      scenario: "The course catalog stores each course as a dictionary, and all courses go in one master list.",
      
      skeleton: `courses = [{_____: _____, _____: _____}, {_____: _____, _____: _____}]
print(_____)`,
      
      hint: "List of dicts uses: [{key: value, key: value}, {key: value, key: value}]. Don't forget quotes on strings!",
      
      solution: `courses = [{'name': 'Python', 'credits': 4}, {'name': 'Math', 'credits': 3}]
print(courses)`,
      
      commonMistakes: [
        "Forgetting curly braces {} around each dictionary",
        "Missing comma between the two dictionaries",
        "Using = instead of : inside dictionaries",
        "Forgetting quotes around 'name' and 'credits' keys",
        "Missing square brackets [] around the whole list"
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
        
        if (!trimmed.includes('[{')) {
          return { 
            valid: false, 
            message: "❌ List of dicts needs square brackets [ and curly braces {. Format: [{...}, {...}]",
            mistake: "missing_brackets"
          };
        }
        
        if (!trimmed.includes("'name'") && !trimmed.includes('"name"')) {
          return { 
            valid: false, 
            message: "❌ Dictionary keys need quotes! Use 'name': value",
            mistake: "missing_key_quotes"
          };
        }
        
        if (trimmed.includes('=') && !trimmed.includes(':')) {
          return { 
            valid: false, 
            message: "❌ Inside dictionaries use : not =! Format: {'key': value}",
            mistake: "wrong_separator"
          };
        }
        
        if (!trimmed.includes('Python') || !trimmed.includes('Math')) {
          return { 
            valid: false, 
            message: "❌ Need both courses: 'Python' and 'Math'",
            mistake: "missing_values"
          };
        }
        
        if (!trimmed.includes('print(courses)')) {
          return { 
            valid: false, 
            message: "❌ Print the list: print(courses)",
            mistake: "missing_print"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You created a list of dictionaries!" };
      }
    },
    
    {
      id: 2,
      title: "Access Dictionary in List",
      difficulty: "Beginner",
      points: 12,
      conceptBox: {
        title: "Two-Step Access Pattern",
        content: "First use list index [0] to get the dictionary, then use dictionary key ['name'] to get the value.",
        syntax: "students = [{'name': 'Alice'}]\nstudents[0]['name']  # Gets 'Alice'",
        rule: "List index first [0], then dictionary key ['key']. Two pairs of brackets!"
      },
      description: "Given: students = [{'name': 'Alice', 'major': 'CS'}, {'name': 'Bob', 'major': 'Math'}]. Print ONLY the name of the first student.",
      scenario: "From the enrollment list, you need to display just the first student's name.",
      
      skeleton: `students = [{'name': 'Alice', 'major': 'CS'}, {'name': 'Bob', 'major': 'Math'}]
print(students[_____][_____])`,
      
      hint: "First get the first dictionary with [0], then get the name with ['name']: students[0]['name']",
      
      solution: `students = [{'name': 'Alice', 'major': 'CS'}, {'name': 'Bob', 'major': 'Math'}]
print(students[0]['name'])`,
      
      commonMistakes: [
        "Using students['name'][0] - wrong order! List index comes first",
        "Using students[0].name with dot notation - use ['name'] not .name",
        "Forgetting quotes on 'name' key",
        "Using [1] instead of [0] - gets second student, not first!",
        "Printing whole dictionary students[0] instead of just the name"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes("students = [{'name': 'Alice', 'major': 'CS'}, {'name': 'Bob', 'major': 'Math'}]")) {
          return { 
            valid: false, 
            message: "❌ Keep the given students list exactly as shown!",
            mistake: "wrong_list"
          };
        }
        
        if (trimmed.includes('students[1]')) {
          return { 
            valid: false, 
            message: "❌ Index 1 is the second student! First student is index 0",
            mistake: "wrong_index"
          };
        }
        
        if (trimmed.includes("students['name']")) {
          return { 
            valid: false, 
            message: "❌ Wrong order! List index first, then key: students[0]['name']",
            mistake: "backwards_access"
          };
        }
        
        if (trimmed.includes('students[0].name')) {
          return { 
            valid: false, 
            message: "❌ Don't use dot notation! Use brackets: students[0]['name']",
            mistake: "dot_notation"
          };
        }
        
        if (!trimmed.includes('[0]')) {
          return { 
            valid: false, 
            message: "❌ Need to access first dictionary with [0]",
            mistake: "missing_index"
          };
        }
        
        if (!trimmed.includes("['name']") && !trimmed.includes('["name"]')) {
          return { 
            valid: false, 
            message: "❌ Need to access the 'name' key with ['name']",
            mistake: "missing_key"
          };
        }
        
        if (!trimmed.includes("print(students[0]['name'])") && !trimmed.includes('print(students[0]["name"])')) {
          return { 
            valid: false, 
            message: "❌ Print with: print(students[0]['name'])",
            mistake: "wrong_print"
          };
        }
        
        return { valid: true, message: "✅ Excellent! Two-step access mastered!" };
      }
    },
    
    {
      id: 3,
      title: "Loop Through List of Dicts",
      difficulty: "Intermediate",
      points: 13,
      conceptBox: {
        title: "Looping Pattern for List of Dictionaries",
        content: "Use for loop to get each dictionary one at a time. Each loop iteration, you have one complete dictionary.",
        syntax: "for student in students:\n    print(student['name'])",
        rule: "Loop variable holds ONE dictionary at a time. Access its values with bracket notation."
      },
      description: "Given: courses = [{'code': 'CS101', 'credits': 4}, {'code': 'MATH203', 'credits': 3}, {'code': 'ENG105', 'credits': 4}]. Loop through and print each course code.",
      scenario: "Display all course codes from the master course list.",
      
      skeleton: `courses = [{'code': 'CS101', 'credits': 4}, {'code': 'MATH203', 'credits': 3}, {'code': 'ENG105', 'credits': 4}]
for course in _____:
    print(course[_____])`,
      
      hint: "Loop: for course in courses. Then print: course['code']. Each time through loop, course is one dictionary.",
      
      solution: `courses = [{'code': 'CS101', 'credits': 4}, {'code': 'MATH203', 'credits': 3}, {'code': 'ENG105', 'credits': 4}]
for course in courses:
    print(course['code'])`,
      
      commonMistakes: [
        "Looping with for courses in courses - overwrites the original list!",
        "Using course.code instead of course['code']",
        "Forgetting colon : after for line",
        "Not indenting the print statement (IndentationError)",
        "Printing whole dictionary instead of just the code"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes("courses = [{'code': 'CS101'")) {
          return { 
            valid: false, 
            message: "❌ Keep the given courses list exactly as shown!",
            mistake: "wrong_list"
          };
        }
        
        if (!trimmed.includes('for ')) {
          return { 
            valid: false, 
            message: "❌ Need a for loop to go through each course!",
            mistake: "missing_loop"
          };
        }
        
        if (trimmed.includes('for courses in courses')) {
          return { 
            valid: false, 
            message: "❌ Don't use 'courses' as loop variable! Use: for course in courses",
            mistake: "overwrites_list"
          };
        }
        
        if (!trimmed.includes('in courses:')) {
          return { 
            valid: false, 
            message: "❌ Loop through the list: for course in courses:",
            mistake: "wrong_loop_target"
          };
        }
        
        if (trimmed.includes('for course in courses') && !trimmed.includes(':')) {
          return { 
            valid: false, 
            message: "❌ Missing colon : after for statement!",
            mistake: "missing_colon"
          };
        }
        
        if (trimmed.includes('course.code')) {
          return { 
            valid: false, 
            message: "❌ Use brackets not dot! course['code'] not course.code",
            mistake: "dot_notation"
          };
        }
        
        if (!trimmed.includes("course['code']") && !trimmed.includes('course["code"]')) {
          return { 
            valid: false, 
            message: "❌ Access the 'code' key with course['code']",
            mistake: "missing_key_access"
          };
        }
        
        if (!trimmed.includes('    print')) {
          return { 
            valid: false, 
            message: "❌ Print statement must be indented inside the loop!",
            mistake: "no_indent"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You looped through a list of dictionaries!" };
      }
    },
    
    {
      id: 4,
      title: "Build List of Dictionaries",
      difficulty: "Intermediate",
      points: 14,
      conceptBox: {
        title: "Building Lists of Dictionaries",
        content: "Start with empty list [], then use .append() to add complete dictionaries one at a time.",
        syntax: "results = []\nresults.append({'name': 'Alice', 'score': 95})",
        rule: "Each .append() adds one complete dictionary to the list."
      },
      description: "Create empty list called students. Add two students using .append(): {'name': 'Alice', 'gpa': 3.8} and {'name': 'Bob', 'gpa': 3.5}. Then print the list.",
      scenario: "Build a dean's list by adding students one at a time.",
      
      skeleton: `students = _____
students._____(_____)
students._____(_____)
print(students)`,
      
      hint: "Start: students = []. Then: students.append({'name': 'Alice', 'gpa': 3.8}). Each append adds complete dict.",
      
      solution: `students = []
students.append({'name': 'Alice', 'gpa': 3.8})
students.append({'name': 'Bob', 'gpa': 3.5})
print(students)`,
      
      commonMistakes: [
        "Not initializing empty list first (students = [])",
        "Using students.add() instead of students.append()",
        "Forgetting curly braces {} around dictionaries",
        "Missing comma between key:value pairs in dictionary",
        "Using = instead of : inside dictionaries"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('students = []')) {
          return { 
            valid: false, 
            message: "❌ Start with empty list: students = []",
            mistake: "missing_empty_list"
          };
        }
        
        if (!trimmed.includes('.append(')) {
          return { 
            valid: false, 
            message: "❌ Use .append() to add dictionaries to the list!",
            mistake: "missing_append"
          };
        }
        
        if (trimmed.includes('.add(')) {
          return { 
            valid: false, 
            message: "❌ Lists use .append() not .add()!",
            mistake: "wrong_method"
          };
        }
        
        if (!trimmed.includes("{'name': 'Alice'") && !trimmed.includes('{"name": "Alice"')) {
          return { 
            valid: false, 
            message: "❌ Need to append Alice's dictionary with {'name': 'Alice', 'gpa': 3.8}",
            mistake: "missing_alice"
          };
        }
        
        if (!trimmed.includes("'Bob'") && !trimmed.includes('"Bob"')) {
          return { 
            valid: false, 
            message: "❌ Need to append Bob's dictionary too!",
            mistake: "missing_bob"
          };
        }
        
        if (!trimmed.includes('3.8') || !trimmed.includes('3.5')) {
          return { 
            valid: false, 
            message: "❌ Include the GPA values: 3.8 for Alice, 3.5 for Bob",
            mistake: "missing_gpas"
          };
        }
        
        if (!trimmed.includes('print(students)')) {
          return { 
            valid: false, 
            message: "❌ Print the final list: print(students)",
            mistake: "missing_print"
          };
        }
        
        return { valid: true, message: "✅ Excellent! You built a list of dictionaries!" };
      }
    },
    
    {
      id: 5,
      title: "Filter List of Dicts with Condition",
      difficulty: "Advanced",
      points: 16,
      conceptBox: {
        title: "Conditional Processing of List of Dicts",
        content: "Loop through list, check each dictionary's values, and collect/process items that meet criteria.",
        syntax: "for item in items:\n    if item['value'] > 10:\n        results.append(item['name'])",
        rule: "Access dictionary values to make decisions. Can build new lists based on conditions."
      },
      description: "Given: students = [{'name': 'Alice', 'gpa': 3.8}, {'name': 'Bob', 'gpa': 3.3}, {'name': 'Carol', 'gpa': 3.9}]. Create empty list honors. Loop through students. If gpa >= 3.5, append the student's NAME to honors list. Print honors.",
      scenario: "Generate honors list showing only names of students with GPA 3.5 or higher.",
      
      skeleton: `students = [{'name': 'Alice', 'gpa': 3.8}, {'name': 'Bob', 'gpa': 3.3}, {'name': 'Carol', 'gpa': 3.9}]
honors = _____
for student in _____:
    if student[_____] _____ 3.5:
        honors._____(student[_____])
print(honors)`,
      
      hint: "honors = []. Loop: for student in students. Check: if student['gpa'] >= 3.5. Append: honors.append(student['name'])",
      
      solution: `students = [{'name': 'Alice', 'gpa': 3.8}, {'name': 'Bob', 'gpa': 3.3}, {'name': 'Carol', 'gpa': 3.9}]
honors = []
for student in students:
    if student['gpa'] >= 3.5:
        honors.append(student['name'])
print(honors)`,
      
      commonMistakes: [
        "Using > instead of >= (3.5 exactly should qualify!)",
        "Appending whole dictionary instead of just the name",
        "Not initializing empty honors list first",
        "Checking condition outside loop (only checks once!)",
        "Missing colon : after if statement"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('honors = []')) {
          return { 
            valid: false, 
            message: "❌ Initialize empty list: honors = []",
            mistake: "missing_empty_list"
          };
        }
        
        if (!trimmed.includes('for student in students')) {
          return { 
            valid: false, 
            message: "❌ Loop through students: for student in students:",
            mistake: "missing_loop"
          };
        }
        
        if (!trimmed.includes('if ')) {
          return { 
            valid: false, 
            message: "❌ Need if statement to check GPA!",
            mistake: "missing_condition"
          };
        }
        
        if (trimmed.includes('student[\'gpa\'] >') && !trimmed.includes('>=')) {
          return { 
            valid: false, 
            message: "❌ Use >= not >! GPA of exactly 3.5 should qualify!",
            mistake: "wrong_operator"
          };
        }
        
        if (!trimmed.includes("student['gpa']") && !trimmed.includes('student["gpa"]')) {
          return { 
            valid: false, 
            message: "❌ Check GPA with student['gpa']",
            mistake: "missing_gpa_access"
          };
        }
        
        if (!trimmed.includes('3.5')) {
          return { 
            valid: false, 
            message: "❌ Compare to 3.5: if student['gpa'] >= 3.5",
            mistake: "wrong_threshold"
          };
        }
        
        if (trimmed.includes('honors.append(student)') && !trimmed.includes("student['name']")) {
          return { 
            valid: false, 
            message: "❌ Append just the NAME, not whole dictionary! Use student['name']",
            mistake: "appending_whole_dict"
          };
        }
        
        if (!trimmed.includes("student['name']") && !trimmed.includes('student["name"]')) {
          return { 
            valid: false, 
            message: "❌ Append the student's name: honors.append(student['name'])",
            mistake: "not_getting_name"
          };
        }
        
        if (!trimmed.includes('print(honors)')) {
          return { 
            valid: false, 
            message: "❌ Print the honors list: print(honors)",
            mistake: "missing_print"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You filtered a list of dictionaries!" };
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tool 1C: Lists & Dicts Together</h1>
              <p className="text-purple-100 text-lg">Combine lists and dictionaries for powerful data structures</p>
            </div>
            <Trophy className="w-16 h-16 text-yellow-300" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-purple-100 text-sm">Your Score</div>
              <div className="text-3xl font-bold">{score} / {totalPoints}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-purple-100 text-sm">Progress</div>
              <div className="text-3xl font-bold">{completedExercises.size} / {exercises.length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-purple-100 text-sm">Current Exercise</div>
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
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Book className="w-6 h-6 text-purple-700" />
                <h3 className="text-xl font-bold text-purple-900">{currentEx.conceptBox.title}</h3>
              </div>
              <p className="text-purple-900 mb-3">{currentEx.conceptBox.content}</p>
              <div className="bg-white bg-opacity-50 p-3 rounded-lg mb-2">
                <code className="text-purple-700 font-mono text-sm whitespace-pre-wrap">{currentEx.conceptBox.syntax}</code>
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
                  <div className="mt-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <pre className="text-sm font-mono text-purple-900 whitespace-pre-wrap">{currentEx.solution}</pre>
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
                className="w-full p-4 font-mono text-sm border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-y"
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
              <h3 className="text-lg font-bold text-purple-900 mb-3">🔑 Lists & Dicts Quick Reference</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-purple-700 font-mono">[{'{'}...{'}'}, {'{'}...{'}'}]</code>
                  <p className="text-gray-700 mt-1">List of dictionaries</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-purple-700 font-mono">list[0]['key']</code>
                  <p className="text-gray-700 mt-1">Access: index first, then key</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-purple-700 font-mono">for item in list:</code>
                  <p className="text-gray-700 mt-1">Loop through each dictionary</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-purple-700 font-mono">list.append({'{'}...{'}'})</code>
                  <p className="text-gray-700 mt-1">Add dictionary to list</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-purple-700 font-mono">if dict['key'] > value:</code>
                  <p className="text-gray-700 mt-1">Conditional based on dict value</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherEdLevel1CListsDictsTogether;
