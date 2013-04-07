(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../../jscs/dataStructures/trees/binary/binarySearchTree'));
    else if ( typeof define === "function" && define.amd)
        define(['jscs/dataStructures/trees/binary/binarySearchTree'],function (BinarySearchTree) { return factory(BinarySearchTree); } );

})(this,function(BinarySearchTree){

    var bt = new BinarySearchTree(function(a,b){return a-b;});
    [38,3,5,51,45,22,43].forEach(function(n){bt.insert(n);});

    if(bt.getCount() !== 7)
        return "Expecting a count of 7";

    var a = [],expected = '3,5,22,38,43,45,51';
    bt.inOrder(function(i){a.push(i);});
    if(a.join(',') !== expected)
        return "Expecting order to be: " + expected;

    a = [];
    expected = "51,45,43,38,22,5,3";
    bt.reverseOrder(function(i){ a.push(i);});
    if(a.join(',') !== expected)
        return "Expecting order to be: " + expected;

    a = [];
    expected = "38,3,5,22,51,45,43";
    bt.preOrder(function(i){ a.push(i);});
    if(a.join(',') !== expected)
        return "Expecting order to be: " + expected;;

    a = [];
    expected = "22,5,3,43,45,51,38";
    bt.postOrder(function(i){a.push(i);});
    if(a.join(',') !== expected)
        return "Expecting order to be: " + expected;

    a = [];
    expected = "38,3,51,5,45,22,43";
    bt.levelOrder(function(i){a.push(i);});
    if(a.join(',') !== expected)
        return "Expecting order to be: " + expected;

    if(bt.find(43) !== 43)
        return "Expecting to find 43 in the tree";

    bt.remove(38);

    a = [];
    expected = "22,3,51,5,45,43";
    bt.levelOrder(function(i){a.push(i);});
    if(a.join(',') !== expected)
        return "Expecting order to be: " + expected + " " + a.join(',');

    if(bt.getCount() !== 6)
        return "Expecting a count of 6";

});