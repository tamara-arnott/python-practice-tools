import React, { useState, useEffect } from 'react';
import { GraduationCap, CheckCircle, Circle, Trophy, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import './PracticeTools.css';


const LoopAccumulatorsPracticeTool = () => {
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
      title: "Exercise 1: Sum Accumulator",
      difficulty: "Beginner",
      points: 10,
      concept: "Adding Values with Loop",
      scenario: "You want to calculate the total points scored across all games.",
      task: "Create scores = [10, 15, 8, 12, 20]. Initialize total = 0. Loop through scores and add each score to total. Print the total.",
      hint: "total = 0, for score in scores:, total += score, print(total)",
      skeleton: "# Scores list\nscores = [10, 15, 8, 12, 20]\n\n# Initialize accumulator\ntotal = _____\n\n# Add each score\nfor score in scores:\n    total _____ score\n\n# Display result\nprint(f'Total points: {total}')",
      solution: "scores = [10, 15, 8, 12, 20]\n\ntotal = 0\n\nfor score in scores:\n    total += score\n\nprint(f'Total points: {total}')",
      commonMistakes: [
        "❌ Not initializing total = 0 before loop",
        "❌ Initializing inside loop (resets each time!)",
        "❌ Using = instead of += (replaces instead of adds)",
        "❌ Printing inside loop instead of after"
      ],
      validate: (answer) => {
        if (!answer.includes('total') || !answer.includes('= 0')) {
          return { valid: false, message: "Initialize total = 0 BEFORE the loop" };
        }
        
        const totalInitLine = answer.split('\n').find(line => line.includes('total') && line.includes('= 0'));
        const forLoopLine = answer.split('\n').find(line => line.includes('for '));
        
        if (totalInitLine && forLoopLine) {
          const initIndex = answer.indexOf(totalInitLine);
          const loopIndex = answer.indexOf(forLoopLine);
          if (initIndex > loopIndex) {
            return { valid: false, message: "Initialize total = 0 BEFORE the loop, not inside or after!" };
          }
        }
        
        if (!answer.includes('for ') || !answer.includes(' in scores')) {
          return { valid: false, message: "Loop through scores: for score in scores:" };
        }
        
        if (!answer.includes('+=') && !answer.includes('total = total +')) {
          return { valid: false, message: "Add to total: total += score (or total = total + score)" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the total at the end" };
        }
        
        return { valid: true, message: "Perfect! You used a sum accumulator to add up all values! ✓" };
      }
    },
    {
      id: 1,
      title: "Exercise 2: Count Accumulator",
      difficulty: "Beginner",
      points: 10,
      concept: "Counting with Conditions",
      scenario: "You want to count how many students passed (grade >= 60).",
      task: "Create grades = [85, 45, 92, 58, 73, 61]. Initialize count = 0. Loop through grades, and if grade >= 60, add 1 to count. Print the count.",
      hint: "count = 0, for grade in grades:, if grade >= 60:, count += 1",
      skeleton: "# Grades list\ngrades = [85, 45, 92, 58, 73, 61]\n\n# Initialize counter\ncount = _____\n\n# Count passing grades\nfor grade in grades:\n    if grade _____ 60:\n        count _____ 1\n\n# Display result\nprint(f'{count} students passed')",
      solution: "grades = [85, 45, 92, 58, 73, 61]\n\ncount = 0\n\nfor grade in grades:\n    if grade >= 60:\n        count += 1\n\nprint(f'{count} students passed')",
      commonMistakes: [
        "❌ Using > instead of >= (misses exactly 60)",
        "❌ Not initializing count before loop",
        "❌ Forgetting if statement (counts all items)",
        "❌ Using count = 1 instead of count += 1"
      ],
      validate: (answer) => {
        if (!answer.includes('count') || !answer.includes('= 0')) {
          return { valid: false, message: "Initialize count = 0 before the loop" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in grades')) {
          return { valid: false, message: "Loop through grades" };
        }
        
        if (!answer.includes('if ')) {
          return { valid: false, message: "Use if statement to check condition" };
        }
        
        if (!answer.includes('>=')) {
          return { valid: false, message: "Use >= to include scores of 60 and higher" };
        }
        
        if (!answer.includes('count += 1') && !answer.includes('count = count + 1')) {
          return { valid: false, message: "Add 1 to count: count += 1" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the count" };
        }
        
        return { valid: true, message: "Excellent! You counted items that met a condition! ✓" };
      }
    },
    {
      id: 2,
      title: "Exercise 3: Find Maximum",
      difficulty: "Intermediate",
      points: 15,
      concept: "Finding Largest Value",
      scenario: "You want to find the highest test score.",
      task: "Create scores = [78, 92, 65, 88, 95, 71]. Set max_score = scores[0] (start with first item). Loop through scores, and if score > max_score, update max_score. Print max_score.",
      hint: "max_score = scores[0], for score in scores:, if score > max_score:, max_score = score",
      skeleton: "# Test scores\nscores = [78, 92, 65, 88, 95, 71]\n\n# Initialize with first score\nmax_score = scores[_____]\n\n# Find maximum\nfor score in scores:\n    if score _____ max_score:\n        max_score = _____\n\n# Display result\nprint(f'Highest score: {max_score}')",
      solution: "scores = [78, 92, 65, 88, 95, 71]\n\nmax_score = scores[0]\n\nfor score in scores:\n    if score > max_score:\n        max_score = score\n\nprint(f'Highest score: {max_score}')",
      commonMistakes: [
        "❌ Initializing max_score = 0 (wrong if all values negative!)",
        "❌ Using >= instead of > (less efficient, same result)",
        "❌ Forgetting to update max_score inside if",
        "❌ Using max_score += score instead of max_score = score"
      ],
      validate: (answer) => {
        if (!answer.includes('max_score')) {
          return { valid: false, message: "Create max_score variable" };
        }
        
        if (!answer.includes('scores[0]')) {
          return { valid: false, message: "Initialize max_score = scores[0] (start with first item)" };
        }
        
        if (answer.includes('max_score = 0')) {
          return { valid: false, message: "❌ Don't use 0! What if all scores are negative? Use scores[0]" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in scores')) {
          return { valid: false, message: "Loop through scores" };
        }
        
        if (!answer.includes('if ')) {
          return { valid: false, message: "Use if to check if current score is larger" };
        }
        
        if (!answer.includes('>')) {
          return { valid: false, message: "Check if score > max_score" };
        }
        
        if (!answer.includes('max_score = score')) {
          return { valid: false, message: "Update max_score when you find a larger value: max_score = score" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the maximum score" };
        }
        
        return { valid: true, message: "Perfect! You found the maximum value! ✓" };
      }
    },
    {
      id: 3,
      title: "Exercise 4: Find Minimum",
      difficulty: "Intermediate",
      points: 15,
      concept: "Finding Smallest Value",
      scenario: "You want to find the cheapest price.",
      task: "Create prices = [19.99, 15.50, 22.00, 12.99, 18.75]. Set min_price = prices[0]. Loop through prices, and if price < min_price, update min_price. Print min_price.",
      hint: "min_price = prices[0], for price in prices:, if price < min_price:, min_price = price",
      skeleton: "# Price list\nprices = [19.99, 15.50, 22.00, 12.99, 18.75]\n\n# Initialize with first price\nmin_price = prices[_____]\n\n# Find minimum\nfor price in prices:\n    if price _____ min_price:\n        min_price = _____\n\n# Display result\nprint(f'Best deal: ${min_price}')",
      solution: "prices = [19.99, 15.50, 22.00, 12.99, 18.75]\n\nmin_price = prices[0]\n\nfor price in prices:\n    if price < min_price:\n        min_price = price\n\nprint(f'Best deal: ${min_price}')",
      commonMistakes: [
        "❌ Using > instead of < (finds max, not min!)",
        "❌ Initializing min_price = 0 (already smallest!)",
        "❌ Using >= or <= (inefficient)",
        "❌ Not updating min_price"
      ],
      validate: (answer) => {
        if (!answer.includes('min_price')) {
          return { valid: false, message: "Create min_price variable" };
        }
        
        if (!answer.includes('prices[0]')) {
          return { valid: false, message: "Initialize min_price = prices[0]" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in prices')) {
          return { valid: false, message: "Loop through prices" };
        }
        
        if (!answer.includes('<')) {
          return { valid: false, message: "Use < to check if price is smaller than current minimum" };
        }
        
        if (answer.includes('price >')) {
          return { valid: false, message: "❌ Use < (less than) for minimum, not > (greater than)!" };
        }
        
        if (!answer.includes('min_price = price')) {
          return { valid: false, message: "Update min_price when you find a smaller value" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the minimum price" };
        }
        
        return { valid: true, message: "Excellent! You found the minimum value! ✓" };
      }
    },
    {
      id: 4,
      title: "Exercise 5: Build Filtered List",
      difficulty: "Intermediate",
      points: 15,
      concept: "List Accumulator with Condition",
      scenario: "You want a list of only the high grades (above 80).",
      task: "Create all_grades = [92, 75, 88, 61, 95, 73]. Create empty list high_grades = []. Loop through all_grades, and if grade > 80, append to high_grades. Print high_grades.",
      hint: "high_grades = [], for grade in all_grades:, if grade > 80:, high_grades.append(grade)",
      skeleton: "# All grades\nall_grades = [92, 75, 88, 61, 95, 73]\n\n# Initialize empty list\nhigh_grades = _____\n\n# Filter grades\nfor grade in all_grades:\n    if grade _____ 80:\n        high_grades._____(grade)\n\n# Display result\nprint(f'High grades: {high_grades}')",
      solution: "all_grades = [92, 75, 88, 61, 95, 73]\n\nhigh_grades = []\n\nfor grade in all_grades:\n    if grade > 80:\n        high_grades.append(grade)\n\nprint(f'High grades: {high_grades}')",
      commonMistakes: [
        "❌ Not creating empty list first",
        "❌ Using .add() instead of .append()",
        "❌ Appending to wrong list",
        "❌ Using >= instead of > (includes 80)"
      ],
      validate: (answer) => {
        if (!answer.match(/high_grades\s*=\s*\[\]/)) {
          return { valid: false, message: "Create empty list: high_grades = []" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in all_grades')) {
          return { valid: false, message: "Loop through all_grades" };
        }
        
        if (!answer.includes('if ')) {
          return { valid: false, message: "Use if to check if grade > 80" };
        }
        
        if (!answer.includes('> 80')) {
          return { valid: false, message: "Check if grade > 80 (above 80, not including)" };
        }
        
        if (!answer.includes('.append(')) {
          return { valid: false, message: "Use .append() to add to the list" };
        }
        
        if (answer.includes('.add(')) {
          return { valid: false, message: "❌ Use .append() for lists, not .add()!" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the high_grades list" };
        }
        
        return { valid: true, message: "Perfect! You built a filtered list using an accumulator! ✓" };
      }
    },
    {
      id: 5,
      title: "Exercise 6: Average Calculator",
      difficulty: "Intermediate",
      points: 15,
      concept: "Sum and Count Together",
      scenario: "You want to calculate the average grade.",
      task: "Create grades = [85, 92, 78, 90, 88]. Use a sum accumulator to add all grades. Calculate average = total / len(grades). Print the average.",
      hint: "total = 0, loop and add, average = total / len(grades)",
      skeleton: "# Grades\ngrades = [85, 92, 78, 90, 88]\n\n# Sum all grades\ntotal = 0\nfor grade in grades:\n    total += grade\n\n# Calculate average\naverage = total / _____(grades)\n\n# Display result\nprint(f'Average: {average:.1f}')",
      solution: "grades = [85, 92, 78, 90, 88]\n\ntotal = 0\nfor grade in grades:\n    total += grade\n\naverage = total / len(grades)\n\nprint(f'Average: {average:.1f}')",
      commonMistakes: [
        "❌ Dividing by number instead of len(grades)",
        "❌ Not initializing total",
        "❌ Calculating average inside loop",
        "❌ Using COUNT() instead of len()"
      ],
      validate: (answer) => {
        if (!answer.includes('total') || !answer.includes('= 0')) {
          return { valid: false, message: "Initialize total = 0" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in grades')) {
          return { valid: false, message: "Loop through grades to sum them" };
        }
        
        if (!answer.includes('total += ') && !answer.includes('total = total +')) {
          return { valid: false, message: "Add each grade to total" };
        }
        
        if (!answer.includes('average')) {
          return { valid: false, message: "Calculate the average" };
        }
        
        if (!answer.includes('/ len(')) {
          return { valid: false, message: "Divide total by len(grades) to get average" };
        }
        
        if (answer.toUpperCase().includes('COUNT(')) {
          return { valid: false, message: "❌ Use len() not COUNT()! (COUNT is SQL)" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the average" };
        }
        
        return { valid: true, message: "Excellent! You calculated an average using sum and count! ✓" };
      }
    },
    {
      id: 6,
      title: "Exercise 7: Multiple Accumulators",
      difficulty: "Advanced",
      points: 20,
      concept: "Tracking Multiple Values",
      scenario: "You want to count both passing and failing grades in one loop.",
      task: "Create grades = [85, 45, 92, 58, 73]. Initialize passing = 0 and failing = 0. Loop through grades. If grade >= 60, add 1 to passing, else add 1 to failing. Print both counts.",
      hint: "Two counters, if grade >= 60: passing += 1, else: failing += 1",
      skeleton: "# Grades\ngrades = [85, 45, 92, 58, 73]\n\n# Initialize both counters\npassing = _____\nfailing = _____\n\n# Count both\nfor grade in grades:\n    if grade >= 60:\n        passing += 1\n    _____:\n        failing += 1\n\n# Display results\nprint(f'Passing: {passing}, Failing: {failing}')",
      solution: "grades = [85, 45, 92, 58, 73]\n\npassing = 0\nfailing = 0\n\nfor grade in grades:\n    if grade >= 60:\n        passing += 1\n    else:\n        failing += 1\n\nprint(f'Passing: {passing}, Failing: {failing}')",
      commonMistakes: [
        "❌ Only initializing one counter",
        "❌ Not using else (some grades not counted)",
        "❌ Updating wrong counter",
        "❌ Using two separate loops (inefficient)"
      ],
      validate: (answer) => {
        if (!answer.includes('passing') || !answer.includes('failing')) {
          return { valid: false, message: "Create both passing and failing counters" };
        }
        
        const passingInit = answer.match(/passing\s*=\s*0/);
        const failingInit = answer.match(/failing\s*=\s*0/);
        
        if (!passingInit || !failingInit) {
          return { valid: false, message: "Initialize both counters to 0" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in grades')) {
          return { valid: false, message: "Loop through grades" };
        }
        
        if (!answer.includes('if ')) {
          return { valid: false, message: "Use if to check condition" };
        }
        
        if (!answer.includes('else:')) {
          return { valid: false, message: "Use else to count failing grades" };
        }
        
        if (!answer.includes('passing += 1')) {
          return { valid: false, message: "Increment passing counter" };
        }
        
        if (!answer.includes('failing += 1')) {
          return { valid: false, message: "Increment failing counter" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print both counts" };
        }
        
        return { valid: true, message: "Perfect! You used multiple accumulators in one loop! ✓" };
      }
    },
    {
      id: 7,
      title: "Exercise 8: Build from Input",
      difficulty: "Advanced",
      points: 20,
      concept: "Accumulator with User Input",
      scenario: "You want to collect test scores from the user and calculate the total.",
      task: "Initialize total = 0. Use for i in range(3) to get 3 scores with input(). Convert each to int and add to total. Print the total.",
      hint: "total = 0, for i in range(3):, score = int(input(...)), total += score",
      skeleton: "# Initialize accumulator\ntotal = 0\n\n# Get 3 scores\nfor i in range(_____):\n    score = _____(input('Score: '))\n    total _____ score\n\n# Display result\nprint(f'Total: {total}')",
      solution: "total = 0\n\nfor i in range(3):\n    score = int(input('Score: '))\n    total += score\n\nprint(f'Total: {total}')",
      commonMistakes: [
        "❌ Forgetting to convert input to int",
        "❌ Not initializing total before loop",
        "❌ Adding string to number (error!)",
        "❌ Using wrong range"
      ],
      validate: (answer) => {
        if (!answer.includes('total') || !answer.includes('= 0')) {
          return { valid: false, message: "Initialize total = 0 before the loop" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in range')) {
          return { valid: false, message: "Use for loop with range(3)" };
        }
        
        if (!answer.includes('range(3)')) {
          return { valid: false, message: "Use range(3) to loop 3 times" };
        }
        
        if (!answer.includes('input(')) {
          return { valid: false, message: "Use input() to get scores from user" };
        }
        
        if (!answer.includes('int(')) {
          return { valid: false, message: "Convert input to int: int(input(...))" };
        }
        
        if (!answer.includes('total += ') && !answer.includes('total = total +')) {
          return { valid: false, message: "Add each score to total" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print the total" };
        }
        
        return { valid: true, message: "Excellent! You accumulated values from user input! ✓" };
      }
    },
    {
      id: 8,
      title: "Exercise 9: Find Index of Maximum",
      difficulty: "Advanced",
      points: 20,
      concept: "Tracking Value and Position",
      scenario: "You want to find both the highest score AND which test it was.",
      task: "Create scores = [78, 92, 65, 95, 88]. Use for i in range(len(scores)) to loop by index. Track max_score and max_index. Update both when you find a larger score. Print both.",
      hint: "max_score = scores[0], max_index = 0, loop by index, if scores[i] > max_score: update both",
      skeleton: "# Test scores\nscores = [78, 92, 65, 95, 88]\n\n# Initialize\nmax_score = scores[0]\nmax_index = 0\n\n# Find max and its position\nfor i in range(len(scores)):\n    if scores[i] > max_score:\n        max_score = scores[_____]\n        max_index = _____\n\n# Display result\nprint(f'Highest: {max_score} on test {max_index + 1}')",
      solution: "scores = [78, 92, 65, 95, 88]\n\nmax_score = scores[0]\nmax_index = 0\n\nfor i in range(len(scores)):\n    if scores[i] > max_score:\n        max_score = scores[i]\n        max_index = i\n\nprint(f'Highest: {max_score} on test {max_index + 1}')",
      commonMistakes: [
        "❌ Not initializing max_index",
        "❌ Using for score in scores (can't track index!)",
        "❌ Only updating max_score, not max_index",
        "❌ Setting max_index = scores[i]"
      ],
      validate: (answer) => {
        if (!answer.includes('max_score') || !answer.includes('max_index')) {
          return { valid: false, message: "Create both max_score and max_index variables" };
        }
        
        if (!answer.includes('scores[0]')) {
          return { valid: false, message: "Initialize max_score = scores[0]" };
        }
        
        if (!answer.includes('max_index = 0')) {
          return { valid: false, message: "Initialize max_index = 0" };
        }
        
        if (!answer.includes('range(len(scores))')) {
          return { valid: false, message: "Loop by index: for i in range(len(scores))" };
        }
        
        if (answer.includes('for score in scores')) {
          return { valid: false, message: "❌ Can't track index with 'for score in scores'! Use range(len())" };
        }
        
        if (!answer.includes('max_score = scores[i]')) {
          return { valid: false, message: "Update max_score = scores[i] when you find larger value" };
        }
        
        if (!answer.includes('max_index = i')) {
          return { valid: false, message: "Update max_index = i to track position" };
        }
        
        if (!answer.includes('print(')) {
          return { valid: false, message: "Print both the max score and its index" };
        }
        
        return { valid: true, message: "Perfect! You tracked both value and position! ✓" };
      }
    },
    {
      id: 9,
      title: "Exercise 10: Complete Statistics",
      difficulty: "Advanced",
      points: 20,
      concept: "Multiple Accumulators Combined",
      scenario: "You want complete statistics: sum, count, average, max, and min from one loop.",
      task: "Create numbers = [23, 67, 12, 89, 45]. Initialize total = 0, max_val = numbers[0], min_val = numbers[0]. Loop once, updating all three. Calculate average. Print all stats.",
      hint: "One loop updates total (+=), max_val (if >), and min_val (if <). Then average = total / len()",
      skeleton: "# Numbers\nnumbers = [23, 67, 12, 89, 45]\n\n# Initialize accumulators\ntotal = 0\nmax_val = numbers[0]\nmin_val = numbers[0]\n\n# Calculate all in one loop\nfor num in numbers:\n    total += num\n    if num > max_val:\n        max_val = num\n    if num < min_val:\n        min_val = num\n\n# Calculate average\naverage = total / len(numbers)\n\n# Display all stats\nprint(f'Sum: {total}')\nprint(f'Average: {average:.1f}')\nprint(f'Max: {max_val}')\nprint(f'Min: {min_val}')",
      solution: "numbers = [23, 67, 12, 89, 45]\n\ntotal = 0\nmax_val = numbers[0]\nmin_val = numbers[0]\n\nfor num in numbers:\n    total += num\n    if num > max_val:\n        max_val = num\n    if num < min_val:\n        min_val = num\n\naverage = total / len(numbers)\n\nprint(f'Sum: {total}')\nprint(f'Average: {average:.1f}')\nprint(f'Max: {max_val}')\nprint(f'Min: {min_val}')",
      commonMistakes: [
        "❌ Using separate loops (inefficient!)",
        "❌ Not initializing all accumulators",
        "❌ Calculating average inside loop",
        "❌ Using 0 for max/min initialization"
      ],
      validate: (answer) => {
        if (!answer.includes('total = 0')) {
          return { valid: false, message: "Initialize total = 0" };
        }
        
        if (!answer.includes('max_val = numbers[0]')) {
          return { valid: false, message: "Initialize max_val = numbers[0]" };
        }
        
        if (!answer.includes('min_val = numbers[0]')) {
          return { valid: false, message: "Initialize min_val = numbers[0]" };
        }
        
        if (!answer.includes('for ') || !answer.includes(' in numbers')) {
          return { valid: false, message: "Loop through numbers" };
        }
        
        if (!answer.includes('total += ')) {
          return { valid: false, message: "Add to total in the loop" };
        }
        
        if (!answer.includes('if num > max_val') && !answer.includes('if num>max_val')) {
          return { valid: false, message: "Check and update max_val" };
        }
        
        if (!answer.includes('if num < min_val') && !answer.includes('if num<min_val')) {
          return { valid: false, message: "Check and update min_val" };
        }
        
        if (!answer.includes('average')) {
          return { valid: false, message: "Calculate average after the loop" };
        }
        
        const printCount = (answer.match(/print\(/g) || []).length;
        if (printCount < 4) {
          return { valid: false, message: "Print all 4 statistics: sum, average, max, min" };
        }
        
        return { valid: true, message: "🎉 PERFECT! You calculated complete statistics in one loop! ✓" };
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-green-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Loop Accumulators Practice</h1>
                <p className="text-gray-600">Python Patterns - Tool #2</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold text-green-600">{totalPoints}/{maxPoints}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-500"
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
                    ? 'bg-green-600 text-white'
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
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                    {currentExerciseData.points} pts
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                  Concept: {currentExerciseData.concept}
                </span>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">📊 Scenario:</p>
                <p className="text-gray-700 mb-3">{currentExerciseData.scenario}</p>
                <p className="text-sm font-semibold text-gray-700 mb-2">🎯 Your Task:</p>
                <p className="text-gray-700 font-medium">{currentExerciseData.task}</p>
              </div>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={clearAnswer}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    mode === 'full' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Full Practice
                </button>
                <button
                  onClick={loadSkeleton}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    mode === 'skeleton' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                className="w-full p-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-green-500 focus:outline-none mb-4 bg-gray-50 resize-y"
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
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
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
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <h4 className="font-semibold text-gray-700 mb-1">Sum Pattern</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      total = 0<br />
                      for item in list:<br />
                      &nbsp;&nbsp;total += item
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Count Pattern</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      count = 0<br />
                      for item in list:<br />
                      &nbsp;&nbsp;if condition:<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;count += 1
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Max Pattern</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      max_val = list[0]<br />
                      for item in list:<br />
                      &nbsp;&nbsp;if item &gt; max_val:<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;max_val = item
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Min Pattern</h4>
                    <code className="block bg-gray-100 p-2 rounded text-xs">
                      min_val = list[0]<br />
                      for item in list:<br />
                      &nbsp;&nbsp;if item &lt; min_val:<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;min_val = item
                    </code>
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="font-semibold text-gray-700 mb-2">Remember:</h4>
                    <ul className="text-xs space-y-1 text-gray-600">
                      <li>✓ Initialize BEFORE loop</li>
                      <li>✓ Update INSIDE loop</li>
                      <li>✓ Use result AFTER loop</li>
                      <li>✓ Start max/min with first item</li>
                      <li>✓ Use += to add, not =</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {completedExercises.length === exercises.length && (
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-lg p-8 mt-6 text-center text-white">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Excellent Work! 🎉</h2>
            <p className="text-xl mb-4">You've mastered Loop Accumulators!</p>
            <p className="text-lg mb-2">Total Points: {totalPoints}/{maxPoints}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoopAccumulatorsPracticeTool;