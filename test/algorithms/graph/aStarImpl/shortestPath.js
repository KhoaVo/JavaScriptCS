(function(root,factory){

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../../jscs/algorithms/graph/aStarImpl/shortestPath'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/algorithms/graph/aStarImpl/shortestPath"], function (ShortestPath) { return factory(ShortestPath); } );
    else
        root.shortestPath = factory(root.ShortestPath);

})(this,function(ShortestPath){

    var adjacencyList = {
      a:{b:6,c:3},
      b:{a:6,c:2,d:5},
      c:{a:3,b:2,d:3,e:4},
      d:{b:5,c:3,e:2,f:3},
      e:{c:4,d:2,f:5},
      f:{d:3,e:5}
    };


    var sp = new ShortestPath();
    sp.setAdjacencyList(adjacencyList);

    var res = sp.findGoal("a","f");
    if(res.cost !== 9)
        return "Expecting 9";
});