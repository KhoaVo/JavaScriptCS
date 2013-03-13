(function(root){

    var minNumbersForSum = function(numbers,maxSum){
        var curMaxSum, j,l = numbers.length,num,leftOver;
        var minTable = [];
        minTable.unshift({sum:0,needed:0,numbers:[]});

        for(curMaxSum = 1; curMaxSum <= maxSum;curMaxSum++){
            minTable[curMaxSum] = {sum:curMaxSum,needed:Number.MAX_VALUE,numbers:[]};
            for(j =0; j < numbers.length;j++){
                num = numbers[j];
                leftOver = curMaxSum - num;
                if(num <= curMaxSum && minTable[leftOver].needed + 1 < minTable[curMaxSum].needed){
                    minTable[curMaxSum].needed = minTable[leftOver].needed + 1;
                    minTable[curMaxSum].numbers = [].concat(minTable[leftOver].numbers);
                    minTable[curMaxSum].numbers.push(num);
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