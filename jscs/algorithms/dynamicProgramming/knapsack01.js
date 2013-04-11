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

            var items = this.items,item,
                prevSol,remainder,
                i, j, w, l = items.length,
                m = [[]],k = [[]];

            for(i =  1; i < l + 1; i++){
                m[i] = [0];
                item = this.items[i - 1];
                for(j = 1; j <= this.maxWeight; j++){
                    prevSol = m[i - 1][j] || 0;
                    remainder = m[i - 1][j - item.w ] || 0;
                    if(item.w <= j){
                        m[i][j] = Math.max(prevSol, item.v + remainder);
                    }else{
                        m[i][j] = prevSol;
                    }
                }
            }

            return {maxValue:m[items.length][this.maxWeight]};
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
