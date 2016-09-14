/// * * * check if MobPlatform * * * ///

var promise = require('es6-promise');

var AjaxStart = (function(){
    var public = {};
    var htmlContent_arr = [];
    public.XMLHTTP_reqOn = function(url){
        return new Promise(function(resolve, reject){
           var request = new XMLHttpRequest();
            request.open('GET', url);
            request.onload = function(){
                if(request.status == 200){
                  //console.log('AjaxStart url: ', url);
                    resolve(request.response);
                }
                else {
                    reject(Error(request.statusText));
                }
            };
            request.oneerror = function(){
                reject(Error('Network Error'));
            };
            request.send();
        });
    };
    return public;
})();

module.exports = AjaxStart;
