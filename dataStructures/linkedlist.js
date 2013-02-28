
(function(root){

    var LinkedList = function(){
        this._head = null;
        this._tail = this.head;
        this._length = 0;
    };


    LinkedList.prototype = {
        constructor:LinkedList,

        head:function(){
            if(this._head == null)
                return null;

            return this._head.value;
        },

        tail: function(){

            if(this._tail == null)
                return null;

            return this._tail.value;
        },

        add: function(item){

            var newNode = {
                value:item,
                next:null
            };

            //list is empty
            if(this._head == null)
                this._head = this._tail = newNode;
            else
                this._tail = this._tail.next = newNode;

            this._length++;
        },

        addRange: function(items){
            var self = this;
            items.forEach(function(i){
                self.add(i);
            });
        },

        get: function(i){

            var idx = 0,cur = this._head;
            var res = null;

            while(cur != null){
                if(idx == i){
                    res = cur.value;
                    break;
                }

                idx++;
                cur = cur.next;
            }

            return res;
        },

        remove: function(i){
            //todo
        }
    };


    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = LinkedList;
    else
        root.LinkedList = LinkedList;

    if ( typeof define === "function" && define.amd)
        define( "linkedlist", [], function () { return LinkedList; } );


})(this);