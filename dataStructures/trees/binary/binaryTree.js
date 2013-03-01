(function(root){


    /*
        @param compareFunc  a function used to compare items in the tree. Should take in the parameter
                            a and b and return -1 if a is less than b, 0 if a is equal b and 1 if a is greater than b.
     */
    var BinaryTree = function(compareFunc){

        this._root = null;
        this._compare = compareFunc;
    };

    BinaryTree.prototype = {

        constructor: BinaryTree,

        add: function(item){

            var node = this._newNode(item);
            var cur;

            if(this._root === null){
                this._root = node;
            }else{

            }
        },

        remove: function(){

        },

        _newNode: function(item){
            return node = {
                value:item,
                left:null,
                right:null
            };
        }
    };


    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = BinaryTree;
    else
        root.LinkedList = BinaryTree;

    if ( typeof define === "function" && define.amd)
        define( "binaryTree", [], function () { return BinaryTree; } );

})(this);