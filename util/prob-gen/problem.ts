export type Operation = '+' | '-' | '*' | '/'
export type ProblemObject = {
  left: number
  right: number
  operation: Operation
  answer: number
  text: string
}

class Problem {
  left: number
  right: number
  operation: Operation
  answer: number

  constructor(left: number, right: number, operation: Operation) {
    this.left = left
    this.right = right
    this.operation = operation
    this.answer = this.calc()
  }

  private calc(): number {
    switch (this.operation) {
      case '+':
        return this.left + this.right
      case '-':
        return this.left - this.right
      case '*':
        return this.left * this.right
      case '/':
        return Math.floor(this.left / this.right)
    }
  }

  prettyOp(): string {
    switch (this.operation) {
      case '+':
        return '+'
      case '-':
        return '\u2013'
      case '*':
        return '\xD7'
      case '/':
        return '\xF7'
    }
  }

  text(): string {
    return `${this.left} ${this.prettyOp()} ${this.right}`
  }

  toObject(): ProblemObject {
    return {
      left: this.left,
      right: this.right,
      operation: this.operation,
      answer: this.answer,
      text: this.text(),
    }
  }

  toJSON(): string {
    return JSON.stringify(this.toObject)
  }
}

export default Problem
