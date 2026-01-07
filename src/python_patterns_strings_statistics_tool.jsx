import React, { useState, useEffect } from 'react';
import { GraduationCap, CheckCircle, Circle, Trophy, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import './PracticeTools.css';


const StringStatisticsPracticeTool = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showSyntax, setShowSyntax] = useState(false);
  const [mode, setMode] = useState('full');
  
  // Collapsible section states
  const [showScenario, setShowScenario] = useState(true);
  const [showTask, setShowTask] = useState(true);
  const [showMistakes, setShowMistakes] = useState(true);

  const exercises = [
    {
      id: 0,
      title: "Exercise 1: Split CSV Data",
      difficulty: "Beginner",
      points: 10,
      concept: "String split() Method",
      scenario: "You have student data in CSV format (name,GPA,major) and need to extract each part.",
      task: "Create record = 'Alice,3.8,Math'. Use .split(',') to break it into parts. Store in name, gpa, major variables. Print each on separate line.",
      hint: "parts = record.split(','), then name = parts[0], gpa = parts[1], major = parts[2]",
      skeleton: "# CSV record\nrecord = 'Alice,3.8,Math'\n\n# Split into parts\nparts = record._____(_____)\n\n# Extract values\nname = parts[_____]\ngpa = parts[_____]\nmajor = parts[_____]\n\n# Display\nprint(f'Name: {name}')\nprint(f'GPA: {gpa}')\nprint(f'Major: {major}')",
      solution: "record = 'Alice,3.8,Math'\n\nparts = record.split(',')\n\nname = parts[0]\ngpa = parts[1]\nmajor = parts[2]\n\nprint(f'Name: {name}')\nprint(f'GPA: {gpa}')\nprint(f'Major: {major}')",
      commonMistakes: [
        "❌ Forgetting quotes around comma: split(,)",
        "❌ Using wrong separator",
        "❌ Wrong index numbers (0, 1, 2 not 1, 2, 3!)",
        "❌ Not storing result of split()"
      ],
      validate: (answer) => {
        if (!answer.includes('.split(')) {
          return { valid: false, message: "Use .split() to break the string into parts" };
        }
        
        if (!answer.includes("','") && !answer.includes('","')) {
          return { valid: false, message: "Split by comma: .split(',')" };
        }
        
        if (!answer.includes('parts[0]') || !answer.includes('parts[1]') || !answer.includes('parts[2]')) {
          return { valid: false, message: "Access parts with index: parts[0], parts[1], parts[2]" };
        }
        
        const printCount = (answer.match(/print\(/g) || []).length;
        if (printCount < 3) {
          return { valid: false, message: "Print all three values (name, gpa, major)" };
        }
        
        return { valid: true, message: "Perfect! You split CSV data! ✓" };
      }
    },
    {
      id: 1,
      title: "Exercise 2: Clean User Input",
      difficulty: "Beginner",
      points: 10,
      concept: "strip() and lower() Methods",
      scenario: "User input often has extra spaces and mixed case. You need to clean it.",
      task: "Create name = '  ALICE  '. Use .strip() to remove spaces, then .lower() to make lowercase. Print the cleaned name.",
      hint: "name = name.strip().lower() (chain methods together!)",
      skeleton: "# Messy input\nname = '  ALICE  '\n\n# Clean it\nname = name._____._____\n\n# Display\nprint(f'Cleaned: {name}')",
      solution: "name = '  ALICE  '\n\nname = name.strip().lower()\n\nprint(f'Cleaned: {name}')",
      commonMistakes: [
        "❌ Only using strip() or only lower()",
        "❌ Not storing result back in name",
        "❌ Wrong order (though both work here!)",
        "❌ Forgetting parentheses after methods"
      ],
      validate: (answer) => {
        if (!answer.includes('.strip()')) {
          return { valid: false, message: "Use .strip() to remove spaces" };
        }
        
        if (!answer.includes('.lower()')) {
          return { valid: false, message: "Use .lower() to make lowercase" };
        }
        
        if (!answer.includes('name = name')) {
          return { valid: false, message: "Store the cleaned version back in name" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the cleaned name" };
        }
        
        return { valid: true, message: "Excellent! You cleaned the input! ✓" };
      }
    },
    {
      id: 2,
      title: "Exercise 3: Count Items with len()",
      difficulty: "Beginner",
      points: 10,
      concept: "Using len() Function",
      scenario: "You have a list of students and need to count how many there are.",
      task: "Create students = ['Alice', 'Bob', 'Carol', 'Dan']. Use len() to count them. Print the count.",
      hint: "count = len(students), print(count)",
      skeleton: "# Student list\nstudents = ['Alice', 'Bob', 'Carol', 'Dan']\n\n# Count students\ncount = _____(students)\n\n# Display\nprint(f'Total students: {count}')",
      solution: "students = ['Alice', 'Bob', 'Carol', 'Dan']\n\ncount = len(students)\n\nprint(f'Total students: {count}')",
      commonMistakes: [
        "❌ Using COUNT() - that's SQL!",
        "❌ Using students.length - that's JavaScript!",
        "❌ Trying to count manually with loop",
        "❌ Wrong capitalization: LEN()"
      ],
      validate: (answer) => {
        if (!answer.includes('students')) {
          return { valid: false, message: "Create the students list" };
        }
        
        if (!answer.includes('len(')) {
          return { valid: false, message: "Use len(students) to count" };
        }
        
        if (answer.toUpperCase().includes('COUNT(')) {
          return { valid: false, message: "❌ COUNT() is SQL! In Python use len()" };
        }
        
        if (answer.includes('.length')) {
          return { valid: false, message: "❌ .length is JavaScript! In Python use len()" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the count" };
        }
        
        return { valid: true, message: "Perfect! You used len() to count! ✓" };
      }
    },
    {
      id: 3,
      title: "Exercise 4: Calculate Average",
      difficulty: "Intermediate",
      points: 15,
      concept: "sum() and len() Together",
      scenario: "You want to calculate the average grade.",
      task: "Create grades = [85, 92, 78, 90, 88]. Use sum() to add them all, len() to count them. Calculate average = sum / count. Print it.",
      hint: "total = sum(grades), count = len(grades), average = total / count",
      skeleton: "# Grades\ngrades = [85, 92, 78, 90, 88]\n\n# Calculate average\ntotal = _____(grades)\ncount = _____(grades)\naverage = total _____ count\n\n# Display\nprint(f'Average: {average:.1f}')",
      solution: "grades = [85, 92, 78, 90, 88]\n\ntotal = sum(grades)\ncount = len(grades)\naverage = total / count\n\nprint(f'Average: {average:.1f}')",
      commonMistakes: [
        "❌ Using * instead of / for division",
        "❌ Dividing by hardcoded number instead of len()",
        "❌ Not using sum() function",
        "❌ Trying to loop manually"
      ],
      validate: (answer) => {
        if (!answer.includes('sum(')) {
          return { valid: false, message: "Use sum(grades) to add all grades" };
        }
        
        if (!answer.includes('len(')) {
          return { valid: false, message: "Use len(grades) to count grades" };
        }
        
        if (!answer.includes('/')) {
          return { valid: false, message: "Divide total by count to get average" };
        }
        
        if (!answer.includes('average')) {
          return { valid: false, message: "Store result in average variable" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the average" };
        }
        
        return { valid: true, message: "Excellent! You calculated an average! ✓" };
      }
    },
    {
      id: 4,
      title: "Exercise 5: Find Maximum",
      difficulty: "Intermediate",
      points: 15,
      concept: "max() Function",
      scenario: "You want to find the highest test score.",
      task: "Create scores = [78, 92, 65, 88, 95, 71]. Use max() to find the highest. Print it.",
      hint: "highest = max(scores), print(highest)",
      skeleton: "# Test scores\nscores = [78, 92, 65, 88, 95, 71]\n\n# Find highest\nhighest = _____(scores)\n\n# Display\nprint(f'Highest score: {highest}')",
      solution: "scores = [78, 92, 65, 88, 95, 71]\n\nhighest = max(scores)\n\nprint(f'Highest score: {highest}')",
      commonMistakes: [
        "❌ Using MAX() - wrong capitalization!",
        "❌ Trying to write manual loop",
        "❌ Using sorted() and taking first/last",
        "❌ Not storing result"
      ],
      validate: (answer) => {
        if (!answer.includes('max(')) {
          return { valid: false, message: "Use max(scores) to find highest" };
        }
        
        if (!answer.includes('scores')) {
          return { valid: false, message: "Create the scores list" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the highest score" };
        }
        
        return { valid: true, message: "Perfect! You found the maximum! ✓" };
      }
    },
    {
      id: 5,
      title: "Exercise 6: Join List into String",
      difficulty: "Intermediate",
      points: 15,
      concept: "join() Method",
      scenario: "You have a list of words and want to create a sentence.",
      task: "Create words = ['Python', 'is', 'awesome']. Use ' '.join(words) to combine with spaces. Print the sentence.",
      hint: "sentence = ' '.join(words) - note the space in quotes!",
      skeleton: "# Word list\nwords = ['Python', 'is', 'awesome']\n\n# Join into sentence\nsentence = _____._____(words)\n\n# Display\nprint(sentence)",
      solution: "words = ['Python', 'is', 'awesome']\n\nsentence = ' '.join(words)\n\nprint(sentence)",
      commonMistakes: [
        "❌ Using words.join(' ') - backwards!",
        "❌ Not including space in quotes",
        "❌ Using + to concatenate (works but inefficient)",
        "❌ Forgetting parentheses"
      ],
      validate: (answer) => {
        if (!answer.includes('.join(')) {
          return { valid: false, message: "Use .join() to combine list items" };
        }
        
        if (!answer.includes("' '.join") && !answer.includes('" ".join')) {
          return { valid: false, message: "Put space before .join(): ' '.join(words)" };
        }
        
        if (answer.includes('words.join(')) {
          return { valid: false, message: "❌ It's ' '.join(words), not words.join(' ')!" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the sentence" };
        }
        
        return { valid: true, message: "Excellent! You joined a list into a string! ✓" };
      }
    },
    {
      id: 6,
      title: "Exercise 7: Check if Contains",
      difficulty: "Beginner",
      points: 10,
      concept: "String 'in' Operator",
      scenario: "You want to check if a message contains a greeting.",
      task: "Create message = 'Hello, how are you?'. Check if 'hello' is in message.lower(). Print 'Greeting found!' or 'No greeting'.",
      hint: "if 'hello' in message.lower():, print found, else: print not found",
      skeleton: "# Message\nmessage = 'Hello, how are you?'\n\n# Check for greeting (case-insensitive)\nif _____ in message._____:\n    print('Greeting found!')\nelse:\n    print('No greeting')",
      solution: "message = 'Hello, how are you?'\n\nif 'hello' in message.lower():\n    print('Greeting found!')\nelse:\n    print('No greeting')",
      commonMistakes: [
        "❌ Case sensitivity: 'hello' vs 'Hello'",
        "❌ Not using .lower() for comparison",
        "❌ Using == instead of in",
        "❌ Checking message instead of message.lower()"
      ],
      validate: (answer) => {
        if (!answer.includes('message')) {
          return { valid: false, message: "Create the message variable" };
        }
        
        if (!answer.includes('if ') || !answer.includes(' in ')) {
          return { valid: false, message: "Use 'if ... in ...' to check if substring exists" };
        }
        
        if (!answer.includes('.lower()')) {
          return { valid: false, message: "Use .lower() for case-insensitive check" };
        }
        
        if (!answer.includes('else:')) {
          return { valid: false, message: "Add else clause for when greeting not found" };
        }
        
        const printCount = (answer.match(/print\(/g) || []).length;
        if (printCount < 2) {
          return { valid: false, message: "Print message for both found and not found cases" };
        }
        
        return { valid: true, message: "Perfect! You checked if string contains substring! ✓" };
      }
    },
    {
      id: 7,
      title: "Exercise 8: Replace Text",
      difficulty: "Intermediate",
      points: 15,
      concept: "replace() Method",
      scenario: "You have a template message and need to personalize it.",
      task: "Create template = 'Hello NAME, welcome!'. Use .replace('NAME', 'Alice') to personalize. Print the result.",
      hint: "message = template.replace('NAME', 'Alice')",
      skeleton: "# Template message\ntemplate = 'Hello NAME, welcome!'\n\n# Personalize\nmessage = template._____('NAME', 'Alice')\n\n# Display\nprint(message)",
      solution: "template = 'Hello NAME, welcome!'\n\nmessage = template.replace('NAME', 'Alice')\n\nprint(message)",
      commonMistakes: [
        "❌ Forgetting quotes around both arguments",
        "❌ Wrong order of arguments",
        "❌ Not storing result",
        "❌ Trying to modify original (strings are immutable!)"
      ],
      validate: (answer) => {
        if (!answer.includes('.replace(')) {
          return { valid: false, message: "Use .replace() to substitute text" };
        }
        
        if (!answer.includes("'NAME'") && !answer.includes('"NAME"')) {
          return { valid: false, message: "Replace 'NAME' with the actual name" };
        }
        
        if (!answer.includes("'Alice'") && !answer.includes('"Alice"')) {
          return { valid: false, message: "Replace NAME with 'Alice'" };
        }
        
        if (!answer.includes('message = ')) {
          return { valid: false, message: "Store the result in message variable" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the personalized message" };
        }
        
        return { valid: true, message: "Excellent! You replaced text! ✓" };
      }
    },
    {
      id: 8,
      title: "Exercise 9: Complete Statistics",
      difficulty: "Advanced",
      points: 20,
      concept: "Combining Multiple Functions",
      scenario: "You want complete statistics: count, sum, average, max, and min.",
      task: "Create numbers = [23, 67, 12, 89, 45]. Use len(), sum(), max(), min() and calculate average. Print all 5 statistics.",
      hint: "Use built-in functions! count = len(), total = sum(), highest = max(), lowest = min(), avg = total / count",
      skeleton: "# Numbers\nnumbers = [23, 67, 12, 89, 45]\n\n# Calculate statistics\ncount = len(numbers)\ntotal = sum(numbers)\nhighest = max(numbers)\nlowest = min(numbers)\naverage = total / count\n\n# Display all stats\nprint(f'Count: {count}')\nprint(f'Sum: {total}')\nprint(f'Average: {average:.1f}')\nprint(f'Max: {highest}')\nprint(f'Min: {lowest}')",
      solution: "numbers = [23, 67, 12, 89, 45]\n\ncount = len(numbers)\ntotal = sum(numbers)\nhighest = max(numbers)\nlowest = min(numbers)\naverage = total / count\n\nprint(f'Count: {count}')\nprint(f'Sum: {total}')\nprint(f'Average: {average:.1f}')\nprint(f'Max: {highest}')\nprint(f'Min: {lowest}')",
      commonMistakes: [
        "❌ Not using built-in functions",
        "❌ Calculating manually with loops",
        "❌ Using wrong function names",
        "❌ Not printing all statistics"
      ],
      validate: (answer) => {
        if (!answer.includes('len(')) {
          return { valid: false, message: "Use len() to count" };
        }
        
        if (!answer.includes('sum(')) {
          return { valid: false, message: "Use sum() to total" };
        }
        
        if (!answer.includes('max(')) {
          return { valid: false, message: "Use max() to find highest" };
        }
        
        if (!answer.includes('min(')) {
          return { valid: false, message: "Use min() to find lowest" };
        }
        
        if (!answer.includes('average')) {
          return { valid: false, message: "Calculate average" };
        }
        
        const printCount = (answer.match(/print\(/g) || []).length;
        if (printCount < 5) {
          return { valid: false, message: "Print all 5 statistics" };
        }
        
        return { valid: true, message: "Perfect! You calculated complete statistics! ✓" };
      }
    },
    {
      id: 9,
      title: "Exercise 10: Parse and Analyze CSV",
      difficulty: "Advanced",
      points: 20,
      concept: "Combining String Processing and Statistics",
      scenario: "You have CSV data and want to extract names, calculate average GPA, and find highest GPA.",
      task: "Create students = 'Alice,3.8\\nBob,3.5\\nCarol,3.9'. Split by '\\n' to get lines. For each line, split by ',' to get name and GPA. Collect GPAs as floats. Calculate average and max. Print results.",
      hint: "Split by \\n first, then split each line by comma, convert GPA to float, use list to collect GPAs, then sum/len and max",
      skeleton: "# CSV data\nstudents = 'Alice,3.8\\nBob,3.5\\nCarol,3.9'\n\n# Split into lines\nlines = students.split('\\n')\n\n# Collect GPAs\ngpas = []\nfor line in lines:\n    parts = line.split(',')\n    gpa = float(parts[1])\n    gpas.append(gpa)\n\n# Calculate statistics\naverage = sum(gpas) / len(gpas)\nhighest = max(gpas)\n\n# Display\nprint(f'Average GPA: {average:.2f}')\nprint(f'Highest GPA: {highest}')",
      solution: "students = 'Alice,3.8\\nBob,3.5\\nCarol,3.9'\n\nlines = students.split('\\n')\n\ngpas = []\nfor line in lines:\n    parts = line.split(',')\n    gpa = float(parts[1])\n    gpas.append(gpa)\n\naverage = sum(gpas) / len(gpas)\nhighest = max(gpas)\n\nprint(f'Average GPA: {average:.2f}')\nprint(f'Highest GPA: {highest}')",
      commonMistakes: [
        "❌ Not splitting by \\n first",
        "❌ Forgetting to convert to float",
        "❌ Wrong index for GPA",
        "❌ Not creating empty list for GPAs"
      ],
      validate: (answer) => {
        if (!answer.includes("split('\\n')") && !answer.includes('split("\\n")')) {
          return { valid: false, message: "First split by newline: split('\\n')" };
        }
        
        if (!answer.includes("split(',')") && !answer.includes('split(",")')) {
          return { valid: false, message: "Then split each line by comma" };
        }
        
        if (!answer.includes('float(')) {
          return { valid: false, message: "Convert GPA to float" };
        }
        
        if (!answer.includes('.append(')) {
          return { valid: false, message: "Append GPAs to list" };
        }
        
        if (!answer.includes('sum(')) {
          return { valid: false, message: "Use sum() for average" };
        }
        
        if (!answer.includes('max(')) {
          return { valid: false, message: "Use max() to find highest" };
        }
        
        const printCount = (answer.match(/print\(/g) || []).length;
        if (printCount < 2) {
          return { valid: false, message: "Print both average and highest GPA" };
        }
        
        return { valid: true, message: "🎉 PERFECT! You parsed CSV and calculated statistics! ✓" };
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

  const handleCheckAnswer = () => {
    const result = exercises[currentExercise].validate(userAnswer);
    setFeedback(result);
    
    if (result.valid && !completedExercises.includes(currentExercise)) {
      setCompletedExercises([...completedExercises, currentExercise]);
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      setShowSolution(false);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      setShowSolution(false);
    }
  };

  const loadSkeleton = () => {
    setUserAnswer(exercises[currentExercise].skeleton);
    setMode('skeleton');
  };

  const clearAnswer = () => {
    setUserAnswer('');
    setMode('full');
  };

  const totalPoints = completedExercises.reduce((sum, exerciseId) => {
    return sum + exercises[exerciseId].points;
  }, 0);

  const maxPoints = exercises.reduce((sum, ex) => sum + ex.points, 0);

  const currentExerciseData = exercises[currentExercise];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-cyan-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Strings & Statistics Practice</h1>
                <p className="text-gray-600">Python Patterns - Tool #4</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold text-cyan-600">{totalPoints}/{maxPoints}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-cyan-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedExercises.length / exercises.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedExercises.length} of {exercises.length} exercises completed
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {exercises.map((exercise, index) => (
              <button
                key={exercise.id}
                onClick={() => {
                  setCurrentExercise(index);
                  setUserAnswer('');
                  setFeedback(null);
                  setShowHint(false);
                  setShowSolution(false);
                }}
                className={`p-3 rounded-lg font-semibold transition-all ${
                  currentExercise === index
                    ? 'bg-cyan-600 text-white'
                    : completedExercises.includes(index)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {completedExercises.includes(index) ? (
                  <CheckCircle className="w-5 h-5 mx-auto" />
                ) : (
                  <Circle className="w-5 h-5 mx-auto" />
                )}
                <span className="text-xs mt-1 block">{index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{currentExerciseData.title}</h2>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    currentExerciseData.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    currentExerciseData.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentExerciseData.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-cyan-100 text-cyan-700">
                    {currentExerciseData.points} pts
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                  Concept: {currentExerciseData.concept}
                </span>
              </div>

              <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">💡 Scenario:</p>
                <p className="text-gray-700 mb-3">{currentExerciseData.scenario}</p>
                <p className="text-sm font-semibold text-gray-700 mb-2">🎯 Your Task:</p>
                <p className="text-gray-700 font-medium">{currentExerciseData.task}</p>
              </div>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={clearAnswer}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    mode === 'full' ? 'bg-cyan-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Full Practice
                </button>
                <button
                  onClick={loadSkeleton}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    mode === 'skeleton' ? 'bg-cyan-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Skeleton Mode
                </button>
              </div>

              <textarea
                ref={(el) => el && adjustTextareaHeight(el)}
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                  adjustTextareaHeight(e.target);
                }}
                style={{ minHeight: '250px', maxHeight: '500px' }}
                placeholder="Write your Python code here..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-cyan-500 focus:outline-none mb-4 bg-gray-50 resize-y"
              />

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                <CollapsibleHeader 
                  title="Common Mistakes to Avoid"
                  icon="⚠️"
                  isOpen={showMistakes}
                  onToggle={() => setShowMistakes(!showMistakes)}
                />
                {showMistakes && (
                  <div className="p-4 pt-0">
                    <ul className="space-y-1">
                      {currentExerciseData.commonMistakes.map((mistake, index) => (
                        <li key={index} className="text-sm text-gray-700">{mistake}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={handleCheckAnswer}
                  className="px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  {showHint ? 'Hide' : 'Show'} Hint
                </button>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  {showSolution ? 'Hide' : 'Show'} Solution
                </button>
              </div>

              {feedback && (
                <div className={`p-4 rounded-lg mb-4 ${
                  feedback.valid ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'
                }`}>
                  <p className={`font-semibold ${feedback.valid ? 'text-green-700' : 'text-red-700'}`}>
                    {feedback.message}
                  </p>
                </div>
              )}

              {showHint && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                  <p className="font-semibold text-gray-700 mb-2">💡 Hint:</p>
                  <p className="text-gray-700">{currentExerciseData.hint}</p>
                </div>
              )}

              {showSolution && (
                <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mb-4">
                  <p className="font-semibold text-gray-700 mb-2">✓ Solution:</p>
                  <pre className="bg-gray-800 text-green-400 p-3 rounded overflow-x-auto whitespace-pre-wrap">
                    {currentExerciseData.solution}
                  </pre>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={handlePreviousExercise}
                  disabled={currentExercise === 0}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNextExercise}
                  disabled={currentExercise === exercises.length - 1}
                  className="px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <button
                onClick={() => setShowSyntax(!showSyntax)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-lg font-bold text-gray-800">Quick Reference</h3>
                {showSyntax ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {showSyntax && (
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">String Methods</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      .split(char) - break apart<br />
                      .strip() - remove spaces<br />
                      .lower() - lowercase<br />
                      .replace(old, new)<br />
                      ' '.join(list) - combine
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Statistics</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      len(list) - count<br />
                      sum(list) - total<br />
                      max(list) - highest<br />
                      min(list) - lowest<br />
                      avg = sum/len
                    </code>
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="font-semibold text-gray-700 mb-2">Remember:</h4>
                    <ul className="text-xs space-y-1 text-gray-600">
                      <li>✓ Chain methods: .strip().lower()</li>
                      <li>✓ Use built-in functions</li>
                      <li>✓ ' '.join() not list.join()</li>
                      <li>✓ len() not COUNT()</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {completedExercises.length === exercises.length && (
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg p-8 mt-6 text-center text-white">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Excellent Work! 🎉</h2>
            <p className="text-xl mb-4">You've mastered Strings & Statistics!</p>
            <p className="text-lg mb-2">Total Points: {totalPoints}/{maxPoints}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StringStatisticsPracticeTool;