import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Trophy, Target, Book, Code, Eye, EyeOff, Lightbulb, AlertTriangle } from 'lucide-react';
import './PracticeTools.css';


const HigherEdLevel2ASumAccumulator = () => {
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
      title: "Basic Sum Total",
      difficulty: "Beginner",
      points: 10,
      conceptBox: {
        title: "The Accumulator Pattern",
        content: "An accumulator starts at 0 and adds values as you loop. This is how you calculate totals!",
        syntax: "total = 0\nfor num in numbers:\n    total += num",
        rule: "Initialize BEFORE loop (total = 0). Add INSIDE loop (total += value)."
      },
      description: "Create a variable total = 0. Given list: grades = [85, 92, 78, 90]. Use a for loop to add each grade to total. Print the total.",
      scenario: "The gradebook needs to calculate the total points earned by a student across all assignments.",
      
      skeleton: `grades = [85, 92, 78, 90]
total = ___
for grade in _____:
    total ___ grade
print(total)`,
      
      hint: "Initialize total = 0 before the loop. Use += to add: total += grade. Loop: for grade in grades:",
      
      solution: `grades = [85, 92, 78, 90]
total = 0
for grade in grades:
    total += grade
print(total)`,
      
      commonMistakes: [
        "Not initializing total = 0 (NameError: total not defined)",
        "Initializing inside loop (total = 0 in loop resets each time!)",
        "Using + instead of += (total + grade doesn't save the result)",
        "Forgetting to print total at the end",
        "Using sum(grades) instead of manual loop (defeats learning purpose)"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('total')) {
          return { 
            valid: false, 
            message: "❌ Need to create a variable called 'total'!",
            mistake: "missing_variable"
          };
        }
        
        if (trimmed.includes('sum(grades)')) {
          return { 
            valid: false, 
            message: "❌ Don't use sum() function! Build your own loop to practice the accumulator pattern.",
            mistake: "using_sum_function"
          };
        }
        
        if (!trimmed.includes('total = 0')) {
          return { 
            valid: false, 
            message: "❌ Initialize accumulator before loop: total = 0",
            mistake: "missing_initialization"
          };
        }
        
        if (trimmed.includes('for grade in grades:\n    total = 0')) {
          return { 
            valid: false, 
            message: "❌ Don't initialize INSIDE the loop! Put total = 0 BEFORE the for loop.",
            mistake: "init_inside_loop"
          };
        }
        
        if (!trimmed.includes('for grade in grades')) {
          return { 
            valid: false, 
            message: "❌ Need a for loop: for grade in grades:",
            mistake: "missing_loop"
          };
        }
        
        if (!trimmed.includes('+=')) {
          return { 
            valid: false, 
            message: "❌ Use += to add to accumulator: total += grade",
            mistake: "not_using_plus_equals"
          };
        }
        
        if (trimmed.includes('total + grade') && !trimmed.includes('total += grade')) {
          return { 
            valid: false, 
            message: "❌ total + grade calculates but doesn't save! Use total += grade",
            mistake: "not_saving_result"
          };
        }
        
        if (!trimmed.includes('print(total)')) {
          return { 
            valid: false, 
            message: "❌ Print the total at the end: print(total)",
            mistake: "missing_print"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You've mastered the basic sum accumulator!" };
      }
    },
    
    {
      id: 2,
      title: "Sum Credits",
      difficulty: "Beginner",
      points: 12,
      conceptBox: {
        title: "Accumulator with Different Variable Names",
        content: "The pattern stays the same regardless of variable names. Initialize, loop, accumulate!",
        syntax: "count = 0\nfor c in credits:\n    count += c",
        rule: "Variable names can be anything, but the pattern is always: init = 0, then += in loop."
      },
      description: "Given: credits = [4, 3, 4, 3, 1]. Create a total accumulator and calculate the sum of all credits. Print 'Total credits: X' where X is the sum.",
      scenario: "Student Services needs to verify total credits attempted for degree progress.",
      
      skeleton: `credits = [4, 3, 4, 3, 1]
total = ___
for c in _____:
    _____ += _____
print(f'Total credits: {_____}')`,
      
      hint: "total = 0, loop through credits, use total += c, f-string to format output",
      
      solution: `credits = [4, 3, 4, 3, 1]
total = 0
for c in credits:
    total += c
print(f'Total credits: {total}')`,
      
      commonMistakes: [
        "Variable name mismatch (total += credits adds whole list!)",
        "Missing f before f-string (prints literal {total})",
        "Wrong loop variable (for credits in credits overwrites list)",
        "Forgetting curly braces in f-string",
        "Not initializing total first"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('total = 0')) {
          return { 
            valid: false, 
            message: "❌ Initialize total = 0 before the loop!",
            mistake: "missing_init"
          };
        }
        
        if (trimmed.includes('for credits in credits')) {
          return { 
            valid: false, 
            message: "❌ Don't use 'credits' as loop variable! Use: for c in credits",
            mistake: "overwrites_list"
          };
        }
        
        if (!trimmed.includes('for c in credits')) {
          return { 
            valid: false, 
            message: "❌ Loop through credits: for c in credits:",
            mistake: "wrong_loop"
          };
        }
        
        if (trimmed.includes('total += credits')) {
          return { 
            valid: false, 
            message: "❌ Don't add whole list! Add each item: total += c (not total += credits)",
            mistake: "adding_whole_list"
          };
        }
        
        if (!trimmed.includes('total += c')) {
          return { 
            valid: false, 
            message: "❌ Add each credit to total: total += c",
            mistake: "missing_accumulate"
          };
        }
        
        if (!trimmed.includes("print(f'Total credits:")) {
          if (trimmed.includes("print('Total credits: {total}')")) {
            return { 
              valid: false, 
              message: "❌ Missing f before f-string! Use: print(f'Total credits: {total}')",
              mistake: "missing_f"
            };
          }
          return { 
            valid: false, 
            message: "❌ Print formatted output: print(f'Total credits: {total}')",
            mistake: "wrong_print"
          };
        }
        
        if (!trimmed.includes('{total}')) {
          return { 
            valid: false, 
            message: "❌ Include {total} in f-string to show the value!",
            mistake: "missing_placeholder"
          };
        }
        
        return { valid: true, message: "✅ Excellent! You used an f-string with the accumulator!" };
      }
    },
    
    {
      id: 3,
      title: "Sum from Dictionary",
      difficulty: "Intermediate",
      points: 13,
      conceptBox: {
        title: "Accumulating from Dictionary Values",
        content: "When looping through list of dictionaries, access the value with dict['key'] before adding.",
        syntax: "total = 0\nfor item in items:\n    total += item['amount']",
        rule: "Get the value from dictionary FIRST, then add it to accumulator."
      },
      description: "Given: tuition = [{'name': 'Alice', 'amount': 5000}, {'name': 'Bob', 'amount': 4500}]. Calculate total tuition collected from all students. Print 'Total tuition: $X'.",
      scenario: "Bursar's office needs total tuition revenue for the semester.",
      
      skeleton: `tuition = [{'name': 'Alice', 'amount': 5000}, {'name': 'Bob', 'amount': 4500}]
total = ___
for student in _____:
    total += student[_____]
print(f'Total tuition: \${_____}')`,
      
      hint: "Access dictionary value with student['amount']. Add that to total.",
      
      solution: `tuition = [{'name': 'Alice', 'amount': 5000}, {'name': 'Bob', 'amount': 4500}]
total = 0
for student in tuition:
    total += student['amount']
print(f'Total tuition: \${total}')`,
      
      commonMistakes: [
        "Adding whole dictionary (total += student) causes TypeError",
        "Wrong key access (student.amount instead of student['amount'])",
        "Forgetting quotes on key (student[amount] causes NameError)",
        "Adding name instead of amount (wrong key)",
        "Not formatting with $ sign"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('total = 0')) {
          return { 
            valid: false, 
            message: "❌ Initialize total = 0!",
            mistake: "missing_init"
          };
        }
        
        if (!trimmed.includes('for student in tuition')) {
          return { 
            valid: false, 
            message: "❌ Loop through tuition: for student in tuition:",
            mistake: "wrong_loop"
          };
        }
        
        if (trimmed.includes('total += student') && !trimmed.includes("student['amount']")) {
          return { 
            valid: false, 
            message: "❌ Can't add a dictionary! Access the amount: student['amount']",
            mistake: "adding_dict"
          };
        }
        
        if (trimmed.includes('student.amount')) {
          return { 
            valid: false, 
            message: "❌ Don't use dot notation! Use brackets: student['amount']",
            mistake: "dot_notation"
          };
        }
        
        if (trimmed.includes('student[amount]') && !trimmed.includes("'amount'")) {
          return { 
            valid: false, 
            message: "❌ Dictionary keys need quotes! Use student['amount']",
            mistake: "missing_quotes"
          };
        }
        
        if (!trimmed.includes("student['amount']") && !trimmed.includes('student["amount"]')) {
          return { 
            valid: false, 
            message: "❌ Access the amount with: student['amount']",
            mistake: "wrong_key_access"
          };
        }
        
        if (!trimmed.includes('$')) {
          return { 
            valid: false, 
            message: "❌ Format with dollar sign: print(f'Total tuition: \${total}')",
            mistake: "missing_dollar_sign"
          };
        }
        
        if (!trimmed.includes('{total}')) {
          return { 
            valid: false, 
            message: "❌ Include {total} in the f-string!",
            mistake: "missing_placeholder"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You summed values from dictionaries!" };
      }
    },
    
    {
      id: 4,
      title: "Conditional Sum",
      difficulty: "Intermediate",
      points: 14,
      conceptBox: {
        title: "Conditional Accumulation",
        content: "Only add to accumulator when a condition is met. Check BEFORE adding!",
        syntax: "total = 0\nfor grade in grades:\n    if grade >= 70:\n        total += grade",
        rule: "Put the if statement INSIDE the loop, BEFORE the += operation."
      },
      description: "Given: grades = [85, 92, 67, 90, 55, 88]. Calculate sum of only passing grades (>= 70). Print 'Passing points: X'.",
      scenario: "Academic advisor needs total points from passed courses only.",
      
      skeleton: `grades = [85, 92, 67, 90, 55, 88]
total = ___
for grade in _____:
    if grade ___ 70:
        _____ += _____
print(f'Passing points: {_____}')`,
      
      hint: "Use if grade >= 70: inside the loop before adding to total",
      
      solution: `grades = [85, 92, 67, 90, 55, 88]
total = 0
for grade in grades:
    if grade >= 70:
        total += grade
print(f'Passing points: {total}')`,
      
      commonMistakes: [
        "Using > instead of >= (70 should count as passing!)",
        "Adding before checking (total += grade outside if block)",
        "Using 'or' instead of if (wrong logic)",
        "Incrementing count instead of sum (total += 1 counts, not sums)",
        "Forgetting colon after if statement"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('total = 0')) {
          return { 
            valid: false, 
            message: "❌ Initialize total = 0!",
            mistake: "missing_init"
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
            message: "❌ Use >= not >! Grade of 70 exactly should count as passing!",
            mistake: "wrong_operator"
          };
        }
        
        if (!trimmed.includes('grade >= 70')) {
          return { 
            valid: false, 
            message: "❌ Check if grade >= 70",
            mistake: "wrong_condition"
          };
        }
        
        if (trimmed.includes('if grade >= 70') && !trimmed.includes(':')) {
          return { 
            valid: false, 
            message: "❌ Missing colon : after if statement!",
            mistake: "missing_colon"
          };
        }
        
        if (trimmed.includes('total += 1')) {
          return { 
            valid: false, 
            message: "❌ Don't just count! Add the grade value: total += grade",
            mistake: "counting_not_summing"
          };
        }
        
        if (!trimmed.includes('    total += grade')) {
          return { 
            valid: false, 
            message: "❌ Add to total INSIDE the if block (indented): total += grade",
            mistake: "not_indented"
          };
        }
        
        return { valid: true, message: "✅ Excellent! Conditional summing mastered!" };
      }
    },
    
    {
      id: 5,
      title: "Department Budget Total",
      difficulty: "Advanced",
      points: 17,
      conceptBox: {
        title: "Multiple Accumulators",
        content: "You can have TWO (or more) accumulators! One for sum, one for count. Both start at 0, both get updated in loop.",
        syntax: "total = 0\ncount = 0\nfor item in items:\n    total += item['value']\n    if item['value'] > 100:\n        count += 1",
        rule: "Initialize ALL accumulators before loop. Update each based on its purpose."
      },
      description: "Given: departments = [{'name': 'Math', 'budget': 50000}, {'name': 'Science', 'budget': 75000}, {'name': 'English', 'budget': 45000}]. Calculate total university budget. Also count how many departments have budget > 50000. Print both.",
      scenario: "University administration needs total budget and count of well-funded departments.",
      
      skeleton: `departments = [{'name': 'Math', 'budget': 50000}, {'name': 'Science', 'budget': 75000}, {'name': 'English', 'budget': 45000}]
total_budget = ___
count_large = ___
for dept in _____:
    _____ += dept[_____]
    if dept[_____] ___ 50000:
        _____ += 1
print(f'Total budget: \${_____}')
print(f'Large departments: {_____}')`,
      
      hint: "Two accumulators: total_budget for sum, count_large for count. Both start at 0.",
      
      solution: `departments = [{'name': 'Math', 'budget': 50000}, {'name': 'Science', 'budget': 75000}, {'name': 'English', 'budget': 45000}]
total_budget = 0
count_large = 0
for dept in departments:
    total_budget += dept['budget']
    if dept['budget'] > 50000:
        count_large += 1
print(f'Total budget: \${total_budget}')
print(f'Large departments: {count_large}')`,
      
      commonMistakes: [
        "Only initializing one accumulator",
        "Using >= instead of > (50000 exactly should not count as 'large')",
        "Adding to wrong accumulator",
        "Incrementing total_budget by 1 instead of summing",
        "Missing either print statement"
      ],
      
      validate: (code) => {
        const trimmed = code.trim();
        
        if (!trimmed.includes('total_budget = 0')) {
          return { 
            valid: false, 
            message: "❌ Initialize total_budget = 0",
            mistake: "missing_total_init"
          };
        }
        
        if (!trimmed.includes('count_large = 0')) {
          return { 
            valid: false, 
            message: "❌ Initialize count_large = 0 for counting!",
            mistake: "missing_count_init"
          };
        }
        
        if (!trimmed.includes('for dept in departments')) {
          return { 
            valid: false, 
            message: "❌ Loop through departments: for dept in departments:",
            mistake: "wrong_loop"
          };
        }
        
        if (!trimmed.includes("dept['budget']")) {
          return { 
            valid: false, 
            message: "❌ Access budget with dept['budget']",
            mistake: "missing_key_access"
          };
        }
        
        if (!trimmed.includes('total_budget += dept')) {
          return { 
            valid: false, 
            message: "❌ Add budget to total_budget: total_budget += dept['budget']",
            mistake: "not_summing"
          };
        }
        
        if (trimmed.includes("if dept['budget'] >= 50000")) {
          return { 
            valid: false, 
            message: "❌ Use > not >=! Budget of exactly 50000 should NOT count as 'large'",
            mistake: "wrong_operator"
          };
        }
        
        if (!trimmed.includes('> 50000')) {
          return { 
            valid: false, 
            message: "❌ Check if budget > 50000",
            mistake: "wrong_condition"
          };
        }
        
        if (!trimmed.includes('count_large += 1')) {
          return { 
            valid: false, 
            message: "❌ Increment count when budget > 50000: count_large += 1",
            mistake: "not_counting"
          };
        }
        
        if (!trimmed.includes('print(f\'Total budget:') || !trimmed.includes('print(f\'Large departments:')) {
          return { 
            valid: false, 
            message: "❌ Need BOTH print statements - one for total, one for count!",
            mistake: "missing_print"
          };
        }
        
        return { valid: true, message: "✅ Perfect! You mastered multiple accumulators!" };
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tool 2A: Sum Accumulator</h1>
              <p className="text-green-100 text-lg">Master the accumulator pattern for calculating totals</p>
            </div>
            <Trophy className="w-16 h-16 text-yellow-300" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-green-100 text-sm">Your Score</div>
              <div className="text-3xl font-bold">{score} / {totalPoints}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-green-100 text-sm">Progress</div>
              <div className="text-3xl font-bold">{completedExercises.size} / {exercises.length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-green-100 text-sm">Current Exercise</div>
              <div className="text-3xl font-bold">{currentExercise + 1} of {exercises.length}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-white bg-opacity-20 rounded-full h-3">
            <div 
              className="bg-yellow-300 h-3 rounded-full transition-all duration-500"
              style={{ width: `\${(score / totalPoints) * 100}%` }}
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
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Book className="w-6 h-6 text-green-700" />
                <h3 className="text-xl font-bold text-green-900">{currentEx.conceptBox.title}</h3>
              </div>
              <p className="text-green-900 mb-3">{currentEx.conceptBox.content}</p>
              <div className="bg-white bg-opacity-50 p-3 rounded-lg mb-2">
                <code className="text-green-700 font-mono text-sm whitespace-pre-wrap">{currentEx.conceptBox.syntax}</code>
              </div>
              <p className="text-sm text-green-800 font-medium">💡 {currentEx.conceptBox.rule}</p>
            </div>

            {/* Exercise Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentEx.title}</h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {currentEx.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                      {currentEx.points} points
                    </span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded">
                <p className="text-sm text-green-800 font-medium mb-2">📚 Scenario:</p>
                <p className="text-green-900">{currentEx.scenario}</p>
              </div>

              <div className="prose max-w-none mb-4">
                <p className="text-gray-700 text-lg leading-relaxed">{currentEx.description}</p>
              </div>

              {/* Common Mistakes */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-emerald-900">Common Mistakes to Avoid:</h3>
                </div>
                <ul className="space-y-1 text-sm text-emerald-900">
                  {currentEx.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hint Toggle */}
              <div className="mb-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
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
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                >
                  {showSolution ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
                {showSolution && (
                  <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <pre className="text-sm font-mono text-green-900 whitespace-pre-wrap">{currentEx.solution}</pre>
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
                    className={`px-4 py-2 rounded-lg font-medium transition-all \${
                      mode === 'skeleton'
                        ? 'bg-green-500 text-white'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
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
                className="w-full h-96 p-4 font-mono text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="Write your code here or click 'Skeleton' for guided practice..."
                spellCheck="false"
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCheckAnswer}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
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
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-green-900 mb-3">🔑 Sum Accumulator Quick Reference</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-green-700 font-mono">total = 0</code>
                  <p className="text-gray-700 mt-1">Initialize accumulator before loop</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-green-700 font-mono">for item in list:</code>
                  <p className="text-gray-700 mt-1">Loop through items</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-green-700 font-mono">total += item</code>
                  <p className="text-gray-700 mt-1">Add to accumulator in loop</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-green-700 font-mono">total += dict['key']</code>
                  <p className="text-gray-700 mt-1">Add dictionary value</p>
                </div>
                <div className="bg-white bg-opacity-50 p-3 rounded">
                  <code className="text-green-700 font-mono">if condition: total += value</code>
                  <p className="text-gray-700 mt-1">Conditional accumulation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherEdLevel2ASumAccumulator;
