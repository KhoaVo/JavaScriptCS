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
         this function should return a value less than 0 if the value considered less than the itemInArray, 0 if it's equal to and
         greater than 1 if it's greater.
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
        //recursive implementation
        find: function(value){
            return this._find(value,0,this.items.length);
        },

        _find: function(value,min,max){
            var mid = Math.floor((max + min)/2);
            var comp = this.compareFunc(value,this.items[mid]);

            if(comp === 0)
                return mid;
            else if (comp < 0)
                return this._find(value,min,--max);
            else
                return this._find(value,++min,max);
        },

       //same as find but coded iteratively
        findIterative: function(value){
            var res,min  = 0,
                max   = this.items.length - 1,
                mid      = Math.floor((max + min)/2);

            while(min < max && (res = this.compareFunc(value,this.items[mid],mid)) !== 0 ){
                if (res < 0)
                    max = mid - 1;
                 else if (res > 0)
                    min = mid + 1;

                mid = Math.floor((max + min)/2);
            }

            return mid == -1 || this.compareFunc(value,this.items[mid],mid) !== 0  ? -1 : mid;
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


    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = BinarySearch;
    else
        root.BinarySearch = BinarySearch;

    if ( typeof define === "function" && define.amd)
        define(function () { return BinarySearch; } );

})(this);
