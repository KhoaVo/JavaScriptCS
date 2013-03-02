/*
 * Maximum area in rectangle implementation in JavaScript
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
 Starting from the first row we use the current maximum column heights to find the largest
 rectangle best on those heights. Then we adjust the maximum column heights for the next row and
 and so on. At each row we solve the problem of the largest rectangle. After all rows have been iterated,
 we take the maximum of all the solved sub problems.

 Example:
 1O11
 O111
 OOO1

 col heights
 1st round: [1,0,1,1] max rect area = 2
 2nd round: [0,1,2,2] max rect area = 4
 3rd round: [0,0,0,3] max rect area = 3

 MAX of all 3 solutions = 4

 run time is O(n)
 where n = number of elements in the grid

You can run the above example by doing
 MaxRectangularAreaInGrid.test();
 */

/*
    @param valueToLookFor   denotes the value to look for when seeing if a section is contiguous
 */

(function(root){

    var MaxRectangularAreaInGrid = function(valueToLookFor){
        this.grid = [];
        this.value = valueToLookFor;
    };


    MaxRectangularAreaInGrid.prototype = {
        constructor: MaxRectangularAreaInGrid,

        run: function(){
            var self = this,
                grid = this.grid,
                curColHeights = [],
                MAX = 0;

            grid.forEach(function(row){
                self._adjustHeights(curColHeights,row);
                MAX = Math.max(MAX,self._findLargestFromColumnHeights(curColHeights));
            });

            return MAX;
        },

        /* Sets the grid to be solved */
        setGrid: function(grid){
            this.grid = grid;
        },

        /* Add a row to the grid to be solved */
        addToGrid: function(row){
            this.grid.push(row);
        },


        /*
         Adjusts the max column heights based on the addition of a new row
         */
        _adjustHeights: function (curColHeights,newRow){
            var toLookFor = this.value;
            newRow.forEach(function(val,j){
                if(val === toLookFor)
                    curColHeights[j] ? curColHeights[j]++ : curColHeights[j] = 1;
                else
                    curColHeights[j] = 0;
            });
        },

        /*
         Based on the column heights we can solve for the largest rectangular area by
         in linear O(n) time.

         @param colHeights   a one dimensional array representing the column heights so far. EX: [1,0,3,1,5,5,2,1,4,7]

         */
        _findLargestFromColumnHeights: function (colHeights){

            var MAX = 0,longest = 0, highest = 0,
                toDo = [],solved = {},
                l = colHeights.length,start = 0,
                h,cur;

            //find the first column with a non zero height
            while(colHeights[start++] === 0);
            if(colHeights[--start])
                toDo.push([colHeights[start],start]);

            while(toDo.length){
                cur = toDo.pop();
                longest = 0;
                highest = cur[0];
                start = cur[1];

                //mark that we solved this start index already
                solved[start] = true;

                for(start = cur[1]; start < l && (h = colHeights[start]);start++){
                    longest++;

                    //if the next column is currently higher than our max we
                    //put it in stack so that we know to come back and start from that
                    //index later
                    if(h > highest && !solved[start])
                        toDo.push([h,start]);

                    //if the next column is lower than the current column
                    //we downgrade our best height for current block.
                    else if(h < highest)
                        highest = h;

                    MAX = Math.max(MAX,highest * longest);
                }

                while(colHeights[start++] === 0);
                if(colHeights[--start])
                    toDo.push([colHeights[start],start]);
            }

            return MAX;
        }
    };

    /*
        Test cases
     */
    MaxRectangularAreaInGrid.test = function(){
        var solver = new MaxRectangularAreaInGrid(1);
        solver.setGrid([
            [1,1,0,0,1],
            [1,1,1,1,1]
        ]);
        console.log(solver.run()); // should output 5
        solver.addToGrid([1,1,0,0,0]);
        console.log(solver.run()); // should output 6
    };


    if(typeof module !== "undefined" && module.exports)
            exports = module.exports = MaxRectangularAreaInGrid;
    else
        root.MaxRectangularAreaInGrid = MaxRectangularAreaInGrid;

    if ( typeof define === "function" && define.amd)
        define( "maxrectangularareaingrid", [], function () { return MaxRectangularAreaInGrid; } );

})(this);









