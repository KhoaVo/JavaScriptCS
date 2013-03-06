/*
 * String permutation implementation in JavaScript
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
(function(root){

    var StringPermutation = function(str){
        var res = [];
        permute(str.split(''),0,str.length,res);
        return res;
    };

    var rotateLeft = function(v, start, n){
        var tmp = v[start];
        for (var i = start; i < n-1; i++) {
            v[i] = v[i+1];
        }
        v[n-1] = tmp;
    };

    var swap = function(a,i,j){
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    };

    var permute = function(v, start,n,res)
    {
        var i, j;
        res.push(v.join(''));
        if (start < n) {
            for (i = n-2; i >= start; i--) {
                for (j = i + 1; j < n; j++) {
                    swap(v, i, j);
                    permute(v, i+1, n,res);
                }
                rotateLeft(v, i, n);
            }
        }
    };


    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = StringPermutation;
    else if ( typeof define === "function" && define.amd)
        define([], function () { return StringPermutation; } );
    else
        root.StringPermutation = StringPermutation;

})(this);