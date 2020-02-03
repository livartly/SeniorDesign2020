var mdTable = require('markdown-table');

class Statement {
  constructor(statement) {
    this.symbols = extractSymbols(statement);
    let error = checkWellFormed(this.symbols);
    if (error) {
      throw new Error(error);
    }
    this.statement = statement;
    this.variables = extractvariables(this.statement);
    this.symbolsRPN = convertToRPN(this.symbols);
    this.tree = RPNToTree(this.symbolsRPN);
  }

  evaluate(values) {
    const evalReady = performSubstitution(this.symbolsRPN, values);
    let outStack = [];
    let operands = [];

    for (let symbol of evalReady) {
      if (typeof symbol === 'boolean') {
        outStack.push(symbol);
      } else {
        operands.push(outStack.pop());
        if (symbol !== '~') {
          operands.push(outStack.pop());
        }
        outStack.push(evaluate(symbol, operands));
        operands = [];
      }
    }

    return outStack[0];
  }

  variables() {
    return this.variables;
  }

  symbols() {
    return this.symbols;
  }

  table() {
    return makeTruthTable(this, 'Markdown');
  }
}

/**
 * Uses the Shunting-Yard algorithm to convert a propositional logic statement
 * to Reverse Polish notation (RPN).
 *
 * @example
 * // [ 'P', 'Q', '<->', 'R', 'Q', '|', '&', 'S', '->' ]
 * convertToRPN('(P <-> Q) & (R | Q) -> S')
 *
 * @param   {String} statement - The statement to be converted.
 *
 * @returns {Array} - The statement in RPN.
 */
function convertToRPN(symbols) {
  let closingParen = false;
  let outQueue = [];
  let opStack = [];

  for (let symbol of symbols) {
    if (symbol.match(/^[a-z]{1}$/i)) {
      outQueue.push(symbol);
    } else if (symbol === ')') {
      closingParen = false;
      while (!closingParen && opStack[opStack.length - 1] !== '(') {
        outQueue.push(opStack.pop());
        closingParen = opStack[opStack.length - 1] === '(';
      }
      opStack.pop();
    } else {
      while (compareOperators(symbol, opStack[opStack.length - 1])) {
        outQueue.push(opStack.pop());
      }
      opStack.push(symbol);
    }
  }

  outQueue.push.apply(outQueue, opStack.reverse());
  return outQueue;
}

/**
 * Verify that the symbols array is valid.
 *
 * @param  {Array} symbols - The list of symbols to be checked.
 *
 * @return {String|null} - A message if an error is found and null otherwise.
 */
function checkWellFormed(symbols) {
  let isOperand = /^[a-z()]{1}$/i;
  let opening = 0;
  let closing = 0;
  let symbol = null;
  let prev = null;
  let next = null;
  let isOperator = false;
  let wasOperator = false;
  let error = null;

  if (symbols.length === 0) {
    return 'no symbols!';
  }

  for (let i = 0; i < symbols.length; ++i) {
    symbol = symbols[i];
    next = symbols[i + 1] === undefined ? '' : symbols[i + 1];
    prev = symbols[i - 1] === undefined ? '' : symbols[i - 1];
    isOperator = ['~', '&', '||', '->', '<->'].includes(symbol);
    if (!isOperator && !symbol.match(isOperand)) {
      error = 'unknown symbol!';
    }
    if (symbol === '(') {
      opening += 1;
    } else if (symbol === ')') {
      closing += 1;
    } else if (isOperator && wasOperator && symbol !== '~') {
      error = 'double operators!';
    } else if (isOperator && symbol !== '~') {
      if (!prev.match(isOperand) || (next !== '~' && !next.match(isOperand))) {
        error = 'missing operand!';
      }
    } else if (symbol === '~') {
      if (!next.match(isOperand)) {
        error = 'missing operand!';
      }
    }
    wasOperator = isOperator;
  }

  if (opening !== closing) {
    error = 'unbalanced parentheses!';
  } else if (symbols.length === (opening + closing)) {
    error = 'no symbols!';
  }
  return error;
}

/**
 * Extract all symbols from statement.
 *
 * @example
 * // [ 'P', '&', '~', 'Q' ]
 * extractSymbols('P & ~Q')
 *
 * @example
 * // [ '(', 'P', '<->', 'Q', ')', '&', '(', 'R', '|', 'Q', ')', '->', 'S' ]
 * extractSymbols('(P<-> Q) & (R|Q) ->S')
 *
 * @param   {String} statement - The statement to be parsed.
 *
 * @returns {Array} - An array containing each symbol.
 */
function extractSymbols(statement) {
  const accepted = ['(', ')', '->', '&', '||', '~', '<->'];
  const symbols = statement.split(' ');
  let idx = 0;
  let cond = null;
  let bicond = null;
  let extracted = [];

  for (let symbol of symbols) {
    if (!symbol.match(/^[a-z]+$/i) && accepted.indexOf(symbol) < 0) {
      idx = 0;
      while (idx < symbol.length) {
        cond = symbol.slice(idx, idx + 2);
        bicond = symbol.slice(idx, idx + 3);
        if (bicond === '<->') {
          extracted.push(bicond);
          idx += 3;
        } else if (cond === '->' || cond === '||') {
          extracted.push(cond);
          idx += 2;
        } else {
          extracted.push(symbol.charAt(idx));
          idx += 1;
        }
      }
    } else {
      extracted.push(symbol);
    }
  }

  return extracted;
}

/**
 * Extract the variables from a given statement.
 *
 * @param   {String} statement - The statement to be considered.
 *
 * @returns {Array} - All of the variables in the given statement.
 */
function extractvariables(statement) {
  const symbols = extractSymbols(statement);
  let variables = [];

  for (let symbol of symbols) {
    if (symbol.match(/^[a-z]+$/i)) {
      variables.push(symbol);
    }
  }

  return variables;
}

/**
 * Compare the precedence of two operators.
 *
 * @param   {String} op1 - The first operator.
 * @param   {String} op2 - The second operator.
 *
 * @returns {Boolean} - true if op1 has lower precedence than op2 and false
 *  otherwise.
 */
function compareOperators(op1, op2) {
  const operators = ['~', '&', '||', '->', '<->'];
  if (op2 === undefined || op2 === '(') {
    return false;
  }
  return operators.indexOf(op1) > operators.indexOf(op2);
}

/**
 * Substitute values for symbols where possible.
 *
 * @example
 * // [ 'true', '&', '~', 'false' ]
 * performSubstitution(['P', '&', '~', 'Q'], {'P': true, 'Q': false})
 *
 * @param   {Array} symbols - The symbols to be considered.
 * @param   {Object} values - An object mapping symbols to their intended
 *  values.
 *
 * @returns {Array} - An array with symbols replaced by their values.
 */
function performSubstitution(symbols, values) {
  let prepared = [];

  for (let symbol of symbols) {
    if (['(', ')', '->', '&', '||', '<->', '~'].includes(symbol)) {
      prepared.push(symbol);
    } else {
      prepared.push(values[symbol]);
    }
  }

  return prepared;
}

/**
 * Evaluate the given operator with its operand(s).
 *
 * @param   {String} operator - The operator to be used.
 * @param   {Array} operands - The operands to be used.
 *
 * @returns {Boolean} - The result of the evaluation.
 */
function evaluate(operator, operands) {
  switch (operator) {
    case '~':
      return !operands[0];
    case '&':
      return operands[0] && operands[1];
    case '||':
      return operands[0] || operands[1];
    case '->':
      return !operands[1] || operands[0];
    case '<->':
      return operands[0] === operands[1];
  }
}

function RPNToTree(symbols) {
  let outStack = [];
  let right = null;
  let size = 0;

  for (let symbol of symbols) {
    if (symbol.match(/^[a-z]{1}$/i)) {
      outStack.push({
        'name': symbol
      });
    } else {
      right = outStack.pop();
      if (symbol === '~') {
        outStack.push({
          'name': symbol,
          'children': [right]
        });
      } else {
        outStack.push({
          'name': symbol,
          'children': [right, outStack.pop()]
        });
      }
    }
    size += 1;
  }

  return {
    'tree': outStack,
    'size': size
  };
}

/**
 * Get all boolean input values for n variables.
 *
 * @example
 * // [ [ true, true ], [ true, false ], [ false, true ], [ false, false ] ]
 * getValues(2, [])
 *
 * @param   {Number} n - The number of variables.
 * @param   {Array} t - The array to be recursively filled.
 *
 * @returns {Array} All possible input values.
 */
function getValues(n, t) {
  if (t.length === n) {
    return [t];
  } else {
    return getValues(n, t.concat(true)).concat(getValues(n, t.concat(false)));
  }
}

/**
 * Get all boolean values for each variable.
 *
 * @example
 * // [ { P: true }, { P: false } ]
 * getCases (['P'])
 *
 * @param   {Array} variables - All variables in a given statement.
 *
 * @returns {Array} - An array of objects mapping variables to their possible
 *  values.
 */
function getCases(variables) {
  var numVars = variables.length;
  var values = getValues(numVars, []);
  var numRows = values.length;
  var rows = [];
  var row = {};

  for (var i = 0; i < numRows; ++i) {
    row = {};
    for (var j = 0; j < numVars; ++j) {
      row[variables[j]] = values[i][j];
    }
    rows.push(row);
  }

  return rows;
}

/**
 * Convert a statement into an object representing the structure of a table.
 *
 * @param   {Object} s - The statement to be converted.
 *
 * @returns {Object} - The table representation.
 */
function statementToTable(s) {
  var table = {};

  table['statement'] = s.statement;
  table['variables'] = s.variables;
  table['rows'] = getCases(table['variables']);
  for (var i = 0; i < table['rows'].length; ++i) {
    table['rows'][i]['eval'] = s.evaluate(table['rows'][i]);
  }

  return table;
}

/**
 * Create a Markdown-formatted truth table.
 *
 * @param   {Object} table - The table to be converted to Markdown.
 *
 * @returns {String} The Markdown-formatted table.
 */
function tableToMarkdown(table) {
  var rows = [];
  var row = [];
  var header = table['variables'].slice();

  header.push(table['statement'].replace(/\|/g, '&#124;'));
  rows.push(header);
  for (var i = 0; i < table['rows'].length; ++i) {
    row = [];
    for (var j = 0; j < table['variables'].length; ++j) {
      row.push(table['rows'][i][table['variables'][j]]);
    }
    row.push(table['rows'][i]['eval']);
    rows.push(row);
  }

  return mdTable(rows, {
    align: 'c'
  });
}

/**
 * Create a truth table from a given statement.
 *
 * @param   {String} s - The statement.
 * @param   {String} type - The table format.
 *
 * @returns {String} - The formatted table.
 */
function makeTruthTable(s, type) {
  var table = statementToTable(s);
  var format = type.toLowerCase();

  switch (format) {
    case 'markdown':
      return tableToMarkdown(table);
  }
}

window.Statement = Statement;
export default Statement;