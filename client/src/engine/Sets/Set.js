/*
* Extention of the Set class to handle basic set logic for section 4.1
*/

// Check if this set is a proper subset of otherSet
Set.prototype.properSubset = function (otherSet) {

    // Proper subset size must be < size of parent set
    if (this.size >= otherSet.size)
        return false;
    else {
        for (var elem of this) {
            if (!otherSet.has(elem))
                return false;
        }

        return true;
    }
}

// Returns a union of this set and otherSet (combines all elements into one set)
Set.prototype.union = function (otherSet) {
    var unionSet = new Set();

    for (var elem of this) {
        unionSet.add(elem);
    }

    for (var elem of otherSet) {
        unionSet.add (elem);
    }

    return unionSet;
}

// Returns the intersection of this set and otherSet (logical &)
Set.prototype.intersection = function (otherSet) {
    var intersectionSet = new Set();

    for (var elem of otherSet) {
        if (this.has(elem))
            intersectionSet.add(elem);
    }

    return intersectionSet;
}

// Returns the SUBTRACTION of this set minus otherSet
Set.prototype.subtract = function (otherSet) {
    var differenceSet = new Set();

    for (var elem of this) {
        if (!otherSet.has(elem))
            differenceSet.add(elem);
    }
    
    return differenceSet;
}

// Returns the POWERSET of this set
Set.prototype.powerset = function () {
    
    // Function to get all subsets from an array
    const getAllSubsets = 
        theArray => theArray.reduce(
            (subsets, value) => subsets.concat(subsets.map(set => [value, ...set])), [[]]);

    // Convert iterator to array of values
    let e = Array.from(this.entries());
    let elementArray = [];    
    e.forEach(elem => elementArray.push(elem[0]));
    
    let pSet = getAllSubsets(elementArray);

    return pSet;
}

// Calculates CARTESIAN PRODUCT of this set with otherSet
Set.prototype.cartesianProduct = function (otherSet) {
    var product = [];

    for (var elem of this) {
        for (var ind of otherSet) {
            var s = [];
            s.push(elem);
            s.push(ind);
            product.push(s);
        }
    }

    return product;
}