
/*
Algorithm based on this wonder description
 http://www.youtube.com/watch?v=EH6h7WA7sDw

    Usage:

 var algorithm = new Knapsack01(5);
 algorithm.setItems([{v:5,w:3},{v:3,w:2},{v:4,w:1}]);

 console.log(algorithm.run()); //9

 algorithm.addItem({v:6,w:2});

 console.log(algorithm.run());  //13

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
            i, j, w, l = items.length,
            curItem, m = [],k = [];

        this._initArrays(m,k);
        for( i = 1; i <= l; i++){
            curItem = items[i - 1];
            for(w = 1; w <= this.maxWeight; w++){
                prevSol = m[i-1][w];
                if(w >= curItem.w){
                    if(m[i-1][w - curItem.w])
                        curSol =   m[i-1][w - curItem.w] + curItem.v;
                    else
                        curSol = curItem.v;

                    m[i][w] = Math.max(prevSol,curSol);
                    k[i][w] = curSol >= prevSol ? 1:0;
                }else{
                    m[i][w] = prevSol;
                    k[i][w] = 0;
                }
            }
        }

        return this._traceKeepArray(k);
    },

    _traceKeepArray: function(k){
        var cur,max = 0,toKeep = [],
            weightRemaining = this.maxWeight,
            items = this.items,l=this.items.length, i,j;

        for(i = l; i > 0; i--){
            for(j = weightRemaining; j > 0;j--){
                if(k[i][j]){
                    cur = items[i - 1];
                    if(j >= cur.w){
                        max += cur.v;
                        toKeep.push(cur);
                        weightRemaining -= cur.w;
                        break;
                    }
                }else{
                    i--;
                }
            }
        }

        return  {
            maxValue:max,
            packed:toKeep
        };
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

    /*
        Initialize the optimal packing value of a knapsack that has no
        capacity to 0 for all items.

     */
    _initArrays: function(maxValuesForW,keep){

        var i = this.items.length + 1;
        while(i--){
            maxValuesForW.push([]);
            keep.push([]);
        }

        i = this.maxWeight + 1;
        while(i--){
            maxValuesForW[0].push(0);
            keep[0].push(0);
        }
    }
};