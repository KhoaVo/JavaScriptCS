
/*
    Linked list of the doubly kind.
 */
(function(root){

    var LinkedList = function(){
        this._head = null;
        this._tail = this._head;
        this._length = 0;
    };


    LinkedList.prototype = {
        constructor:LinkedList,

        head:function(){
            if(this._head === null)
                return null;

            return this._head.value;
        },

        tail: function(){

            if(this._tail === null)
                return null;

            return this._tail.value;
        },

        length: function(){
            return this._length;
        },

        /*
            Add at the end of the list
         */
        add: function(item){

            var newNode = {
                value:item,
                next:null,
                prev: this._tail
            };

            //list is empty
            if(this._head === null)
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
            var node = this._find(i);
            return node ? node.value : null;
        },

        remove: function(i){
            var node = this._find(i);
            if(node === null)
                return;

            this._length--;
            var res =null;
            if(node === this._head){
                node.next.prev = null;
                this._head = node.next;
            }
            else if (node === this._tail){
                node.prev.next = null;
                this._tail = node.prev;
            }else{
                node.prev.next = node.next;
                node.next.prev = node.prev;
            }

            return node.value;
        },

        each: function(func){
            var cur = this._head;
            while(cur != null){
                func(cur.value);
                cur = cur.next;
            }
        },


        toArray: function(){
            var res = [];
            var cur = this._head;

            while(cur != null){
                res.push(cur.value);
                cur = cur.next;
            }

            return res;

        },

        toArrayReverse: function(){
            var res = [];
            var cur = this._tail;

            while(cur != null){
                res.push(cur.value);
                cur = cur.prev;
            }

            return res;
        },

        _find:function(i){

            var idx = 0,cur = this._head;
            var res = null;
            while(cur != null){
                if(idx == i){
                    res = cur;;
                    break;
                }

                idx++;
                cur = cur.next;
            }

            return res;
        }

    };


    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = LinkedList;
    else
        root.LinkedList = LinkedList;

    if ( typeof define === "function" && define.amd)
        define( "linkedlist", [], function () { return LinkedList; } );


})(this);