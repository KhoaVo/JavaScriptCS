(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../jscs/algorithms/dynamicProgramming/minNumbersForSum'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/algorithms/dynamicProgramming/minNumbersForSum"], function (longestCommonSubString) { return factory(longestCommonSubString); } );


})(this,function(minNumbersForSum){


    var res = minNumbersForSum([1,3,5],11);
    if(res.needed !== 3)
        return "Expecting 3";


    res = minNumbersForSum([1,3,5],0);
    if(res.needed !== 0)
        return "Expecting 0";


    res = minNumbersForSum([1,3,5,7,8],64);
    if(res.needed !== 8)
        return "Expecting 8";

});