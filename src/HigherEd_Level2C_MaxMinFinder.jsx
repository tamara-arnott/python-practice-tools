import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Trophy, Target, Book, Code, Eye, EyeOff, Lightbulb, AlertTriangle } from 'lucide-react';
import './PracticeTools.css';


const HigherEdLevel2CMaxMinFinder = () => {
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
      title: "Find Maximum",
      difficulty: "Beginner",
      points: 12,
      conceptBox: {
        title: "Finding the Largest Value",
        content: "Start with the first item as max. Compare each item - if bigger, update max. Don't start with 0!",
        syntax: "max_val = list[0]\nfor item in list:\n    if item > max_val:\n        max_val = item",
        rule: "ALWAYS start with list[0], not 0. Update when you find something bigger."
      },
      description: "Given: grades = [85, 92, 78, 95, 88]. Find the highest grade. Initialize max_grade with the first item, then check each grade. Print 'Highest grade: X'.",
      scenario: "Instructor needs to identify the top score on an exam.",
      
      skeleton: `grades = [85, 92, 78, 95, 88]
max_grade = grades[___]
for grade in _____:
    if grade ___ max_grade:
        max_grade = _____
print(f'Highest grade: {_____}')`,
      
      hint: "Start with max_grade = grades[0]. Update if grade > max_grade.",
      
      solution: `grades = [85, 92, 78, 95, 88]
max_grade = grades[0]
for grade in grades:
    if grade > max_grade:
        max_grade = grade
print(f'Highest grade: {max_grade}')`,
      
      commonMistakes: [
        "Starting with max_grade = 0 (wrong if all grades are negative or not 0-100 scale)",
        "Using >= instead of > (works but updates unnecessarily)",
        "Not updating max_grade (if grade > max_grade but forget to assign)",
        "Using max(grades) function (defeats learning purpose)",
        "Comparing to wrong variable"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (trimmed.includes('max(grades)')) {
          return { 
            valid: false, 
            message: "❌ Don't use max() function! Practice finding max manually.",
            mistake: "using_max_function"
          };
        }
        
        if (trimmed.includes('max_grade = 0')) {
          return { 
            valid: false, 
            message: "❌ Don't start with 0! Start with first item: max_grade = grades[0]",
            mistake: "starting_with_zero"
          };
        }
        
        if (!trimmed.includes('max_grade = grades[0]')) {
          return { 
            valid: false, 
            message: "❌ Initialize with first item: max_grade = grades[0]",
            mistake: "wrong_init"
          };
        }
        
        if (!trimmed.includes('if grade > max_grade')) {
          return { 
            valid: false, 
            message: "❌ Check if grade > max_grade to find bigger value",
            mistake: "wrong_comparison"
          };
        }
        
        if (!trimmed.includes('    max_grade = grade')) {
          return { 
            valid: false, 
            message: "❌ Update max_grade when you find a larger value!",
            mistake: "not_updating"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You found the maximum!" };
      }
    },
    
    {
      id: 2,
      title: "Find Minimum",
      difficulty: "Beginner",
      points: 13,
      conceptBox: {
        title: "Finding the Smallest Value",
        content: "Same pattern as max, but use < instead of >. Start with first item, update when smaller found.",
        syntax: "min_val = list[0]\nfor item in list:\n    if item < min_val:\n        min_val = item",
        rule: "Start with list[0]. Use < to find smaller values."
      },
      description: "Given: gpas = [3.8, 3.2, 3.9, 2.8, 3.5]. Find lowest GPA. Print 'Lowest GPA: X'.",
      scenario: "Academic probation office needs to identify students with lowest GPAs.",
      
      skeleton: `gpas = [3.8, 3.2, 3.9, 2.8, 3.5]
min_gpa = gpas[___]
for gpa in _____:
    if gpa ___ min_gpa:
        min_gpa = _____
print(f'Lowest GPA: {_____}')`,
      
      hint: "Start with min_gpa = gpas[0]. Update if gpa < min_gpa.",
      
      solution: `gpas = [3.8, 3.2, 3.9, 2.8, 3.5]
min_gpa = gpas[0]
for gpa in gpas:
    if gpa < min_gpa:
        min_gpa = gpa
print(f'Lowest GPA: {min_gpa}')`,
      
      commonMistakes: [
        "Using > instead of < (finds max not min!)",
        "Starting with 0 or 100 (wrong - should start with first item)",
        "Using min(gpas) function",
        "Not updating variable",
        "Comparing to original list instead of current min"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (trimmed.includes('min(gpas)')) {
          return { 
            valid: false, 
            message: "❌ Don't use min() function! Practice finding min manually.",
            mistake: "using_min_function"
          };
        }
        
        if (!trimmed.includes('min_gpa = gpas[0]')) {
          return { 
            valid: false, 
            message: "❌ Start with first item: min_gpa = gpas[0]",
            mistake: "wrong_init"
          };
        }
        
        if (trimmed.includes('if gpa > min_gpa')) {
          return { 
            valid: false, 
            message: "❌ Use < not >! You're finding MINIMUM, not maximum.",
            mistake: "wrong_operator"
          };
        }
        
        if (!trimmed.includes('if gpa < min_gpa')) {
          return { 
            valid: false, 
            message: "❌ Check if gpa < min_gpa to find smaller value",
            mistake: "missing_comparison"
          };
        }
        
        if (!trimmed.includes('min_gpa = gpa')) {
          return { 
            valid: false, 
            message: "❌ Update min_gpa when you find smaller value!",
            mistake: "not_updating"
          };
        }
        
        return { valid: true, message: "✅ Excellent! You found the minimum!" };
      }
    },
    
    {
      id: 3,
      title: "Track Max with Name",
      difficulty: "Intermediate",
      points: 14,
      conceptBox: {
        title: "Finding Max AND Associated Data",
        content: "Track BOTH the value and related info. Initialize both from first item. Update BOTH together!",
        syntax: "top_name = items[0]['name']\ntop_val = items[0]['value']\nfor item in items:\n    if item['value'] > top_val:\n        top_val = item['value']\n        top_name = item['name']",
        rule: "Initialize both variables. When updating max, update BOTH value AND name!"
      },
      description: "Given: students = [{'name': 'Alice', 'score': 85}, {'name': 'Bob', 'score': 92}, {'name': 'Carol', 'score': 88}]. Find highest score AND the student name. Print 'Top: NAME with SCORE'.",
      scenario: "Honor roll announcement needs student name and score.",
      
      skeleton: `students = [{'name': 'Alice', 'score': 85}, {'name': 'Bob', 'score': 92}, {'name': 'Carol', 'score': 88}]
top_name = students[0][_____]
top_score = students[0][_____]
for student in _____:
    if student[_____] ___ top_score:
        top_score = student[_____]
        top_name = student[_____]
print(f'Top: {_____} with {_____}')`,
      
      hint: "Initialize both name and score from first student. Update BOTH when finding new max.",
      
      solution: `students = [{'name': 'Alice', 'score': 85}, {'name': 'Bob', 'score': 92}, {'name': 'Carol', 'score': 88}]
top_name = students[0]['name']
top_score = students[0]['score']
for student in students:
    if student['score'] > top_score:
        top_score = student['score']
        top_name = student['name']
print(f'Top: {top_name} with {top_score}')`,
      
      commonMistakes: [
        "Only updating score, forgetting name",
        "Only updating name, forgetting score",
        "Getting name and score out of sync (updating at different times)",
        "Wrong dictionary key access",
        "Not initializing both variables"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes("top_name = students[0]['name']") && !trimmed.includes('top_name = students[0]["name"]')) {
          return { 
            valid: false, 
            message: "❌ Initialize top_name from first student: top_name = students[0]['name']",
            mistake: "missing_name_init"
          };
        }
        
        if (!trimmed.includes("top_score = students[0]['score']") && !trimmed.includes('top_score = students[0]["score"]')) {
          return { 
            valid: false, 
            message: "❌ Initialize top_score from first student: top_score = students[0]['score']",
            mistake: "missing_score_init"
          };
        }
        
        if (!trimmed.includes('top_score = student') || !trimmed.includes('top_name = student')) {
          return { 
            valid: false, 
            message: "❌ Update BOTH top_score and top_name when you find new max!",
            mistake: "not_updating_both"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You tracked both max value and name!" };
      }
    },
    
    {
      id: 4,
      title: "Find Both Max and Min",
      difficulty: "Intermediate",
      points: 14,
      conceptBox: {
        title: "Tracking Multiple Extremes",
        content: "Use TWO variables - one for max, one for min. Both start with first item. Use separate if statements!",
        syntax: "max_v = list[0]\nmin_v = list[0]\nfor item in list:\n    if item > max_v:\n        max_v = item\n    if item < min_v:\n        min_v = item",
        rule: "Two separate if statements (not elif!) - need to check both conditions."
      },
      description: "Given: enrollments = [42, 38, 51, 29, 45]. Find both highest and lowest enrollment. Print both.",
      scenario: "Department needs capacity planning - largest and smallest class sizes.",
      
      skeleton: `enrollments = [42, 38, 51, 29, 45]
max_enroll = enrollments[___]
min_enroll = enrollments[___]
for num in _____:
    if num ___ max_enroll:
        max_enroll = num
    if num ___ min_enroll:
        min_enroll = num
print(f'Largest class: {_____}')
print(f'Smallest class: {_____}')`,
      
      hint: "Initialize both from first item. Use two separate if statements (not elif!).",
      
      solution: `enrollments = [42, 38, 51, 29, 45]
max_enroll = enrollments[0]
min_enroll = enrollments[0]
for num in enrollments:
    if num > max_enroll:
        max_enroll = num
    if num < min_enroll:
        min_enroll = num
print(f'Largest class: {max_enroll}')
print(f'Smallest class: {min_enroll}')`,
      
      commonMistakes: [
        "Using elif instead of second if (need to check both!)",
        "Initializing max to 0 and min to 0 (wrong baseline)",
        "Swapping > and < operators",
        "Only checking one condition",
        "Using >= or <= (works but updates unnecessarily)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('max_enroll = enrollments[0]')) {
          return { 
            valid: false, 
            message: "❌ Initialize max_enroll = enrollments[0]",
            mistake: "missing_max_init"
          };
        }
        
        if (!trimmed.includes('min_enroll = enrollments[0]')) {
          return { 
            valid: false, 
            message: "❌ Initialize min_enroll = enrollments[0]",
            mistake: "missing_min_init"
          };
        }
        
        if (trimmed.includes('elif num < min_enroll')) {
          return { 
            valid: false, 
            message: "❌ Use two separate if statements, not elif! Need to check BOTH conditions.",
            mistake: "using_elif"
          };
        }
        
        if (!trimmed.includes('if num > max_enroll') || !trimmed.includes('if num < min_enroll')) {
          return { 
            valid: false, 
            message: "❌ Need both comparisons: num > max_enroll AND num < min_enroll",
            mistake: "missing_comparison"
          };
        }
        
        return { valid: true, message: "✅ Excellent! You found both max and min!" };
      }
    },
    
    {
      id: 5,
      title: "Top Student from Dicts",
      difficulty: "Advanced",
      points: 17,
      conceptBox: {
        title: "Finding Best Record from Complex Data",
        content: "Store the ENTIRE dictionary as your 'max'. Compare one field, but keep the whole record!",
        syntax: "top = items[0]\nfor item in items:\n    if item['score'] > top['score']:\n        top = item",
        rule: "top_student is a complete dictionary. Compare GPAs, update whole dict."
      },
      description: "Given: students = [{'name': 'Alice', 'major': 'CS', 'gpa': 3.8}, {'name': 'Bob', 'major': 'Math', 'gpa': 3.5}, {'name': 'Carol', 'major': 'CS', 'gpa': 3.9}]. Find the student with highest GPA. Print their name, major, and GPA.",
      scenario: "Valedictorian selection - need top student's complete information.",
      
      skeleton: `students = [{'name': 'Alice', 'major': 'CS', 'gpa': 3.8}, {'name': 'Bob', 'major': 'Math', 'gpa': 3.5}, {'name': 'Carol', 'major': 'CS', 'gpa': 3.9}]
top_student = students[___]
for student in _____:
    if student[_____] ___ top_student[_____]:
        top_student = _____
print(f"Top: {top_student[_____]}, {top_student[_____]}, GPA: {top_student[_____]}")`,
      
      hint: "Store entire dictionary as top_student. Compare GPAs. Update whole dict when finding higher GPA.",
      
      solution: `students = [{'name': 'Alice', 'major': 'CS', 'gpa': 3.8}, {'name': 'Bob', 'major': 'Math', 'gpa': 3.5}, {'name': 'Carol', 'major': 'CS', 'gpa': 3.9}]
top_student = students[0]
for student in students:
    if student['gpa'] > top_student['gpa']:
        top_student = student
print(f"Top: {top_student['name']}, {top_student['major']}, GPA: {top_student['gpa']}")`,
      
      commonMistakes: [
        "Only storing GPA, losing other information",
        "Comparing wrong fields",
        "Not updating the entire dictionary",
        "Wrong dictionary access in print",
        "Using >= instead of > (updates unnecessarily on tie)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('top_student = students[0]')) {
          return { 
            valid: false, 
            message: "❌ Initialize with first student: top_student = students[0]",
            mistake: "wrong_init"
          };
        }
        
        if (!trimmed.includes("student['gpa']") && !trimmed.includes('student["gpa"]')) {
          return { 
            valid: false, 
            message: "❌ Compare GPAs: student['gpa']",
            mistake: "not_accessing_gpa"
          };
        }
        
        if (!trimmed.includes('top_student = student')) {
          return { 
            valid: false, 
            message: "❌ Update the entire dictionary: top_student = student",
            mistake: "not_updating_dict"
          };
        }
        
        if (!trimmed.includes("top_student['name']") || !trimmed.includes("top_student['major']")) {
          return { 
            valid: false, 
            message: "❌ Print all three fields: name, major, and GPA from top_student",
            mistake: "missing_fields"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You found the best student record!" };
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tool 2C: Max/Min Finder</h1>
              <p className="text-red-100 text-lg">Find the largest and smallest values in your data</p>
            </div>
            <Trophy className="w-16 h-16 text-yellow-300" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-red-100 text-sm">Your Score</div>
              <div className="text-3xl font-bold">{score} / {totalPoints}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-red-100 text-sm">Progress</div>
              <div className="text-3xl font-bold">{completedExercises.size} / {exercises.length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-red-100 text-sm">Current Exercise</div>
              <div className="text-3xl font-bold">{currentExercise + 1} of {exercises.length}</div>
            </div>
          </div>

          <div className="mt-4 bg-white bg-opacity-20 rounded-full h-3">
            <div 
              className="bg-yellow-300 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(score / totalPoints) * 100}%` }}
            />
          </div>
        </div>

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
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-100 to-rose-100 border-2 border-red-300 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Book className="w-6 h-6 text-red-700" />
                <h3 className="text-xl font-bold text-red-900">{currentEx.conceptBox.title}</h3>
              </div>
              <p className="text-red-900 mb-3">{currentEx.conceptBox.content}</p>
              <div className="bg-white bg-opacity-50 p-3 rounded-lg mb-2">
                <code className="text-red-700 font-mono text-sm whitespace-pre-wrap">{currentEx.conceptBox.syntax}</code>
              </div>
              <p className="text-sm text-red-800 font-medium">💡 {currentEx.conceptBox.rule}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentEx.title}</h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      {currentEx.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                      {currentEx.points} points
                    </span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-red-500" />
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
                <p className="text-sm text-red-800 font-medium mb-2">📚 Scenario:</p>
                <p className="text-red-900">{currentEx.scenario}</p>
              </div>

              <div className="prose max-w-none mb-4">
                <p className="text-gray-700 text-lg leading-relaxed">{currentEx.description}</p>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <h3 className="font-bold text-rose-900">Common Mistakes to Avoid:</h3>
                </div>
                <ul className="space-y-1 text-sm text-rose-900">
                  {currentEx.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
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

              <div>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
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
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Your Code</h3>
                <div className="flex gap-2">
                  <button
                    onClick={loadSkeleton}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      mode === 'skeleton'
                        ? 'bg-red-500 text-white'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
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
                className="w-full h-96 p-4 font-mono text-sm border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                placeholder="Write your code here or click 'Skeleton' for guided practice..."
                spellCheck="false"
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCheckAnswer}
                  className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 rounded-lg font-bold hover:from-red-600 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl"
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


            <div className="bg-gradient-to-br from-red-100 to-rose-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3">🔑 Max/Min Quick Reference</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-red-700 font-mono">max_val = list[0]</code>
                  <p className="text-gray-700 mt-1">Start with first item</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-red-700 font-mono">for item in list:</code>
                  <p className="text-gray-700 mt-1">Loop through items</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-red-700 font-mono">if item > max_val:</code>
                  <p className="text-gray-700 mt-1">Check if bigger (> for max)</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-red-700 font-mono">max_val = item</code>
                  <p className="text-gray-700 mt-1">Update when found</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-red-700 font-mono">Use {'<'} for minimum</code>
                  <p className="text-gray-700 mt-1">Same pattern, different operator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherEdLevel2CMaxMinFinder;
