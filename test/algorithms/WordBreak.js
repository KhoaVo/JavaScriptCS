(function(root,factory){

    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../jscs/algorithms/wordBreak'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/algorithms/wordBreak"], function (WordBreak) { return factory(WordBreak); } );

})(this,function(WordBreak){

    var res = WordBreak('aaaaaaaaaaaaaaaaaaaaaab',{a:1,aa:1,aaa:1,aaaa:1,aaaaa:1,aaaaaa:1,b:1});

    if(res !== "a a a a a a a a a a a a a a a a a a a a a a b")
        return "expecting "  + "a a a a a a a a a a a a a a a a a a a a a a b";

    res = WordBreak('googlewordbreakalgorithm',{google:1,foo:1,word:1,world:1,break:1,algorithm:1});

    if(res !== "google word break algorithm")
        return "expecting " + "google word break algorithm";
});