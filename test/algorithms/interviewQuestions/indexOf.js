(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require("../../../jscs/algorithms/interviewQuestions/indexOf"));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/algorithms/interviewQuestions/indexOf"], function (longestCommonSubString) { return factory(longestCommonSubString); } );


})(this,function(indexOf){


    if(indexOf('foo','barfoobar') !== 3)
        return 'Expecting 3';

    if(indexOf('baz','barfoobar') !== -1)
        return 'Expecting -1';


    if(indexOf('aab','aaaaaaaaaaaaaaaaaaaac') !== -1)
        return 'Expecting -1';


    if(indexOf('aab','aaaaaaaaaaaaaaaaabaaac') !== 15)
        return 'Expecting 15';

});
