(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('jsCsUtils'),require('knapsack01'));
    else
        root.Knapsack01Greedy = factory(root.JsCsUtils,root.Knapsack01);

    if ( typeof define === "function" && define.amd)
        define( "knapsack01Greedy", ["jsCsUtils","knapsack01"], function (JsCsUtils,Knapsack01) { return factory(JsCsUtils,Knapsack01); } );


})(this,function(JsCsUtils,Knapsack01){


    //Extend the dynamic programming solution of Knapsack01
    //so we can keep all the utility functions
    //var Knapsack01Greedy = Object.create(Knapsack01);
    var Knapsack01Greedy = function(maxWeight){
        Knapsack01Greedy.super.constructor.call(this,maxWeight);
    };
    JsCsUtils.extend(Knapsack01Greedy,Knapsack01);


    //We override the default dynamic solution of
    //knapsack01 with a greedy approximation algorithm
    // O(nLog(n)) running time
    Knapsack01Greedy.prototype.run = function(){

        "use strict";
        var max = 0,
            toKeep = [],
            maxWeight = this.maxWeight,
            curWeight = 0,
            items = this.items,
            l = this.items.length,
            guess;

        //sort items in descending order of value to weight ratio
        //O(n log n) => Hopefully :) really depends on the javascript implementation
        items.sort(function(a,b){
            var aRatio = a.v/ a.w;
            var bRatio = b.v/ b.w;
            return bRatio - aRatio;
        });

        //O(n)
        for(var i = 0; i < l && curWeight <= maxWeight; i++){
            if((curWeight += items[i].w) <= maxWeight){
                max += items[i].v;
                toKeep.push(items[i]);
            }
        }

        //sanity check the solution
        //and make sure no one item with an unfavorable ratio
        //that fits in the knapsack
        //has a value greater than the entire solution
        //O(n)
        items.forEach(function(i){
            if(i.w <= maxWeight && i.v > max){
                max = i.v;
                toKeep = [i];
            }
        });

        return {
            maxValue: max,
            packed:toKeep
        };
    };

    Knapsack01Greedy.test = function(){

        var algorithm = new Knapsack01Greedy(5);

        algorithm.setItems([{v:5,w:3},{v:3,w:2},{v:4,w:1}]);
        console.log(algorithm.run()); //9

        algorithm.addItem({v:6,w:2});
        console.log(algorithm.run());  //10

        algorithm.setMaxWeight(1000);
        algorithm.setItems([{v:2,w:1},{v:20,w:5},{v:1000,w:1000}]);
        console.log(algorithm.run()); //1000

    };

    return Knapsack01Greedy;
});

