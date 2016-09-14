
AjaxStart.XMLHTTP_reqOn(url).then(function(data){
    //console.log(data);
    //console.log(typeof data);
    var data = JSON.parse(data);
    useDataFromFirstAjax(data, mainArray_X);
}).catch(function(err){
    console.log(err);
});


function useDataFromFirstAjax(data, mainArray_X){

  data.forEach(function(e,i,arr){
        // * * * get all pogId
        if(e.pogId){
          pogIdList_arr.push(e.pogId);
        }

       //populating mainArray_X with data from first ajax req
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

        // * * * join all items inside pogIdList_arr
        var all_pogIds = pogIdList_arr.join(',');
        //console.log(all_pogIds);
        // * * * make second ajaxRequest
        //localTest
        var url = "../data/csvData_2_" + pogIdList_arr[0] + ".json";
        //var url = (window.admin && window.admin == 'true' ? '/admin' : '') + '/json/getProductById?pogIds=' + all_pogIds;

        AjaxStart.XMLHTTP_reqOn(url).then(function(data){

            //console.log('second ajax request response: ');
            //console.log(data);
            if (typeof data == "string") {
                data = JSON.parse(data);
            }

            update_mainArray_X(data, mainArray_X);

            console.log('final mainArray_X: ');
            console.log(mainArray_X);
        });
    console.log('updated mainArray_X');
    console.log(mainArray_X);
}

function update_mainArray_X(data, mainArray_X){
    console.log('second ajax request response: ');
    console.log(data);

    data.forEach(function(e){
      var this_data = e;

      mainArray_X.forEach(function(_e){
        if(this_data.id == _e.pogId){
          _e._vendorCode = this_data.vendorCode;
          _e._discount = this_data.discount;
          _e._avgRating = this_data.avgRating;
          _e._noOfReviews = this_data.noOfReviews;
          _e._image =this_data.image;
          _e._price = this_data.price;
          _e._displayPrice = this_data.displayPrice;
          _e._soldOut = this_data.soldOut;
          _e._highlights = this_data.highlights;
          _e._offers = this_data.offers;
        }
      });
    });
}

function secondRequest_promisify(i, url, mainArray_X){
    AjaxStart.XMLHTTP_reqOn(url).then(function(data){
        console.log(data);
    }).catch(function(err){
        console.log(err);
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
