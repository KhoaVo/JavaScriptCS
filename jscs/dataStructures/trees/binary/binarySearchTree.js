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
(function(root,factory){

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory();
    else if ( typeof define === "function" && define.amd)
        define([], function () { return factory(); } );
    else
        root.BinarySearchTree = factory();

})(this,function(){

    /*
     @param compareFunc  a function used to compare items in the tree. Should take in the parameter
     a and b and return -1 if a is less than b, 0 if a is equal b and 1 if a is greater than b.
     */
    var BinarySearchTree = function(compareFunc){
        this._root = null;
        this._count = 0;
        this._compare = compareFunc;
    };

    var NOT_FOUND = {};
    BinarySearchTree.prototype = {
        constructor: BinarySearchTree,

        getCount:function(){
            return this._count;
        },

        find: function(item){
            var node = this._find(this._root,item);
            return node === NOT_FOUND ? null : node.value;
        },

        findNode: function(item){
            var node = this._find(this._root,item);
            return node === NOT_FOUND ? null : node;
        },

        //find the first matching item
        insert: function(item){
            var node = this._newNode(item);
            this._root = this._insert(this._root,node);
            this._count++;
        },

        _insert:function(root,node){
            if(!root)
                return node;

            if(this._compare(node.value,root.value) < 0)
                root.left = this._insert(root.left,node);
            else
                root.right = this._insert(root.right,node);

            return root;
        },

        remove: function(item){
            var oldCount = this._count;
            this._root = this._remove(this._root,item);
            return this._count < oldCount;
        },

        _remove: function(root,item){

            if(!root)
                return;

            var comp = this._compare(item,root.value);
            var max,swap,subTree;
            if(comp === 0){
                if(!root.left){
                    subTree = root.right;
                    this._free(root);
                    this._count--;
                    return subTree;

                }else if (!root.right){
                    subTree = root.left;
                    this._free(root);
                    this._count--;
                    return subTree;
                }else{
                    max = this._findMax(root.left);
                    swap = max.value;
                    root.value = max.value;
                    max.value = swap;
                    root.left = this._remove(root.left,max.value);
                }
            }
            else if(comp < 0)
                root.left = this._remove(root.left,item);
            else
                root.right = this._remove(root.right,item);

            return root;
        },

        preOrder: function(func){return this._preOrder(this._root,0,func);},
        inOrder:function(func){return this._inOrder(this._root,0,func);},
        reverseOrder:function(func){return this._reverseOrder(this._root,0,func);},
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

        _findMax: function(node){
            var cur = node;
            while(cur.right)
                cur = cur.right;

            return cur;
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

        _reverseOrder:function(node,depth,func){

            if(node){
                this._reverseOrder(node.right,depth + 1,func);
                func(node.value,depth);
                this._reverseOrder(node.left,depth + 1,func);
            }
        },

        _postOrder:function(node,depth,func){
            if(node){
                this._postOrder(node.left,depth + 1,func);
                this._postOrder(node.right,depth + 1,func);
                func(node.value,depth);
            }
        },


        _newNode: function(item,parent){
            return {
                value:item,
                left:null,
                right:null
            };
        },

        _free: function(node){
            node.left = undefined;
            node.right = undefined;
            node.value = undefined;
        }
    };

    return BinarySearchTree;
});