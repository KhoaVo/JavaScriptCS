
(function(tests){

    var Tester = {
        checkError:function(i,error,func){
            func(tests[i] + (error ? " FAILED: " + error: " PASSED"))
        },

        runWithBrowser:function(){
            define(tests,function(){
                for(var i =0; i < arguments.length;i++)
                    Tester.checkError(i,arguments[i],function(msg){
                        document.write(msg + "<br/>"); console.log(msg);
                    });
            });
        },

        runWithNode: function(){
            for(var i =0; i < tests.length;i++)
                Tester.checkError(i,require("./" + tests[i]),console.log);
        }
    };

    if(typeof module !== "undefined" && module.exports)
        Tester.runWithNode();
    else if ( typeof define === "function" && define.amd)
        Tester.runWithBrowser();

})([

    'test/algorithms/maximumRectangularAreaInGrid',
    'test/algorithms/wordBreak',
    'test/algorithms/divideAndConquer/binarySearch',
    'test/algorithms/divideAndConquer/matrixPeakFinding',
    'test/algorithms/greedy/knapsack01Greedy',
    'test/algorithms/dynamicProgramming/knapsack01',
    'test/algorithms/dynamicProgramming/longestCommonSubstring',

    'test/dataStructures/linkedlist'
]);


