(function (root, factory) {

    //detect node js
    if (typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../../jscs/dataStructures/trees/binary/avlSearchTree'));
    else if (typeof define === "function" && define.amd)
        define(['jscs/dataStructures/trees/binary/avlSearchTree'], function (AvlSearchTree) {
            return factory(AvlSearchTree);
        });

})(this, function (AvlSearchTree) {

    var tree = new AvlSearchTree(function (a, b) {return a - b;});
    var i, numbers, a,numToInsert = 10000,numToDelete = numToInsert/2;

    var getHeight = function(node) {
        if (!node)
            return 0;
        return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }

    numbers = [];
    for (i = 0; i < numToInsert; i++) {
        tree.insert(i);
        numbers.push(i);
    }

    a = [];
    tree.inOrder(function (i) {a.push(i);});
    if (a.join(',') !== numbers.join(','))
        return "Tree is out of order";


    var leftHeight = getHeight(tree._root.left),
        rightHeight = getHeight(tree._root.right);

    if (Math.abs(leftHeight - rightHeight) > 1)
        return "Tree is out of balance";

    for (i = 0; i < numToDelete; i++) {
        tree.remove(Math.floor(Math.random() * numToInsert));
    }

    leftHeight = getHeight(tree._root.left);
    rightHeight = getHeight(tree._root.right);
    if (Math.abs(leftHeight - rightHeight) > 1)
        return "Tree is out of balance after deletions";

});