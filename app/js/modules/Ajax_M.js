/// * * * check if MobPlatform * * * ///
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

var fastdom = require('fastdom');

var Ajax_M = (function(){

    var mobileSite_TrueX999_var = MobPlatform_M.mobileSite_TrueX999();
    console.log('mobileSite_running: ' + mobileSite_TrueX999_var);

    var public = {};
    var default_opts = {
        firstReqURL: '',
        //secondReqURL: '', TODO
        //filterBy: 'price', 'category' etc. TODO
        filterBy: 'price',
        priceID_filters: []
    };

    var PriceRanges_n_IDdom_publicOptions;
    var ArrayWraps_byPrice = [];


    public.priceID_filters = [];//expose and make it global

    public.init = function(options){

    Get_ArrayWraps_byPrice(options);

    if (!arguments.length || !options) {
        console.log('please define your parameters');
        return;
    } else if (typeof options.priceID_filters != "object" && !Array.isArray(options.priceID_filters)) {
        console.log('priceID_filters must be array, ref guide');
        return;
    }

        $.ajax({
            url:options.firstReqURL
        })
        .done(function(data){
            //console.log('we are doing this!!!');
            //var data = JSON.stringify(data);
            //console.log('data from ajax: ' + data);
            var mainArray_X = [];
            useDataFromFirstAjax(data, mainArray_X);
        })
        .fail(function(requestObject, error, errorThrown){
            console.log('init ERROR :' + error);
            console.log('init ERROR THROWN :' + errorThrown);
        });
    };

    /// * * * return Ajax_M.init * * * ///
    return {
        init: public.init
    };


/// * * * inner util functions * * * ///
function Get_ArrayWraps_byPrice(options) {
    if (options.filterBy == "price") {
        PriceRanges_n_IDdom_publicOptions = options.priceID_filters;
        var len_options_public = PriceRanges_n_IDdom_publicOptions.length;
        for (var i = 0; i < len_options_public; i++) {
            var newArr = [];
            ArrayWraps_byPrice.push(newArr);
        }
    } else {
        return;
    }
}

function useDataFromFirstAjax(data, mainArray_X) {
    function Item_X() {
        this.categoryName = '';
        this.pogId = '';
        this.offerName = '';
        this.offerImageUrl = '';
        this.offerMobImageUrl = '';
        this.offerPageUrl = '';
        this.offerMobPageUrl = '';
        this.tagLine = '';
        this.priceSlab = '';
        this._vendorCode = '';
        this._discount = '';
        this._avgRating = '';
        this._noOfReviews = '';
        this._image = [];
        this._price = '';
        this._displayPrice = '';
        this._soldOut = '';
        this._highlights = [];
        this._offers = [];
    }
    data.forEach(function(e, i, arr) {
        var newItem_X = new Item_X();
        newItem_X = {
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
        if (mobileSite_TrueX999_var) {
            newItem_X.offerImageUrl = e.offerMobImageUrl;
            newItem_X.offerPageUrl = e.offerMobPageUrl;
        }
        mainArray_X.push(newItem_X);
    });
    mainArray_X.forEach(function(e, i, arr) {
        if (e.pogId) {
            //modified url REAL useCase disable jsonp
            //var url = (window.admin && window.admin == 'true' ? '/admin' : '') + '/json/getProductById?pogIds=' + e.pogId;
            var url = "../data/csvData_2_" + e.pogId + ".json";
            secondRequest(i, url, mainArray_X);
        }
    });
}

function secondRequest(i, url, mainArray_X) {
    $.ajax({
        url: url,
    }).done(function(data) {
        //if returned data is not json Object
        if (typeof data == "string") {
            data = JSON.parse(data);
        }

        //renderToDom sanitized filtered updated mainArray_X
        setInnerHTML_fastDOM_byPriceProp(PriceRanges_n_IDdom_publicOptions,
            //sanitize filtered updated mainArray_X
            (sanitized_fU_mainArray_X
                //filter updated mainArray_X by Price
                (filterUpdated_mainArray_X_byPrice(PriceRanges_n_IDdom_publicOptions,
                    //update mainArray_X
                    updated_mainArray_X(data, i, mainArray_X), ArrayWraps_byPrice), 'pogId')));


    }).fail(function(requestObject, error, errorThrown) {
        console.log('secondRequest ERROR :' + error);
        console.log('secondRequest ERROR THROWN :' + errorThrown);
    });
}

function updated_mainArray_X(data, i, mainArray_X) {
    var newReturned_obj = data[0];
    //console.log(newReturned_obj);
    mainArray_X[i]._vendorCode = newReturned_obj.vendorCode;
    mainArray_X[i]._discount = newReturned_obj.discount;
    mainArray_X[i]._avgRating = newReturned_obj.avgRating;
    mainArray_X[i]._noOfReviews = newReturned_obj.noOfReviews;
    mainArray_X[i]._image = newReturned_obj.image;
    mainArray_X[i]._price = newReturned_obj.price;
    mainArray_X[i]._displayPrice = newReturned_obj.displayPrice;
    mainArray_X[i]._soldOut = newReturned_obj.soldOut;
    mainArray_X[i]._highlights = newReturned_obj.highlights;
    mainArray_X[i]._offers = newReturned_obj.offers;
    return mainArray_X;
}

function filterUpdated_mainArray_X_byPrice(PriceRanges_n_IDdom_publicOptions, mainArray_X, ArrayWraps_byPrice) {
    PriceRanges_n_IDdom_publicOptions.forEach(function(item, i, arr) {
        var minPriceVal = item[0];
        var maxPriceVal = item[1];
        var this_priceRange_arr = ArrayWraps_byPrice[i];
        pushPriceItemsToArr(minPriceVal, maxPriceVal, mainArray_X, this_priceRange_arr);
    });
    return ArrayWraps_byPrice;
}

function pushPriceItemsToArr(minPriceVal, maxPriceVal, data, priceRange_arr) {
    data.forEach(function(e, i, arr) {
        if (!e._displayPrice) {} else if (e._displayPrice > minPriceVal && e._displayPrice < maxPriceVal) {
            priceRange_arr.push(e);
        }
    });
}

function sanitized_fU_mainArray_X(multi_arr, prop) {
    var new_multi_arr = multi_arr;
    new_multi_arr.forEach(function(e, i, arr) {
        if (e.length < 1) {
            return;
        } else {
            var sanitized_arr = removeDuplicates(e, prop);
            arr.splice(i, 1, sanitized_arr);
        }
    });
    return new_multi_arr;
}

function setInnerHTML_fastDOM_byPriceProp(PriceRanges_n_IDdom_publicOptions, returnedData) {
    returnedData.forEach(function(item, index, arr) {
        if (item.length < 1) {
            //console.log('no data per prop');
            return;
        }
        var htmlContent = item.map(TemplateUtils_M.csvTemplatize).join('');
        var domId = PriceRanges_n_IDdom_publicOptions[index][2];
        fastdom.mutate(function() {
            if (domId) {
                document.getElementById(domId).innerHTML = htmlContent;
            } else {
                console.log('domTargetEle not defined!!!');
            }
        });
    });
}

function removeDuplicates(myArr, prop) {
  return myArr.filter(function (obj, pos, arr) {
      return arr.map(function (mapObj) {
          return mapObj[prop];
      }).indexOf(obj[prop]) === pos;
  });
}

})();

var TemplateUtils_M = (function() {
    var public = {};
    public.csvTemplatize = function(item) {
            var pogId = item.pogId;
            var vendorCode = item._vendorCode;
            var offers = item._offers;
            var catalogId;
            var supc;
            if (!offers) {
                if (!catalogId) {
                    catalogId = 'undefined';
                }
                if (!supc) {
                    supc = 'undefined';
                }
            } else {
                catalogId = offers.map(function(e) {
                    return e.id
                })[0];
                supc = offers.map(function(e) {
                    return e.supcs
                })[0];
            }
            return ('<li class="OffersContentBoxLi"' + 'data-pogId="' + pogId + '"' + 'data-catalogid="' + catalogId + '"' + 'data-supc="' + supc + '"' + 'data-vendorcode="' + vendorCode + '"' + '>' + set_SoldOUt_ModuleX99(item) + '<div class="OffersContentBox">' + set_aLink_ModuleX99(item) + set_OfferImg(item) + set_OffersContTxt_Wrapper() + set_Discount_ModuleX99(item) + set_OfferTitle_csv(item) + set_StarRatings_and_Reviews_ModuleX99(item) + set_Price_and_Tagline_ModuleX99(item) + setClosing_OffersContTxt_Wrapper() + setClosing_aLink_ModuleX99(item) + '</div>' + '</li>');
        }
    //var TemplateUtils_M utilities
    var closing_divTag = '</div>';
    //**OffersContTxt Wrapper
    function set_OffersContTxt_Wrapper() {
        return '<div class="OffersContTxt">';
    }
    //must setClosing_OffersContTxt_Wrapper if set_OffersContTxt_Wrapper used
    function setClosing_OffersContTxt_Wrapper() {
        return closing_divTag;
    }
    //**aLink
    //*aLink Module
    var set_aLink_ModuleX99 = (function(item) {
        //console.log('set_aLink_ModuleX99 running!');
        if (!item) {
            //console.log('param not defined!');
            return;
        }
        var aLink_Wrap = '<a target="_blank" href="' + item.offerPageUrl + '" class="OffersContentBoxLink">';
        if (item.offerPageUrl) {
            return aLink_Wrap;
        } else {
            return '';
        }
    });
    var setClosing_aLink_ModuleX99 = (function(item) {
        if (item.offerPageUrl) {
            return '</a>';
        } else {
            return '';
        }
    });
    //**title
    function set_OfferTitle_csv(item) {
        return '<div class="OffersTitle">' + item.offerName + '</div>';
    }
    //**rating
    //*Ratings Module
    var set_StarRatings_and_Reviews_ModuleX99 = (function(item) {
        var ifRatingDefined_dom_V = ifRatingDefined_dom(item);
        var setRating_V = setRating(item);
        var rating_Wrap = '<div class="rating_Wrap">';
        var ratingFragments = '<div class="OfferHighlights"><div class="ratingBG_disabled"></div>' + '<div class="ratingBG_active" style="width:' + setRating_V + 'px;"></div></div>';
        var reviewsFragments = '<span class="numberRevsX">(' + item._noOfReviews + ')</span>';

        function ifRatingDefined_dom(item) {
            if (item._avgRating) {
                if (item._noOfReviews) {
                    ratingFragments += reviewsFragments;
                }
                return (rating_Wrap + ratingFragments + closing_divTag);
            } else {
                return (rating_Wrap + closing_divTag);
            }
        }

        function setRating(item) {
            if (item._avgRating) {
                var val = item._avgRating,
                    val_Stringed = val.toString(),
                    widthFactor = 0,
                    width = 70;
                if (val < 1 || val > 5) {
                    return false;
                }
                widthFactor = ((((val_Stringed / 5) * 100) / 100) * width);
                widthFactor = Math.round(widthFactor * 10) / 10;
                return widthFactor;
            } else {
                return;
            }
        }
        return ifRatingDefined_dom(item); //
        //set_StarRatings_and_Reviews_ModuleX99
    });
    //**tagline & price
    //*taglineRating Module
    var set_Price_and_Tagline_ModuleX99 = (function(item) {
        var priceTagline_relWrap = '<div class="priceTagline_relWrap">';
        var tagLineFragments = '<div class="tagLine_absWrap"><div class="tagLine1">' + item.tagLine + '</div></div>';
        var priceContXFragments = '<div class="priceCont_absWrap"><span class="OfferMRP_Price">Rs.' + '<span class="offerMRP_Price_span">' + item._price + '</span>&nbsp; &nbsp;</span>' + '<span class="OfferPrice_Price"><span>Rs.&nbsp;</span>' + item._displayPrice + '</span>' + '</div>';

        function priceOrTagline_dom(item) {
            if (item.tagLine) {
                return (priceTagline_relWrap + tagLineFragments + closing_divTag);
            }
            if (item._price || item._displayPrice) {
                return (priceTagline_relWrap + priceContXFragments + closing_divTag);
            } else {
                return (priceTagline_relWrap + closing_divTag);
            }
        }
        return priceOrTagline_dom(item); //
    });
    //**discount
    //*discount Module
    var set_Discount_ModuleX99 = (function(item) {
        var OfferDiscount_Wrap = '<div class="OfferDiscount">';
        var OfferDiscount_Discount_Wrap = '<div class="OfferDiscount_Discount">' + item._discount + '% Off </div>';

        function discount_dom(item) {
            if (item._discount) {
                return (OfferDiscount_Wrap + OfferDiscount_Discount_Wrap + closing_divTag);
            } else {
                return (OfferDiscount_Wrap + closing_divTag);
            }
        }
        return discount_dom(item); //
    });
    //**if soldOut
    //*if soldOut Module
    var set_SoldOUt_ModuleX99 = (function(item) {
        var soldOut_Wrap = '<div class="Soldout"><div class="soldOut_btn">SOLD OUT</div></div>';
        if (item._soldOut) {
            return soldOut_Wrap;
        } else {
            return '';
        }
    });
    //**image
    //nonLazy
    function set_OfferImg(item) {
        return '<div class="OffersContentIMG">' + '<img class="OfferImg" src="' + item.offerImageUrl + '" alt="' + item.offerName + '">' + '</div>';
    }
    //lazyLoad
    function set_OfferImg_lazy(item) {
        return '<div class="OffersContentIMG">' + '<img class="OfferImg lazy-load" data-src="' + item.offerImageUrl + '" alt="' + item.offerName + '" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" >' + '</div>';
    }
    ///* * * end csv fragmentTemplates utilities
    //end of rest of utilities

    /// * * * return TemplateUtils_M.csvTemplatize * * * ///
    return public;

})();

module.exports =  Ajax_M;
