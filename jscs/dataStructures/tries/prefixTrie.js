/*
 * Prefix trie implementation in JavaScript
 * Copyright (c) 2013 Khoa Vo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function(root,factory){

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory();
    else if ( typeof define === "function" && define.amd)
        define([], function () { return factory(); } );
    else
        root.PrefixTrie = factory();


})(this,function(){

    function PrefixTrie(){
        this._root  = this._newNode();
    }

    PrefixTrie.prototype = {

        constructor:PrefixTrie,

        getSuggestions:function(str){

            var node = this._traverseToEnd(str),res = [];
            if(!node) return res;

            var stringBuffer = [],last = str.length - 1,i;
            for(i = 0; i < last; i++)
                stringBuffer.push(str[i]);

            this._each(node,stringBuffer,function(v){res.push(v);});
            return res;
        },

        insert:function(str){

            var i = 0,l = str.length, c,
                cur = this._root,next;

            for(i = 0; i < l; i++, cur = next){
                c = str[i];
                next = this._findNode(c,cur.children);
                if(!next) next = this._addNode(c,cur.children);
            }

            cur.endMarker = true;
        },

        remove:function(str){

            var node = this._traverseToEnd(str);
            if(!node || !node.endMarker)
                return false;

            node.endMarker = false;
            return true;
        },

        contains:function(str){
            var node = this._traverseToEnd(str);
            return node && node.endMarker;
        },


        forEach:function(func){
            this._each(this._root,[],func);
        },

        _each:function(root,buffer,func){

            buffer.push(root.char);
            if(root.endMarker)
                func(buffer.join(''));

            for(var k in root.children)
                this._each(root.children[k],buffer,func);

            buffer.pop();
        },

        _traverseToEnd:function(str){
            var i = 0,l = str.length,
                cur = this._root,node;

            for(i = 0; i < l && cur; i++){
                cur = this._findNode(str[i],cur.children);
                if(!cur) return false;
            }

            return cur;
        },


        /*
            Encapsulate this out so we
            can easily change the search implementation
            if our children storage changes
         */
        _findNode:function(c,children){
            return children[c];
        },

        _addNode:function(c,children){
            var node = this._newNode(c);
            children[c] = node;
            return node;
        },

        _newNode:function(c){
            return {
                char:c,
                children:{},
                endMarker:false
            };
        }
    };
    return PrefixTrie;

});