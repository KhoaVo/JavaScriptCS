/*
 * Binary search implementation in JavaScript
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

//Run test using BinarySearch.test();
(function(root){

    /*
        @param compareFunc a function that takes in the  (value,itemInArray, itemIndex)
         this function should return -1 if the value considered less than the itemInArray, 0 if it's equal to and
         1 if it's greater.
     */
    var BinarySearch = function(compareFunc){
        this.compareFunc = compareFunc;
        this.items = [];
    };

    BinarySearch.prototype= {
        constructor:BinarySearch,

        setItems: function(items){
            this.items = items;
        },

        setCompareFunction: function(compareFunc){
            this.compareFunc = compareFunc;
        },

        //return the index of the first index found to contain the value
        find: function(value){
            var start  = 0,
                res,
                stop   = this.items.length - 1,
                middle      = Math.floor((stop + start)/2),
                items = this.items,
                compareFunc = this.compareFunc;

            while(start < stop && (res = compareFunc(value,items[middle],middle)) !== 0 ){
                //adjust search area
                if (res < 0)
                    stop = middle - 1;
                 else if (res > 0)
                    start = middle + 1;

                middle = Math.floor((stop + start)/2);
            }

            return middle == -1 || compareFunc(value,items[middle],middle) !== 0  ? -1 : middle;
        },

        //Find the start and end indices (inclusive) where the value is located
        findRange: function(value){
           var  mid = this.find(value),
            i = mid,
            items = this.items,
            l = this.items.length,
            cur,start,end,compareFunc = this.compareFunc;

            if(mid != -1){
                cur = items[i];
                start = end = mid;
                while(i >= 0 && compareFunc(value,cur,i) === 0){
                    start = i;
                    cur = items[--i];
                };

                i = mid + 1;
                cur = items[i];
                while(i < l && compareFunc(value,cur,i) === 0){
                   end = i;;
                   cur = items[++i];
                }
            }
            return {start:start,end:end};
        }
    };

    BinarySearch.test = function(){
        var b = new BinarySearch(function(a,b){
            return a-b;
        });

        b.setItems([1,1,1,1,2,2,2,3,4,5,5,5,5]);
        console.log(b.find(3)); //7
        console.log(b.findRange(2)) // 4 to 6
    };

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = BinarySearch;
    else
        root.BinarySearch = BinarySearch;

    if ( typeof define === "function" && define.amd)
        define( "binarysearch", [], function () { return BinarySearch; } );

})(this);
