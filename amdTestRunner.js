require.config({
    paths: {
        $algorithms: 'test/algorithms',
        $dataStructures: 'test/dataStructures'
    }
});

var _testIncludes = [
    '$algorithms/maximumRectangularAreaInGrid',
    '$algorithms/divideAndConquer/binarySearch',
    '$algorithms/divideAndConquer/matrixPeakFinding',
    '$algorithms/greedy/knapsack01Greedy',
    '$algorithms/dynamicProgramming/knapsack01'
];

define(_testIncludes,function(){
    var error,l=arguments.length;
    for(var i =0; i < l;i++){
        error = arguments[i];
        if(error)
            console.log(_testIncludes[i] + " FAILED: " + error);
        else
            console.log(_testIncludes[i] + " PASSED.");
    }
});