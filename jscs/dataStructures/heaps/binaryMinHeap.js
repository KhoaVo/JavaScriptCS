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

    BinaryMinHeap.prototype._siftUp = function(idx){

        if(!idx)
            return;

        var parent = Math.floor((idx - 1)/2);
        var val = this._heap[idx],
            parentVal = this._heap[parent];

        if(this._compare(val,parentVal) < 0){
            this._swap(idx,parent);
            this._siftUp(parent);
        }
    };

    BinaryMinHeap.prototype._siftDown = function(idx){

        var parentVal = this._heap[idx],
            leftChild = idx * 2 + 1,
            rightChild = idx * 2 + 2,
            leftVal = this._heap[leftChild],
            rightVal = this._heap[rightChild],
            smaller;

        if(leftVal){
            smaller = leftChild;
            if(rightVal && this._compare(rightVal,leftVal) < 0)
                smaller = rightChild;

            if(this._compare(parentVal,this._heap[smaller]) > 0){
                this._swap(idx,smaller);
                this._siftDown()
            }
        }
    };

    return BinaryMinHeap;

});