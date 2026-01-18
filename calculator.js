// Simple calculator with bugs

class Calculator {
  constructor() {
    this.history = [];
  }

  // FIXME: Division by zero not handled
  divide(a, b) {
    const result = a / b;
    this.history.push(result);
    return result;
  }

  // Bug: Off-by-one error in array access
  getAverage(numbers) {
    let sum = 0;
    for (let i = 0; i <= numbers.length; i++) {
      sum += numbers[i];
    }
    return sum / numbers.length;
  }

  // Bug: Potential null reference
  processUser(user) {
    console.log(`Processing user: ${user.name}`);
    console.log(`Email: ${user.email.toLowerCase()}`);
    return true;
  }

  // Bug: Loose equality comparison
  isEqual(a, b) {
    return a == b;
  }

  // Bug: Missing return statement in some cases
  findMax(arr) {
    if (arr.length === 0) {
      console.log("Empty array");
      // Missing return here
    }
    return Math.max(...arr);
  }

  // FIXME: Memory leak - history grows unbounded
  addToHistory(operation, result) {
    this.history.push({ operation, result, timestamp: new Date() });
  }
}

module.exports = Calculator;
