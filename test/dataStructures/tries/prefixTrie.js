(function(root,factory){

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../jscs/dataStructures/tries/prefixTrie'));
    else if ( typeof define === "function" && define.amd)
        define(['jscs/dataStructures/tries/prefixTrie'],function (Trie) { return factory(Trie); } );

})(this,function(PrefixTrie){

    var pf = new PrefixTrie(),expected,res;

    pf.insert('foo');
    pf.insert('foobar');
    pf.insert('foobaz');
    pf.insert('helloworld');
    pf.insert('hello');
    pf.insert('hell');
    pf.insert('hellotrie');

    if(!pf.getCount() === 6)
        return "Expecting trie to contain 6 elements";

    if(!pf.contains('foobar'))
        return "Expecting trie to contain foobar";

    expected = ['hell','hello','helloworld','hellotrie'].join(',');
    res = pf.autoComplete('he');
    if(res.join(',') !== expected)
        return "Expecting autocomplete to be : " + expected;

    expected = ['hell','helloworld','hellotrie'].join(',');
    pf.remove('hello');

    if(!pf.getCount() === 5)
        return "Expecting trie to contain 6 elements";

    res = pf.autoComplete('he');
    if(res.join(',') !== expected)
        return "Expecting autocomplete to be : " + expected;


});
