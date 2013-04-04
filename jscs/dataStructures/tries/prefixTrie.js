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

    function PrefixTrie(char){
        this._char = char;
        this._children = {};
        this._endMarker = false;
    }

    PrefixTrie.prototype = {

        constructor:PrefixTrie,
        autoComplete:function(str,limit){

            if(limit === 0)
                return [];

            limit = limit || Number.MAX_VALUE;
            var trie = this._traverse(str),res = [];
            if(!trie) return res;

            var stringBuffer = [],last = str.length - 1,i;
            for(i = 0; i < last; i++)
                stringBuffer.push(str[i]);

            this._each(trie,stringBuffer,0,limit,function(v){res.push(v);});
            return res;
        },

        contains:function(str){
            var trie = this._traverse(str);
            return trie && trie._endMarker;
        },

        insert:function(str){

            var i = 0,l = str.length, c,
                cur = this,next;

            for(i = 0; i < l; i++, cur = next){
                c = str[i];
                next = cur._children[c];
                if(!next){
                    next = new PrefixTrie(c);
                    cur._children[c] = next;
                }
            }

            cur._endMarker = true;
        },

        remove:function(str){

            var trie = this._traverse(str);
            if(!trie || !trie._endMarker)
                return false;

            trie._endMarker = false;
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

            buffer.push(trie._char);
            if(trie._endMarker){
                count++;
                func(buffer.join(''));
            }

            for(var char in trie._children)
                count = this._each(trie._children[char],buffer,count,limit,func);

            buffer.pop();
            return count;
        },

        _traverse:function(str){
            var i = 0,l = str.length,
                trie = this;

            for(i = 0; i < l && trie; i++){
                trie = trie._children[str[i]];
                if(!trie) return false;
            }
            return trie;
        }
    };

    return PrefixTrie;

});