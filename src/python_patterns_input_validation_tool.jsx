import React, { useState } from 'react';
import { GraduationCap, CheckCircle, Circle, Trophy, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import './PracticeTools.css';


const InputValidationPracticeTool = () => {
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
      title: "Exercise 1: Validate Number Input",
      difficulty: "Beginner",
      points: 10,
      concept: "Using .isdigit() Method",
      scenario: "You need to get an age from the user, ensuring they enter a valid number.",
      task: "Use while True to create a validation loop. Get input, check if it's a digit with .isdigit(). If yes, convert to int and break. If no, print 'Please enter a number!' and loop again. Print the age.",
      hint: "while True:, age_input = input(...), if age_input.isdigit():, age = int(age_input), break, else: print error",
      skeleton: "# Validation loop\nwhile _____:\n    age_input = input('Enter age: ')\n    \n    if age_input._____():\n        age = _____(age_input)\n        _____  # Exit loop\n    else:\n        print('Please enter a number!')\n\n# Use validated age\nprint(f'Age: {age}')",
      solution: "while True:\n    age_input = input('Enter age: ')\n    \n    if age_input.isdigit():\n        age = int(age_input)\n        break\n    else:\n        print('Please enter a number!')\n\nprint(f'Age: {age}')",
      commonMistakes: [
        "❌ Not using while True (loop doesn't repeat!)",
        "❌ Forgetting break statement (infinite loop!)",
        "❌ Converting to int before checking isdigit() (crashes!)",
        "❌ Not storing input in variable before checking"
      ],
      validate: (answer) => {
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use 'while True:' to create a validation loop" };
        }
        
        if (!answer.includes('input(')) {
          return { valid: false, message: "Get input from user" };
        }
        
        if (!answer.includes('.isdigit()')) {
          return { valid: false, message: "Use .isdigit() to check if input is a number" };
        }
        
        if (!answer.includes('int(')) {
          return { valid: false, message: "Convert valid input to int" };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Use 'break' to exit the loop when input is valid" };
        }
        
        if (!answer.includes('else:')) {
          return { valid: false, message: "Use else to handle invalid input" };
        }
        
        const breakIndex = answer.indexOf('break');
        const intIndex = answer.indexOf('int(');
        
        if (breakIndex < intIndex) {
          return { valid: false, message: "❌ Convert to int BEFORE break!" };
        }
        
        return { valid: true, message: "Perfect! You validated number input! ✓" };
      }
    },
    {
      id: 1,
      title: "Exercise 2: Validate Yes/No",
      difficulty: "Beginner",
      points: 10,
      concept: "Checking Against Valid Options",
      scenario: "You need a yes/no answer and want to accept y, n, Y, or N.",
      task: "Use while True. Get input, convert to lowercase with .lower(). Check if it's in ['y', 'n']. If yes, break. If no, print error. Print the answer.",
      hint: "while True:, answer = input(...).lower(), if answer in ['y', 'n']:, break, else: error",
      skeleton: "# Get valid yes/no\nwhile True:\n    answer = input('Continue? (y/n): ')._____\n    \n    if answer _____ ['y', 'n']:\n        break\n    else:\n        print('Please enter y or n!')\n\nprint(f'You chose: {answer}')",
      solution: "while True:\n    answer = input('Continue? (y/n): ').lower()\n    \n    if answer in ['y', 'n']:\n        break\n    else:\n        print('Please enter y or n!')\n\nprint(f'You chose: {answer}')",
      commonMistakes: [
        "❌ Not using .lower() (Y and N rejected!)",
        "❌ Using == instead of in (only checks one value)",
        "❌ Forgetting break",
        "❌ Checking before converting to lowercase"
      ],
      validate: (answer) => {
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use while True for validation loop" };
        }
        
        if (!answer.includes('.lower()')) {
          return { valid: false, message: "Use .lower() to handle both uppercase and lowercase" };
        }
        
        if (!answer.includes('in ')) {
          return { valid: false, message: "Use 'in' to check if answer is in the valid list" };
        }
        
        if (!answer.includes("['y', 'n']") && !answer.includes('["y", "n"]')) {
          return { valid: false, message: "Check if answer is in ['y', 'n']" };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Use break to exit when input is valid" };
        }
        
        if (!answer.includes('else:')) {
          return { valid: false, message: "Use else to handle invalid input" };
        }
        
        return { valid: true, message: "Excellent! You validated yes/no input! ✓" };
      }
    },
    {
      id: 2,
      title: "Exercise 3: Validate Range",
      difficulty: "Intermediate",
      points: 15,
      concept: "Checking Value Boundaries",
      scenario: "You need a grade between 0 and 100.",
      task: "Use while True. Get input, check if it's a digit. If yes, convert to int and check if 0 <= grade <= 100. If valid, break. Otherwise print appropriate error. Print the grade.",
      hint: "Two validation checks: isdigit() first, then range check. Two different error messages!",
      skeleton: "# Validate grade range\nwhile True:\n    grade_input = input('Grade (0-100): ')\n    \n    if grade_input.isdigit():\n        grade = int(grade_input)\n        if _____ <= grade <= _____:\n            break\n        else:\n            print('Grade must be 0-100!')\n    else:\n        print('Please enter a number!')\n\nprint(f'Grade: {grade}')",
      solution: "while True:\n    grade_input = input('Grade (0-100): ')\n    \n    if grade_input.isdigit():\n        grade = int(grade_input)\n        if 0 <= grade <= 100:\n            break\n        else:\n            print('Grade must be 0-100!')\n    else:\n        print('Please enter a number!')\n\nprint(f'Grade: {grade}')",
      commonMistakes: [
        "❌ Only checking range, not if it's a number (crashes on text!)",
        "❌ Using and instead of chained comparison",
        "❌ Wrong order: checking range before isdigit()",
        "❌ Not having two different error messages"
      ],
      validate: (answer) => {
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use while True for validation" };
        }
        
        if (!answer.includes('.isdigit()')) {
          return { valid: false, message: "First check if input is a digit with .isdigit()" };
        }
        
        if (!answer.includes('int(')) {
          return { valid: false, message: "Convert to int after validating it's a digit" };
        }
        
        if (!answer.includes('0 <=') || !answer.includes('<= 100')) {
          return { valid: false, message: "Check if 0 <= grade <= 100" };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Break when input is valid" };
        }
        
        const printCount = (answer.match(/print\(/g) || []).length;
        if (printCount < 3) {
          return { valid: false, message: "Need at least 3 prints: two error messages + final grade" };
        }
        
        return { valid: true, message: "Perfect! You validated both type and range! ✓" };
      }
    },
    {
      id: 3,
      title: "Exercise 4: Validate Positive Number",
      difficulty: "Intermediate",
      points: 15,
      concept: "Multiple Conditions",
      scenario: "You need a positive number (greater than 0).",
      task: "Get input, validate it's a digit, convert to int, check if > 0. If all valid, break. Print appropriate error for each problem. Print the number.",
      hint: "Check isdigit() first, then convert, then check > 0. Three different scenarios to handle!",
      skeleton: "# Get positive number\nwhile True:\n    num_input = input('Positive number: ')\n    \n    if num_input.isdigit():\n        num = int(num_input)\n        if num _____ 0:\n            break\n        else:\n            print('Must be positive!')\n    else:\n        print('Enter a number!')\n\nprint(f'Number: {num}')",
      solution: "while True:\n    num_input = input('Positive number: ')\n    \n    if num_input.isdigit():\n        num = int(num_input)\n        if num > 0:\n            break\n        else:\n            print('Must be positive!')\n    else:\n        print('Enter a number!')\n\nprint(f'Number: {num}')",
      commonMistakes: [
        "❌ Using >= 0 instead of > 0 (accepts zero!)",
        "❌ Checking > 0 before converting to int",
        "❌ Only one error message for both problems",
        "❌ Not handling zero properly"
      ],
      validate: (answer) => {
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use while True" };
        }
        
        if (!answer.includes('.isdigit()')) {
          return { valid: false, message: "Check if input is a digit" };
        }
        
        if (!answer.includes('> 0')) {
          return { valid: false, message: "Check if number is > 0 (positive)" };
        }
        
        if (answer.includes('>= 0')) {
          return { valid: false, message: "❌ Use > 0 for positive, not >= 0 (that includes zero!)" };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Break when valid" };
        }
        
        return { valid: true, message: "Excellent! You validated a positive number! ✓" };
      }
    },
    {
      id: 4,
      title: "Exercise 5: Validate Float",
      difficulty: "Intermediate",
      points: 15,
      concept: "Validating Decimal Numbers",
      scenario: "You need a decimal number (like GPA: 3.8).",
      task: "Use try/except! Try to convert input to float. If it works, break. If ValueError occurs, print error. This handles both integers and decimals!",
      hint: "try:, price = float(input(...)), break, except ValueError:, print error",
      skeleton: "# Get decimal number\nwhile True:\n    _____:\n        price = _____(input('Price: $'))\n        break\n    _____ ValueError:\n        print('Enter a valid number!')\n\nprint(f'Price: ${price:.2f}')",
      solution: "while True:\n    try:\n        price = float(input('Price: $'))\n        break\n    except ValueError:\n        print('Enter a valid number!')\n\nprint(f'Price: ${price:.2f}')",
      commonMistakes: [
        "❌ Using .isdigit() (doesn't work for decimals!)",
        "❌ Not using try/except for float conversion",
        "❌ Wrong exception type",
        "❌ Forgetting break in try block"
      ],
      validate: (answer) => {
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use while True for validation loop" };
        }
        
        if (!answer.includes('try:')) {
          return { valid: false, message: "Use try: to attempt float conversion" };
        }
        
        if (!answer.includes('float(')) {
          return { valid: false, message: "Use float() to convert input" };
        }
        
        if (!answer.includes('except')) {
          return { valid: false, message: "Use except to catch conversion errors" };
        }
        
        if (!answer.includes('ValueError')) {
          return { valid: false, message: "Catch ValueError specifically" };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Break when conversion succeeds" };
        }
        
        if (answer.includes('.isdigit()')) {
          return { valid: false, message: "❌ Don't use .isdigit() for floats! Use try/except instead." };
        }
        
        return { valid: true, message: "Perfect! You validated decimal input with try/except! ✓" };
      }
    },
    {
      id: 5,
      title: "Exercise 6: Menu Choice Validation",
      difficulty: "Intermediate",
      points: 15,
      concept: "Validating Menu Options",
      scenario: "You have a 3-option menu and need valid choice (1, 2, or 3).",
      task: "Print menu options. Use while True. Get input, check if it's in ['1', '2', '3']. If yes, break. If no, print error. Print the choice.",
      hint: "Print menu first! Then validate that choice in ['1', '2', '3']",
      skeleton: "# Display menu\nprint('1. Add')\nprint('2. View')\nprint('3. Quit')\n\n# Get valid choice\nwhile True:\n    choice = input('Choice: ')\n    \n    if choice _____ ['1', '2', '3']:\n        break\n    else:\n        print('Invalid! Choose 1, 2, or 3')\n\nprint(f'You chose option {choice}')",
      solution: "print('1. Add')\nprint('2. View')\nprint('3. Quit')\n\nwhile True:\n    choice = input('Choice: ')\n    \n    if choice in ['1', '2', '3']:\n        break\n    else:\n        print('Invalid! Choose 1, 2, or 3')\n\nprint(f'You chose option {choice}')",
      commonMistakes: [
        "❌ Not printing menu before getting choice",
        "❌ Using numeric comparison instead of string",
        "❌ Checking against integers [1, 2, 3] instead of strings",
        "❌ Forgetting quotes around numbers"
      ],
      validate: (answer) => {
        const printCount = (answer.match(/print\(/g) || []).length;
        if (printCount < 4) {
          return { valid: false, message: "Print menu (3 options) before validation" };
        }
        
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use while True for validation" };
        }
        
        if (!answer.includes('in ')) {
          return { valid: false, message: "Use 'in' to check if choice is valid" };
        }
        
        if (!answer.includes("['1', '2', '3']") && !answer.includes('["1", "2", "3"]')) {
          return { valid: false, message: "Check if choice in ['1', '2', '3'] (as strings!)" };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Break when choice is valid" };
        }
        
        return { valid: true, message: "Excellent! You validated menu input! ✓" };
      }
    },
    {
      id: 6,
      title: "Exercise 7: Validate Non-Empty String",
      difficulty: "Beginner",
      points: 10,
      concept: "Checking String Length",
      scenario: "You need a name, and it can't be empty.",
      task: "Use while True. Get input with .strip() to remove spaces. Check if length > 0 (or just 'if name:' works!). If valid, break. Otherwise print error. Print the name.",
      hint: "name = input(...).strip(), if name: (empty strings are False!), break",
      skeleton: "# Get non-empty name\nwhile True:\n    name = input('Name: ')._____\n    \n    if _____:  # Empty strings are False!\n        break\n    else:\n        print('Name cannot be empty!')\n\nprint(f'Hello, {name}!')",
      solution: "while True:\n    name = input('Name: ').strip()\n    \n    if name:\n        break\n    else:\n        print('Name cannot be empty!')\n\nprint(f'Hello, {name}!')",
      commonMistakes: [
        "❌ Not using .strip() (spaces count as input!)",
        "❌ Using len(name) > 0 instead of just 'if name:'",
        "❌ Not handling all-spaces input",
        "❌ Checking before stripping"
      ],
      validate: (answer) => {
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use while True for validation" };
        }
        
        if (!answer.includes('.strip()')) {
          return { valid: false, message: "Use .strip() to remove leading/trailing spaces" };
        }
        
        if (!answer.includes('if name') && !answer.includes('if len(name)')) {
          return { valid: false, message: "Check if name is not empty (if name: or if len(name) > 0)" };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Break when name is valid" };
        }
        
        if (!answer.includes('else:')) {
          return { valid: false, message: "Use else to handle empty input" };
        }
        
        return { valid: true, message: "Perfect! You validated non-empty string! ✓" };
      }
    },
    {
      id: 7,
      title: "Exercise 8: Email Validation",
      difficulty: "Advanced",
      points: 20,
      concept: "String Content Validation",
      scenario: "You need an email address (must contain @ and .).",
      task: "Use while True. Get input with .strip(). Check if '@' in email AND '.' in email. If both true, break. Otherwise print error. Print the email.",
      hint: "if '@' in email and '.' in email: (both conditions must be true)",
      skeleton: "# Get valid email\nwhile True:\n    email = input('Email: ').strip()\n    \n    if _____ in email _____ _____ in email:\n        break\n    else:\n        print('Invalid email format!')\n\nprint(f'Email: {email}')",
      solution: "while True:\n    email = input('Email: ').strip()\n    \n    if '@' in email and '.' in email:\n        break\n    else:\n        print('Invalid email format!')\n\nprint(f'Email: {email}')",
      commonMistakes: [
        "❌ Using or instead of and (only checks one!)",
        "❌ Not checking for both @ and .",
        "❌ Checking after @ symbol specifically (too complex for now!)",
        "❌ Not using .strip()"
      ],
      validate: (answer) => {
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use while True" };
        }
        
        if (!answer.includes('.strip()')) {
          return { valid: false, message: "Use .strip() to clean input" };
        }
        
        if (!answer.includes("'@' in email") && !answer.includes('"@" in email')) {
          return { valid: false, message: "Check if '@' is in the email" };
        }
        
        if (!answer.includes("'.' in email") && !answer.includes('"." in email')) {
          return { valid: false, message: "Check if '.' is in the email" };
        }
        
        if (!answer.includes(' and ')) {
          return { valid: false, message: "Use 'and' to require both @ and ." };
        }
        
        if (answer.includes(' or ')) {
          return { valid: false, message: "❌ Use 'and' not 'or'! Email needs BOTH @ and ." };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Break when email is valid" };
        }
        
        return { valid: true, message: "Excellent! You validated email format! ✓" };
      }
    },
    {
      id: 8,
      title: "Exercise 9: Validate List Length",
      difficulty: "Advanced",
      points: 20,
      concept: "Building Valid List from Input",
      scenario: "You need exactly 3 student names (no more, no less).",
      task: "Create empty list. Use for i in range(3). Inside loop, use while True to get non-empty name with validation. Append valid name to list. Print the list.",
      hint: "Nested loops! Outer for loop (3 times), inner while loop (validate each name)",
      skeleton: "# Get exactly 3 valid names\nnames = []\n\nfor i in range(3):\n    while True:\n        name = input(f'Student {i+1}: ').strip()\n        if name:\n            _____  # Exit validation loop\n        else:\n            print('Name cannot be empty!')\n    \n    names._____(name)\n\nprint(f'Students: {names}')",
      solution: "names = []\n\nfor i in range(3):\n    while True:\n        name = input(f'Student {i+1}: ').strip()\n        if name:\n            break\n        else:\n            print('Name cannot be empty!')\n    \n    names.append(name)\n\nprint(f'Students: {names}')",
      commonMistakes: [
        "❌ Only one loop (can't validate each!)",
        "❌ Appending inside while loop (adds multiple times!)",
        "❌ Breaking from wrong loop",
        "❌ Not creating empty list first"
      ],
      validate: (answer) => {
        if (!answer.match(/names\s*=\s*\[\]/)) {
          return { valid: false, message: "Create empty list: names = []" };
        }
        
        if (!answer.includes('for ') || !answer.includes('range(3)')) {
          return { valid: false, message: "Use for i in range(3) to get 3 names" };
        }
        
        if (!answer.includes('while True')) {
          return { valid: false, message: "Use while True inside the for loop to validate each name" };
        }
        
        if (!answer.includes('.strip()')) {
          return { valid: false, message: "Use .strip() to clean input" };
        }
        
        if (!answer.includes('break')) {
          return { valid: false, message: "Break from while loop when name is valid" };
        }
        
        if (!answer.includes('.append(')) {
          return { valid: false, message: "Append each valid name to the list" };
        }
        
        const breakPos = answer.indexOf('break');
        const appendPos = answer.indexOf('.append(');
        
        if (appendPos > 0 && appendPos < breakPos) {
          return { valid: false, message: "❌ Append AFTER breaking from while loop, not inside it!" };
        }
        
        return { valid: true, message: "Perfect! You validated and collected exactly 3 names! ✓" };
      }
    },
    {
      id: 9,
      title: "Exercise 10: Complete Input System",
      difficulty: "Advanced",
      points: 20,
      concept: "Multiple Validation Types Together",
      scenario: "You're creating a student record with validated name (non-empty), age (number 0-120), and GPA (decimal 0.0-4.0).",
      task: "Get and validate name (non-empty). Get and validate age (isdigit, 0-120). Get and validate GPA (float, 0.0-4.0). Store in dictionary. Print the complete record.",
      hint: "Three separate validation loops! Each with different checks. Then student = {'name': name, 'age': age, 'gpa': gpa}",
      skeleton: "# Validate name\nwhile True:\n    name = input('Name: ').strip()\n    if name:\n        break\n    print('Name required!')\n\n# Validate age\nwhile True:\n    age_input = input('Age: ')\n    if age_input.isdigit():\n        age = int(age_input)\n        if 0 <= age <= 120:\n            break\n        print('Age must be 0-120!')\n    else:\n        print('Enter a number!')\n\n# Validate GPA\nwhile True:\n    try:\n        gpa = float(input('GPA: '))\n        if 0.0 <= gpa <= 4.0:\n            break\n        print('GPA must be 0.0-4.0!')\n    except ValueError:\n        print('Enter a valid number!')\n\n# Create student record\nstudent = {'name': name, 'age': age, 'gpa': gpa}\nprint(f'Student: {student}')",
      solution: "while True:\n    name = input('Name: ').strip()\n    if name:\n        break\n    print('Name required!')\n\nwhile True:\n    age_input = input('Age: ')\n    if age_input.isdigit():\n        age = int(age_input)\n        if 0 <= age <= 120:\n            break\n        print('Age must be 0-120!')\n    else:\n        print('Enter a number!')\n\nwhile True:\n    try:\n        gpa = float(input('GPA: '))\n        if 0.0 <= gpa <= 4.0:\n            break\n        print('GPA must be 0.0-4.0!')\n    except ValueError:\n        print('Enter a valid number!')\n\nstudent = {'name': name, 'age': age, 'gpa': gpa}\nprint(f'Student: {student}')",
      commonMistakes: [
        "❌ Not using different validation for each field",
        "❌ Using isdigit() for GPA (need try/except!)",
        "❌ Not checking range after converting",
        "❌ Not creating dictionary at end"
      ],
      validate: (answer) => {
        const whileCount = (answer.match(/while True/g) || []).length;
        if (whileCount < 3) {
          return { valid: false, message: "Need 3 separate validation loops (name, age, GPA)" };
        }
        
        if (!answer.includes('.strip()')) {
          return { valid: false, message: "Use .strip() for name validation" };
        }
        
        if (!answer.includes('.isdigit()')) {
          return { valid: false, message: "Use .isdigit() for age validation" };
        }
        
        if (!answer.includes('try:') || !answer.includes('except')) {
          return { valid: false, message: "Use try/except for GPA validation" };
        }
        
        if (!answer.includes('float(')) {
          return { valid: false, message: "Convert GPA to float" };
        }
        
        if (!answer.includes('student') || !answer.includes('{')) {
          return { valid: false, message: "Create student dictionary at the end" };
        }
        
        const breakCount = (answer.match(/break/g) || []).length;
        if (breakCount < 3) {
          return { valid: false, message: "Each validation loop needs a break statement" };
        }
        
        return { valid: true, message: "🎉 PERFECT! You created a complete validated input system! ✓" };
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-orange-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Input Validation Practice</h1>
                <p className="text-gray-600">Python Patterns - Tool #3</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold text-orange-600">{totalPoints}/{maxPoints}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-orange-600 h-3 rounded-full transition-all duration-500"
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
                    ? 'bg-orange-600 text-white'
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
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-700">
                    {currentExerciseData.points} pts
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                  Concept: {currentExerciseData.concept}
                </span>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">✓ Scenario:</p>
                <p className="text-gray-700 mb-3">{currentExerciseData.scenario}</p>
                <p className="text-sm font-semibold text-gray-700 mb-2">🎯 Your Task:</p>
                <p className="text-gray-700 font-medium">{currentExerciseData.task}</p>
              </div>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={clearAnswer}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    mode === 'full' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Full Practice
                </button>
                <button
                  onClick={loadSkeleton}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    mode === 'skeleton' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Skeleton Mode
                </button>
              </div>

              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Write your Python code here..."
                className="w-full h-64 p-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-orange-500 focus:outline-none mb-4 bg-gray-50"
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
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
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
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <h4 className="font-semibold text-gray-700 mb-1">Basic Validation</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      while True:<br />
                      &nbsp;&nbsp;# get input<br />
                      &nbsp;&nbsp;# validate<br />
                      &nbsp;&nbsp;# if valid: break<br />
                      &nbsp;&nbsp;# else: error
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Check if Number</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      if input.isdigit():<br />
                      &nbsp;&nbsp;num = int(input)
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Float with try/except</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      try:<br />
                      &nbsp;&nbsp;num = float(input)<br />
                      except ValueError:<br />
                      &nbsp;&nbsp;# handle error
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Check Options</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      if choice in ['a', 'b', 'c']
                    </code>
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="font-semibold text-gray-700 mb-2">Remember:</h4>
                    <ul className="text-xs space-y-1 text-gray-600">
                      <li>✓ while True for validation</li>
                      <li>✓ break when valid</li>
                      <li>✓ .isdigit() for integers</li>
                      <li>✓ try/except for floats</li>
                      <li>✓ .strip() for strings</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {completedExercises.length === exercises.length && (
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-lg p-8 mt-6 text-center text-white">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Excellent Work! 🎉</h2>
            <p className="text-xl mb-4">You've mastered Input Validation!</p>
            <p className="text-lg mb-2">Total Points: {totalPoints}/{maxPoints}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputValidationPracticeTool;