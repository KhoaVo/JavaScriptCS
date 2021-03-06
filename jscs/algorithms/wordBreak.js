/*
 * Word break implementation in JavaScript
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
    var WordBreak = function(str,dict,memo){

        memo = memo || {};
        if(dict.hasOwnProperty(str))
            return str;
        if(memo.hasOwnProperty(str))
            return memo[str];

        var l = str.length;
        var prefix,suffix,segSuffix;

        //iterate till we find the a prefix
        //and then call recursively with the remaining
        for(var i= 0; i < l; i++){
            prefix = str.substr(0,i);
            if(dict[prefix]){
                segSuffix = WordBreak(str.substr(i),dict,memo);
                if(segSuffix){
                    memo[str] = prefix + " " + segSuffix;
                    return prefix + " " + segSuffix;
                }
            }
        }

        memo[str] = null;
        return null;
    };

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = WordBreak;
    else if ( typeof define === "function" && define.amd)
        define([], function () { return WordBreak; } );
    else
        root.wordBreak = WordBreak;

})(this);

