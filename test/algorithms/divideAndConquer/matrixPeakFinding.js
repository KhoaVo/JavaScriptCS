(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('jscs/algorithms/divideAndConquer/matrixPeakFinding'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/algorithms/divideAndConquer/matrixPeakFinding"], function (MatrixPeakFinding) { return factory(MatrixPeakFinding); } );


})(this,function(MatrixPeakFinding){

    var algorithm = new MatrixPeakFinding(function(a,b){
        return a-b;
    });

    algorithm.setMatrix([[1,2,10,9,8,7,6,5,4]]);
    var res = algorithm.run();

    if(res.i != 0 || res.j != 2 || res.value != 10)
        return "expecting i = 0, j = 2, value = 10";

    algorithm.setMatrix([
        [10,8,10,10],
        [14,13,12,11],
        [15,9,11,21],
        [16,17,19,20]
    ]);

    res = algorithm.run();
    if(res.i != 2 || res.j != 3 || res.value != 21)
        return "expecting i = 0, j = 2, value = 10";
});