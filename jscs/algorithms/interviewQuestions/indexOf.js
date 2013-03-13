/**
 * Created with JetBrains WebStorm.
 * User: khoa.vo
 * Date: 3/12/13
 * Time: 3:53 PM
 * To change this template use File | Settings | File Templates.
 */

(function(root){

    var indexOf = function(needle,haystack){

        var i, j,temp,res = -1,
        nl = needle.length,hl = haystack.length,
        first = needle[0],last = needle[nl - 1];

        if(hl < nl)
            return res;

        for(i = 0; i < hl; i++){
            // only bother traversing if the first and last characters match
            if(haystack[i] === first && haystack[i + nl - 1] === last){
                res = i;
                for(j = 0,temp = i; j < nl; j++,temp++){
                    if(needle[j] !== haystack[temp]){
                        res = -1;
                        break;
                    }
                }
                if(res != -1)
                    return res;
            }
        }

        return res;
    };


    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = indexOf;
    else if ( typeof define === "function" && define.amd)
        define([], function () { return indexOf; } );
    else
        root.indexOf = indexOf;

})(this);