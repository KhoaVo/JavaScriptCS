/*
 * Simple case longest common substring implementation in JavaScript
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

(function(root,factory){

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory();
    else if ( typeof define === "function" && define.amd)
        define( function () { return factory(); } );
    else
        root.longestCommonSubstringSimple = factory();

})(this,function(){

    function lcs(s1, s2) {
        var iEnd = s1.length + 1,
            jEnd = s2.length + 1,
            m = [],i, j, val, longest = 0,
            segment, result = {};

        m[0] = [];
        for (i = 1; i < iEnd; i++) {
            m[i] = [];
            for (j = 1; j < jEnd; j++) {
                if (s1[i - 1] === s2[j - 1]) {
                    m[i][j] = (m[i - 1][j - 1] || 0) + 1;
                    val = m[i][j];
                    if (val > longest) {
                        longest = val;
                        result = {};
                        segment = s1.slice(i - longest, i);
                        result[segment] = 1;
                    } else if (val === longest) {
                        segment = s1.slice(i - longest, i);
                        result[segment] = 1;
                    }

                } else {
                    m[i][j] = 0;
                }
            }
        }


        return Object.keys(result);
    }

    return lcs;

});