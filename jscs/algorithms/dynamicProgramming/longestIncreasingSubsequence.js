(function(root,factory){

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory();
    else if ( typeof define === "function" && define.amd)
        define([], function () { return factory(); } );
    else
        root.longestIncreasingSubsequence = factory();

})(this,function(){

    function longestIncreasingSubsequence(a){

        var n = a.length;
        q = [],max = 0;

        for(var k = 0; k < n; k++){

        }
    }

    function findLargest(max){

    }

    return longestIncreasingSubsequence;
});