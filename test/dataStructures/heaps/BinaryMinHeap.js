(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../jscs/dataStructures/heaps/binaryMinHeap'));
    else if ( typeof define === "function" && define.amd)
        define(['jscs/dataStructures/heaps/binaryMinHeap'],function (Heap) { return factory(Heap); } );

})(this,function(Heap){

    var bh = new Heap(function(a,b){
        return a-b;
    });

    bh.insert(15);
    bh.insert(1);
    bh.insert(3);
    bh.insert(5);
    bh.insert(2);

    if(bh._heap.join(',') !== '1,2,3,15,5')
        return "Expecting 1,2,3,15,5";

    var min = bh.extract();
    if(min !== 1)
        return "Expecting 1";

    if(bh._heap.join(',') !== '2,5,3,15')
        return "Expecting 2,5,3,15";

});