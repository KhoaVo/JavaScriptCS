/*
 * Binary search tree implementation in JavaScript
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

    /*
        @param compareFunc  a function used to compare items in the tree. Should take in the parameter
                            a and b and return -1 if a is less than b, 0 if a is equal b and 1 if a is greater than b.
     */
    var BinaryTree = function(compareFunc){

        this._root = null;
        this._compare = compareFunc;
    };

    BinaryTree.prototype = {

        constructor: BinaryTree,

        insert: function(item){

            var node = this._newNode(item);
            var cur;

            if(this._root === null){
                this._root = node;
            }else{

            }
        },

        _insert: function(node,item){

            var res = this._compare(item,node.value);

        },

        remove: function(){

        },

        _newNode: function(item){
            return node = {
                value:item,
                left:null,
                right:null
            };
        }
    };


    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = BinaryTree;
    else if ( typeof define === "function" && define.amd)
        define([], function () { return BinaryTree; } );
    else
        root.LinkedList = BinaryTree;



})(this);