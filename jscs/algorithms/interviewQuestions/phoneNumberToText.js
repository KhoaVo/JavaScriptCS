(function(root){

    var MAP = {
        1:[' '],
        2:['A','B','C'],
        3:['D','E','F'],
        4:['G','H','I'],
        5:['J','K','L'],
        6:['M','N','O'],
        7:['P','Q','R','S'],
        8:['T','U','V'],
        9:['W','X','Y','Z'],
        0:['+']
    };

    var _phoneNumberToText = function(phoneNumber,idx,partial,map,ret){

        if(idx > phoneNumber.length - 1){
            ret.push(partial);
            return;
        }

        var chars = map[phoneNumber[idx]],l= chars.length;
        for(var i = 0; i < l;i++)
            _phoneNumberToText(phoneNumber,idx + 1,partial + chars[i],map,ret);

        return ret;
    };

    var phoneNumberToText = function(phoneNumber,map){
        return _phoneNumberToText(phoneNumber,0,'',map || MAP,[]);
    };

    if(typeof module !== "undefined" && module.exports)
        exports = module.exports = phoneNumberToText;
    else if ( typeof define === "function" && define.amd)
        define([], function () { return phoneNumberToText; } );
    else
        root.phoneNumberToText = phoneNumberToText;

})(this);