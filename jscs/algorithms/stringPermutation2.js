(function (root, factory) {

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory();
    else if ( typeof define === "function" && define.amd)
        define([], function () { return factory(); } );
    else
        root.stringPermutation2 = factory();

})(this, function () {

    function permute(str) {
        if(!str || str.length == 0)
            return [];

        var chars = str.split(''), first = chars.pop();
        return  _permute(chars, [first]);
    }

    function _permute(remainingChars, curPermutations) {

        var next = [], nextChar;
        if (remainingChars.length === 0)
            return curPermutations;

        nextChar = remainingChars.pop();
        curPermutations.forEach(function (v) {
            for (var i = 0; i <= v.length; i++)
                next.push(insertAt(v, i, nextChar));
        });

        return _permute(remainingChars, next);
    }

    function insertAt(str, idx, toInsert) {
        return str.slice(0, idx) + toInsert + str.slice(idx);
    }

    return permute;
});