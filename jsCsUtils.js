
(function(root){
    var _emptyConstructor = function() {};
    var extend = function(child,parent,proto) {
        _emptyConstructor.prototype = parent.prototype;
        child.prototype = new _emptyConstructor();
        child.prototype.constructor = child;
        child.super = parent.prototype;

        for (var name in proto)
            child.prototype[name] = proto[name];

        return child;
    };

    var JsCsUtils = {
        extend: extend
    };

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = JsCsUtils;
    else
        root.JsCsUtils = JsCsUtils;

    if ( typeof define === "function" && define.amd)
        define( "jsCsUtils", [], function () { return JsCsUtils; } );
})(this);



