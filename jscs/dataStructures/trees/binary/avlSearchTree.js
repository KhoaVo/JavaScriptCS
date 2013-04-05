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

//WORK IN PROGRESS
(function (root, factory) {

    //detect node js
    if (typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../utils'), require('../../../dataStructures/trees/binary/binarySearchTree'));
    else if (typeof define === "function" && define.amd)
        define(["jscs/utils", "jscs/dataStructures/trees/binary/binarySearchTree"], function (JsCsUtils, BinarySearchTree) {
            return factory(JsCsUtils, BinarySearchTree);
        });
    else
        root.AvlSearchTree = factory(root.JsCsUtils, root.BinarySearchTree);


})(this, function (JsCsUtils, BinarySearchTree) {

    var LEFT_HEAVY = 1,
        EVEN = 0,
        RIGHT_HEAVY = -1;

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

            if (this._compare(node.value, root.value) < 0) {
                root.left = this._insert(root.left, node, state);
                if (state.taller) {
                    switch (root.balance) {
                        //was already left high, and we added another on the left. So we balance the left side
                        case LEFT_HEAVY:
                            root = this._insertLeftBalance(root, state);
                            break;
                        case EVEN:
                            root.balance = LEFT_HEAVY;
                            break;
                        case RIGHT_HEAVY:
                            root = root.balance = EVEN;
                            break;
                    }
                    return root;
                }

            } else {
                root.right = this._insert(root.right, node, state);
                if (state.taller) {
                    switch (root.balance) {
                        case LEFT_HEAVY:
                            root.balance = EVEN;
                            break;
                        case EVEN:
                            root.balance = RIGHT_HEAVY;
                            break;
                        case RIGHT_HEAVY:
                            root = this._insertRightBalance(root, state);
                            break;
                    }
                    return root;
                }
            }

            return root;
        },

        _insertLeftBalance: function (root, state) {
            var leftTree = root.left,
                rightSubTree;

            switch (leftTree.balance) {
                //case is left left, we rotate the root right to balance it out.
                case LEFT_HEAVY:
                    root.balance = EVEN;
                    leftTree.balance = EVEN;
                    root = this._rotateRight(root);
                    break;
                //case is left right, we need to first rotate the left child left, and then rotate the root right
                case RIGHT_HEAVY:
                    rightSubTree = leftTree.right;
                    switch (rightSubTree.balance) {
                        case LEFT_HEAVY:
                            root.balance = RIGHT_HEAVY;
                            leftTree.balance = EVEN;
                            break;
                        default:
                            root.balance = EVEN;
                            leftTree.balance = LEFT_HEAVY;
                            break;
                    }
                    rightSubTree.balance = EVEN;
                    root.left = this._rotateLeft(leftTree);
                    root = this._rotateRight(root);
                    break;
            }

            state.taller = false;
            return root;
        },

        //mirror of insertLeftBalance
        _insertRightBalance: function (root, state) {
            var leftSubTree,
                rightTree = root.right;

            switch (rightTree.balance) {
                //case is right left, we need to first rotate the right tree to the right, then the root to the left
                case LEFT_HEAVY:
                    leftSubTree = rightTree.left;
                    switch (leftSubTree.balance) {
                        case RIGHT_HEAVY:
                            root.balance = LEFT_HEAVY;
                            rightTree.balance = EVEN;
                            break;
                        default:
                            root.balance = EVEN;
                            rightTree.balance = RIGHT_HEAVY;
                            break;
                    }
                    leftSubTree.balance = EVEN;
                    root.right = this._rotateRight(rightTree);
                    root = this._rotateLeft(root);
                    break;
                //case is right right, we need to rotate the root to the left.
                case RIGHT_HEAVY:
                    root.balance = EVEN;
                    rightTree.balance = EVEN;
                    root = this._rotateLeft(root);
                    break;
            }

            state.taller = false;
            return root;
        },

        checkCases:function(bal,ifLh,ifE,ifRh){
            switch (bal) {
                //was already left high, and we added another on the left. So we balance the left side
                case LEFT_HEAVY:
                    ifLh();
                    break;
                case EVEN:
                    ifE();
                    break;
                case RIGHT_HEAVY:
                    ifRh();
                    break;
            }
        },

        _remove:function(root,item,state){

            state = state || {shorter:false};
            var comp = this._compare(item,root.value);

            if(comp < 0){
                root.left = this._remove(root.left,item,state);
            }else if (comp > 0){
                root.right = this._remove(root.right,item,state);
            }else{

            }
        },

        _removeLeftBalance:function(){

        },

        _removeRightBalance:function(){

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
            return {
                value: val,
                left: null,
                right: null,
                balance: EVEN
            }
        }
    });


    return AvlSearchTree;
});
