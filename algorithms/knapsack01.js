
/*

    Usage:

    var algorithm = new Knapsack01(5);
    algorithm.setItems([{v:5,w:3},{v:3,w:2},{v:4,w:1}]);

    algorithm.run();

 */
var Knapsack01 = function(maximumWeight){
    this.maxWeight = maximumWeight;
    this.items = [];
}


Knapsack01.prototype = {
    constructor: Knapsack01,

    run: function(){

        var items = this.items,
            prevSol,curSol,
            i, w, l = items.length,
            curItem, m = [],k = [],
            max, toKeep = [];

        this._initArrays(m,k);
        for( i = 1; i <= l; i++){
            curItem = items[i - 1];
            for(w = 1; w <= this.maxWeight; w++){
                prevSol = m[i-1][w];
                if(w >= curItem.w){
                    curSol =  m[i-1][w - curItem.w] + curItem.v;
                    m[i][w] = Math.max(prevSol,curSol);
                    k[i][w] = curSol >= prevSol ? 1:0;
                }else{
                    m[i][w] = prevSol;
                    k[i][w] = 0;
                }
            }
        }

        max = 0;
        for(i = items.length; i > 0; i--){
            for(j = w; j > 0; j--){
                if(k[i][j]){
                    j -= items[i - 1].w;
                    toKeep.push(items[i-1]);
                    max += items[i-1].v;
                }else{
                    i--;
                }
            }
        }

       // max = m.pop().pop();
        return max;
    },

    setMaxWeight: function(w){
        this.maxWeight = w;
    },

    setItems: function(items){
        this.items = items;
    },

    addItem: function(item){
        this.items.push(item);
    },

    _initArrays: function(maxValuesForW,keep){

        var i = this.items.length + 1;
        while(i--){
            maxValuesForW.push([]);
            keep.push([]);
        }

        i = this.maxWeight + 1;
        while(i--){
            maxValuesForW[0].push(0);
            keep.push(0);
        }
    }
};