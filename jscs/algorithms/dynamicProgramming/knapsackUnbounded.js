(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../utils'),require('./knapsack01'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/utils","jscs/algorithms/dynamicProgramming/knapsack01"], function (JsCsUtils,Knapsack01) { return factory(JsCsUtils,Knapsack01); } );
    else
        root.KnapsackUnbounded = factory(root.JsCsUtils,root.Knapsack01);

})(this,function(JsCsUtils,Knapsack01){

    var KnapsackUnbounded = function(maxWeight){
        KnapsackUnbounded.super.constructor.call(this,maxWeight);
    };

    JsCsUtils.extend(KnapsackUnbounded,Knapsack01);


    KnapsackUnbounded.prototype.run = function(){

        var m = [0],l = this.items.length,item,curMax;
        for(var i = 1; i <= this.maxWeight; i++){
            for(var j = 0; j < l; j++){
               curMax = m[i] || Number.MIN_VALUE;
               item = this.items[j];
                if(item.w <= i)
                    m[i] = Math.max(curMax,m[i - item.w] + item.v);
            }
        }

        return {maxValue:m[this.maxWeight]};
    };

    return KnapsackUnbounded;

});