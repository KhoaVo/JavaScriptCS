(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../utils'),require('./binaryMaxHeap'));
    else if ( typeof define === "function" && define.amd)
        define(['jscs/utils','jscs/dataStructures/heaps/binaryMaxHeap'],function (JsCsUtils,BinaryMaxHeap) { return factory(JsCsUtils,BinaryMaxHeap); } );
    else
        root.BinaryMinHeap = factory(root.JsCsUtils,root.BinaryMaxHeap);

})(this,function(JsCsUtils,BinaryMaxHeap){

    function BinaryMinHeap(){
        BinaryMinHeap.super.constructor.apply(this,arguments);
    }

    JsCsUtils.extend(BinaryMinHeap,BinaryMaxHeap);

    BinaryMinHeap.prototype._siftUp = function(idx,heap){

        if(!idx)
            return;

        var parent = Math.floor((idx - 1)/2);
        var val = heap[idx],
            parentVal = heap[parent];

        if(this._compare(val,parentVal) < 0){
            this._swap(idx,parent);
            this._siftUp(parent,heap);
        }
    };

    BinaryMinHeap.prototype._siftDown = function(idx,heap,end){

        if(idx * 2 + 1 > end)
            return;

        var parentVal = heap[idx],
            leftChild = idx * 2 + 1,
            rightChild = idx * 2 + 2,
            leftVal = heap[leftChild],
            rightVal = heap[rightChild],
            smaller;

        if(leftVal){
            smaller = leftChild;
            if(rightVal && this._compare(rightVal,leftVal) < 0)
                smaller = rightChild;

            if(this._compare(parentVal,heap[smaller]) > 0){
                this._swap(idx,smaller);
                this._siftDown(smaller,heap,end);
            }
        }
    };

    return BinaryMinHeap;

});