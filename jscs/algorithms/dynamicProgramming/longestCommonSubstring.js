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

    var LongestCommonSubString = function(){

        var strings = [],dimensions =[],m = [],prev,res,z = 0;
        for(var i = 0; i < arguments.length; i ++){
            dimensions.push(arguments[i].length);
            strings.push(arguments[i].split(''));
        }

        var iterator = new JsCsMatrixUtils.Iterator(dimensions,0);
        iterator.each(m,function(v,indicies){
            if(checkEqualsAtIndicies(strings,indicies)){
                if(indicies.indexOf(0) > -1){
                    set(m,indicies,1);
                }else{
                    prev = indicies.map(function(v){return v - 1;});
                    set(m,indicies,get(m,prev) + 1);
                }

                if(get(m,indicies) > z){
                    z = get(m,indicies);
                    res = s.slice(indicies[0] - z + 1,i);
                }else if (get(m,indicies) === z){
                    res = res + s.slice(indicies[0] - z + 1,i);
                }
            }
        });
    };

    var checkEqualsAtIndicies = function(arrays,indicies){

        var l = arrays.length,
            val = arrays[0][indicies[0]];

        for(var i = 0; i < l; i++){
            if(val !== arrays[i][indicies[i]])
                return false;
        }
        return true;
    };


    return LongestCommonSubString;

});