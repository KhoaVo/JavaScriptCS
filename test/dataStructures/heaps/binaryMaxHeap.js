(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../jscs/dataStructures/heaps/binaryMaxHeap'));
    else if ( typeof define === "function" && define.amd)
        define(['jscs/dataStructures/heaps/binaryMaxHeap'],function (Heap) { return factory(Heap); } );

})(this,function(Heap){

    var bh = new Heap(function(a,b){
        return a-b;
    });

    bh.insert(15);
    bh.insert(1);
    bh.insert(3);
    bh.insert(5);
    bh.insert(2);

    if(bh._heap.join(',') !== '15,5,3,1,2')
        return "Expecting 15,5,3,1,2";

    var max = bh.extract();
    if(max !== 15)
        return "Expecting 15";

    if(bh._heap.join(',') !== '5,2,3,1')
        return "Expecting 5,2,3,1";


});