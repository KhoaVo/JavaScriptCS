(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('jscs/algorithms/greedy/knapsack01Greedy'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/algorithms/greedy/knapsack01Greedy"], function (Knapsack01Greedy) { return factory(Knapsack01Greedy); } );


})(this,function(Knapsack01Greedy){

    var algorithm = new Knapsack01Greedy(5);
    var res;
    algorithm.setItems([{v:5,w:3},{v:3,w:2},{v:4,w:1}]);

    res  = algorithm.run();
    if(res.maxValue !== 9)
        return "expecting 9";

    algorithm.addItem({v:6,w:2});
    res  = algorithm.run();
    if(res.maxValue !== 10)
        return "expecting 10";

    algorithm.setMaxWeight(1000);
    algorithm.setItems([{v:2,w:1},{v:20,w:5},{v:1000,w:1000}]);
    res  = algorithm.run();
    if(res.maxValue !== 1000)
        return "expecting 1000";
});