import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Trophy, Target, Book, Code, Eye, EyeOff, Lightbulb, AlertTriangle, ChevronDown } from 'lucide-react';
import './PracticeTools.css';


const HigherEdLevel2BCountAccumulator = () => {
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
      title: "Count Items",
      difficulty: "Beginner",
      points: 12,
      conceptBox: {
        title: "Counting with Accumulator",
        content: "A counter starts at 0 and increments by 1 for each item. Use count += 1 to count!",
        syntax: "count = 0\nfor item in items:\n    count += 1",
        rule: "Initialize count = 0. Increment count += 1 in loop (not count += item)."
      },
      description: "Given: students = ['Alice', 'Bob', 'Carol', 'David']. Use a counter to count how many students. Print 'Student count: X'.",
      scenario: "Registrar needs enrollment count for a course section.",
      
      skeleton: `students = ['Alice', 'Bob', 'Carol', 'David']
count = ___
for student in _____:
    count ___ 1
print(f'Student count: {_____}')`,
      
      hint: "count = 0 before loop, count += 1 in loop (increment by 1 each time)",
      
      solution: `students = ['Alice', 'Bob', 'Carol', 'David']
count = 0
for student in students:
    count += 1
print(f'Student count: {count}')`,
      
      commonMistakes: [
        "Using len(students) instead of manual counting",
        "Not initializing count = 0",
        "Using count = count + 1 instead of count += 1 (both work but += preferred)",
        "Initializing inside loop (resets to 0 each time!)",
        "Incrementing by student instead of 1 (count += student causes TypeError)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (trimmed.includes('len(students)')) {
          return { 
            valid: false, 
            message: "❌ Don't use len()! Practice manual counting with a loop.",
            mistake: "using_len"
          };
        }
        
        if (!trimmed.includes('count = 0')) {
          return { 
            valid: false, 
            message: "❌ Initialize counter: count = 0",
            mistake: "missing_init"
          };
        }
        
        if (!trimmed.includes('for student in students')) {
          return { 
            valid: false, 
            message: "❌ Loop through students: for student in students:",
            mistake: "wrong_loop"
          };
        }
        
        if (trimmed.includes('count += student')) {
          return { 
            valid: false, 
            message: "❌ Increment by 1, not by student! Use count += 1",
            mistake: "wrong_increment"
          };
        }
        
        if (!trimmed.includes('count += 1')) {
          return { 
            valid: false, 
            message: "❌ Increment counter: count += 1",
            mistake: "missing_increment"
          };
        }
        
        if (!trimmed.includes('{count}')) {
          return { 
            valid: false, 
            message: "❌ Include {count} in f-string!",
            mistake: "missing_placeholder"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You've mastered counting!" };
      }
    },
    
    {
      id: 2,
      title: "Conditional Count",
      difficulty: "Beginner",
      points: 13,
      conceptBox: {
        title: "Conditional Counting",
        content: "Only increment when condition is true. Check BEFORE incrementing!",
        syntax: "count = 0\nfor grade in grades:\n    if grade >= 70:\n        count += 1",
        rule: "Put if statement INSIDE loop, BEFORE count += 1."
      },
      description: "Given: grades = [85, 67, 92, 55, 78, 90]. Count how many passing grades (>= 70). Print 'Passing: X'.",
      scenario: "Calculate pass rate for a course.",
      
      skeleton: `grades = [85, 67, 92, 55, 78, 90]
passing = ___
for grade in _____:
    if grade ___ 70:
        passing ___ 1
print(f'Passing: {_____}')`,
      
      hint: "Only increment if grade >= 70. Use if statement inside loop.",
      
      solution: `grades = [85, 67, 92, 55, 78, 90]
passing = 0
for grade in grades:
    if grade >= 70:
        passing += 1
print(f'Passing: {passing}')`,
      
      commonMistakes: [
        "Using > instead of >= (70 should count!)",
        "Incrementing outside if (counts all grades)",
        "Using 'and' with wrong logic",
        "Adding grade value instead of 1",
        "Wrong variable in print"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('passing = 0')) {
          return { 
            valid: false, 
            message: "❌ Initialize passing = 0",
            mistake: "missing_init"
          };
        }
        
        if (!trimmed.includes('if ')) {
          return { 
            valid: false, 
            message: "❌ Need if statement to check passing!",
            mistake: "missing_condition"
          };
        }
        
        if (trimmed.includes('if grade > 70') && !trimmed.includes('>=')) {
          return { 
            valid: false, 
            message: "❌ Use >= not >! Grade of 70 should count!",
            mistake: "wrong_operator"
          };
        }
        
        if (trimmed.includes('passing += grade')) {
          return { 
            valid: false, 
            message: "❌ Count by 1, not by grade value! Use passing += 1",
            mistake: "adding_value"
          };
        }
        
        if (!trimmed.includes('    passing += 1')) {
          return { 
            valid: false, 
            message: "❌ Increment INSIDE if block: passing += 1",
            mistake: "not_indented"
          };
        }
        
        return { valid: true, message: "✅ Excellent! Conditional counting mastered!" };
      }
    },
    
    {
      id: 3,
      title: "Count by Property",
      difficulty: "Intermediate",
      points: 14,
      conceptBox: {
        title: "Counting with Dictionary Values",
        content: "Check dictionary values to decide whether to count. Access value, then compare, then increment.",
        syntax: "count = 0\nfor item in items:\n    if item['value'] == target:\n        count += 1",
        rule: "Access dict value with ['key'], check condition, then count += 1."
      },
      description: "Given: courses = [{'code': 'CS101', 'credits': 4}, {'code': 'MATH203', 'credits': 3}, {'code': 'ENG105', 'credits': 4}]. Count courses with 4 credits. Print '4-credit courses: X'.",
      scenario: "Advising needs to know how many high-credit courses are available.",
      
      skeleton: `courses = [{'code': 'CS101', 'credits': 4}, {'code': 'MATH203', 'credits': 3}, {'code': 'ENG105', 'credits': 4}]
count = ___
for course in _____:
    if course[_____] ___ 4:
        count ___ 1
print(f'4-credit courses: {_____}')`,
      
      hint: "Access credits with course['credits'], check if == 4",
      
      solution: `courses = [{'code': 'CS101', 'credits': 4}, {'code': 'MATH203', 'credits': 3}, {'code': 'ENG105', 'credits': 4}]
count = 0
for course in courses:
    if course['credits'] == 4:
        count += 1
print(f'4-credit courses: {count}')`,
      
      commonMistakes: [
        "Using >= instead of == (counts 4+ not exactly 4)",
        "Wrong key access (course.credits or course[credits])",
        "Checking wrong field (code instead of credits)",
        "Using = instead of == for comparison",
        "Missing quotes on dictionary key"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('count = 0')) {
          return { 
            valid: false, 
            message: "❌ Initialize count = 0",
            mistake: "missing_init"
          };
        }
        
        if (trimmed.includes('course.credits')) {
          return { 
            valid: false, 
            message: "❌ Use brackets not dot! course['credits']",
            mistake: "dot_notation"
          };
        }
        
        if (!trimmed.includes("course['credits']") && !trimmed.includes('course["credits"]')) {
          return { 
            valid: false, 
            message: "❌ Access credits with course['credits']",
            mistake: "missing_key_access"
          };
        }
        
        if (trimmed.includes('>=') && !trimmed.includes('==')) {
          return { 
            valid: false, 
            message: "❌ Use == not >=! Count exactly 4 credits.",
            mistake: "wrong_operator"
          };
        }
        
        if (!trimmed.includes('count += 1')) {
          return { 
            valid: false, 
            message: "❌ Increment count by 1",
            mistake: "missing_increment"
          };
        }
        
        return { valid: true, message: "✅ Perfect! Dictionary counting mastered!" };
      }
    },
    
    {
      id: 4,
      title: "Multiple Counters",
      difficulty: "Intermediate",
      points: 14,
      conceptBox: {
        title: "Multiple Independent Counters",
        content: "You can have TWO counters tracking different conditions! Each increments independently.",
        syntax: "cs = 0\nmath = 0\nfor s in students:\n    if s['major'] == 'CS':\n        cs += 1\n    elif s['major'] == 'Math':\n        math += 1",
        rule: "Initialize BOTH counters. Use if/elif so only ONE increments per item."
      },
      description: "Given: students = [{'name': 'Alice', 'major': 'CS'}, {'name': 'Bob', 'major': 'Math'}, {'name': 'Carol', 'major': 'CS'}]. Count CS majors and Math majors separately. Print both counts.",
      scenario: "Department chairs need enrollment numbers by major.",
      
      skeleton: `students = [{'name': 'Alice', 'major': 'CS'}, {'name': 'Bob', 'major': 'Math'}, {'name': 'Carol', 'major': 'CS'}]
cs_count = ___
math_count = ___
for student in _____:
    if student[_____] ___ 'CS':
        _____ += 1
    elif student[_____] ___ 'Math':
        _____ += 1
print(f'CS students: {_____}')
print(f'Math students: {_____}')`,
      
      hint: "Two counters, both start at 0. Use if/elif for different conditions.",
      
      solution: `students = [{'name': 'Alice', 'major': 'CS'}, {'name': 'Bob', 'major': 'Math'}, {'name': 'Carol', 'major': 'CS'}]
cs_count = 0
math_count = 0
for student in students:
    if student['major'] == 'CS':
        cs_count += 1
    elif student['major'] == 'Math':
        math_count += 1
print(f'CS students: {cs_count}')
print(f'Math students: {math_count}')`,
      
      commonMistakes: [
        "Only initializing one counter",
        "Using two separate if blocks instead of if/elif (both could execute)",
        "Incrementing wrong counter in wrong block",
        "Missing quotes on 'CS' or 'Math'",
        "Using = instead of == for comparison"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('cs_count = 0')) {
          return { 
            valid: false, 
            message: "❌ Initialize cs_count = 0",
            mistake: "missing_cs_init"
          };
        }
        
        if (!trimmed.includes('math_count = 0')) {
          return { 
            valid: false, 
            message: "❌ Initialize math_count = 0",
            mistake: "missing_math_init"
          };
        }
        
        if (!trimmed.includes('elif')) {
          return { 
            valid: false, 
            message: "❌ Use elif for second condition (not two separate ifs)",
            mistake: "missing_elif"
          };
        }
        
        if (!trimmed.includes('cs_count += 1') || !trimmed.includes('math_count += 1')) {
          return { 
            valid: false, 
            message: "❌ Increment both counters in their respective blocks",
            mistake: "missing_increment"
          };
        }
        
        return { valid: true, message: "✅ Excellent! Multiple counters mastered!" };
      }
    },
    
    {
      id: 5,
      title: "Complex Count with Categories",
      difficulty: "Advanced",
      points: 17,
      conceptBox: {
        title: "Non-Mutually-Exclusive Counting",
        content: "Sometimes one item can satisfy MULTIPLE conditions. Use separate if statements (not elif).",
        syntax: "freshman = 0\nfull_time = 0\nfor e in enroll:\n    if e['year'] == 1:\n        freshman += 1\n    if e['credits'] >= 12:\n        full_time += 1",
        rule: "Use two separate if statements when one item can be counted in BOTH categories."
      },
      description: "Given: enrollments = [{'student': 'Alice', 'year': 1, 'credits': 15}, {'student': 'Bob', 'year': 3, 'credits': 12}, {'student': 'Carol', 'year': 1, 'credits': 16}]. Count: (1) freshman (year 1), (2) full-time (credits >= 12). Print both.",
      scenario: "Administration needs freshman count and full-time student count.",
      
      skeleton: `enrollments = [{'student': 'Alice', 'year': 1, 'credits': 15}, {'student': 'Bob', 'year': 3, 'credits': 12}, {'student': 'Carol', 'year': 1, 'credits': 16}]
freshman = ___
full_time = ___
for e in _____:
    if e[_____] ___ 1:
        _____ += 1
    if e[_____] ___ 12:
        _____ += 1
print(f'Freshman: {_____}')
print(f'Full-time: {_____}')`,
      
      hint: "Two separate if statements (not elif!) because one student can be both freshman AND full-time.",
      
      solution: `enrollments = [{'student': 'Alice', 'year': 1, 'credits': 15}, {'student': 'Bob', 'year': 3, 'credits': 12}, {'student': 'Carol', 'year': 1, 'credits': 16}]
freshman = 0
full_time = 0
for e in enrollments:
    if e['year'] == 1:
        freshman += 1
    if e['credits'] >= 12:
        full_time += 1
print(f'Freshman: {freshman}')
print(f'Full-time: {full_time}')`,
      
      commonMistakes: [
        "Using elif instead of second if (student can be both!)",
        "Using > instead of >= for credits",
        "Checking wrong keys",
        "Only initializing one counter",
        "Using 'and' to combine conditions (wrong logic for this problem)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('freshman = 0') || !trimmed.includes('full_time = 0')) {
          return { 
            valid: false, 
            message: "❌ Initialize BOTH counters!",
            mistake: "missing_init"
          };
        }
        
        if (trimmed.includes('elif') && trimmed.match(/if.*year.*elif/)) {
          return { 
            valid: false, 
            message: "❌ Use two separate if statements (not elif)! Student can be BOTH freshman AND full-time.",
            mistake: "using_elif"
          };
        }
        
        if (trimmed.includes('> 12') && !trimmed.includes('>=')) {
          return { 
            valid: false, 
            message: "❌ Use >= not >! 12 credits exactly counts as full-time.",
            mistake: "wrong_operator"
          };
        }
        
        if (!trimmed.includes('freshman += 1') || !trimmed.includes('full_time += 1')) {
          return { 
            valid: false, 
            message: "❌ Increment both counters!",
            mistake: "missing_increment"
          };
        }
        
        return { valid: true, message: "✅ Perfect! Complex counting mastered!" };
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-yellow-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tool 2B: Count Accumulator</h1>
              <p className="text-amber-100 text-lg">Master counting techniques with conditional logic</p>
            </div>
            <Trophy className="w-16 h-16 text-yellow-300" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-amber-100 text-sm">Your Score</div>
              <div className="text-3xl font-bold">{score} / {totalPoints}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-amber-100 text-sm">Progress</div>
              <div className="text-3xl font-bold">{completedExercises.size} / {exercises.length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-amber-100 text-sm">Current Exercise</div>
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
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Book className="w-6 h-6 text-amber-700" />
                <h3 className="text-xl font-bold text-amber-900">{currentEx.conceptBox.title}</h3>
              </div>
              <p className="text-amber-900 mb-3">{currentEx.conceptBox.content}</p>
              <div className="bg-white bg-opacity-50 p-3 rounded-lg mb-2">
                <code className="text-amber-700 font-mono text-sm whitespace-pre-wrap">{currentEx.conceptBox.syntax}</code>
              </div>
              <p className="text-sm text-amber-800 font-medium">💡 {currentEx.conceptBox.rule}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentEx.title}</h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                      {currentEx.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      {currentEx.points} points
                    </span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-amber-500" />
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 rounded">
                <p className="text-sm text-amber-800 font-medium mb-2">📚 Scenario:</p>
                <p className="text-amber-900">{currentEx.scenario}</p>
              </div>

              <div className="prose max-w-none mb-4">
                <p className="text-gray-700 text-lg leading-relaxed">{currentEx.description}</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-bold text-yellow-900">Common Mistakes to Avoid:</h3>
                </div>
                <ul className="space-y-1 text-sm text-yellow-900">
                  {currentEx.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
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
                  className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
                >
                  {showSolution ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
                {showSolution && (
                  <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <pre className="text-sm font-mono text-amber-900 whitespace-pre-wrap">{currentEx.solution}</pre>
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
                        ? 'bg-amber-500 text-white'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
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
                className="w-full p-4 font-mono text-sm border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all resize-y"
                placeholder="Write your code here or click 'Skeleton' for guided practice..."
                spellCheck="false"
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCheckAnswer}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 rounded-lg font-bold hover:from-amber-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl"
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


            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-3">🔑 Count Accumulator Quick Reference</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-amber-700 font-mono">count = 0</code>
                  <p className="text-gray-700 mt-1">Initialize counter</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-amber-700 font-mono">for item in list:</code>
                  <p className="text-gray-700 mt-1">Loop through items</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-amber-700 font-mono">count += 1</code>
                  <p className="text-gray-700 mt-1">Increment by 1</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-amber-700 font-mono">if condition: count += 1</code>
                  <p className="text-gray-700 mt-1">Conditional count</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-amber-700 font-mono">Use len() for simple counts</code>
                  <p className="text-gray-700 mt-1">Manual counting for conditional counts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherEdLevel2BCountAccumulator;
