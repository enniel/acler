'use strict'

/**
 * acler
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

class InvalidExpression extends Error {
  constructor () {
    super('Invalid expression.')

    this.name = 'InvalidExpression'
  }
}

const operators = {
  or: {
    precedence: 1,
    func: (a, b) => a || b
  },
  and: {
    precedence: 2,
    func: (a, b) => a && b
  },
  not: {
    precedence: 3,
    func: b => !b,
    n: 1
  }
}

// synonyms
operators['&&'] = operators.and
operators['||'] = operators.or
operators['!'] = operators.not

// add whitespace to '(', ')', and '!' operators so that
// "(a && !b)" -> "( a && ! b )"
const addSpaces = (string) => {
  const split = string.split('')
  const characters = split.map((character, i) => {
    if (character === '(' || character === ')') {
      if (split[i - 1] !== ' ') character = ' ' + character
      if (split[i + 1] !== ' ') character = character + ' '
    }
    if (character === '!') {
      if (split[i + 1] !== ' ' && split[i + 1] !== '=') {
        character = character + ' '
      }
    }
    return character
  })
  return characters.join('')
}

// Uses the shunting-yard algorithm to convert infix notation
// into Reverse Polish Notation
const convertToRPN = (exp) => {
  if (typeof exp !== 'string') {
    throw new InvalidExpression()
  }
  exp = exp
    .replace(/\s+/g, ' ')
    .replace(/\s+$/, '')
    .replace(/^\s+/, '')
  exp = addSpaces(exp)
  const stack = []
  const rpn = []
  for (const token of exp.trim().split(' ')) {
    if (operators[token]) {
      // This assumes no right-associative operators
      while (
        stack[stack.length - 1] &&
          operators[stack[stack.length - 1]] &&
          operators[token].precedence <= operators[stack[stack.length - 1]].precedence) {
        rpn.push(stack.pop())
      }
      stack.push(token)
    } else if (token === '(') {
      stack.push(token)
    } else if (token === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        rpn.push(stack.pop())
      }
      if (stack[stack.length - 1] === '(') {
        stack.pop()
      } else {
        throw new InvalidExpression()
      }
    } else if (/^[a-zA-Z_.-]+$/.test(token)) {
      rpn.push(token)
    } else {
      throw new InvalidExpression()
    }
  }
  return rpn.concat(stack.reverse())
}

const toBool = (token, checker) => {
  if (typeof token === 'boolean') {
    return token
  }
  return checker(token)
}

const check = (expression, checker) => {
  const rpn = convertToRPN(expression)
  const stack = []
  for (const token of rpn) {
    const operator = operators[token]
    if (operator) {
      const numArgs = operator.n || 2
      let args = []
      for (let i = 1; i <= numArgs; i++) {
        const arg = toBool(stack.pop(), checker)
        args.push(arg)
      }
      args = args.reverse()
      const result = operator.func(...args)
      stack.push(result)
    } else {
      const result = toBool(token, checker)
      stack.push(result)
    }
  }
  return stack[0]
}

module.exports = { check }
