import React, { useState } from 'react';
import { GraduationCap, CheckCircle, Circle, Trophy, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import './PracticeTools.css';


const ListsDictionariesPracticeTool = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showSyntax, setShowSyntax] = useState(false);
  const [mode, setMode] = useState('full');

  const exercises = [
    {
      id: 0,
      title: "Exercise 1: Build a List",
      difficulty: "Beginner",
      points: 10,
      concept: "Creating Lists from Input",
      scenario: "You're collecting names of students who attended a study session.",
      task: "Create an empty list called 'students'. Use a for loop with range(3) to get 3 student names with input(). Append each name to the list. Then print the list.",
      hint: "students = [], then for i in range(3):, then name = input(...), then students.append(name), finally print(students)",
      skeleton: "# Create empty list\nstudents = _____\n\n# Get 3 names\nfor i in range(_____):\n    name = input('Student name: ')\n    students._____(name)\n\n# Display list\nprint(students)",
      solution: "students = []\n\nfor i in range(3):\n    name = input('Student name: ')\n    students.append(name)\n\nprint(students)",
      commonMistakes: [
        "❌ Forgetting to create empty list first: students = []",
        "❌ Using students.add(name) instead of students.append(name)",
        "❌ Not using range(3) to loop 3 times",
        "❌ Printing inside the loop instead of after"
      ],
      validate: (answer) => {
        if (!answer.match(/students\s*=\s*\[\]/)) {
          return { valid: false, message: "Create an empty list: students = []" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in ')) {
          return { valid: false, message: "Use a for loop to repeat 3 times" };
        }
        
        if (!answer.includes('range(3)')) {
          return { valid: false, message: "Use range(3) to loop 3 times" };
        }
        
        if (!answer.includes('input(')) {
          return { valid: false, message: "Use input() to get student names" };
        }
        
        if (!answer.includes('.append(')) {
          return { valid: false, message: "Use students.append(name) to add to the list" };
        }
        
        if (answer.includes('.add(')) {
          return { valid: false, message: "❌ Use append() for lists, not add()! (add() is for sets)" };
        }
        
        const loopContent = answer.substring(answer.indexOf('for '), answer.lastIndexOf('print'));
        if (loopContent.includes('print(students)')) {
          return { valid: false, message: "Print AFTER the loop, not inside it! Otherwise it prints 3 times." };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the students list at the end" };
        }
        
        return { valid: true, message: "Perfect! You built a list from user input! ✓" };
      }
    },
    {
      id: 1,
      title: "Exercise 2: Process List Items",
      difficulty: "Beginner",
      points: 10,
      concept: "Looping Through Lists",
      scenario: "You have a list of course names and want to display them all in uppercase.",
      task: "Create a list: courses = ['math', 'science', 'english']. Loop through the list with 'for course in courses:' and print each course in uppercase using .upper().",
      hint: "for course in courses:, then print(course.upper())",
      skeleton: "# Create list\ncourses = ['math', 'science', 'english']\n\n# Loop and print uppercase\nfor _____ in _____:\n    print(_____.upper())",
      solution: "courses = ['math', 'science', 'english']\n\nfor course in courses:\n    print(course.upper())",
      commonMistakes: [
        "❌ Using for i in range(len(courses)) - not needed here!",
        "❌ Forgetting .upper() method",
        "❌ Trying to modify the list (we just print, don't modify)",
        "❌ Wrong loop syntax"
      ],
      validate: (answer) => {
        if (!answer.includes('courses') || !answer.includes('[')) {
          return { valid: false, message: "Create the courses list" };
        }
        
        if (!answer.includes("'math'") && !answer.includes('"math"')) {
          return { valid: false, message: "List should contain 'math', 'science', 'english'" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in ')) {
          return { valid: false, message: "Use a for loop to go through the list" };
        }
        
        if (answer.includes('range(')) {
          return { valid: false, message: "Use 'for course in courses:', not range()!" };
        }
        
        if (!answer.includes('.upper()')) {
          return { valid: false, message: "Use .upper() to make each course uppercase" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print each uppercase course" };
        }
        
        return { valid: true, message: "Excellent! You processed each item in the list! ✓" };
      }
    },
    {
      id: 2,
      title: "Exercise 3: Filter a List",
      difficulty: "Intermediate",
      points: 15,
      concept: "Building Lists with Conditions",
      scenario: "You have a list of test scores and want to create a new list with only the passing scores (60 or higher).",
      task: "Create scores = [85, 45, 92, 58, 73]. Create an empty list called 'passing'. Loop through scores, and if a score >= 60, append it to passing. Print the passing list.",
      hint: "passing = [], loop through scores, if score >= 60: passing.append(score)",
      skeleton: "# Original scores\nscores = [85, 45, 92, 58, 73]\n\n# Create empty list for results\npassing = _____\n\n# Filter scores\nfor score in scores:\n    if score _____ 60:\n        passing._____(score)\n\n# Display\nprint(passing)",
      solution: "scores = [85, 45, 92, 58, 73]\n\npassing = []\n\nfor score in scores:\n    if score >= 60:\n        passing.append(score)\n\nprint(passing)",
      commonMistakes: [
        "❌ Not creating empty passing list first",
        "❌ Using > instead of >= (misses exactly 60)",
        "❌ Forgetting to append to passing list",
        "❌ Appending to wrong list"
      ],
      validate: (answer) => {
        if (!answer.includes('scores') || !answer.includes('[85')) {
          return { valid: false, message: "Create the scores list with the given values" };
        }
        
        if (!answer.match(/passing\s*=\s*\[\]/)) {
          return { valid: false, message: "Create empty passing list: passing = []" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in scores')) {
          return { valid: false, message: "Loop through scores: for score in scores:" };
        }
        
        if (!answer.includes('if ')) {
          return { valid: false, message: "Use an if statement to check if score >= 60" };
        }
        
        if (!answer.includes('>=')) {
          return { valid: false, message: "Use >= to include scores of 60 and higher" };
        }
        
        if (!answer.includes('passing.append(')) {
          return { valid: false, message: "Append passing scores to the passing list" };
        }
        
        if (!answer.includes('print(passing)')) {
          return { valid: false, message: "Print the passing list at the end" };
        }
        
        return { valid: true, message: "Perfect! You filtered the list to get only passing scores! ✓" };
      }
    },
    {
      id: 3,
      title: "Exercise 4: Create a Dictionary",
      difficulty: "Beginner",
      points: 10,
      concept: "Building Dictionaries",
      scenario: "You're creating a student record with their name, GPA, and major.",
      task: "Create an empty dictionary called 'student'. Get name, gpa, and major from the user with input(). Add each as a key-value pair to the dictionary (student['name'] = name, etc.). Print the dictionary.",
      hint: "student = {}, get three inputs, student['name'] = name, student['gpa'] = gpa, student['major'] = major, print(student)",
      skeleton: "# Create empty dictionary\nstudent = _____\n\n# Get info\nstudent['name'] = input('Name: ')\nstudent['gpa'] = input('GPA: ')\nstudent['major'] = input('Major: ')\n\n# Display\nprint(student)",
      solution: "student = {}\n\nstudent['name'] = input('Name: ')\nstudent['gpa'] = input('GPA: ')\nstudent['major'] = input('Major: ')\n\nprint(student)",
      commonMistakes: [
        "❌ Using student = [] (that's a list, not dictionary!)",
        "❌ Forgetting quotes around keys: student[name] instead of student['name']",
        "❌ Using = instead of dictionary syntax",
        "❌ Not creating empty dictionary first"
      ],
      validate: (answer) => {
        if (!answer.match(/student\s*=\s*\{\}/)) {
          return { valid: false, message: "Create empty dictionary: student = {} (curly braces!)" };
        }
        
        if (answer.match(/student\s*=\s*\[\]/)) {
          return { valid: false, message: "❌ Use {} for dictionaries, not []! ([] is for lists)" };
        }
        
        const inputCount = (answer.match(/input\(/g) || []).length;
        if (inputCount < 3) {
          return { valid: false, message: "Get three inputs: name, gpa, and major" };
        }
        
        if (!answer.includes("student['name']") && !answer.includes('student["name"]')) {
          return { valid: false, message: "Add name to dictionary: student['name'] = ..." };
        }
        
        if (!answer.includes("student['gpa']") && !answer.includes('student["gpa"]')) {
          return { valid: false, message: "Add gpa to dictionary: student['gpa'] = ..." };
        }
        
        if (!answer.includes("student['major']") && !answer.includes('student["major"]')) {
          return { valid: false, message: "Add major to dictionary: student['major'] = ..." };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the student dictionary" };
        }
        
        return { valid: true, message: "Excellent! You built a dictionary with key-value pairs! ✓" };
      }
    },
    {
      id: 4,
      title: "Exercise 5: Check Dictionary Keys",
      difficulty: "Intermediate",
      points: 15,
      concept: "Using 'in' with Dictionaries",
      scenario: "You have a student record but don't know if they've declared a major yet.",
      task: "Create student = {'name': 'Alice', 'gpa': '3.8'}. Use 'if' to check if the key 'major' is IN the dictionary. If yes, print it. If no, print 'No major declared'.",
      hint: "if 'major' in student: (checks KEYS not values!), then print(student['major']), else: print('No major declared')",
      skeleton: "# Student record\nstudent = {'name': 'Alice', 'gpa': '3.8'}\n\n# Check if major exists\nif _____ in student:\n    print(student['major'])\nelse:\n    print('No major declared')",
      solution: "student = {'name': 'Alice', 'gpa': '3.8'}\n\nif 'major' in student:\n    print(student['major'])\nelse:\n    print('No major declared')",
      commonMistakes: [
        "❌ Checking values: if 'Alice' in student (checks KEYS not values!)",
        "❌ Not using quotes: if major in student",
        "❌ Trying to print student.major instead of student['major']",
        "❌ Forgetting the else clause"
      ],
      validate: (answer) => {
        if (!answer.includes('student') || !answer.includes('{')) {
          return { valid: false, message: "Create the student dictionary" };
        }
        
        if (!answer.includes('if ') || !answer.includes(' in ')) {
          return { valid: false, message: "Use 'if' with 'in' to check if key exists" };
        }
        
        if (!answer.includes("'major'") && !answer.includes('"major"')) {
          return { valid: false, message: "Check if the KEY 'major' exists (with quotes!)" };
        }
        
        if (answer.includes("'Alice'") && answer.includes('in student')) {
          return { valid: false, message: "❌ 'in' checks KEYS not values! Check for 'major', not 'Alice'" };
        }
        
        if (!answer.includes('else:')) {
          return { valid: false, message: "Add an else clause for when major is missing" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print either the major or the 'No major declared' message" };
        }
        
        return { valid: true, message: "Perfect! You checked if a KEY exists in the dictionary! ✓" };
      }
    },
    {
      id: 5,
      title: "Exercise 6: Loop Through Dictionary",
      difficulty: "Intermediate",
      points: 15,
      concept: "Dictionary Iteration",
      scenario: "You want to display all the information in a student record.",
      task: "Create student = {'name': 'Bob', 'gpa': '3.5', 'major': 'Math'}. Loop through the dictionary with 'for key in student:' and print each key and its value in format 'key: value'.",
      hint: "for key in student:, then print(f'{key}: {student[key]}')",
      skeleton: "# Student record\nstudent = {'name': 'Bob', 'gpa': '3.5', 'major': 'Math'}\n\n# Display all key-value pairs\nfor _____ in student:\n    print(f'{_____}: {student[_____]}')",
      solution: "student = {'name': 'Bob', 'gpa': '3.5', 'major': 'Math'}\n\nfor key in student:\n    print(f'{key}: {student[key]}')",
      commonMistakes: [
        "❌ Using for value in student (loops through keys, not values!)",
        "❌ Forgetting to access value with student[key]",
        "❌ Using wrong bracket notation",
        "❌ Printing just key or just value instead of both"
      ],
      validate: (answer) => {
        if (!answer.includes('student') || !answer.includes('{')) {
          return { valid: false, message: "Create the student dictionary" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in student')) {
          return { valid: false, message: "Loop through dictionary: for key in student:" };
        }
        
        if (!answer.includes('student[')) {
          return { valid: false, message: "Access dictionary values with student[key]" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print each key-value pair" };
        }
        
        const forMatch = answer.match(/for\s+(\w+)\s+in\s+student/);
        if (forMatch) {
          const varName = forMatch[1];
          if (!answer.includes(`student[${varName}]`)) {
            return { valid: false, message: `Access the value with student[${varName}]` };
          }
        }
        
        return { valid: true, message: "Excellent! You looped through all dictionary keys and values! ✓" };
      }
    },
    {
      id: 6,
      title: "Exercise 7: Check if Item in List",
      difficulty: "Beginner",
      points: 10,
      concept: "Membership Testing",
      scenario: "You have a list of enrolled students and want to check if a specific student is enrolled.",
      task: "Create students = ['Alice', 'Bob', 'Carol']. Ask user for a name with input(). Check if the name is IN the students list. Print 'Enrolled!' if yes, 'Not enrolled!' if no.",
      hint: "name = input(...), if name in students:, print appropriate message",
      skeleton: "# Enrolled students\nstudents = ['Alice', 'Bob', 'Carol']\n\n# Get name to check\nname = input('Student name: ')\n\n# Check membership\nif name _____ students:\n    print('Enrolled!')\nelse:\n    print('Not enrolled!')",
      solution: "students = ['Alice', 'Bob', 'Carol']\n\nname = input('Student name: ')\n\nif name in students:\n    print('Enrolled!')\nelse:\n    print('Not enrolled!')",
      commonMistakes: [
        "❌ Forgetting the 'in' keyword",
        "❌ Using == to compare with whole list",
        "❌ Case sensitivity - 'alice' != 'Alice'",
        "❌ Not getting input from user"
      ],
      validate: (answer) => {
        if (!answer.includes('students') || !answer.includes('[')) {
          return { valid: false, message: "Create the students list" };
        }
        
        if (!answer.includes('input(')) {
          return { valid: false, message: "Get the name to check with input()" };
        }
        
        if (!answer.includes('if ') || !answer.includes(' in ')) {
          return { valid: false, message: "Use 'if name in students:' to check membership" };
        }
        
        if (!answer.includes('in students')) {
          return { valid: false, message: "Check if name is IN the students list" };
        }
        
        if (!answer.includes('else:')) {
          return { valid: false, message: "Add else clause for when student is not found" };
        }
        
        const printCount = (answer.match(/print\(/g) || []).length;
        if (printCount < 2) {
          return { valid: false, message: "Print one message for enrolled, another for not enrolled" };
        }
        
        return { valid: true, message: "Perfect! You checked if an item is in a list! ✓" };
      }
    },
    {
      id: 7,
      title: "Exercise 8: Count List Items",
      difficulty: "Beginner",
      points: 10,
      concept: "Using len()",
      scenario: "You want to know how many students are enrolled in a course.",
      task: "Create students = ['Alice', 'Bob', 'Carol', 'Dan', 'Eve']. Use len() to count how many students there are and print the result in format 'Total students: X'.",
      hint: "count = len(students), then print(f'Total students: {count}')",
      skeleton: "# Student list\nstudents = ['Alice', 'Bob', 'Carol', 'Dan', 'Eve']\n\n# Count students\ncount = _____(students)\n\n# Display\nprint(f'Total students: {count}')",
      solution: "students = ['Alice', 'Bob', 'Carol', 'Dan', 'Eve']\n\ncount = len(students)\n\nprint(f'Total students: {count}')",
      commonMistakes: [
        "❌ Using COUNT(students) - that's SQL, not Python!",
        "❌ Using students.length instead of len(students)",
        "❌ Trying to count manually with a loop (len() is easier!)",
        "❌ Forgetting to store result in variable"
      ],
      validate: (answer) => {
        if (!answer.includes('students') || !answer.includes('[')) {
          return { valid: false, message: "Create the students list" };
        }
        
        if (!answer.includes('len(')) {
          return { valid: false, message: "Use len(students) to count items in the list" };
        }
        
        if (answer.toUpperCase().includes('COUNT(')) {
          return { valid: false, message: "❌ COUNT() is SQL! In Python, use len()" };
        }
        
        if (answer.includes('.length')) {
          return { valid: false, message: "❌ .length is JavaScript! In Python, use len()" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the count" };
        }
        
        return { valid: true, message: "Excellent! You used len() to count list items! ✓" };
      }
    },
    {
      id: 8,
      title: "Exercise 9: Modify List Items",
      difficulty: "Advanced",
      points: 20,
      concept: "Modifying Lists by Index",
      scenario: "You have a list of lowercase names and want to convert them all to uppercase in the original list.",
      task: "Create names = ['alice', 'bob', 'carol']. Use 'for i in range(len(names)):' to loop by index. Inside the loop, set names[i] = names[i].upper(). Print the modified list.",
      hint: "for i in range(len(names)):, then names[i] = names[i].upper(), finally print(names)",
      skeleton: "# Original list\nnames = ['alice', 'bob', 'carol']\n\n# Modify each item\nfor i in range(len(names)):\n    names[i] = names[i]._____\n\n# Display modified list\nprint(names)",
      solution: "names = ['alice', 'bob', 'carol']\n\nfor i in range(len(names)):\n    names[i] = names[i].upper()\n\nprint(names)",
      commonMistakes: [
        "❌ Using for name in names (can't modify original list this way!)",
        "❌ Forgetting .upper() method",
        "❌ Not using index to modify: names[i] = ...",
        "❌ Creating new list instead of modifying original"
      ],
      validate: (answer) => {
        if (!answer.includes('names') || !answer.includes('[')) {
          return { valid: false, message: "Create the names list" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in ')) {
          return { valid: false, message: "Use a for loop" };
        }
        
        if (!answer.includes('range(len(names))')) {
          return { valid: false, message: "Use range(len(names)) to loop by index" };
        }
        
        if (answer.includes('for name in names')) {
          return { valid: false, message: "❌ Use 'for i in range(len(names))' to modify the list!" };
        }
        
        if (!answer.includes('names[i]') || !answer.includes('names[i] =')) {
          return { valid: false, message: "Modify items using names[i] = names[i].upper()" };
        }
        
        if (!answer.includes('.upper()')) {
          return { valid: false, message: "Use .upper() to convert to uppercase" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the modified list" };
        }
        
        return { valid: true, message: "Perfect! You modified the original list using index notation! ✓" };
      }
    },
    {
      id: 9,
      title: "Exercise 10: Build Dictionary from Lists",
      difficulty: "Advanced",
      points: 20,
      concept: "Combining Lists and Dictionaries",
      scenario: "You have parallel lists of student names and GPAs, and want to create a dictionary mapping each name to their GPA.",
      task: "Create names = ['Alice', 'Bob', 'Carol'] and gpas = [3.8, 3.5, 3.9]. Create empty dictionary 'grades'. Use 'for i in range(len(names)):' to loop and add grades[names[i]] = gpas[i]. Print the grades dictionary.",
      hint: "grades = {}, for i in range(len(names)):, grades[names[i]] = gpas[i], print(grades)",
      skeleton: "# Parallel lists\nnames = ['Alice', 'Bob', 'Carol']\ngpas = [3.8, 3.5, 3.9]\n\n# Create dictionary\ngrades = _____\n\n# Build dictionary from lists\nfor i in range(len(names)):\n    grades[names[i]] = _____[i]\n\n# Display\nprint(grades)",
      solution: "names = ['Alice', 'Bob', 'Carol']\ngpas = [3.8, 3.5, 3.9]\n\ngrades = {}\n\nfor i in range(len(names)):\n    grades[names[i]] = gpas[i]\n\nprint(grades)",
      commonMistakes: [
        "❌ Not creating empty dictionary first",
        "❌ Using wrong index: gpas[names[i]] instead of gpas[i]",
        "❌ Creating list instead of dictionary",
        "❌ Mixing up which list is key vs value"
      ],
      validate: (answer) => {
        if (!answer.includes('names') || !answer.includes('gpas')) {
          return { valid: false, message: "Create both the names and gpas lists" };
        }
        
        if (!answer.match(/grades\s*=\s*\{\}/)) {
          return { valid: false, message: "Create empty dictionary: grades = {}" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in ')) {
          return { valid: false, message: "Use a for loop" };
        }
        
        if (!answer.includes('range(len(names))')) {
          return { valid: false, message: "Use range(len(names)) to loop through both lists" };
        }
        
        if (!answer.includes('grades[names[i]]')) {
          return { valid: false, message: "Use names[i] as the dictionary key: grades[names[i]] = ..." };
        }
        
        if (!answer.includes('gpas[i]')) {
          return { valid: false, message: "Use gpas[i] as the dictionary value: ... = gpas[i]" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the grades dictionary" };
        }
        
        return { valid: true, message: "🎉 PERFECT! You built a dictionary from parallel lists! ✓" };
      }
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-purple-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Lists & Dictionaries Practice</h1>
                <p className="text-gray-600">Python Patterns - Tool #1</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold text-purple-600">{totalPoints}/{maxPoints}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-purple-600 h-3 rounded-full transition-all duration-500"
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
                    ? 'bg-purple-600 text-white'
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
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
                    {currentExerciseData.points} pts
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                  Concept: {currentExerciseData.concept}
                </span>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">📚 Scenario:</p>
                <p className="text-gray-700 mb-3">{currentExerciseData.scenario}</p>
                <p className="text-sm font-semibold text-gray-700 mb-2">🎯 Your Task:</p>
                <p className="text-gray-700 font-medium">{currentExerciseData.task}</p>
              </div>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={clearAnswer}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    mode === 'full' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Full Practice
                </button>
                <button
                  onClick={loadSkeleton}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    mode === 'skeleton' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Skeleton Mode
                </button>
              </div>

              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Write your Python code here..."
                className="w-full h-64 p-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-purple-500 focus:outline-none mb-4 bg-gray-50"
              />

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="font-semibold text-gray-700 mb-2">⚠️ Common Mistakes to Avoid:</p>
                <ul className="space-y-1">
                  {currentExerciseData.commonMistakes.map((mistake, index) => (
                    <li key={index} className="text-sm text-gray-700">{mistake}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={handleCheckAnswer}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
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
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <h4 className="font-semibold text-gray-700 mb-1">Create List</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">my_list = []</code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Add to List</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">my_list.append(item)</code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Loop Through List</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      for item in my_list:<br />
                      &nbsp;&nbsp;print(item)
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Create Dictionary</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">my_dict = {}</code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Add to Dictionary</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">my_dict['key'] = 'value'</code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Check if Key Exists</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      if 'key' in my_dict:<br />
                      &nbsp;&nbsp;# key exists
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Loop Through Dictionary</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      for key in my_dict:<br />
                      &nbsp;&nbsp;print(my_dict[key])
                    </code>
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="font-semibold text-gray-700 mb-2">Remember:</h4>
                    <ul className="text-xs space-y-1 text-gray-600">
                      <li>✓ Lists use []</li>
                      <li>✓ Dictionaries use {}</li>
                      <li>✓ 'in' checks KEYS for dictionaries</li>
                      <li>✓ Use append() to add to lists</li>
                      <li>✓ Use len() to count items</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {completedExercises.length === exercises.length && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-8 mt-6 text-center text-white">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Excellent Work! 🎉</h2>
            <p className="text-xl mb-4">You've mastered Lists & Dictionaries!</p>
            <p className="text-lg mb-2">Total Points: {totalPoints}/{maxPoints}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListsDictionariesPracticeTool;