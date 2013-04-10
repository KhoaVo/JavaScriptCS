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

    var END_MARKER = "$$";

    function PrefixTrie(){
        this._count = 0;
    }

    PrefixTrie.prototype = {

        constructor:PrefixTrie,
        autoComplete:function(str,limit){

            if(limit === 0)
                return [];

            limit = limit || Number.MAX_VALUE;
            var startNode = this._traverse(str),res = [];
            if(!startNode) return res;

            this._each(startNode,str.split(''),0,limit,function(v){res.push(v);});
            return res;
        },

        getCount:function(){
            return this._count;
        },

        contains:function(str){
            var trie = this._traverse(str);
            return trie && trie[END_MARKER];
        },

        insert:function(str){

            var i = 0,l = str.length, c,
                cur = this,node;

            for(i = 0; i < l; i++, cur = node){
                c = str[i];
                node = cur[c];
                if(!node){
                    node = {};
                    cur[c] = node;
                }
            }

            if(!cur[END_MARKER]){
                this._count++;
                cur[END_MARKER] = true;
            }
        },

        remove:function(str){

            var trie = this._traverse(str);
            if(!trie || !trie[END_MARKER])
                return false;

            trie[END_MARKER] = false;
            return true;
        },


        forEach:function(func){
            this._each(this,[],0,Number.MAX_VALUE,func);
        },

        /*
            root    node to start searching from
            buffer  array to append characters to
            count   current number of entries found
            limit   max number of entries to find
            func    callback to call when a key is found
         */
        _each:function(trie,buffer,count,limit,func){

            if(count >= limit)
                return count;

            if(trie[END_MARKER]){
                count++;

                func(buffer.join(''));
            }

            for(var char in trie){
                buffer.push(char);
                count = this._each(trie[char],buffer,count,limit,func);
                buffer.pop();
            }


            return count;
        },

        /*
            Traverse as far down the trie as possible following hte
            characters in the given string
         */
        _traverse:function(str){
            var i = 0,l = str.length,
                trie = this;

            for(i = 0; i < l && trie; i++){
                trie = trie[str[i]];
                if(!trie) return false;
            }
            return trie;
        }
    };

    return PrefixTrie;

});