(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../jscs/algorithms/dynamicProgramming/longestCommonSubstring'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/algorithms/dynamicProgramming/knapsack01"], function (longestCommonSubString) { return factory(longestCommonSubString); } );


})(this,function(longestCommonSubString){


    var testCases = {
        "bfoo efoooob": "foo",
        "aaaafoooooo fo foo fo": "fo",
        "abbbaaabbabbabbbca caba": "abbba",
        "aaaabbaa bbaaaaaaabbaaabaaa foo": null,
        "dtestingfoobar testingfoobar" : "testingfoobar"
    };

    var res;
    for(var k in testCases){
        if( (res = longestCommonSubString.apply(this, k.split(' '))) !== testCases[k]){
            return "Expecting " + testCases[k] + " got " + res;
        }
    }

});