//var Ajax_M = require('./modules/Ajax_M.js');
var promise = require('es6-promise');
var AjaxStart = require('./modules/promiseTest.js');

var MobPlatform_M = (function(){
    var public = {};    
    public.mobileSite_running = false;
    public.mobileSite_TrueX999 = function(){
        var currURLX = window.location;
        var mob_preURL_str = 'm.snapdeal.com';
        currURLX = String(currURLX);
        return public.mobileSite_running = (currURLX.indexOf(mob_preURL_str) > 0)? true: false;
    }
    return public;    
})();

var mobileSite_TrueX999_var = MobPlatform_M.mobileSite_TrueX999();
    console.log('mobileSite_running: ' + mobileSite_TrueX999_var);

//localTest
var url = "../data/csvData_2.json";
//var url = (window.admin && window.admin == 'true' ? '/admin' : '') + '/get/offers/jsonList/' + mktName.value;

/*var PriceRanges_n_IDdom_publicOptions = [
//[min_price, max_price, id_dom],
  [0, 299, 'price_0to299'],
  [299, 499, 'price_299to499'],
  [499, 799, 'price_499to799'],
  [799, 1299, 'price_799to1299'],
  [1299, 1999, 'price_1299to1999'],
  [1999, 2999, 'price_1999to2999']
];
//var url = (window.admin && window.admin == 'true' ? '/admin' : '') + '/get/offers/jsonList/' + mktName.value;
Ajax_M.init({
    firstReqURL:url,
    filterBy:'price',
    priceID_filters: PriceRanges_n_IDdom_publicOptions
});*/


AjaxStart.XMLHTTP_reqOn(url).then(function(data){
    //console.log(data);
    //console.log(typeof data);
    
    var data = JSON.parse(data);
    var mainArray_X = [];
    var pogIdList_arr = [];
    useDataFromFirstAjax(data, mainArray_X);
    
    
}).catch(function(err){
    console.log(err);
})
    


function useDataFromFirstAjax(data, mainArray_X){

  data.forEach(function(e,i,arr){
      
      //get all pogId
      if(e.pogId){
          pogIdList_arr.push(e.pogId);
      }
      
   var newItem_X = {
        categoryName: e.categoryName,
        pogId: e.pogId,
        offerName: e.offerName,
        offerImageUrl: e.offerImageUrl,
        offerMobImageUrl: e.offerMobImageUrl,
        offerPageUrl: e.offerPageUrl,
        offerMobPageUrl: e.offerMobPageUrl,
        tagLine: e.tagLine,
        priceSlab: e.priceSlab,
        _vendorCode: e._vendorCode,
        _discount: e._discount,
        _avgRating: e._avgRating,
        _noOfReviews: e._noOfReviews,
        _image: e._image,
        _price: e._price,
        _displayPrice: e._displayPrice,
        _soldOut: e._soldOut,
        _highlights: e._highlights,
        _offers: e._offers,
    };

    if(mobileSite_TrueX999_var) {
        newItem_X.offerImageUrl = e.offerMobImageUrl;
        newItem_X.offerPageUrl = e.offerMobPageUrl;
    }
        mainArray_X.push(newItem_X);
  });


  mainArray_X.forEach(function(e,i,arr){
      if(e.pogId){
        //modified url REAL useCase disable jsonp
        //var url = (window.admin && window.admin == 'true' ? '/admin' : '') + '/json/getProductById?pogIds=' + e.pogId;

        var url = "../data/csvData_2_" +e.pogId+ ".json";
        secondRequest_promisify(i, url, mainArray_X);  
      }
  });
    
    console.log('updated mainArray_X');
    console.log(mainArray_X);
}


function secondRequest_promisify(i, url, mainArray_X){
    AjaxStart.XMLHTTP_reqOn(url).then(function(data){
        console.log(data);        
    }).catch(function(err){
        console.log(err)
    });
}


function secondRequest(i, url, mainArray_X){
    $.ajax({
        url: url,
    })
    .done(function(data){
      //if returned data is not json Object
      if(typeof data =="string"){
        data = JSON.parse(data);
      }


    })
    .fail(function(requestObject, error, errorThrown){
      console.log('secondRequest ERROR :' + error);
      console.log('secondRequest ERROR THROWN :' + errorThrown);
    });
}




