/*
 * Matrix (2D) peak finding algorithm implementation in JavaScript
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
(function(root){

    //run time O(n log m)
    var MatrixPeakFinding = function(compareFunc){
        this.compareFunc = compareFunc;
        this.matrix = [];
    };

    MatrixPeakFinding.prototype = {
        constructor:MatrixPeakFinding,
        run: function(){
            if(this.matrix.length === 0)
                throw new Error("matrix is empty");

            return this._solve(0,this.matrix[0].length);
        },

        _solve: function(min,max){

            //start with the middle column
            var mid = Math.floor((min + max)/ 2),
                left,right;

            //find which row has the maximum value within this column
            var maxValueInColumn = this._maxInColumn(mid);
            var maxRow = maxValueInColumn.i,
                val = maxValueInColumn.value;
            
            left = this.matrix[maxRow][mid - 1];
            right = this.matrix[maxRow][mid + 1];

            //compare the values in the left and the right
            //if the left is larger than recursively call the function with the left half of the columns
            //if the right is larger than recursively call the function with the right half the columns
            //else we found the max
            if(left && this.compareFunc(left,val) > 0)
                return this._solve(min,--max);
            else if (right && this.compareFunc(right,val) > 0)
                return this._solve(++min,max);
            else
                return {i:maxRow,j:mid,value:val};
        },

        //linear search through a column to find hte max value. O(n)
        _maxInColumn:function(mid){
            var value = this.matrix[0][mid],maxI = 0,comp,
                l = this.matrix.length;
            for(var i = 0; i < l; i++){
                comp = this.compareFunc(this.matrix[i][mid],value);
                if(comp > 0){
                    value = this.matrix[i][mid];
                    maxI = i;
                }
            }

            return {i:maxI,value:value};
        },


        setMatrix: function(m){
            if(m)
                this.matrix = m;
        },

        addRowToMatrix: function(row){
            this.matrix.push(row);
        }

    };

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = MatrixPeakFinding;
    else
        root.MatrixPeakFinding = MatrixPeakFinding;

    if ( typeof define === "function" && define.amd)
        define(function () { return MatrixPeakFinding; } );

})(this);

