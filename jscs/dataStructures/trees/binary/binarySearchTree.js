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

    var NOT_FOUND = null;
    BinaryTree.prototype = {
        constructor: BinaryTree,

        find: function(item){
            var node = this._find(this._root,item);
            return node === NOT_FOUND ? null : node.value;
        },

        //find the first matching item
        insert: function(item){
            var node = this._newNode(item);
            if(this._root === null)
                this._root = node;
            else
                this._insert(this._root,item);
        },

        remove: function(item){
            var node = this._find(this._root,item);
            var min;
            if(node === NOT_FOUND)
                return;


            if(node.left && node.right){
                min = this._findMin(node.right);
                node.value =min.value;
                this._replaceNodeInParent(min,min.right);
            }else if(node.left){
                this._replaceNodeInParent(node,node.left);
            }else if (node.right){
                this._replaceNodeInParent(node,node.right);
            }else{
                this._replaceNodeInParent(node,null);
            }
        },

        preOrder: function(func){return this._preOrder(this._root,0,func);},
        inOrder:function(func){return this._inOrder(this._root,0,func);},
        postOrder:function(func){return this._postOrder(this._root,0,func);},
        levelOrder: function(func){

            var queue = [],cur;
            if(this._root === null)
                return;

            queue.push({node:this._root,depth:0});
            while(queue.length){
                cur = queue.shift();
                func(cur.node.value,cur.depth);

                if(cur.node.left)
                    queue.push({node:cur.node.left,depth:cur.depth + 1});
                if(cur.node.right)
                    queue.push({node:cur.node.right,depth:cur.depth + 1});
            }
        },

        _find:function(node,item){

            if(node === null)
                return NOT_FOUND;

            var res = this._compare(item,node.value);
            if(res === 0)
                return node;
            else if(res < 0)
                return this._find(node.left,item);
            else
                return this._find(node.right,item);

        },

        _findMin: function(node){
            var cur = node;
            while(cur.left)
                cur = cur.left;

            return cur;
        },

        _insert:function(node,item){
            var res = this._compare(item,node.value);
            if(res < 0)
                node.left ? this._insert(node.left,item) : node.left = this._newNode(item,node);
            else
                node.right ? this._insert(node.right,item): node.right = this._newNode(item,node);
        },

        _preOrder:function(node,depth,func){
            if(node){
                func(node.value,depth);
                this._preOrder(node.left,depth + 1,func);
                this._preOrder(node.right,depth + 1,func);
            }
        },

        _inOrder:function(node,depth,func){
            if(node){
                this._inOrder(node.left,depth + 1,func);
                func(node.value,depth);
                this._inOrder(node.right,depth + 1,func);
            }
        },

        _postOrder:function(node,depth,func){
            if(node){
                this._preOrder(node.left,depth + 1,func);
                this._preOrder(node.right,depth + 1,func);
                func(node.value,depth);
            }
        },

        _replaceNodeInParent: function(node,replacment){

            var parent = node.parent;
            if(!parent)
                return;

            if(parent.left === node)
                parent.left = replacment;
            else if (parent.right)
                parent.right = replacment;
        },

        _newNode: function(item,parent){
            return node = {
                value:item,
                left:null,
                right:null,
                parent: parent
            };
        }
    };

    BinaryTree.test = function(){

        var bt = new BinaryTree(function(a,b){return a-b;});

        [38,3,5,66,44,23,1,23,43,987,543,234,2,4,54,28].forEach(function(n){
           bt.insert(n);
        });

        var a = [];
        bt.inOrder(function(i,d){a.push(arguments); });
        console.log(a);
        console.log();

        a = [];
        bt.preOrder(function(i,d){ a.push(arguments);});
        console.log(a);
        console.log();

        a = [];
        bt.postOrder(function(i,d){a.push(arguments);});
        console.log(a);
        console.log();
    };


    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = BinaryTree;
    else if ( typeof define === "function" && define.amd)
        define([], function () { return BinaryTree; } );
    else
        root.BinaryTree = BinaryTree;


})(this);