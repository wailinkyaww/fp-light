(function UMD(name, context, definition) {
    if (typeof define === 'function' && define.amd) define(definition);
    else if (typeof module !== 'undefined' && module.exports)
        module.exports = definition();
    else context[name] = definition(name, context);
})('fpLight', this, function definition(name, context) {
    'use strict';

    var publicAPI = {
        identity,
        constant,
        curry,
        unary,
        binary,
        flip,
        reverserArgs,
        spreadArgs,
        unSpreadArgs,
        complement: not,
        not,
        when,
        trampoline,
        map,
        filter: filterIn,
        filterIn,
        filterOut,
        reduce,
        toLower,
        toUpper,
        split,
        mapObj,
        keys,
        prop,
        setProp,
        pick,
        pickAll,
        head,
        tail,
        last
    };

    publicAPI = mapObj(curry, publicAPI);

    return {
        pipe,
        compose,
        ...publicAPI
    };

    // fp core
    function identity(val) {
        return val;
    }

    function constant(val) {
        return function f() {
            return val;
        };
    }

    // from Brian Lonsdorf, DrBoolean
    function curry(fn) {
        var arity = fn.length;

        return function $curry(...args) {
            if (args.length < arity) return $curry.bind(null, ...args);
            return fn(...args);
        };
    }

    function compose(...fns) {
        return pipe(...fns.reverse());
    }

    function pipe(...fns) {
        return function piped(result) {
            for (let fn of fns) result = fn(result);
            return result;
        };
    }

    // arguments
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

    // conditional
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
            };
        };
    }

    // alternative recursion
    function trampoline(fn) {
        return function trampolined(...args) {
            var result = fn(...args);

            while (typeof result == 'function') result = result();

            return result;
        };
    }

    function map(fn, functor) {
        return functor.map(fn);
    }

    function filterIn(predicate, arr) {
        var newList = [];
        for (let el of arr) if (predicate(el)) newList.push(el);
        return newList;
    }

    function filterOut(predicate, arr) {
        var newList = [];
        for (let el of arr) if (!predicate(el)) newList.push(el);
        return newList;
    }

    function reduce(reducer, initialValue, arr) {
        var ret = initialValue;
        for (let el of arr) ret = reducer(ret, el);
        return ret;
    }

    // string -> string
    function toLower(str = '') {
        return str.toLowerCase();
    }

    function toUpper(str = '') {
        return str.toUpperCase();
    }

    function split(delimiter, str = '') {
        return str.split(delimiter);
    }

    // Object
    function mapObj(mapperFn, obj) {
        var newObj = {};
        for (let prop in obj)
            if (hasProp(obj, prop)) newObj[prop] = mapperFn(obj[prop]);
        return newObj;
    }

    function keys(obj = {}) {
        return Object.keys(obj);
    }

    function prop(prop, obj = {}) {
        return obj[prop];
    }

    function setProp(prop = '', obj = {}, value) {
        return {
            [prop]: value,
            ...obj
        };
    }

    function pick(obj = {}, props = []) {
        var newObj = {};
        for (let prop of props)
            if (hasProp(obj, prop)) newObj[prop] = obj[prop];
        return newObj;
    }

    function pickAll(obj = {}, props = []) {
        var newObj = {};
        for (let prop of props) newObj[prop] = obj[prop];
        return newObj;
    }

    function hasProp(obj, prop) {
        return obj.hasOwnProperty(prop);
    }

    // positional
    function head(value) {
        var [initial] = value;
        if (typeof value == 'string' && value.length == 0) return '';
        return initial;
    }

    function tail(value) {
        var [_, ...rest] = value;
        if (typeof value == 'string') return rest.join('');
        else return rest;
    }

    function last(x) {
        if (typeof x == 'string' && x.length == 0) return x;
        return x[x.length - 1];
    }
});
