(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../jscs/dataStructures/linkedlist'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/dataStructures/linkedlist"], function (WordBreak) { return factory(WordBreak); } );

})(this,function(LinkedList){

    var list = new LinkedList();
    list.add(5);
    if(list.head() != 5 || list.tail() != 5)
        return "expecting 5 to be the only element at head and tail";

    list.addRange(7,8,9)
    if(list.length() != 4)
        return "expecting 4 to be the length of the list";

    if(list.get(2) !== 8)
        return "expecting to get 8 at index 2";

});
