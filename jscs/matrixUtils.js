(function(root){

    var MatrixIterator = function(dimensions,defVal){
        this.dimensions = dimensions;
        this.defVal = defVal;
        this.lastIdx = this.dimensions.length - 1;
    };
    MatrixIterator.prototype = {
        constructor:MatrixIterator,

        /*
         @param m    matrix to be iterated
         @param func function to call for each element
         the element as well as an array representing
         the indicies of the current element will be passed in
         */
        each: function(m,func){
            var l = this.dimensions.length,
                indicies = [];
            while(l--)
                indicies.push(0);
            this._each(m,0,indicies,func);
        },

        /*
         @param m            matrix
         @param cur          current dimension
         @param indicies     current indicies (i,j,k,etc) that the traversal is on
         @param func         callback function to call for each element in the matrix
         the element as well as an array representing the indicies of the current element will be passed in
         for each recursive call the function reduces the dimension of the matrix to be iterated by 1
         base case is 1d array
         */
        _each: function(m,cur,indicies,func){
            var l = this.dimensions[cur], i,next = cur + 1;
            if(cur < this.lastIdx){
                for( i = 0; i < l; i++){
                    indicies[cur] = i;
                    m[i] = m[i] || [];
                    this._each(m[i],next,indicies,func);
                }
            }else{
                for( i = 0; i < l; i++){
                    indicies[cur] = i;
                    m[i] = m[i] === undefined ? this.defVal : m[i];
                    func(m[i],indicies);
                }
            }
        }
    };


    var getAtIndicies = function(m,indicies){

        var cur = m,last = indicies.length - 1;
        for(var i = 0; i < last; i++)
            cur = cur[indicies[i]];

        return cur[indicies[last]];
    };

    var setAtIndicies = function(m,indicies,val){
        var cur = m,last = indicies.length - 1;
        for(var i = 0; i < last; i++)
            cur = cur[indicies[i]];

        cur[indicies[last]] = val;
    };

    /*
        @param dimensions   number of dimensions to give the matrix
                            ex: a value of 3 will return [[[]]]
    */
    var makeMatrix = function(dimensions,m){
        if(!dimensions)return;
        if(m){
            m[0] = [];
            makeMatrix(--dimensions,m[0]);
        }else{
            m = [];
            makeMatrix(--dimensions,m);
            return m;
        }
    };

    var JsCsMatrixUtils = {
        Iterator:MatrixIterator,
        makeMatrix:makeMatrix,
        getAtIndicies:getAtIndicies,
        setAtIndicies:setAtIndicies
    };

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = JsCsMatrixUtils;
    if ( typeof define === "function" && define.amd)
        define( [], function () { return JsCsMatrixUtils; } );
    else
        root.JsCsMatrixUtils = JsCsMatrixUtils;

})(this);