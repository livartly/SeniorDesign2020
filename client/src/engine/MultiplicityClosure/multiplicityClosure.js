import {LogicalSet} from "../Sets/LogicalSet";

function convertStringtoSet(str) {
    str = str.replace(/ /g, '');
    let strArray = str.split(',');
    return new LogicalSet(strArray);
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
}

function isTransitive (set, relation) {
    
}

function findTransitiveClosure (set, relation) {

}

function isAntisymmetric (set, relation) {

}

function findAntisymmetricClosure (set, relation) {

}

export const testRelationProperties = (set, relation, props) => {
    var reflexiveClosure = [];
    var symmetricClosure = [];
    var transitiveClosure = [];
    var antisymmetricClosure = [];
    var closureSets = [];

    if (isReflexive(set, relation)) {
        props[0] = true;
        reflexiveClosure = relation;
    }
    else {
        props[0] = false;
        reflexiveClosure = findReflexiveclosure(set, relation);
    }

    if (isSymmetric(set, relation)) {
        props[1] = true;
        symmetricClosure = relation;
    }
    else {
        props[1] = false;
        symmetricClosure = findSymmetricClosure(set, relation);
    }

    if (isTransitive(set, relation)) {
        props[2] = true;
        transitiveClosure = relation;
    }
    else {
        props[2] = false;
        transitiveClosure = findTransitiveClosure(set, relation);
    }

    if (isAntisymmetric(set, relation)) {
        props[3] = true;
        antisymmetricClosure = relation;
    }
    else {
        props[3] = false;
        antisymmetricClosure = findAntisymmetricClosure(set, relation);
    }
}