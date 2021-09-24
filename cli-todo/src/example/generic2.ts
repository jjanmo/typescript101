// generic example1

class Stack<T> {
  private stack: Array<T>;
  constructor() {
    this.stack = [];
  }

  push(item: T) {
    this.stack.push(item);
  }

  pop() {
    return this.stack.pop();
  }
}

const stack1 = new Stack<string>();
stack1.push('hello');
stack1.push('world');
stack1.push('javascipt');
// stack1.push(11); // error : not string type
console.log(stack1);
