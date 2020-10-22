function unary(fn) {
    return function one(arg) {
        return fn(arg);
    };
}

function binary(fn) {
    return function two(arg1, arg2) {
        return fn(arg1, arg2);
    };
}

function flip(fn) {
    return function flipped(arg1, arg2, ...args) {
        return fn(arg2, arg1, ...args);
    };
}

function reverserArgs(fn) {
    return function reversed(...args) {
        return fn(...args.reverse());
    };
}

function spreadArgs(fn) {
    return function spread(args) {
        return fn(...args);
    };
}

function unSpreadArgs(fn) {
    return function unSpread(...args) {
        return fn(args);
    };
}

function not(fn) {
    return function negated(...args) {
        return !fn(...args);
    };
}

function when(fn) {
    return function (predicate) {
        return function (...args) {
            if (predicate(...args)) {
                fn(...args);
            }
        }
    };
}

function compose(...fns) {
    return pipe(...fns.reverse());
}

function pipe(...fns) {
    return function piped(result) {
        for (let fn of fns)
            result = fn(result);
        return result;
    }
}

function trampoline(fn) {
    return function trampolined(...args) {
        var result = fn(...args);

        while (typeof result == 'function')
            result = result();

        return result;
    };
}

function map(mapper, arr) {
    var newList = [];
    for (let el of arr)
        newList.push(
            mapper(el)
        );
    return newList;
}

function filterIn(predicate, arr) {
    var newList = [];
    for (let el of arr)
        if (predicate(el)) newList.push(el);
    return newList;
}

function filterOut(predicate, arr) {
    var newList = [];
    for (let el of arr)
        if (!predicate(el)) newList.push(el);
    return newList;
}

function reduce(reducer, initialValue, arr) {
    var ret = initialValue;
    for (let el of arr)
        ret = reducer(ret, el);
    return ret;
}
