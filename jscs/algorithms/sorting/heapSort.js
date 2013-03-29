
(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory();
    else if ( typeof define === "function" && define.amd)
        define(function () { return factory(); } );
    else
        root.heapSort = factory();


})(this,function(){

    function heapSort(a,compareFunc){

        heapify(a,compareFunc);
        var last = a.length - 1;
        while(last >= 0){
            swap(a,last--,0);
            siftDown(a,0,last,compareFunc);
        }
    }

    function heapify(a,compare){

        var start = Math.floor(a.length - 2)/ 2,
            last = a.length - 1;

        while(start >= 0){
            siftDown(a,start--,last,compare);
        }
    }

    function siftDown(a,start,end,compare){

        var root = start,
            swapIdx,
            leftChild,rightChild;


        while(root * 2 + 1 <= end){

            leftChild = root * 2 + 1;
            rightChild = leftChild + 1;
            swapIdx = root;

            if(compare(a[swapIdx],a[leftChild]) < 0)
                swapIdx = leftChild;
            if(rightChild <= end && compare(a[swapIdx],a[rightChild]) < 0)
                swapIdx = rightChild;

            if(root !== swapIdx){
                swap(a,root,swapIdx);
                root = swapIdx;
            }else{
                return;
            }
        }
    }

    function swap(a,i,j){
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

    return heapSort;

});