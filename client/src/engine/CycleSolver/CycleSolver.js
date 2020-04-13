class CycleSolver {
    // True: input is in cycle form, FALSE: input is in permutation form
    constructor (setString, relation, isCycleForm) {
        if (isCycleForm) {
            var {parentSet, cycleMap, formattedArray} = parseCycleForm(setString, relation);
        }
        else {
            var {parentSet, cycleMap} = validateInput(setString, relation);
        }

        this.parentSet = parentSet;
        this.cycleMap = cycleMap;
        this.cycleArray = formattedArray;
    }

    toCycleString() {
        var m = Object.assign({}, this.cycleMap);
        var resultArr = [];
        for (const fromNode in this.cycleMap) {
            if (m[fromNode]) {
                var oneLayer = [fromNode];
                var curPointer = m[fromNode];
                delete m[fromNode];
                while (curPointer.toString() !== fromNode) {
                    oneLayer.push(curPointer);
                    var nextPtr = m[curPointer];
                    delete m[curPointer];
                    curPointer = nextPtr;
                }
                if (oneLayer.length > 1)
                    resultArr.push(oneLayer);
            }
        }
        if (resultArr.length === 0)
            throw new Error("Error: All nodes relate to themselves. Cycle form is inapplicable");
        return JSON.stringify(resultArr).replace(/\"/g, "").replace(/\[/g, "(").replace(/\]/g, ")").replace(/\),\(/g, ")(").slice(1,-1);
    }

    makeComposite (other) {        
        var composite = [];
        var prevNode = other.cycleArray[0][0];
        var cycleStart = other.cycleArray[0][0];

        while (true) {
            // Push start of cycle to array
            if (composite.length === 0 || (composite[composite.length - 1] === "|")) {
                composite.push(cycleStart);
            }

            // Get mapping on inner function
            var innerMapping = "";
            if (other.cycleMap[prevNode]) {
                innerMapping = other.cycleMap[prevNode];
            }
            else {
                innerMapping = prevNode;
            }

            // Map inner function value to outer function
            var outerMapping = "";
            if (this.cycleMap[innerMapping]) {
                outerMapping = this.cycleMap[innerMapping];
            }
            else {
                outerMapping = innerMapping;
            }

            // Check if cycle has formed
            if (outerMapping != cycleStart) {
                composite.push(outerMapping);
                prevNode = outerMapping;
            }
            else {
                //composite.push("|");
                break;
            }
        }

        console.log("Final: " + composite);
    }
}

export {CycleSolver};


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
        }
        i++;
    }

    return pairArray;
}

export const validateInput = (set, relation) => {
    var cycleMap = {};
    set = set.replace(/ /g, '');
    relation = relation.replace(/ /g, '');

    // Validate Set input
    if (set === "") {
        throw new Error("Error: Set must not be empty.");
    }

    var setArray = formatSet(set);
    var parentSet = new Set(setArray);
    // THROW ERROR IF DUPLICATES IN PARENT SET
    if (parentSet.size !== setArray.length) {
        throw new Error("Error: Set must contain no duplicate entries.");
    }

    // Validate relation
    const regex = /(\([0-9A-Za-z]+,[0-9A-Za-z]+\),?)*/g;
    let filtered = relation.match(regex).filter(function f(e) {
        return e !== "";
    });

    if (filtered[0] !== relation) {
        throw new Error ("Error: Relation must only contain ordered pairs of numerals.");
    }

    var formattedRelation = formatRelation(relation);

    var seenInput = new Set();
    var seenOutput = new Set();
    for (const orderedPair of formattedRelation) {
        if (seenInput.has(orderedPair[0]) || seenOutput.has(orderedPair[1])) {
            throw new Error("Error: Relation must be 1-to-1.");
        }
        seenInput.add(orderedPair[0]);
        seenOutput.add(orderedPair[1]);
        if (!parentSet.has(orderedPair[0]) || !parentSet.has(orderedPair[1])) {
            throw new Error("Error: All elements must be present in parent set.");
        }
        cycleMap[orderedPair[0]] = orderedPair[1];
    }

    if (parentSet.size !== Object.keys(cycleMap).length) {
        throw new Error("Error: All elements of domain should have a mapping.");
    }
    return {parentSet, cycleMap};
}


const parseCycleForm = (set, cycleString) => {
    var cycleMap = {};
    set = set.replace(/ /g, '');
    cycleString = cycleString.replace(/ /g, '');

    // Validate Set input
    if (set === "") {
        throw new Error("Error: Set must not be empty.");
    }

    var setArray = formatSet(set);
    var parentSet = new Set(setArray);
    // THROW ERROR IF DUPLICATES IN PARENT SET
    if (parentSet.size !== setArray.length) {
        throw new Error("Error: Set must contain no duplicate entries.");
    }

    // Validate relation
    const regex = /(\((([0-9A-Za-z]+,?){2,}\)*))*/g;
    let filtered = cycleString.match(regex).filter(function f(e) {
        return e !== "";
    });

    if (filtered[0] !== cycleString) {
        throw new Error ("Error: Relation must only be a comma separated list.");
    }

    var formattedArray = cycleString.slice(1, -1).split(")(");
    for (var i = 0; i < formattedArray.length; i++) {
        formattedArray[i] = formattedArray[i].split(",");
    }

    for (var i = 0; i < formattedArray.length; i++) {
        for (var j = 0; j < formattedArray[i].length; j++) {
            if (j === formattedArray[i].length - 1) {
                if (!parentSet.has(formattedArray[i][j])) {
                    throw new Error("Error: All elements must be in parent set.");
                }
                cycleMap[formattedArray[i][j]] = formattedArray[i][0];
            }
            else {
                if (!parentSet.has(formattedArray[i][j])) {
                    throw new Error("Error: All elements must be in parent set.");
                }
                cycleMap[formattedArray[i][j]] = formattedArray[i][j + 1];
            }
        } 
    }

    console.log(formattedArray);
    /*for (var i = 0; i < setArray.length; i++) {
        if (!cycleMap[setArray[i]])
            cycleMap[setArray[i]] = setArray[i];
    }*/

    return {parentSet, cycleMap, formattedArray};
}