/*
 * AVL search tree implementation in JavaScript
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

(function (root, factory) {

    //detect node js
    if (typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../utils'), require('./binarySearchTree'));
    else if (typeof define === "function" && define.amd)
        define(["jscs/utils", "jscs/dataStructures/trees/binary/binarySearchTree"], function (JsCsUtils, BinarySearchTree) {
            return factory(JsCsUtils, BinarySearchTree);
        });
    else
        root.AvlSearchTree = factory(root.JsCsUtils, root.BinarySearchTree);


})(this, function (JsCsUtils, BinarySearchTree) {

    var LEFT = 'left',
        EVEN = 'even',
        RIGHT = 'right';

    function AvlSearchTree(compareFunc) {
        AvlSearchTree.super.constructor.call(this, compareFunc);
    }

    JsCsUtils.extend(AvlSearchTree, BinarySearchTree, {

        _insert: function (root, node, state) {
            state = state || {taller: false};
            if (!root) {
                state.taller = true;
                return node;
            }

            var insertSide = this._compare(node.value, root.value) < 0 ? LEFT : RIGHT;
            root[insertSide] = this._insert(root[insertSide],node,state);
            return this._insertBalance(root,insertSide,state);
        },

        _remove: function(root,item,state){
            state = state || {shorter:false};
            if(!root) {
                state.shorter = false;
                return null;
            }

            var comp = this._compare(item,root.value);
            var max,subTree,swap;
            if(comp === 0){

                if(!root.left){
                    subTree = root.right;
                    this._free(root);
                    this._count--;
                    state.shorter = true;
                    return subTree;
                }else if (!root.right){
                    subTree = root.left;
                    this._free(root);
                    this._count--;
                    state.shorter = true;
                    return subTree;
                }else{
                    max = this._findMax(root.left);
                    swap = root.value;
                    root.value = max.value;
                    max.value = swap;
                    root.left = this._remove(root.left,max.value,state);
                    root = this._removeBalance(root,LEFT,state);
                }
            }
            else if(comp < 0){
                root.left = this._remove(root.left,item,state);
                root = this._removeBalance(root,LEFT,state);
            }
            else{
                root.right = this._remove(root.right,item,state);
                root = this._removeBalance(root,RIGHT,state);
            }

            return root;

        },

        _removeBalance: function(root,sideDeleted,state){

            if(!state.shorter) return root;
            var sideNotDeleted,
                child,childChild,
                childRotator,rootRotator;
            if(sideDeleted === LEFT){
                sideNotDeleted = RIGHT;
                childRotator = this._rotateRight;
                rootRotator = this._rotateLeft;
            }
            else{
                sideNotDeleted = LEFT;
                childRotator = this._rotateLeft;
                rootRotator = this._rotateRight;
            }

            switch(root.balance){
                case sideDeleted :
                    root.balance = EVEN;
                    break;
                case EVEN :
                    root.balance = sideNotDeleted;
                    state.shorter = false;
                    break;
                case sideNotDeleted :
                    child = root[sideNotDeleted];
                    switch(child.balance){
                        case sideDeleted :
                            childChild = child[sideDeleted];
                            switch(childChild.balance){
                                case sideDeleted :
                                    child.balance = sideNotDeleted;
                                    root.balance = EVEN;
                                    break;
                                case EVEN :
                                    root.balance = EVEN;
                                    child.balance = EVEN;
                                    break;
                                case sideNotDeleted :
                                    root.balance = sideDeleted;
                                    child.balance = EVEN;
                                    break;
                            }
                            childChild.balance = EVEN;
                            root[sideNotDeleted] = childRotator(child);
                            root = rootRotator(root);
                            break;
                        default :
                            switch(child.balance){
                                case sideNotDeleted :
                                    root.balance = EVEN;
                                    child.balance = EVEN;
                                    break;
                                case EVEN :
                                    root.balance = sideNotDeleted;
                                    child.balance = sideDeleted;
                                    state.shorter = false;
                                    break;
                            }
                            root = rootRotator(root);
                            break;
                    }
            }

            return root;
        },

        _insertBalance: function (root,sideInserted,state) {

            if(!state.taller) return root;
            var sideNotInserted,
                child,childChild,
                childRotator,rootRotator;

            if(sideInserted === LEFT){
                sideNotInserted = RIGHT; childRotator = this._rotateLeft; rootRotator = this._rotateRight;
            }else{
                sideNotInserted = LEFT; childRotator = this._rotateRight; rootRotator = this._rotateLeft;
            }

            switch (root.balance) {
                case EVEN :
                    root.balance = sideInserted;
                    break;
                case sideNotInserted :
                    root.balance = EVEN;
                    state.taller = false;
                    break;
                case sideInserted :
                    state.taller = false;
                    child = root[sideInserted];
                    switch (child.balance) {
                        case sideInserted:
                            root.balance = EVEN;
                            child.balance = EVEN;
                            root = rootRotator(root);
                            break;
                        case sideNotInserted:
                            childChild = child[sideNotInserted];
                            switch (childChild.balance) {
                                case sideInserted:
                                    root.balance = sideNotInserted;
                                    child.balance = EVEN;
                                    break;
                                default:
                                    root.balance = EVEN;
                                    child.balance = sideInserted;
                                    break;
                            }
                            childChild.balance = EVEN;
                            root[sideInserted] = childRotator(child);
                            root = rootRotator(root);
                            break;
                    }
            }

            return root;
        },


        _rotateLeft: function (root) {
            var temp = root.right;
            root.right = temp.left;
            temp.left = root;
            return temp;
        },

        _rotateRight: function (root) {
            var temp = root.left;
            root.left = temp.right;
            temp.right = root;
            return temp;
        },

        _newNode: function (val) {
            var n = AvlSearchTree.super._newNode(val);
            n.balance = EVEN;
            return n;
        }
    });


    return AvlSearchTree;
});
