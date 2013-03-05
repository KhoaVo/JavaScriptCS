(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../jscs/algorithms/maximumRectangularAreaInGrid'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/algorithms/maximumRectangularAreaInGrid"], function (MaxRectangularAreaInGrid) { return factory(MaxRectangularAreaInGrid); } );

})(this,function(MaxRectangularAreaInGrid){

    var solver = new MaxRectangularAreaInGrid(1);
    solver.setGrid([
        [1,1,0,0,1],
        [1,1,1,1,1]
    ]);

    if(solver.run() !== 5)
        return "Expecting 5";

    solver.addToGrid([1,1,0,0,0]);
    if(solver.run() !== 6)
        return "Expecting 5";

});