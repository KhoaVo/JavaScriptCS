/*
 * Greedy knapsack approximation algorithm implementation in JavaScript
 * Copyright (c) 2013 Khoa Vo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

//Run test with Knapsack01Greedy.test();
(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('jscsutils'),require('knapsack01'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/utils","jscs/algorithms/dynamicProgramming/knapsack01"], function (JsCsUtils,Knapsack01) { return factory(JsCsUtils,Knapsack01); } );
    else
        root.Knapsack01Greedy = factory(root.JsCsUtils,root.Knapsack01);


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

