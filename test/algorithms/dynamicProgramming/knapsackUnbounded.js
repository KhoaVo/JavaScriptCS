(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../jscs/algorithms/dynamicProgramming/knapsackUnbounded'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/algorithms/dynamicProgramming/knapsackUnbounded"], function (Knapsack) { return factory(Knapsack); } );


})(this,function(Knapsack){

    var algorithm = new Knapsack(5);
    algorithm.setItems([{v:5,w:3},{v:3,w:2},{v:4,w:1}]);

    var res  = algorithm.run();
    if(res.maxValue !== 20)
        return "expecting 9";

    algorithm.addItem({v:1500,w:5});
    res  = algorithm.run();
    if(res.maxValue !== 1500)
        return "expecting 1500";
});