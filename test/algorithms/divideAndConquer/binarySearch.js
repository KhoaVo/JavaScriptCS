(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('jscs/algorithms/divideAndConquer/binarySearch'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/algorithms/divideAndConquer/binarySearch"], function (BinarySearch) { return factory(BinarySearch); } );


})(this,function(BinarySearch){

    var b = new BinarySearch(function(a,b){
        return a-b;
    });

    b.setItems([1,1,1,1,2,2,2,3,4,5,5,5,5]);
    if(b.find(3) !== 7) //7
        return "expecting 7";

    if(b.findIterative(3) !== 7) //7
        return "expecting 7";

    var res = b.findRange(2); // 4 to 6
    if(res.start !== 4 || res.end !== 6)
        return "expecting 4 and 6";
});