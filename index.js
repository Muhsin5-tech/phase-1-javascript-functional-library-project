function myEach(collection, callback) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            if (callback(collection[i], i, collection) === false) {
                break; 
            }
        }
    } else {
        for (let key in collection) {
            if (collection.hasOwnProperty(key)) {
                if (callback(collection[key], key, collection) === false) {
                    break; 
                }
            }
        }
    }
    return collection;
}

function myMap(collection, callback) {
    const result = [];
    myEach(collection, (value, index, coll) => {
        result.push(callback(value, index, coll));
    });
    return result;
}


function myReduce(collection, callback, acc) {
    let startIndex = 0;
    let isObject = typeof collection === 'object' && !Array.isArray(collection);

    if (acc === undefined) {
        if (isObject) {
            acc = collection[Object.keys(collection)[0]];
            startIndex = 1;
        } else {
            acc = collection[0];
            startIndex = 1;
        }
    }

    if (Array.isArray(collection)) {
        for (let i = startIndex; i < collection.length; i++) {
            acc = callback(acc, collection[i], collection);
        }
    } else {
        let keys = Object.keys(collection);
        for (let i = startIndex; i < keys.length; i++) {
            acc = callback(acc, collection[keys[i]], collection);
        }
    }

    return acc;
}

function myFind(collection, predicate) {
    let result;
    myEach(collection, (value, index, coll) => {
        if (predicate(value, index, coll)) {
            result = value;
            return false;
        }
    });
    return result;
}




function myFilter(collection, predicate) {
    const result = [];
    myEach(collection, (value, index, coll) => {
        if (predicate(value, index, coll)) {
            result.push(value);
        }
    });
    return result;
}

function mySize(collection) {
    return Array.isArray(collection) ? collection.length : Object.keys(collection).length;
}

function myFirst(array, n) {
    if (n === undefined) {
        return array[0];
    }
    return array.slice(0, n);
}

function myLast(array, n) {
    if (n === undefined) {
        return array[array.length - 1];
    }
    return array.slice(-n);
}

function myKeys(object) {
    const keys = [];
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    return keys;
}

function myValues(object) {
    const values = [];
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            values.push(object[key]);
        }
    }
    return values;
}


function mySortBy(array, callback) {
    return array.slice().sort((a, b) => {
        const resultA = callback(a);
        const resultB = callback(b);
        if (resultA < resultB) return -1;
        if (resultA > resultB) return 1;
        return 0;
    });
}

function myFlatten(array, shallow = false, newArr = []) {
    for (let item of array) {
        if (Array.isArray(item)) {
            if (shallow) {
                newArr.push(...item);
            } else {
                myFlatten(item, shallow, newArr);
            }
        } else {
            newArr.push(item);
        }
    }
    return newArr;
}


console.log(myEach([1, 2, 3], console.log));
console.log(myMap([1, 2, 3], num => num * 2));
console.log(myReduce([1, 2, 3], (acc, val) => acc + val, 0));
console.log(myFind([1, 2, 3, 4], num => num % 2 === 0));
console.log(myFilter([1, 2, 3, 4], num => num % 2 === 0));
console.log(mySize({ one: 1, two: 2, three: 3 }));
console.log(myFirst([5, 4, 3, 2, 1]));
console.log(myLast([5, 4, 3, 2, 1], 2));
console.log(myKeys({ one: 1, two: 2, three: 3 }));
console.log(myValues({ one: 1, two: 2, three: 3 }));
