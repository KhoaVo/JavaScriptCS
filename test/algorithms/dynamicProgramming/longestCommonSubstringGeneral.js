(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../jscs/algorithms/dynamicProgramming/longestCommonSubstringGeneral'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/algorithms/dynamicProgramming/longestCommonSubstringGeneral"], function (longestCommonSubString) { return factory(longestCommonSubString); } );


})(this,function(longestCommonSubString){


    var testCases = {
        "bfoo efoooob": "foo",
        "aaaafoooooo fo foo fo": "fo",
        "aaaafoooooo fo": "fo",
        "abbbaaabbabbabbbca caba": "ab,ba,ca",
        "aaaabbaa bbaaaaaaabbaaabaaa foo": '',
        "dtestingfoobar testingfoobar khoatestingfkhoatestingfoobarmebobtestingfoobar" : "testingfoobar"
    };

    var res;
    for(var k in testCases){
        if( (res = longestCommonSubString.apply(this, k.split(' '))).sort().join(',') !== testCases[k]){
            return "Expecting " + testCases[k] + " got " + res;
        }
    }

});