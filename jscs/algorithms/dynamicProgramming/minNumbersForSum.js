(function(root){


    var MinItemsForSum = function(numbers,maxSum){
        var curMaxNum, j,l = numbers.length,num,leftOver;
        var minNumbersForSum = [];
        minNumbersForSum.unshift({count:0,numbers:[]});

        for(curMaxNum = 1; curMaxNum <= maxSum;curMaxNum++){
            minNumbersForSum[curMaxNum] = {count:Number.MAX_VALUE,numbers:[]};
            for(j =0; j < numbers.length;j++){
                num = numbers[j];
                leftOver = curMaxNum - num;
                if(num <= curMaxNum && minNumbersForSum[leftOver].count + 1 < minNumbersForSum[curMaxNum].count){
                    minNumbersForSum[curMaxNum].count = minNumbersForSum[leftOver].count + 1;
                    minNumbersForSum[curMaxNum].numbers.push(num);
                }
            }
        }

        return minNumbersForSum[maxSum];
    };

})(this);