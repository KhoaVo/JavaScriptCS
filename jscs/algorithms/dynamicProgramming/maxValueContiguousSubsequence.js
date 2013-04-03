(function(root,factory){

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = factory();
    else if ( typeof define === "function" && define.amd)
        define([], function () { return factory(); } );
    else
        root.maxValueContiguousSubsequence = factory();

})(this,function(){

    function maxValueContiguousSubsequence(a){

        var max = a[0],maxHere = a[0],
            i,l= a.length,
            start = 0,end = 0,temp = 0;

        for( i = 1 ; i < l; i++){

            if(maxHere < 0){
                maxHere = a[i];
                temp = i; //reset the start position here
            }
            else{
                maxHere += a[i];
            }

            if(maxHere > max){
                max = maxHere;
                start = temp; //lock in the new start position
                end = i;
            }
        }

        return {from:start,to:end,value:max};
    }

    return maxValueContiguousSubsequence;

});