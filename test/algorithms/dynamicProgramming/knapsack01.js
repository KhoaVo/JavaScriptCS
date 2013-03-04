(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('jscs/algorithms/dynamicProgramming/knapsack01'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/algorithms/dynamicProgramming/knapsack01"], function (Knapsack01) { return factory(Knapsack01); } );


})(this,function(Knapsack01){

    var algorithm = new Knapsack01(5);
    algorithm.setItems([{v:5,w:3},{v:3,w:2},{v:4,w:1}]);

    var res  = algorithm.run();
    if(res.maxValue !== 9)
        return "expecting 9";

    algorithm.addItem({v:6,w:2});
    res  = algorithm.run();
    if(res.maxValue !== 13)
        return "expecting 13";
});