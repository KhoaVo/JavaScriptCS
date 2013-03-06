/*
 * Longest common substring implementation in JavaScript
 * based on the algorithm described in Practical Algorithms in C++ by Bryan Flamig
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


/* IN PROGRESS */
(function(root){


    var LongestCommonSubString = function(){};
    LongestCommonSubString.prototype = {
        constructor:LongestCommonSubString,


        solve: function(){

        },

        _solve:function(indicies,dimension){

            var i,l = dimension.length;
            if(indicies < this.numDimensions){
                for(i = 1; i <= l; i++){
                    indicies.push(i);
                    this._solve(indicies,dimension[i]);
                    indicies.pop();
                }
            }else{
                for(i = 1; i <= l; i++){
                    indicies.push(i);
                    if(this.checkEqualsAtIndicies(indicies)){

                    }
                    indicies.pop();

                }
            }
        },

        //takes a variable number of strings
        setStrings: function(){

            var strings = [],
                m = makeMatrix(arguments.length),
                l = arguments.length,i;

            for(i=0; i < arguments.length; i++)
                strings.push(arguments[i].split(''));

            this.m = this._makeMatrix(l);
            this.strings = strings;
            this.numDimensions = l;
        },

        checkEqualsAtIndicies:function(indicies){

            var arrays = this.strings,
                l = arrays.length,
                val = arrays[0][indicies[0]];

            for(var i = 0; i < l; i++){
                if(val !== arrays[i][indicies[i]])
                    return false;
            }
            return true;
        },

        _makeMatrix: function(dimensions,m){
            if(!dimensions)return;
            if(m){
                m[0] = [];
                this._makeMatrix(--dimensions,m[0]);
            }else{
                m = [];
                this._makeMatrix(--dimensions,m);
                return m;
            }
        }
    };


})(this);