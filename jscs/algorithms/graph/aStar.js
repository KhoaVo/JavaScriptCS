/*
 * A* implementation in JavaScript
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
        exports = module.exports = factory(require('../../dataStructures/heaps/binaryMinHeap'));
    else if ( typeof define === "function" && define.amd)
        define( ["jscs/dataStructures/heaps/binaryMinHeap"], function (BinaryMinHeap) { return factory(BinaryMinHeap); } );
    else
        root.AStar = factory(root.BinaryMinHeap);

})(this,function(MinPriorityQueue){

    function AStar(){}
    AStar.prototype = {
        constructor:AStar,

        findGoal:function(startState,goalState){

            var self = this,
                curState, curHash, nHash,neighbors,pathCost,
                previous = {}, openSet = {},closedSet = {},
                gScores = {}, fScores = {},
                startHash = this.getHash(startState),
                isGoal = this.makeIsGoal(goalState),
                q = this.makePriorityQueue(fScores);

            openSet[startHash] = startState;
            gScores[startHash] = 0;
            fScores[startHash] = this.h(startState,goalState);
            q.insert(startHash);

            while(q.getCount()){

                curHash = q.extract();
                curState = openSet[curHash];

                if(isGoal(curState,curHash))
                    return {cost:gScores[curHash],path:this.getPath(previous,curState)};

                openSet[curHash] = undefined;
                closedSet[curHash] = true;

                neighbors = this.getNeighborStates(curState);
                neighbors.forEach(function(n){

                    pathCost = gScores[curHash] + self.g(curState,n);
                    nHash = self.getHash(n);
                    openSet[nHash] = n;
                    
                    // If the node was already visited AND its path costs is higher than 
                    // what we already have ignore it.
                    if(closedSet[nHash] && pathCost > gScores[nHash])
                        return;

                    // If it hasn't been visited or it's path is shorter than add
                    // it to the list of nodes we still need to visit.
                    if(!openSet[nHash] || pathCost < gScores[nHash]){
                        previous[nHash] = curState;
                        gScores[nHash] = pathCost;
                        fScores[nHash] = pathCost + self.h(n,goalState);
                        if(!openSet[nHash]){
                            openSet[nHash] = 1;
                            q.insert(nHash);
                        }
                    }
                });
            }

            //no goal found
            return undefined;
        },

        //should return an array of neighbor states
        getNeighborStates:function(curState){
            throw new Error('Must implement getNeighborStates!!');
        },

        //get a unique hash to represent the current state
        getHash:function(state){
            throw new Error('Must implement getHash!!');
        },

        //the function g and h should be overriden
        //the defaults will make aStar behave like depth first search
        g:function(curState,neighborState){
            return 1;
        },

        h:function(state1,state2) {
            return 0;
        },

        //by default it uses a binary min heap
        //you can change overwrite this to return
        //any type of priority queue impl you want (fibonacci,binomial,d-ary,etc)
        makePriorityQueue:function(fScores){
            return new MinPriorityQueue(function(aHash,bHash){
                return fScores[aHash] - fScores[bHash];
            });
        },

        getPath:function(previousMap,curState,path){
            var hash = this.getHash(curState),
                prev = previousMap[hash];

            path = path || [];
            path.unshift(curState)
            if(prev){
                this.getPath(previousMap,prev,path);
            }

            return path;
        },

        makeIsGoal:function(goalState){
            var self = this,goalHash;
            if(typeof goalState === "function"){
                return function(state){
                    return goalState(state);
                }
            }else{
                goalHash = this.getHash(goalState);
                return function(state,stateHash){
                    return stateHash === goalHash;
                }
            }
        }
    }

    return AStar;
});
