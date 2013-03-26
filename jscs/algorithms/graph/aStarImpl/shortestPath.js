/*
 * Shortest path implementation in JavaScript
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
    //detect node js
    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory(require('../../../utils'),require('../aStar'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/utils","jscs/algorithms/graph/aStar"], function (JsCsUtils,AStar) { return factory(JsCsUtils,AStar); } );
    else
        root.ShortestPath = factory(root.JsCsUtils,root.Astar);

})(this,function(JsCsUtils,AStar){

    //This will implement a short circuited
    //version of Dijkstra's algorithm. It will stop when
    //it finds the goal node
    function ShortestPath(adjacencyList){
        this._adjacencyList = adjacencyList;
    }

    JsCsUtils.extend(ShortestPath,AStar,{

        /*
         adjacencyList should be in the format
         {
         a:{b:100,c:150,f:200},
         b:{a:100},
         c:{a:150,f:300},
         f:{a:200}
         }
         */
        setAdjacencyList:function(adjacencyList){
            this._adjacencyList = adjacencyList;
        },

        getHash: function(nodeName){
            return nodeName;
        },

        getNeighborStates:function(nodeName){
            var connections = this._adjacencyList[nodeName];
            return Object.keys(connections);
        },

        g:function(from,to){
           return this._adjacencyList[from][to];
        },

        //Dijkstra's is uniform cost search algorithm
        //therefor we don't treat all path costs with the same value
        //with teh same priority
        h:function(from,to) {
            return 0;
        }

    });

    return ShortestPath;

});