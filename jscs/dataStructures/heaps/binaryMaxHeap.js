/*
 * Binary max heap implementation in JavaScript
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


(function(root,factory){
    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory();
    else if ( typeof define === "function" && define.amd)
        define(function () { return factory(); } );
    else
        root.BinaryMaxHeap = factory();

})(this,function(){

    function BinaryMaxHeap(compareFunc,initial){
        this._compare = compareFunc;
        this._count = 0;
        this._heap = [];
        this._lastIdx = -1;

        if(initial){
            this._heapify(initial);
            console.log(initial);

        }
    }

    BinaryMaxHeap.prototype = {
        constructor:BinaryMaxHeap,


        insert:function(item){
            this._heap[++this._lastIdx] = item;
            this._count++;
            this.siftUp(this._lastIdx);
        },

        extract:function(){

            if(!this._count)
                return;

            var out = this._heap[0];
            this._heap[0] = this._heap[this._lastIdx];
            this._heap.pop();
            this._lastIdx--;
            this._count--;
            this.siftDown(0);

            return out;
        },


        peak:function(){
            return this._heap[0];
        },

        getCount: function(){
            return this._count;
        },

        _heapify:function(a){

            var start = Math.floor((a.length - 2)/2);

            while(start-- >= 0 ){
                this._siftDown()
            }
        },

        siftUp:function(idx,heap){
            this._siftUp(idx,heap || this._heap);
        },

        siftDown:function(idx,heap,end){
            this._siftDown(idx,heap || this._heap, end || this._lastIdx)
        },

        _siftUp: function(idx,heap){

            if(!idx)
                return;



            var parent = Math.floor((idx - 1)/2);
            var val = heap[idx],
                parentVal = heap[parent];

            if(this._compare(val,parentVal) > 0){
                this._swap(idx,parent);
                this._siftUp(parent,heap);
            }
        },



        _siftDown: function(idx,heap,end){

            if(idx * 2 + 1 > end)
                return;

            var parentVal = heap[idx],
                leftChild = idx * 2 + 1,
                rightChild = idx * 2 + 2,
                leftVal = heap[leftChild],
                rightVal = heap[rightChild],
                larger;

            if(leftVal){
                larger = leftChild;
                if(rightVal && this._compare(rightVal,leftVal) > 0)
                    larger = rightChild;

                if(this._compare(parentVal,heap[larger]) < 0){
                    this._swap(idx,larger);
                    this._siftDown(larger,heap,end);
                }
            }
        },

        _swap:function(i,j){
            var temp = this._heap[i];
            this._heap[i] = this._heap[j];
            this._heap[j] = temp;
        }
    };

    return BinaryMaxHeap;
});