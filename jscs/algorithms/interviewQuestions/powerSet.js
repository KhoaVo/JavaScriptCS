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

    var  powerSet = function(set){
        return _powerSet(set,[[]],{});
    };

    var _powerSet = function(set,result,added){

        var l = set.length,count = 0,item;
        if(set.length === 0)
            return;

        var hash = JSON.stringify(set);
        if(!added[hash]){
            added[hash] = true;
            result.push([].concat(set));
        }

        //For each of the elements in the current set
        //make a recursive call passing in  the set without that element
        while(count != l){
            item = set.shift();
            _powerSet(set,result,added);
            set.push(item);
            count++;
        }
        return result;
    };

    return powerSet;
});