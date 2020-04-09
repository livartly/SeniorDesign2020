class CycleSolver {
    // True: input is in cycle form, FALSE: input is in permutation form
    constructor (setString, relation, isCycleForm) {
        if (isCycleForm) {
            var {parentSet, cycleMap} = parseCycleForm(setString, relation);
        }
        else {
            var {parentSet, cycleMap} = validateInput(setString, relation);
        }

        this.parentSet = parentSet;
        this.cycleMap = cycleMap;
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
        // Make composite array, 1st element is first element of the inner funtion
        var otherArray = Object.entries(other.cycleMap).reverse();
        var otherKeys = Object.keys(other.cycleMap);
        var otherVals = Object.values(other.cycleMap);
        var thisArray = Object.entries(this.cycleMap).reverse();
        var thisKeys = Object.keys(this.cycleMap);
        var thisVals = Object.values(this.cycleMap);
        var composite = [otherArray[0][0]];

        // Loop through inner function
        for (var i = 0; i < otherArray.length; i++) {
            var f = false;
            // For each member, check mapping in outer function
            for (var j = 0; j < thisArray.length; j++) {
                // If the element is a member of the outer function, add its mapping to the array.
                // Otherwise, it maps to itself. Add to the array.
                if (thisKeys.includes(otherArray[i][1])) {
                    composite.push(thisVals[j]);
                }
                else {
                    composite.push(thisArray[j][1]);
                }

                // If cycle has been formed, exit
                var last = composite.pop();
                if (composite[0] === last) {
                    f = true;
                    break;
                }
                else {
                    composite.push(last);
                }
            }

            if (f)
                break;
        }

        return composite;
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

    for (const e in parentSet) {
        cycleMap[e] = e;
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
    return {parentSet, cycleMap};
}