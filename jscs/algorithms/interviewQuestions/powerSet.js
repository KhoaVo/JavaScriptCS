/*
 * Power set generator implementation in JavaScript
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

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory();
    else if ( typeof define === "function" && define.amd)
        define(function () { return factory(); } );
    else
        root.powerSet = factory();

})(this,function(){


    function powerSet(a){
        return _powerSet(a,0);
    }

    function _powerSet(a,i){
        if(a.length === i)
            return [[]];

        var res,item = a[i],
            moreSubsets = [];

        res = _powerSet(a,i + 1);
        res.forEach(function(subSet){
            moreSubsets.push([item].concat(subSet));
        });

        return res.concat(moreSubsets);
    }

    return powerSet;
});