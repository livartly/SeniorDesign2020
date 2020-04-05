import { parse } from 'mathjs';

const REQUIRES_MULTIPLY_SYMBOL = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "n", ")"
];

/**
 * Validates that baseCases are formatted correctly
 *
 * @param   {Array} baseCases - list of strings for each base case * 
 *
 */
const validateBaseCases = (baseCases) => {
  for (const baseCase of baseCases) {
    if (baseCase === "")
      throw new Error("Base Cases should not be empty");
    if (isNaN(parseInt(baseCase)))
      throw new Error("Base Cases must be numbers");
  }
};

/**
 * Validates that recurrenceRelation is formatted correctly
 *
 * @param   {String} recurrenceRelation - string representing the recurrence
 *    relation. 
 */
const validateRecurrenceRelation = (recurrenceRelation) => {

};

/**
 * Replaces all stashed sequence elements with their raw values
 *
 * @param   {String} recurrenceRelation - string representing the recurrence
 *    relation. 
 * 
 * @param   {Object} scope - stores the values to be accessed
 * 
 * @returns {String} - the reformatted recurrence relation with raw values
 */
const replacePrevs = (recurrenceRelation, scope) => {
  var strCopy = recurrenceRelation;
  var startReplaceIdx = strCopy.indexOf("S");
  while (startReplaceIdx !== -1) {
    var lookBack = parseInt(strCopy[startReplaceIdx + 4]);
    var tableArr = Object.keys(scope);
    var replaceNum = scope[tableArr[tableArr.length - lookBack]].toString();
    if (REQUIRES_MULTIPLY_SYMBOL.includes(strCopy[startReplaceIdx - 1])) {
      replaceNum = "*" + replaceNum;
    }

    var startStr = strCopy.substr(0, startReplaceIdx);
    var endStr = strCopy.substr(startReplaceIdx + 6);
    strCopy = startStr + replaceNum + endStr;
    startReplaceIdx = strCopy.indexOf("S");
  }
  return strCopy;
};

/**
 * Replaces all encountered n's with the current coutner value
 *
 * @param   {String} recurrenceRelation - string representing the recurrence
 *    relation.
 * 
 * @param   {Number} nValue - the value to be substituted for n
 * 
 * @returns {String} - the reformatted recurrence relation with raw values
 */
const replaceNs = (recurrenceRelation, nValue) => {
  var strCopy = recurrenceRelation;
  strCopy = strCopy.replace(/n/g, (nValue + 1).toString());
  return strCopy;
};


/**
 * Solves recursive sequence to a certain depth
 *
 * @param   {Array} baseCases - list of strings for each base case
 * 
 * @param   {String} recurrenceRelation - string representing the recurrence
 *    relation.
 * 
 * @param   {Number} depth - how many additional elements are required.
 *
 * @returns {Array} - list of numbers that solves the sequence
 */
export const solveSequence = (baseCases, recurrenceRelation, depth) => {
  validateBaseCases(baseCases);
  validateRecurrenceRelation(recurrenceRelation);

  var scope = {};
  var counter = 0;
  var countLetter;
  var cleanRecurrence = recurrenceRelation.replace(/ /g, '');

  for (const baseCase of baseCases) {
    countLetter = String.fromCharCode(counter + 97);
    scope[countLetter] = parseInt(baseCase);
    counter += 1;
  }

  while (counter < (depth + baseCases.length)) {
    countLetter = String.fromCharCode(counter + 97);
    var parseString = countLetter + "=" + cleanRecurrence;
    parseString = replacePrevs(parseString, scope);
    parseString = replaceNs(parseString, counter);
    if (parse(parseString).compile().evaluate(scope) === Infinity)
      throw new Error("Overflow encountered. Try reducing depth");
    counter += 1;
  }

  return scope;
};