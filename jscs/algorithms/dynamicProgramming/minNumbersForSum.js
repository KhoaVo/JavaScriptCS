(function(root){

    var minNumbersForSum = function(numbers,maxSum){
        var sum, j,l = numbers.length,numValue,leftOver;
        var minTable = [];
        minTable.unshift({sum:0,needed:0,numbers:[]});

        for(sum = 1; sum <= maxSum;sum++){
            minTable[sum] = {sum:sum,needed:Number.MAX_VALUE,numbers:[]};
            for(j =0; j < numbers.length;j++){

                numValue = numbers[j];
                leftOver = sum - numValue;

                if(numValue <= sum && minTable[leftOver].needed + 1 < minTable[sum].needed){
                    minTable[sum].needed = minTable[leftOver].needed + 1;
                    minTable[sum].numbers = [].concat(minTable[leftOver].numbers);
                    minTable[sum].numbers.push(numValue);
                }
            }
        }
        return minTable[maxSum];
    };

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = minNumbersForSum;
    else if ( typeof define === "function" && define.amd)
        define([], function () { return minNumbersForSum; } );
    else
        root.minNumbersForSum = minNumbersForSum;

})(this);