/*
 * Dynamic programming knapsack algorithm implementation in JavaScript
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

/*
Algorithm based on this wonder description
http://www.youtube.com/watch?v=EH6h7WA7sDw
 */
(function(root){

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

        setMaxWeight: function(w){this.maxWeight = w;},
        setItems: function(items){this.items = items;},
        addItem: function(item){this.items.push(item);},

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

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = Knapsack01;
    else if ( typeof define === "function" && define.amd)
        define(function () { return Knapsack01; } );
    else
        root.Knapsack01 = Knapsack01;

})(this);
