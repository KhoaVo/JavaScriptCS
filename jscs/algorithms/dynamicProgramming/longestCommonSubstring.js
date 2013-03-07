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
(function(root,factory){

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../matrixUtils'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/matrixUtils"], function (JsCsMatrixUtils) { return factory(JsCsMatrixUtils); } );
    else
        root.LongestCommonSubString = factory(root.JsCsMatrixUtils);

})(this,function(JsCsMatrixUtils){

    var set = JsCsMatrixUtils.setAtIndicies,
        get = JsCsMatrixUtils.getAtIndicies;

    // Takes in a variable about of string arguments. Ex: LongestCommonSubString("foo","foobar","barfoo","foo","foooo")
    var LongestCommonSubString = function(){
        var strings = arguments,dimensions = getMatrixDimensions(strings),
            m = [],prev,res = {},z = 0,segment,val,strIndicies;

        var iterator = new JsCsMatrixUtils.Iterator(dimensions,0);
        iterator.each(m,function(v,indicies){
            strIndicies = indicies.map(function(v){return v - 1;});
            if(indicies.indexOf(0) > -1)
                return;

            if(checkEqualsAtIndicies(strings,strIndicies)){
                if(indicies.indexOf(1) > -1){
                    set(m,indicies,1);
                }else{
                    prev = indicies.map(function(v){return v - 1;});
                    set(m,indicies,get(m,prev) + 1);
                }

                val = get(m,indicies);
                if(val > z){
                    z = val;
                    res = {};
                    segment = getSlice(z,indicies,strings[0]);
                    res[segment] = val;

                }else if( val === z){
                    segment = getSlice(z,indicies,strings[0]);
                    res[segment] = val;
                }
            }
        });

        console.log(res);
        return res;
    };

    var getSlice = function(z,indicies,string){
        var startIdx = indicies[0] - z;
        var lastIdx = indicies[0];
        return string.slice(startIdx,lastIdx);
    };

    var getMatrixDimensions = function(strings){
        var dimensions = [];
        for(var i = 0; i < strings.length; i ++)
            dimensions.push(strings[i].length + 1);

        return dimensions;
    };

    var checkEqualsAtIndicies = function(arrays,indicies){

        var l = indicies.length,
            val = arrays[0][indicies[0]];

        for(var i = 0; i < l; i++){
            if(val !== arrays[i][indicies[i]])
                return false;
        }
        return true;
    };


    return LongestCommonSubString;

});