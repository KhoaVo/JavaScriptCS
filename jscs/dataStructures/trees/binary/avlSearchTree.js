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
(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../utils'),require('../../../dataStructures/trees/binary/binarySearchTree'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/utils","jscs/dataStructures/trees/binary/binarySearchTree"], function (JsCsUtils,BinarySearchTree) { return factory(JsCsUtils,BinarySearchTree); } );
    else
        root.AvlSearchTree = factory(root.JsCsUtils,root.BinarySearchTree);


})(this,function(JsCsUtils,BinarySearchTree){


    function AvlSearchTree(compareFunc){
        AvlSearchTree.super.constructor.call(this,compareFunc);
    }

    JsCsUtils.extend(AvlSearchTree,BinarySearchTree);

    var LEFT_HIGH = 1,
        EVEN = 0,
        RIGHT_HIGH = -1;

    AvlSearchTree.prototype = {
        constructor:AvlSearchTree,

        _insert:function(root,node,state){
            state = state || {taller:false};

            if(!root){
                state.taller = true;
                return node;
            }

            if(this._compare(node.value,root.value) < 0){
                root.left = this._insert(root.left,node,state);
                if(state.taller)
                    return this._insertLeftTaller(root,state);
            }else{
                root.right = this._insert(root.right,node,state);
                if(state.taller)
                    return this._insertRightTaller(root,state);
            }

            return root;
        },

        _insertLeftTaller: function(root,state){

            switch(root.balance){
                //left was already high
                case LEFT_HIGH: this._insertLeftBalance(root,state); break;
                case EVEN: root.balance = LEFT_HIGH; break;
                case RIGHT_HIGH: root.balance = EVEN; break;
            }

            return root;
        },

        _insertRightTaller:function(root,state){

            switch(root.balance){
                case LEFT_HIGH: root.balance = EVEN; break;
                case EVEN: root.balance = RIGHT_HIGH; break;
                case RIGHT_HIGH:this._insertRightBalance(root,state); break;
            }

            return root;
        },

        _insertRightBalance: function(root,state){

            var leftTree,
                rightTree = root.right;

            switch(rightTree.balance){
                //right left
                case LEFT_HIGH: root.balance = EVEN;
                    leftTree.balance = EVEN;
                    root = this._rotateRight(root);
                    break;

                //right right
                case RIGHT_HIGH:rightTree = leftTree.right;
                    switch(rightTree.balance){
                        case LEFT_HIGH: root.balance = RIGHT_HIGH;
                            leftTree.balance = EVEN;
                            break;

                        default:        root.balance = EVEN;
                            leftTree.balance = LEFT_HIGH;
                            break;
                    }

                    rightTree.balance = EVEN;
                    root.left = this._rotateLeft(leftTree);
                    root = this._rotateRight(root);
                    break;
            }

            state.taller = false;

        },

        _insertLeftBalance: function(root,state){
            var leftTree = root.left,
                rightTree;

            switch(leftTree.balance){
                //left left
                case LEFT_HIGH: root.balance = EVEN;
                                leftTree.balance = EVEN;
                                root = this._rotateRight(root);
                                break;
                //left right
                case RIGHT_HIGH:rightTree = leftTree.right;
                                switch(rightTree.balance){
                                    case LEFT_HIGH: root.balance = RIGHT_HIGH;
                                                    leftTree.balance = EVEN;
                                                    break;

                                    default:        root.balance = EVEN;
                                                    leftTree.balance = LEFT_HIGH;
                                                    break;
                                 }

                                rightTree.balance = EVEN;
                                root.left = this._rotateLeft(leftTree);
                                root = this._rotateRight(root);
                                break;
            }

            state.taller = false;
        },





        _rotateLeft:function(root){
            var temp = root.right;
            root.right = temp.left;
            temp.left = root;
            return temp;
        },

        _rotateRight:function(root){
            var temp = root.left;
            root.left = temp.right;
            temp.right = root;
            return temp;
        },

        _newNode:function(val){
            return {
                value:val,
                left:null,
                right:null,
                balance: EVEN
            }
        }
    };
});
