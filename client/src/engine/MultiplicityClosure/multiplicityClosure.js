import {LogicalSet} from "../Sets/LogicalSet";

function convertStringtoSet(str) {
    str = str.replace(/ /g, '');
    let strArray = str.split(',');
    return new LogicalSet(strArray);
}

export const validateInput = (set, relation) => {
    set = set.replace(/ /g, '');
    relation = relation.replace(/ /g, '');
    let allowedSetChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // Validate Set input
    if (set === "") {
        throw new Error("Error: Set must not be empty.");
        return false;
    }

    for (var i = 0; i < set.length; i++) {
        if (!allowedSetChars.includes(set[i])) {
            throw new Error("Error: '" + set[i] + "' not recognized. Sets must be comma separated numerals only.");
            return false;
        }
    }

    // Validate relation
    const regex = /(\([0-9]+,[0-9]+\),?)*/g;
    let filtered = relation.match(regex).filter(function f(e) {
        return e != "";
    });

    if (filtered[0] != relation) {
        throw new Error ("Error: Relation must only contain ordered pairs of numerals.");
        return false;
    }

    return true;
}

function remove_character(str, char_pos) {
  var part1 = str.substring(0, char_pos);
  var part2 = str.substring(char_pos + 1, str.length);
  return (part1 + part2);
}

export const formatSet = (setString) => {
    setString = setString.replace(/ /g, '');
    return setString.split(",");
}

export const formatRelation = (relationString) => {
    relationString = relationString.replace(/ /g, '');
    let pairArray = relationString.split('(');

    for (var i = 0; i < pairArray.length;) {
        if (pairArray[i] === "") {
            pairArray.splice(i, 1);
            continue;
        }
        else {
            pairArray[i] = pairArray[i].replace(")", '');
            if (pairArray[i][pairArray[i].length - 1] === ',')
                pairArray[i] = pairArray[i].substring(0, pairArray[i].length - 1);

            pairArray[i] = pairArray[i].split(",");
            for (var j = 0; j < pairArray[i].length; j++) {
                pairArray[i][j] = parseInt(pairArray[i][j]);
            }
        }
        i++;
    }

    return pairArray;
}

function isReflexive (set, relation) {
    var relationString = relation.toString();
    for (var i = 0; i < set.length; i++) {
        var targetString = "[" + set[i] + "," + set[i] + "]";
        if (!relationString.includes(targetString))
            return false;
    }

    return true;
}

function findReflexiveclosure (set, relation) {
    var closure = [];
    for (var i = 0; i < set.length; i++) {
        closure.push([set[i], set[i]]);
    }

    var relationString = relation.toString();
    for (var i = 0; i < closure.length;) {
        if (relationString.includes(closure[i].toString())) {
            closure.splice(i, 1);
            continue;
        }
        i++;
    }
    return closure;
}

function isSymmetric (set, relation) {
    var relationString = relation.toString();
    for (var i = 0; i < set.length; i++) {
        for (var j = 0 ; j < set.length; j++) {
            var targetString = "[" + set[i] + "," + set[j] + "]";
            var symmetricString = "[" + set[j] + "," + set[i] + "]";
            if (relationString.includes(targetString) && !relationString.includes(symmetricString))
                return false;
        }
    }

    return true;
}

function findSymmetricClosure (set, relation) {
    var closure = [];

    var relationString = relation.toString();
    for (var i = 0; i < relation.length; i++) {
        let x = relation[i][0];
        let y = relation[i][1];
        let targetString = "[" + x + "," + y + "]";
        let inverse = "[" + y + "," + x + "]";
        if (relationString.includes(targetString) && !relationString.includes(inverse)) {
            closure.push([y,x]);
        }
    }
    
    return closure;
}

function isTransitive (set, relation) {
    var relationString = relation.toString();
    for (var a = 0; a < set.length; a++) {
        for (var b = 0 ; b < set.length; b++) {
            for (var c = 0; c < set.length; c++) {
                var targetString = "[" + set[a] + "," + set[b] + "]";
                var secondTargetString = "[" + set[b] + "," + set[c] + "]";
                var transitiveString = "[" + set[a] + "," + set[c] + "]";
                if (relationString.includes(targetString)       &&
                    relationString.includes(secondTargetString) &&
                    !relationString.includes(transitiveString))
                    return false;
            }
        }
    }

    return true;
}

function findTransitiveClosure (set, relation) {
    var closure = [];

    var relationString = relation.toString();
    for (var a = 0; a < set.length; a++) {
        for (var b = 0 ; b < set.length; b++) {
            for (var c = 0; c < set.length; c++) {
                var targetString = "[" + set[a] + "," + set[b] + "]";
                var secondTargetString = "[" + set[b] + "," + set[c] + "]";
                var transitiveString = "[" + set[a] + "," + set[c] + "]";
                if (relationString.includes(targetString) &&
                    relationString.includes(secondTargetString) && !relationString.includes(transitiveString)) {
                        if (set[a] != set[c])
                            closure.push([set[a], set[c]]);
                    }
            }
        }
    }

    return closure;
}

function isAntisymmetric (set, relation) {
    var relationString = relation.toString();
    for (var i = 0; i < set.length; i++) {
        for (var j = 0 ; j < set.length; j++) {
            var targetString = "[" + set[i] + "," + set[j] + "]";
            var symmetricString = "[" + set[j] + "," + set[i] + "]";
            if (relationString.includes(targetString) && relationString.includes(symmetricString) && set[i] != set[j])
                return false;
        }
    }

    return true;
}

export const testRelationProperties = (set, relation, props) => {
    var reflexiveClosure = [];
    var symmetricClosure = [];
    var transitiveClosure = [];
    var closureSets = [];

    if (isReflexive(set, relation)) {
        props[0] = true;
    }
    else {
        props[0] = false;
        reflexiveClosure = findReflexiveclosure(set, relation);
    }

    if (isSymmetric(set, relation)) {
        props[1] = true;
    }
    else {
        props[1] = false;
        symmetricClosure = findSymmetricClosure(set, relation);
    }

    if (isTransitive(set, relation)) {
        props[2] = true;
    }
    else {
        props[2] = false;
        transitiveClosure = findTransitiveClosure(set, relation);
    }

    if (isAntisymmetric(set, relation)) {
        props[3] = true;
    }
    else {
        props[3] = false;
    }

    closureSets.push(reflexiveClosure);
    closureSets.push(symmetricClosure);
    closureSets.push(transitiveClosure);

    return closureSets;
}