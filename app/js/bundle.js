(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* run polyfill if required */
function polyfill_qSA_SupportQ() {
    if (supportsQuerySelectors) {
        console.log('querySelector && querySelectorAll are supported!');
    } else {
        //download and polyfill it
        ['https://cdn.polyfill.io/v2/polyfill.min.js'].forEach(function(src) {
            var script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.head.appendChild(script);
        });
    }
    function supportsQuerySelectors() {
        return (document.querySelector && document.querySelectorAll) !== null;
    }
}
polyfill_qSA_SupportQ();
/* end run polyfill if required */

//Our dependencies
var promise = require('es6-promise');
var AjaxStart = require('./modules/AjaxStart.js');
var fastdom = require('fastdom');
var Blazy = require('Blazy');
var MobPlatform_M = require('./modules/MobPlatform_M');
//reqd

var socialShareX_Module = require('./modules/socialShareX_Module');

var Query_dom_categoryNames = (function(){
  var public = {};
  public.parentWrapper_id = 'mainWrapperX_newX999';
   //get dom_categoryNames_arr
  public.dom_categoryNames_arr = function get_dom_categoryNames_arr(){
    var parentWrapper = document.getElementById(public.parentWrapper_id);
    var dom_categoryNames_arr = [];
    var offers_WrapperX99 = parentWrapper.getElementsByClassName('offers_WrapperX99');
    for(var i=0; i<offers_WrapperX99.length; i++){
      dom_categoryNames_arr.push(offers_WrapperX99[i].getAttribute('id'));
    }
    return dom_categoryNames_arr;
  };
  return public;
})();

var GetInner_ = (function(){
  var public = {};
  public.priceRange_domID = null;
  public.firstURL = null;
  public.priceRange_domID_setfn = function(priceRange_domID){
    public.priceRange_domID = priceRange_domID;
  };
  public.firstURL_setfn = function(url){
    public.firstURL = url;
  };
  return public;
})();
//expose n use GetInner_.priceRange_domID;
//expose n use GetInner_.firstURL;

//returns Query_dom_categoryNames.dom_categoryNames_arr
var AjaxPageApp = (function(){
    //check if mobileSite running
    var mobileSite_TrueX999_var = MobPlatform_M.mobileSite_TrueX999();
        console.log('mobileSite_running: ' + mobileSite_TrueX999_var);

      //default options for filterBy:'categoryNames' & setToEachID:true
      var default_opts = {
        url: '',//always define
        parentWrapper_id: Query_dom_categoryNames.parentWrapper_id,//always define
        filterBy:'categoryNames',//'categoryNames' or 'price'
        setToEachID: true,//set to ids in dom ~ matching with categoryNames
        sortOrder: null,//categoryNames n their sequence: setToEachID:false
        priceRange_domID: null,
        TimerOffer: false//check if TimerOffer
      };

    //global inside AjaxPageApp
    var parentWrapper_id = default_opts.parentWrapper_id;
    var mainArray_X = [];
    var pogIdList_arr = [];
    var htmlContent_arr= [];
    var unique_categoryNames;
    var dom_categoryNames_arr = Query_dom_categoryNames.dom_categoryNames_arr();
    var setToEachID;
    var filterBy;
    var priceRange_domID;
    var sortOrder;
    var TimerOffer;
    //public obj to be returned
    var public = {};
    public.get_priceRange_domID = null;
    public.init = function(options){
      if(!options){
          options = {};
      }
        //internal options caching and conditions
        var url = options.url ? options.url:default_opts.url;
            filterBy = options.filterBy ? options.filterBy:default_opts.filterBy;
            sortOrder = options.sortOrder ? options.sortOrder:default_opts.sortOrder;
            setToEachID = options.setToEachID ? options.setToEachID:default_opts.setToEachID;
            priceRange_domID = options.priceRange_domID ? options.priceRange_domID:default_opts.priceRange_domID;
            TimerOffer = options.TimerOffer ? options.TimerOffer:default_opts.TimerOffer;

        //if TimerOffer == true
        if(TimerOffer !== false) {
          ///NoTimer ~ comment out if Timer is no reqd
            window.TimerX99 = require('./modules/TimerX99');
            window.FullDate = require('./modules/FullDate');

            if(!window.TimerX99 || window.TimerX99 === null){
                console.error('TimerOffers: true, require TimerX99 & FullDate Modules');
            }
        }
        //E X P O S I N G   priceRange_domID
        GetInner_.priceRange_domID_setfn(priceRange_domID);
        //E X P O S I N G  firstURL
        GetInner_.firstURL_setfn(url);
        //if filterByCategoryNames
        if(filterBy){
          console.log('filterBy: ', filterBy);
        }
        if(setToEachID === false){
          if(typeof filterBy == 'undefined'){
            console.log('please define filterBy Options');
          }
          if(typeof sortOrder == 'undefined'){
              console.log('please define sortOrder Options');
          }
          if(filterBy == 'categoryNames'){
            if(sortOrder === null){
              console.log('please define sortOrder Options');
            }
          }
          if(filterBy == 'price'){
              console.log('setToEachID must be true for filterBy Price');
              return;
          }
        }
        //if we want to append to predefined domIDs
        else {
          sortOrder = null;//set to null
          console.log('setToEachID is true, sortOrder was set to null!');

          if(filterBy == 'price'){
            if(setToEachID === false){
              console.log('setToEachID must be true for filterBy Price');
            }
            if(priceRange_domID === null)
            console.log('please define priceRange_domID Options');
          }
        }
        /* preventCache */
        var preventCache_suffix = new Date().getTime();
        url = url+'?timeID=' + preventCache_suffix;
        /* preventCache */
        AjaxStart.XMLHTTP_reqOn(url).then(function(response){
            var data = JSON.parse(response);
            useDataFromFirstAjax(data, mainArray_X, sortOrder);
            //handle error for first ajax
            }).catch(function(err){
              console.log(err);
            });
      //end of init
      };



    return public;
    //end of AjaxPageApp
    //internal scopped util functions
    function useDataFromFirstAjax(data, mainArray_X, sortOrder) {
        data.forEach(function(e, i, arr) {
            if (e.pogId) {
                pogIdList_arr.push(e.pogId);
            }
            e.categoryName = !e.categoryName? 'undefined': e.categoryName;
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
                _labelUrl: e._labelUrl
            };
            if (mobileSite_TrueX999_var) {
                newItem_X.offerImageUrl = e.offerMobImageUrl;
                newItem_X.offerPageUrl = e.offerMobPageUrl;
            }
            mainArray_X.push(newItem_X);
            //create_all_timerOptions
            if(TimerOffer !== false) {
              //console.log('TimerOffers true');
                TimerX99.create_all_timerOptions(data);
            }

        });
        //get unique_categoryNames
        unique_categoryNames = getUniqueCategoryNames(mainArray_X);
        if(sortOrder && sortOrder !== null){
          unique_categoryNames.forEach(function(){
              htmlContent_arr.push([]);
          });
        }
        else {
          if(filterBy == 'categoryNames'){
            dom_categoryNames_arr.forEach(function(){
                htmlContent_arr.push([]);
            });
          }
          else if(filterBy == 'price'){
            priceRange_domID.forEach(function(){
                htmlContent_arr.push([]);
            });
            //console.log('filterBy: price');
            //console.log('updated htmlContent_arr.length: ', htmlContent_arr.length);
          }

        }

        if(!pogIdList_arr.length || pogIdList_arr.length < 1){
          return ;
        }
        else {

          //console.log('url first: ', GetInner_.firstURL);

          // if not local
          if(GetInner_.firstURL.indexOf('.json') < 0)
          {
            //push an extry empty string to ensure last pogId is ALWAYS rendered
            console.log('live');
            pogIdList_arr.push(' ');
          }
          else {
            console.log('running on local');
          }
          //join all pogIds
          var all_pogIds = pogIdList_arr.join(',');

          //second request Url
          var url;
          // if not local
          if(GetInner_.firstURL.indexOf('.json') < 0){
              url = (window.admin && window.admin == 'true' ? '/admin' : '') + '/json/getProductById?pogIds=' + all_pogIds;
          }

          //if local
          else {
              url = "../csvData_2_" + pogIdList_arr + ".json";
          }

          /* preventCache */
          var preventCache_suffix = new Date().getTime();
          url = url+'?timeID=' + preventCache_suffix;

          //console.log('modified second reqUrl: ', url);
          /* preventCache */
          AjaxStart.XMLHTTP_reqOn(url).then(function(data) {
              if (typeof data == "string") {
                  data = JSON.parse(data);
              }
              update_mainArray_X(data, mainArray_X);
              //console.log('updated mainArray_X from pogID data request: ', mainArray_X);
              //update_htmlContent_arr_by_sortOrder, setOrder of sections
              if(sortOrder){
                  console.log('sortOrder defined');
                  update_htmlContent_arr_by_sortOrder(mainArray_X, sortOrder, htmlContent_arr);
                  SetHTML.init_setToMainWrapper({
                    htmlContent_multi_arr:htmlContent_arr,
                  });
              }
              else {

                  if(filterBy=='categoryNames'){
                    //using domQuery to sort the order of subsequent htmlContent based of dom_categoryNames
                    update_htmlContent_arr_by_dom_categoryNames(mainArray_X, dom_categoryNames_arr, htmlContent_arr);
                    SetHTML.init_setToEachID({
                      htmlContent_multi_arr:htmlContent_arr,
                    });
                    //initCountDwn Timer if TimerOffer True
                    if(TimerOffer !== false) {
                      TimerX99.initCountDwnX99(TimerX99.all_timerOptions_ajax);
                      //console.log('run timer please');

                      //incase we need to delegate click
                      DelegateClick_timerOfferUnit();
                      //console.log('run DelegateClick_timerOfferUnit');
                    }

                      //if dodSuperDealUnit_ev found
                      if(document.getElementsByClassName('dodSuperDealUnit_ev').length > 0){
                          //console.log('dodSuperDealUnit found...run DelegateClick_dodSuperDeal!');
                          DelegateClick_dodSuperDeal();
                      }



                  }
                  else if(filterBy == 'price'){
                    //act upon mainArray_X
                    console.log('non updated htmlContent_arr: ', htmlContent_arr);
                    update_htmlContent_arr_by_priceRange_domID_edit(mainArray_X, priceRange_domID,  htmlContent_arr);
                    console.log('updated htmlContent_arr by price: ', htmlContent_arr);
                    //setHTML
                    SetHTML.init_setToEachID_filterBy_price({
                      htmlContent_multi_arr:htmlContent_arr
                    });
                  }
              }
          });
        }
    }


    function update_htmlContent_arr_by_priceRange_domID(mainArray_X, priceRange_domID,  htmlContent_arr){
        priceRange_domID.forEach(function(item, index, array){
          var minPriceVal = item[0];
          var maxPriceVal = item[1];
          var this_priceRangeOffers = mainArray_X.reduce(function(acc, item, index, arr){
            if(item._displayPrice > minPriceVal && item._displayPrice < maxPriceVal && item.categoryName!=="undefined"){
              acc.push(item);
            }
            return acc;
          }, []);

          htmlContent_arr[index].push(this_priceRangeOffers);
        });
    }

    function update_htmlContent_arr_by_priceRange_domID_edit(mainArray_X, priceRange_domID,  htmlContent_arr){
        priceRange_domID.forEach(function(item, index, array){
          var minPriceVal = item[0];
          var maxPriceVal = item[1];
          mainArray_X.forEach(function(_item, _index, _arr){
            if(_item._displayPrice > minPriceVal && _item._displayPrice < maxPriceVal && _item.categoryName!=="undefined"){
              console.log('method item: ', _item);
              htmlContent_arr[index].push(_item);
            }
          });
        });
    }


    function update_mainArray_X(data, mainArray_X) {
        data.forEach(function(e) {
            var this_data = e;
            mainArray_X.forEach(function(_e) {
                if (this_data.id == _e.pogId) {
                    _e._vendorCode = this_data.vendorCode;
                    _e._discount = this_data.discount;
                    _e._avgRating = this_data.avgRating;
                    _e._noOfReviews = this_data.noOfReviews;
                    _e._image = this_data.image;
                    _e._price = this_data.price;
                    _e._displayPrice = this_data.displayPrice;
                    _e._soldOut = this_data.soldOut;
                    _e._highlights = this_data.highlights;
                    _e._offers = this_data.offers;
                    _e._labelUrl = this_data.labelUrl;
                    _e._sdGold = this_data.sdGold;
                }
            });
        });
    }

    //get unique_categoryNames
    function getUniqueCategoryNames(data){
      var all_categoryNames_arr = [];
      data.forEach(function(item){
        all_categoryNames_arr.push(item.categoryName);
      });
      return all_categoryNames_arr.reduce(function(acc, item, index, arr){
        if(arr.indexOf(item) == index){
          acc.push(item);
        }
        return acc;
      }, []);
    }

    //push data into htmlContent_arr by sortOrder(defined in options)
    function update_htmlContent_arr_by_sortOrder(data, sortOrder, htmlContent_arr){
      for (var i = 0; i < sortOrder.length; i++) {
          var current_catName = sortOrder[i];
          for (var j = 0; j < data.length; j++) {
              if (data[j].categoryName == current_catName) {
                  htmlContent_arr[i].push(data[j]);
              }
          }
      }
    }

    //push data into htmlContent_arr by unique_categoryNames(from data)
    function pushCategoryItemsToIDArr(data, unique_categoryNames, htmlContent_arr){
      for (var i = 0; i < unique_categoryNames.length; i++) {
          var current_catName = unique_categoryNames[i];
          for (var j = 0; j < data.length; j++) {
              if (data[j].categoryName == current_catName) {
                  htmlContent_arr[i].push(data[j]);
              }
          }
      }
    }

    //push data into dom_htmlContent_arr by dom_categoryNames_arr(from dom)
    function update_htmlContent_arr_by_dom_categoryNames(data, dom_categoryNames_arr, htmlContent_arr){
      for (var i = 0; i < dom_categoryNames_arr.length; i++) {
          var current_catName = dom_categoryNames_arr[i];
          for (var j = 0; j < data.length; j++) {
              if (data[j].categoryName == current_catName) {
                  htmlContent_arr[i].push(data[j]);
              }
          }
      }
    }

    /// * * * assign click events - on click unit find a and update window.location
    function DelegateClick_timerOfferUnit(){
      var offerUnit = document.getElementsByClassName('timerOfferUnit');
        for(var i=0; i < offerUnit.length; i++){
          offerUnit[i].addEventListener('click', function(e){
            //console.log('offerUnit clicked!');
            var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var this_offerUnit = this;
            var this_liveTimerOffer_href = this_offerUnit.children[0].children[0].children[0].getAttribute('href');
            //console.log(this_liveTimerOffer_href);
            if(!this_liveTimerOffer_href){
              console.log('a tag liveTimerOffer_href not found, return');
              return;
            }
            if (windowWidth > 768) {
                window.open(this_liveTimerOffer_href, '_blank');
            } else {
                window.location.href = this_liveTimerOffer_href;
            }
            e.preventDefault();
        });
      }
    }
  /// * * * assign click events - on click dodSuperDeal find a and update window.location
    function DelegateClick_dodSuperDeal(){
      var offerUnit = document.getElementsByClassName('dodSuperDealUnit_ev');
        for(var i=0; i < offerUnit.length; i++){
          offerUnit[i].addEventListener('click', function(e){
            //console.log('offerUnit clicked!');
            var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var this_offerUnit = this;
            var this_liveTimerOffer_href = this_offerUnit.children[0].children[0].children[0].getAttribute('href');
            //console.log(this_liveTimerOffer_href);
            if(!this_liveTimerOffer_href){
              console.log('dodSuperDealUnit_ev ahref  not found, return');
              return;
            }
            if (windowWidth > 768) {
                window.open(this_liveTimerOffer_href, '_blank');
            } else {
                window.location.href = this_liveTimerOffer_href;
            }
            e.preventDefault();
        });
      }
    }

})();


var SetHTML = (function(){
  var public = {};
  var finalHTMLContent = []; //append all TOGETHER in the end

  var dom_categoryNames_arr = Query_dom_categoryNames.dom_categoryNames_arr();

  var default_setToEachID_opts = {
      htmlContent_multi_arr: [],
      wrapper_id: 'mainWrapperX_newX999',
  };

  public.init_setToEachID = function(opts) {
    if(!opts){
        opts = {};
    }
    var htmlContent_multi_arr = opts.htmlContent_multi_arr ? opts.htmlContent_multi_arr : default_setToEachID_opts.htmlContent_multi_arr;
    //console.log('init_setToEachID running!');
    for(var i=0; i< dom_categoryNames_arr.length; i++){
      finalHTMLContent.push([]);
    }
    htmlContent_multi_arr.forEach(function(this_innerArr, index, array) {
        if(!this_innerArr[0]){
          console.log('this_innerArr[] '+index + ' is undefined || not found in data');
          return false;
        }
        var categoryName = this_innerArr[0].categoryName;
        this_innerArr[0].categoryName = this_innerArr[0].categoryName ? this_innerArr[0].categoryName : 'undefined';

        var offer_htmlContent = this_innerArr.map(function(item) {
            var pogId = item.pogId;
            var categoryName = item.categoryName;
            //all properties fetched via pogId query have _ e.g. 'item._vendorCode, item._discount'
            var vendorCode = item._vendorCode;
            var offers = item._offers;
            var catalogId;
            var supc;
            //console.log('labelUrl: ', labelUrl);
            //soldOut Options
            if(item._soldOut === true || item._soldOut){
              console.log('Item with pogId: ' + pogId + ' was sold out!');
              return;
            }

            //prevent render if item is not mobile/tablet & discount equal to 0 or less than 10
            /*if (!updateDiscount_IfMatchX(item)) {
              var _discount = item._discount;
              if (_discount === 0 || _discount && _discount < 10) {
                console.log('Item with pogId: ' + pogId + ' had discount less than 10!');
                  return;
                }
            }*/

            if(!offers) {
              if(!catalogId){
                catalogId = 'undefined';
              }
              if(!supc){
                supc = 'undefined';
              }
            }
            else {
              catalogId = offers.map(function(e){return e.id;})[0];
              supc = offers.map(function(e){return e.supcs;})[0];
            }
            //templateX999 template conditions

            /// +++++ footerBannerX99 +++++ ///
            //if footerBannerX99 ~ ALWAYS defined
            if(categoryName.indexOf('footerBannerX99') > -1){
              return (
                '<li class="footerBannerX99_unit responsiveFontSizeX99 ">' +
                  setHTML_offerUnit_href(item) +
                    setHTML_offerUnit_imgWrapOnly(item) +
                  setHTML_offerUnit_href_closing(item) +
                '</li>'
              );
            }
            /// +++++ /footerBannerX99 +++++ ///

            ///  +++++ DOD templates +++++ ///
            /*
            //if superDeal

            if(categoryName.indexOf('superDod') > -1){
              return (
                '<div class="dodSuperDeal_unit responsiveFontSizeX99 hoverStyleX99 ' + categoryName + '"' +
                              '>' +
                              set_SoldOUt_ModuleX99(item) +
                                setHTML_offerUnit_href(item) +
                                  setHTML_offerUnit_href_afterWrap()+
                                    setHTML_offerUnit_imgWrap_sdPlusInc_rel(item) +
                                    setHTML_offerUnit_nonImgContWrap() +
                                      setHTML_wrapCenterCont() +
                                        setHTML_centeredContX() +
                                          setHTML_offerUnit_discountWrap(item) +
                                          setHTML_offerUnit_title(item) +
                                          setHTML_offerUnit_ratingWrap(item) +
                                          setHTML_offerUnit_priceTaglineWrap_rel(item) +
                                        setHTML_centeredContX_closing() +
                                      setHTML_wrapCenterCont_closing() +
                                    setHTML_offerUnit_nonImgContWrap_closing() +
                                  setHTML_offerUnit_href_afterWrap_closing() +
                                setHTML_offerUnit_href_closing(item) +
                             '</div>'
              );
            }
            //if reason
            else if(categoryName.indexOf('reason') > -1){
              return (
                '<li class="reason_unit responsiveFontSizeX99 ' + categoryName + '">' +
                  setHTML_reasonsToBuy_tagline(item) +
                '</li>'
              );
            }
            */
            /// +++++ /DOD templates +++++ ///

          /// +++++ Computer Gaming Sale +++++ ///

            //if liveTimerOffer
             else if(categoryName.indexOf('liveTimerOffer') > -1) {
              return (
                '<div class="liveTimerOffers responsiveFontSizeX99 ' + categoryName + '"' +
                             '>' +
                              set_SoldOUt_ModuleX99(item) +
                              setHTML_offerUnit_href(item) +
                                setHTML_offerUnit_imgWrap_sdPlusInc_rel(item) +
                                setHTML_offerUnit_nonImgContWrap() +
                                  setHTML_offerUnit_discountWrap(item) +
                                  setHTML_offerUnit_title(item) +
                                  setHTML_offerUnit_ratingWrap(item) +
                                  setHTML_offerUnit_priceTaglineWrap_rel(item) +
                                setHTML_offerUnit_nonImgContWrap_closing() +
                              setHTML_offerUnit_href_closing(item) +
                             '</div>'
              );
            }
            //if upcoming
            else if(categoryName.indexOf('upcomingOffer') > -1){
              return (
                '<div class="offerUnit_offerWrap responsiveFontSizeX99 ' + categoryName + '"' +
                             '>' +
                                setHTML_offerUnit_imgWrap_sdPlusInc_rel(item) +
                                setHTML_offerUnit_nonImgContWrap() +
                                  setHTML_offerUpcoming_upcoming() +
                                  setHTML_offerUnit_title(item) +
                                setHTML_offerUnit_nonImgContWrap_closing() +
                             '</div>'
              );
            }
            //if featureDeals
            else if(categoryName.indexOf('featureDeals') > -1) {
              return (
                '<div class="liveTimerOffers responsiveFontSizeX99 ' + categoryName + '"' +
                            '>' +
                              set_SoldOUt_ModuleX99(item) +
                              setHTML_offerUnit_href(item) +
                                setHTML_offerUnit_imgWrap_sdPlusInc_rel(item) +
                                setHTML_offerUnit_nonImgContWrap() +
                                  setHTML_offerUnit_discountWrap(item) +
                                  setHTML_offerUnit_title(item) +
                                  setHTML_offerUnit_ratingWrap(item) +
                                  setHTML_offerUnit_priceTaglineWrap_rel(item) +
                                setHTML_offerUnit_nonImgContWrap_closing() +
                              setHTML_offerUnit_href_closing(item) +
                             '</div>'
              );
            }
            //if bestOfBrands
            else if(categoryName.indexOf('bestOfBrands') > -1) {
              return (
                '<li class="offerUnits_4_2 offerUnit_normalOffer hoverStyleX99 responsiveFontSizeX99 ' + categoryName + '"' +'>' +
                              set_SoldOUt_ModuleX99(item) +
                                setHTML_offerUnit_href(item) +
                                  setHTML_offerUnit_href_afterWrap()+
                                    setHTML_offerUnit_imgWrap_sdPlusInc_rel(item) +
                                    setHTML_offerUnit_nonImgContWrap() +
                                          setHTML_offerUnit_priceTaglineWrap_rel(item) +
                                    setHTML_offerUnit_nonImgContWrap_closing() +
                                  setHTML_offerUnit_href_afterWrap_closing() +
                                setHTML_offerUnit_href_closing(item) +
                             '</li>'
              );
            }
            /// +++++ quickLinks +++++ ///
            //if default quickLinks
            else if(categoryName.indexOf('quickLinks') > -1){
              return (
                '<li class="offerUnits_4_2 offerUnit_normalOffer responsiveFontSizeX99 hoverStyleX99 ' + categoryName + '"' +
                             '>' +
                                setHTML_offerUnit_href(item) +
                                          setHTML_QuickLinkOffers_tagline(item)+
                                setHTML_offerUnit_href_closing(item) +
                             '</li>'
              );
            }

            //if image quickLinks
            else if(categoryName.indexOf('quickLinksImages') > -1){
              return (
                '<li class="offerUnits_4_2 offerUnit_normalOffer responsiveFontSizeX99 hoverStyleX99 ' + categoryName + '"' +
                             '>' +
                                setHTML_offerUnit_href(item) +
                                          setHTML_offerUnit_imgWrap_sdPlusInc_rel(item) +
                                setHTML_offerUnit_href_closing(item) +
                             '</li>'
              );
            }
            /// +++++ /quickLinks +++++ ///

        /// +++++ Computer Gaming Sale +++++ ///


            //if vwAll
            else if(categoryName.indexOf('vwAll') > -1){
              return (
                '<div class="offerUnit_vwAll responsiveFontSizeX99 ' + categoryName + '"' +'>' +
                                setHTML_offerUnit_href(item) +
                                  "View All" +
                                setHTML_offerUnit_href_closing(item) +
                             '</div>'
              );
            }
            // /if vwAll

            /// +++++ default li offer unit +++++ ///
            //if not follow default template
            else {
              return (
                '<li class="offerUnits_4_2 offerUnit_normalOffer responsiveFontSizeX99 hoverStyleX99 ' + categoryName + '"' +
                              '>' +
                              set_SoldOUt_ModuleX99(item) +
                                setHTML_offerUnit_href(item) +
                                  setHTML_offerUnit_href_afterWrap()+
                                    setHTML_offerUnit_imgWrap_sdPlusInc_rel(item) +
                                    setHTML_offerUnit_nonImgContWrap() +
                                          setHTML_offerUnit_discountWrap(item) +
                                          setHTML_offerUnit_title(item) +
                                          setHTML_offerUnit_ratingWrap(item) +
                                          setHTML_offerUnit_priceTaglineWrap_rel(item) +
                                          //saveAmt
                                          setHTML_wrap_saveAmt(item) +
                                    setHTML_offerUnit_nonImgContWrap_closing() +
                                  setHTML_offerUnit_href_afterWrap_closing() +
                                setHTML_offerUnit_href_closing(item) +
                             '</li>'
              );
            }
            /// +++++ /default li offer unit +++++ ///

        }).join('');
        var unit_htmlContent = offer_htmlContent;
        finalHTMLContent[index].push(unit_htmlContent);
    });

    //setting the html to dom
    fastdom.mutate(function() {
      for(var i=0; i<finalHTMLContent.length; i++){
          var wrapper_dom = document.getElementById(dom_categoryNames_arr[i]);
          wrapper_dom.innerHTML = finalHTMLContent[i].join('');
      }
      //init blazy
      var blazy = new Blazy({
        loadInvisible: true
      });
    });

  };

  return public;

  ///* * *start csv fragmentTemplates utilities
  function setHTML_offerUpcoming_upcoming(){
    return (
      '<div class="offerUpcoming_upcoming"> upcoming deal </div>'
    );
  }

  //setHTML_reasonsToBuy_tagline
  function setHTML_reasonsToBuy_tagline(item) {
    return '<div class="reasonsToBuy_tagline">' + item.tagLine + '</div>';
  }

  //setHTML_QuickLinkOffers_tagline
  function setHTML_QuickLinkOffers_tagline(item) {
    return '<div class="QuickLinkOffers_tagline">' + item.tagLine + '</div>';
  }

  //*taglineRating Module
  function setHTML_offerUnit_priceTaglineWrap_rel(item) {
    var offerUnit_priceTaglineWrap_rel = '<div class="offerUnit_priceTaglineWrap_rel">';
    var tagLineFragments = '<div class="offerUnit_taglineWrap"><div class="offerUnit_tagline">' + item.tagLine + '</div></div>';
    /*var priceContXFragments = '<div class="offerUnit_priceWrap"><span class="offerUnit_priceWrapAll">Rs.' + '<span class="offerUnit_price">' + item._price + '</span>&nbsp; &nbsp;</span>' + '<span class="offerUnit_displayPrice"><span>Rs.&nbsp;</span>' + item._displayPrice + '</span>' + '</div>';*/
    var priceContXFragments =
'<div class="offerUnit_priceWrap"><span class="offerUnit_priceWrapAll"><span class="offerUnit_price">Rs.&nbsp;' + item._price + '</span>&nbsp; &nbsp;' +
		'<span class="offerUnit_displayPrice">Rs.&nbsp;' +
			item._displayPrice +
		'</span></span>' +
'</div>';

    var displayPriceOnlyFragments =
  '<div class="offerUnit_priceWrap"><span class="offerUnit_priceWrapAll"><span class="offerUnit_displayPrice">Rs.&nbsp;' +
  			item._displayPrice +
  		'</span></span>' +
  '</div>';

    function priceOrTagline_dom(item) {
        if (item.tagLine) {
            return (offerUnit_priceTaglineWrap_rel + tagLineFragments + '</div>');
        }
        if (item._price || item._displayPrice) {
            if(item._price == item._displayPrice){
              //console.log(item.pogId, ' has same MRP & SP!');
              return (offerUnit_priceTaglineWrap_rel + displayPriceOnlyFragments + '</div>');
            }
            else {
                return (offerUnit_priceTaglineWrap_rel + priceContXFragments + '</div>');
            }
        } else {
            return (offerUnit_priceTaglineWrap_rel + '</div>');
        }
    }
    return priceOrTagline_dom(item); //
}

  //setHTML_wrap_saveAmt
  function setHTML_wrap_saveAmt(item){
    var wrap_saveAmt = '<div class="wrap_saveAmt">';
    var wrap_saveAmt_closing = '</div>';

    if(item._displayPrice < item._price){
      var saveAmt = item._price - item._displayPrice;
      return (
        wrap_saveAmt +'You save Rs. ' + '<span>' + saveAmt + '</span>' + wrap_saveAmt_closing
      );
    }
    else {
      return (
        wrap_saveAmt + wrap_saveAmt_closing
      );
    }
  }


  function setHTML_offerUnit_href_afterWrap(){
    return '<div class="offerUnit_href_afterWrap">';
  }
  function setHTML_offerUnit_href_afterWrap_closing(){
    return '</div>';
  }

  function setHTML_offerUnit_nonImgContWrap(){
    return '<div class="offerUnit_nonImgContWrap">';
  }
  function setHTML_offerUnit_nonImgContWrap_closing(){
    return '</div>';
  }

  function setHTML_wrapCenterCont(){
    return '<div class="wrapCenterCont">';
  }
  function setHTML_wrapCenterCont_closing(){
    return '</div>';
  }

  function setHTML_centeredContX(){
    return '<div class="centeredContX">';
  }
  function setHTML_centeredContX_closing(){
    return '</div>';
  }

  //setImage
  function setHTML_offerUnit_imgWrap_sdPlusInc_rel(item){
    if(!item.offerName || item.offerName === null){
      item.offerName = '';
    }
    if(item._sdGold === true){
      console.log();
      return (
        '<div class="offerUnit_imgWrap_sdPlusInc_rel"><div class="offerUnit_sdPlusWrap_abs"></div>' +
        '<img class="offerUnit_img b-lazy" data-src="' + item.offerImageUrl + '" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="'+ item.offerName +'" />' +
        '</div>'
      );
    }
    else {
      return (
        '<div class="offerUnit_imgWrap_sdPlusInc_rel">' +
        '<img class="offerUnit_img OfferImg b-lazy" data-src="' + item.offerImageUrl + '" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="'+ item.offerName +'" />' +
        '</div>'
      );
    }
  }

  function setHTML_offerUnit_imgWrapOnly(item){
    if(!item.offerName || item.offerName === null){
      item.offerName = 'Image';
    }
    return (
      '<div class="offerUnit_imgWrapOnly">' +
      '<img class="offerUnit_img OfferImg b-lazy" data-src="' + item.offerImageUrl + '" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="'+ item.offerName +'" />' +
      '</div>'
    );
    /*
    if(!item){
      console.log('item not found!');
      return;
    }
    else {
      return (
        '<div class="offerUnit_imgWrapOnly">' +
        '<img class="offerUnit_img OfferImg b-lazy" data-src="' + item.offerImageUrl + '" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="'+ item.offerName +'" />' +
        '</div>'
      );
    }
    */
  }

   //*aLink Module
   function setHTML_offerUnit_href(item) {
       if(!item){
           return;
       }
       var aLink_Wrap = '<a target="_blank" href="' + item.offerPageUrl + '" class="offerUnit_href">';
       if (item.offerPageUrl) {
           return aLink_Wrap;
       } else {
           return '';
       }
   }
   function setHTML_offerUnit_href_closing(item) {
       if (item.offerPageUrl) {
           return '</a>';
       } else {
           return '';
       }
   }
   //**title
   function setHTML_offerUnit_title(item) {
       return '<div class="offerUnit_title twoLine_TitleX99">' + item.offerName + '</div>';
   }
   //**rating
   function setHTML_offerUnit_ratingWrap(item) {
       var ifRatingDefined_dom_V = ifRatingDefined_dom(item);
       var setRating_V = setRating(item);
       var rating_Wrap = '<div class="offerUnit_ratingWrap">';
       var ratingFragments = '<div class="offerUnit_rating_rel"><div class="ratingBG_disabled"></div>' + '<div class="ratingBG_active" style="width:' + setRating_V + 'px;"></div></div>';
       var reviewsFragments = '<span class="numberRevsX">(' + item._noOfReviews + ')</span>';

       function ifRatingDefined_dom(item) {
           if (item._avgRating) {
               if (item._noOfReviews) {
                   ratingFragments += reviewsFragments;
               }
               return (rating_Wrap + ratingFragments + '</div>');
           } else {
               return (rating_Wrap + '</div>');
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
   }

   //**discount
    function setHTML_offerUnit_discountWrap(item) {
       var discount = item._discount;
       var OfferDiscount_Wrap = '<div class="offerUnit_discountWrap">';
       var OfferDiscount_Discount_Wrap = '<div class="offerUnit_discount">' + discount + '% Off </div>';

       if(!discount || discount === null){
         return _hideDiscount();
       }

        function _showDiscount(){
           return (OfferDiscount_Wrap + OfferDiscount_Discount_Wrap + '</div>');
        }
        function _hideDiscount(){
           return (OfferDiscount_Wrap + '</div>');
        }

        function showDiscountUnless0_dom(item) {
             if (discount === 0) {
                 return _hideDiscount();
               }
             else {
               //dod conditional
               return _showDiscount();
             }
           }

      //If labelUrl matches refurbished/mobiles/tablets
      //Or if item.priceSlab == "true"
       function dod_showDiscountUnless0_dom(item) {
         var item_priceSlab = item.priceSlab.toLowerCase();
         if (discount === 0) {
             return _hideDiscount();
           }
         if(discount < 10){
           if(updateDiscount_IfMatchX(item) || item_priceSlab=="true"){
               return _showDiscount();
           }
           else {
             return _hideDiscount();
           }
         }
         else {
           return _showDiscount();
         }
       }

        return dod_showDiscountUnless0_dom(item); //
    }

    //start updateDiscount_IfMatchX
    function updateDiscount_IfMatchX(item) {
      if(!item) {
        return false;
      }
      var labelUrl = item._labelUrl;
      if(!labelUrl) {
        return false;
      }
     if (labelUrl.match(/refurbished|mobiles-mobile-phones|mobiles-tablets/g)) {
       //console.log('found');
       //console.log('labelUrl: ', labelUrl);
       return true;
     } else {
       //console.log('not found!');
     }
    }
    //end updateDiscount_IfMatchX

   //**if soldOut
   function set_SoldOUt_ModuleX99(item){
        var soldOut_Wrap = '<div class="offerUnit_Soldout"><div class="offerUnit_Soldout_btn">SOLD OUT</div></div>';
        if (item._soldOut) {
            return soldOut_Wrap;
        } else {
            return '';
        }
   }

   ///* * * end csv fragmentTemplates utilities
   //end of rest of utilities
})();


/* exposing to Global for inPage use */
window.AjaxPageApp = AjaxPageApp;

},{"./modules/AjaxStart.js":2,"./modules/FullDate":3,"./modules/MobPlatform_M":4,"./modules/TimerX99":5,"./modules/socialShareX_Module":6,"Blazy":7,"es6-promise":8,"fastdom":9}],2:[function(require,module,exports){
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

},{"es6-promise":8}],3:[function(require,module,exports){
var FullDate= (function(){
  var public = {};
  var _d = new Date();
  var date_today= _d.getDate();
      data_today = ('0' + date_today).slice(-2);
  var month_today = _d.getMonth() + 1;
      month_today = ('0' + month_today).slice(-2);
  var year_today = '2016';
  public.today_mmddyyyy = month_today + '/' + date_today + '/' + year_today;
  //expose FullDate.today_mmddyyyy
  return public;
})();

module.exports = FullDate;

},{}],4:[function(require,module,exports){
var MobPlatform_M = (function(){
    var public = {};
    public.mobileSite_running = false;
    public.mobileSite_TrueX999 = function(){
        var currURLX = window.location;
        var mob_preURL_str = 'm.snapdeal.com';
        currURLX = String(currURLX);
        public.mobileSite_running = (currURLX.indexOf(mob_preURL_str) > 0)? true: false;
        return public.mobileSite_running;
    };
    return public;
})();

module.exports = MobPlatform_M;

},{}],5:[function(require,module,exports){
/* start TimerX99 module and fn */
var TimerX99 = (function() {
    var priv8eMX99 = {};
    priv8eMX99._initCountDown = function(id, endTime, show) {
        _getRemainingTime = function(endTime) {
            var t = Date.parse(endTime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        };
        if (!id || id === null) {
            console.log('ID not found in DOM!');
            return;
        }
        var timerDomEle = document.getElementById(id);
        if (show == 'false' || show === false) {
            timerDomEle.style.display = 'none';
        } else {

          timerDomEle.style.display = 'block';
          /* hide timerMainWrapperDOM */
          //var get_domTargetID = document.getElementById(domTargetID);
          var this_timerMainWrapperDOM = findParent_firstMatchClassName(timerDomEle, 'timerX99_UnitWrap_rel');
          if(this_timerMainWrapperDOM !== null){
            //console.log('this_timerMainWrapperDOM: ', this_timerMainWrapperDOM );
            this_timerMainWrapperDOM.style.opacity = 1;
          }
          /* /hide timerMainWrapperDOM */
        }
        var dayV_Wrap = timerDomEle.querySelector('.dayV_timerX');
        var hrV_Wrap = timerDomEle.querySelector('.hrV_timerX');
        var minV_Wrap = timerDomEle.querySelector('.minV_timerX');
        var secV_Wrap = timerDomEle.querySelector('.secV_timerX');

        function updateClock() {
            var t = _getRemainingTime(endTime);
            dayV_Wrap.innerHTML = ('0' + t.days).slice(-2);
            hrV_Wrap.innerHTML = ('0' + t.hours).slice(-2);
            minV_Wrap.innerHTML = ('0' + t.minutes).slice(-2);
            secV_Wrap.innerHTML = ('0' + t.seconds).slice(-2);
            if (t.total <= 0) {
                clearInterval(timeInterval);
                if (timerDomEle) {
                    console.log('clearInterval TimerX99');
                    timerDomEle.style.display = 'none';
                } else {
                    console.log('ID not found in DOM!');
                }
                //console.log('timer completed');
                window.location.reload(true);
            }
        }
        updateClock();
        var timeInterval = setInterval(updateClock, 1000);
    };
    ///* * *public methods
    var publicMX99 = {};
    publicMX99.initCountDwnX99 = function(startEnd_TargetID_typeArr) {
        if (startEnd_TargetID_typeArr instanceof Array) {
            if (startEnd_TargetID_typeArr.length < 1) {
                console.log('define settings in arg Array');
            } else {
                for (var i = 0, len = startEnd_TargetID_typeArr.length; i < len; i++) {
                    var this_startEnd = startEnd_TargetID_typeArr[i];
                    var startDate = this_startEnd[0] + ' GMT+0530';
                    var endDate = this_startEnd[1] + ' GMT+0530';
                    var domTargetID = this_startEnd[2];
                    var callback = this_startEnd[3];
                    var show = this_startEnd[4];
                    if (!isValidDate(startDate)) {
                        console.log('invalid date format, it must be MM/DD/YYYY');
                        return;
                    }
                    if (!isValidDate(endDate)) {
                        console.log('invalid date format, it must be MM/DD/YYYY');
                        return;
                    }
                    if (callback === null) {
                        console.log('no callback defined');
                    }
                    if (show == 'false' || show === false) {
                        console.log('hide this timer');
                    } else if (!show || show.length < 1) {
                        //console.log('show undefined but show timer anyway');
                    } else {
                        console.log('show this timer');
                    }
                    var startDate_ms = new Date(startDate);
                    var endDate_ms = new Date(endDate);
                    var currDate_ms = new Date();
                    if (startDate_ms > endDate_ms) {
                        console.log('error in startDate, startDate is more than end Date');
                    }
                    if (startDate_ms < currDate_ms) {
                        //console.log('startDate: ' + startDate);
                    }
                    if (endDate_ms > currDate_ms && currDate_ms >= startDate_ms) {
                        priv8eMX99._initCountDown(domTargetID, endDate, show);
                        if (callback) {
                            if (!isFunction(callback)) {
                                console.log('callback must be a function expression like this:' + '\n' + 'function myCallback(){ //do something }');
                                return;
                            } else {
                                console.log('running callback:');
                                callback();
                            }
                        }
                    }
                }
            }
        } else {
            console.log('arg must be an Array');
        }
    };
    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }
    function isValidDate(date) {
        var d = date;
        var i_fSpace = d.indexOf(' ');
        var data_str = d.substr(0, i_fSpace);
        var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(data_str);
        if (matches === null) return false;
        var d_ = matches[2];
        var m = matches[1] - 1;
        var y = matches[3];
        var composedDate = new Date(y, m, d_);
        return composedDate.getDate() == d_ && composedDate.getMonth() == m && composedDate.getFullYear() == y;
    }
    publicMX99.all_timerOptions_ajax = [];
    publicMX99.create_all_timerOptions = function (data){
      data.forEach(function(item){
      var this_targetTimerID = item.categoryName + '_timer';
      //categoryNames of TimerOffers MUST include the string 'TimerOffer'
      //example "liveTimerOffer_01"
      if(this_targetTimerID.indexOf('TimerOffer') < 0){
        //console.log('no timerOffers found!');
        return;
      }
      if(
          item.startTimeHrs === 0 &&
          item.startTimeMin === 0 &&
          item.endTimeHrs === 23 &&
          item.endTimeMin === 59
        ){
          console.log("don't run createTimerOptions, return");
          return;
        }

      var this_startTimeHrs = ('0' + item.startTimeHrs).slice(-2);
      var this_startTimeMin = ('0' + item.startTimeMin).slice(-2);
      var this_endTimeHrs = ('0' + item.endTimeHrs).slice(-2);
      var this_endTimeMin = ('0' + item.endTimeMin).slice(-2);
      var this_item_startTime = FullDate.today_mmddyyyy + ' ' + this_startTimeHrs + ':' + this_startTimeMin + ':00';
      var this_item_endTime = FullDate.today_mmddyyyy + ' ' + this_endTimeHrs + ':' + this_endTimeMin + ':00';
      var newArr_option = [];
      newArr_option.push(this_item_startTime, this_item_endTime, this_targetTimerID );
      if(!TimerX99.all_timerOptions_ajax || !TimerX99){
        console.log('TimerX99 Module missing!');
      }
      TimerX99.all_timerOptions_ajax.push(newArr_option);
      //console.log('allTimerOptions: ', newArr_option);
    });
  };
    return publicMX99;
    //helper
    function findParent_firstMatchClassName(el, className) {
      while (el.parentNode) {
          el = el.parentNode;
          if (el.className === className)
                return el;
      }
      return null;
    }
})();
//TimerX99.initCountDwnX99(startEnd_TargetID_typeArr);

module.exports = TimerX99;

},{}],6:[function(require,module,exports){
var MobPlatform_M = require('./MobPlatform_M');

var socialShareX_Module = (function() {
  var mainWrapperX99 = document.getElementsByClassName('shareX99_wrapper')[0];
  var ele = mainWrapperX99.querySelectorAll('.shareIconX_icoWrapper li');
  var whatsappX = mainWrapperX99.querySelector('li.whatsappX');
    //check if mobile and show/hide whatsapp
    var mobileSite_TrueX999_var = MobPlatform_M.mobileSite_TrueX999();
    //console.log('mobileSite_running: ' + mobileSite_TrueX999_var);
    if(mobileSite_TrueX999_var){
      console.log('mobile site running, show whatsapp');
      whatsappX.style.display = 'block';
      }
    else {
      whatsappX.style.display = 'none';
    }
    //var links
    var currURLX = window.location.href;
    var preURLs = {
        'facebookX': 'https://www.facebook.com/sharer.php?u=',
        'twitterX': 'https://twitter.com/intent/tweet?url=',
        'googleplusX': 'https://plus.google.com/share?url=',
        'pinterestX': 'https://pinterest.com/pin/create/bookmarklet/?url=',
        'whatsappX': 'whatsapp://send?text='
    };
    var finalURL = '';
    //click events
    for(var i=0; i< ele.length; i++){
      ele[i].addEventListener('click', function(e) {
        e.preventDefault();
        var finalURL = '',
            ele = e.target,
            twHastag = ele.getAttribute('data-hashtag');
        if (ele.classList.contains('facebookX')) {
            finalURL = preURLs.facebookX + currURLX;
        } else if (ele.classList.contains('twitterX')) {
            if (twHastag) {
                finalURL = preURLs.twitterX + currURLX + '&hashtags=' + twHastag;
            } else {
                finalURL = preURLs.twitterX + currURLX;
            }
        } else if (ele.classList.contains('googleplusX')) {
            finalURL = preURLs.googleplusX + currURLX;
        } else if (ele.classList.contains('pinterestX')) {
            finalURL = preURLs.pinterestX + currURLX;
        }
        else if (ele.classList.contains('whatsappX')) {
            finalURL = preURLs.whatsappX + currURLX;
        }
        console.log('finalURL: ',finalURL);
        var W_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var W_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        window.open(finalURL, 'shareWindow', 'height=450, width=550, top=' + (W_height / 2 - 275) + ', left=' + (W_width / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
    //end of click event
    });
    //end of for loop
    }
})();

module.exports = socialShareX_Module;

},{"./MobPlatform_M":4}],7:[function(require,module,exports){
/*!
  hey, [be]Lazy.js - v1.6.2 - 2016.05.09
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
;
(function(root, blazy) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register bLazy as an anonymous module
        define(blazy);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = blazy();
    } else {
        // Browser globals. Register bLazy on window
        root.Blazy = blazy();
    }
})(this, function() {
    'use strict';

    //private vars
    var _source, _viewport, _isRetina, _attrSrc = 'src',
        _attrSrcset = 'srcset';

    // constructor
    return function Blazy(options) {
        //IE7- fallback for missing querySelectorAll support
        if (!document.querySelectorAll) {
            var s = document.createStyleSheet();
            document.querySelectorAll = function(r, c, i, j, a) {
                a = document.all, c = [], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
                for (i = r.length; i--;) {
                    s.addRule(r[i], 'k:v');
                    for (j = a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
                    s.removeRule(0);
                }
                return c;
            };
        }

        //options and helper vars
        var scope = this;
        var util = scope._util = {};
        util.elements = [];
        util.destroyed = true;
        scope.options = options || {};
        scope.options.error = scope.options.error || false;
        scope.options.offset = scope.options.offset || 100;
        scope.options.success = scope.options.success || false;
        scope.options.selector = scope.options.selector || '.b-lazy';
        scope.options.separator = scope.options.separator || '|';
        scope.options.container = scope.options.container ? document.querySelectorAll(scope.options.container) : false;
        scope.options.errorClass = scope.options.errorClass || 'b-error';
        scope.options.breakpoints = scope.options.breakpoints || false; // obsolete
        scope.options.loadInvisible = scope.options.loadInvisible || false;
        scope.options.successClass = scope.options.successClass || 'b-loaded';
        scope.options.validateDelay = scope.options.validateDelay || 25;
        scope.options.saveViewportOffsetDelay = scope.options.saveViewportOffsetDelay || 50;
        scope.options.srcset = scope.options.srcset || 'data-srcset';
        scope.options.src = _source = scope.options.src || 'data-src';
        _isRetina = window.devicePixelRatio > 1;
        _viewport = {};
        _viewport.top = 0 - scope.options.offset;
        _viewport.left = 0 - scope.options.offset;


        /* public functions
         ************************************/
        scope.revalidate = function() {
            initialize(this);
        };
        scope.load = function(elements, force) {
            var opt = this.options;
            if (elements.length === undefined) {
                loadElement(elements, force, opt);
            } else {
                each(elements, function(element) {
                    loadElement(element, force, opt);
                });
            }
        };
        scope.destroy = function() {
            var self = this;
            var util = self._util;
            if (self.options.container) {
                each(self.options.container, function(object) {
                    unbindEvent(object, 'scroll', util.validateT);
                });
            }
            unbindEvent(window, 'scroll', util.validateT);
            unbindEvent(window, 'resize', util.validateT);
            unbindEvent(window, 'resize', util.saveViewportOffsetT);
            util.count = 0;
            util.elements.length = 0;
            util.destroyed = true;
        };

        //throttle, ensures that we don't call the functions too often
        util.validateT = throttle(function() {
            validate(scope);
        }, scope.options.validateDelay, scope);
        util.saveViewportOffsetT = throttle(function() {
            saveViewportOffset(scope.options.offset);
        }, scope.options.saveViewportOffsetDelay, scope);
        saveViewportOffset(scope.options.offset);

        //handle multi-served image src (obsolete)
        each(scope.options.breakpoints, function(object) {
            if (object.width >= window.screen.width) {
                _source = object.src;
                return false;
            }
        });

        // start lazy load
        setTimeout(function() {
            initialize(scope);
        }); // "dom ready" fix

    };


    /* Private helper functions
     ************************************/
    function initialize(self) {
        var util = self._util;
        // First we create an array of elements to lazy load
        util.elements = toArray(self.options.selector);
        util.count = util.elements.length;
        // Then we bind resize and scroll events if not already binded
        if (util.destroyed) {
            util.destroyed = false;
            if (self.options.container) {
                each(self.options.container, function(object) {
                    bindEvent(object, 'scroll', util.validateT);
                });
            }
            bindEvent(window, 'resize', util.saveViewportOffsetT);
            bindEvent(window, 'resize', util.validateT);
            bindEvent(window, 'scroll', util.validateT);
        }
        // And finally, we start to lazy load.
        validate(self);
    }

    function validate(self) {
        var util = self._util;
        for (var i = 0; i < util.count; i++) {
            var element = util.elements[i];
            if (elementInView(element) || hasClass(element, self.options.successClass)) {
                self.load(element);
                util.elements.splice(i, 1);
                util.count--;
                i--;
            }
        }
        if (util.count === 0) {
            self.destroy();
        }
    }

    function elementInView(ele) {
        var rect = ele.getBoundingClientRect();
        return (
            // Intersection
            rect.right >= _viewport.left && rect.bottom >= _viewport.top && rect.left <= _viewport.right && rect.top <= _viewport.bottom
        );
    }

    function loadElement(ele, force, options) {
        // if element is visible, not loaded or forced
        if (!hasClass(ele, options.successClass) && (force || options.loadInvisible || (ele.offsetWidth > 0 && ele.offsetHeight > 0))) {
            var dataSrc = ele.getAttribute(_source) || ele.getAttribute(options.src); // fallback to default 'data-src'
            if (dataSrc) {
                var dataSrcSplitted = dataSrc.split(options.separator);
                var src = dataSrcSplitted[_isRetina && dataSrcSplitted.length > 1 ? 1 : 0];
                var isImage = equal(ele, 'img');
                // Image or background image
                if (isImage || ele.src === undefined) {
                    var img = new Image();
                    // using EventListener instead of onerror and onload
                    // due to bug introduced in chrome v50 
                    // (https://productforums.google.com/forum/#!topic/chrome/p51Lk7vnP2o)
                    var onErrorHandler = function() {
                        if (options.error) options.error(ele, "invalid");
                        addClass(ele, options.errorClass);
                        unbindEvent(img, 'error', onErrorHandler);
                        unbindEvent(img, 'load', onLoadHandler);
                    };
                    var onLoadHandler = function() {
                        // Is element an image
                        if (isImage) {
                            setSrc(ele, src); //src
                            handleSource(ele, _attrSrcset, options.srcset); //srcset
                            //picture element
                            var parent = ele.parentNode;
                            if (parent && equal(parent, 'picture')) {
                                each(parent.getElementsByTagName('source'), function(source) {
                                    handleSource(source, _attrSrcset, options.srcset);
                                });
                            }
                        // or background-image
                        } else {
                            ele.style.backgroundImage = 'url("' + src + '")';
                        }
                        itemLoaded(ele, options);
                        unbindEvent(img, 'load', onLoadHandler);
                        unbindEvent(img, 'error', onErrorHandler);
                    };
                    bindEvent(img, 'error', onErrorHandler);
                    bindEvent(img, 'load', onLoadHandler);
                    setSrc(img, src); //preload
                } else { // An item with src like iframe, unity, simpelvideo etc
                    setSrc(ele, src);
                    itemLoaded(ele, options);
                }
            } else {
                // video with child source
                if (equal(ele, 'video')) {
                    each(ele.getElementsByTagName('source'), function(source) {
                        handleSource(source, _attrSrc, options.src);
                    });
                    ele.load();
                    itemLoaded(ele, options);
                } else {
                    if (options.error) options.error(ele, "missing");
                    addClass(ele, options.errorClass);
                }
            }
        }
    }

    function itemLoaded(ele, options) {
        addClass(ele, options.successClass);
        if (options.success) options.success(ele);
        // cleanup markup, remove data source attributes
        ele.removeAttribute(options.src);
        each(options.breakpoints, function(object) {
            ele.removeAttribute(object.src);
        });
    }

    function setSrc(ele, src) {
        ele[_attrSrc] = src;
    }

    function handleSource(ele, attr, dataAttr) {
        var dataSrc = ele.getAttribute(dataAttr);
        if (dataSrc) {
            ele[attr] = dataSrc;
            ele.removeAttribute(dataAttr);
        }
    }

    function equal(ele, str) {
        return ele.nodeName.toLowerCase() === str;
    }

    function hasClass(ele, className) {
        return (' ' + ele.className + ' ').indexOf(' ' + className + ' ') !== -1;
    }

    function addClass(ele, className) {
        if (!hasClass(ele, className)) {
            ele.className += ' ' + className;
        }
    }

    function toArray(selector) {
        var array = [];
        var nodelist = document.querySelectorAll(selector);
        for (var i = nodelist.length; i--; array.unshift(nodelist[i])) {}
        return array;
    }

    function saveViewportOffset(offset) {
        _viewport.bottom = (window.innerHeight || document.documentElement.clientHeight) + offset;
        _viewport.right = (window.innerWidth || document.documentElement.clientWidth) + offset;
    }

    function bindEvent(ele, type, fn) {
        if (ele.attachEvent) {
            ele.attachEvent && ele.attachEvent('on' + type, fn);
        } else {
            ele.addEventListener(type, fn, false);
        }
    }

    function unbindEvent(ele, type, fn) {
        if (ele.detachEvent) {
            ele.detachEvent && ele.detachEvent('on' + type, fn);
        } else {
            ele.removeEventListener(type, fn, false);
        }
    }

    function each(object, fn) {
        if (object && fn) {
            var l = object.length;
            for (var i = 0; i < l && fn(object[i], i) !== false; i++) {}
        }
    }

    function throttle(fn, minDelay, scope) {
        var lastCall = 0;
        return function() {
            var now = +new Date();
            if (now - lastCall < minDelay) {
                return;
            }
            lastCall = now;
            fn.apply(scope, arguments);
        };
    }
});
},{}],8:[function(require,module,exports){
(function (process,global){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   3.3.0
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  return function () {
    vertxNext(flush);
  };
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = r('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

polyfill();
// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":10}],9:[function(require,module,exports){
!(function(win) {

/**
 * FastDom
 *
 * Eliminates layout thrashing
 * by batching DOM read/write
 * interactions.
 *
 * @author Wilson Page <wilsonpage@me.com>
 * @author Kornel Lesinski <kornel.lesinski@ft.com>
 */

'use strict';

/**
 * Mini logger
 *
 * @return {Function}
 */
var debug = 0 ? console.log.bind(console, '[fastdom]') : function() {};

/**
 * Normalized rAF
 *
 * @type {Function}
 */
var raf = win.requestAnimationFrame
  || win.webkitRequestAnimationFrame
  || win.mozRequestAnimationFrame
  || win.msRequestAnimationFrame
  || function(cb) { return setTimeout(cb, 16); };

/**
 * Initialize a `FastDom`.
 *
 * @constructor
 */
function FastDom() {
  var self = this;
  self.reads = [];
  self.writes = [];
  self.raf = raf.bind(win); // test hook
  debug('initialized', self);
}

FastDom.prototype = {
  constructor: FastDom,

  /**
   * Adds a job to the read batch and
   * schedules a new frame if need be.
   *
   * @param  {Function} fn
   * @public
   */
  measure: function(fn, ctx) {
    debug('measure');
    var task = !ctx ? fn : fn.bind(ctx);
    this.reads.push(task);
    scheduleFlush(this);
    return task;
  },

  /**
   * Adds a job to the
   * write batch and schedules
   * a new frame if need be.
   *
   * @param  {Function} fn
   * @public
   */
  mutate: function(fn, ctx) {
    debug('mutate');
    var task = !ctx ? fn : fn.bind(ctx);
    this.writes.push(task);
    scheduleFlush(this);
    return task;
  },

  /**
   * Clears a scheduled 'read' or 'write' task.
   *
   * @param {Object} task
   * @return {Boolean} success
   * @public
   */
  clear: function(task) {
    debug('clear', task);
    return remove(this.reads, task) || remove(this.writes, task);
  },

  /**
   * Extend this FastDom with some
   * custom functionality.
   *
   * Because fastdom must *always* be a
   * singleton, we're actually extending
   * the fastdom instance. This means tasks
   * scheduled by an extension still enter
   * fastdom's global task queue.
   *
   * The 'super' instance can be accessed
   * from `this.fastdom`.
   *
   * @example
   *
   * var myFastdom = fastdom.extend({
   *   initialize: function() {
   *     // runs on creation
   *   },
   *
   *   // override a method
   *   measure: function(fn) {
   *     // do extra stuff ...
   *
   *     // then call the original
   *     return this.fastdom.measure(fn);
   *   },
   *
   *   ...
   * });
   *
   * @param  {Object} props  properties to mixin
   * @return {FastDom}
   */
  extend: function(props) {
    debug('extend', props);
    if (typeof props != 'object') throw new Error('expected object');

    var child = Object.create(this);
    mixin(child, props);
    child.fastdom = this;

    // run optional creation hook
    if (child.initialize) child.initialize();

    return child;
  },

  // override this with a function
  // to prevent Errors in console
  // when tasks throw
  catch: null
};

/**
 * Schedules a new read/write
 * batch if one isn't pending.
 *
 * @private
 */
function scheduleFlush(fastdom) {
  if (!fastdom.scheduled) {
    fastdom.scheduled = true;
    fastdom.raf(flush.bind(null, fastdom));
    debug('flush scheduled');
  }
}

/**
 * Runs queued `read` and `write` tasks.
 *
 * Errors are caught and thrown by default.
 * If a `.catch` function has been defined
 * it is called instead.
 *
 * @private
 */
function flush(fastdom) {
  debug('flush');

  var writes = fastdom.writes;
  var reads = fastdom.reads;
  var error;

  try {
    debug('flushing reads', reads.length);
    runTasks(reads);
    debug('flushing writes', writes.length);
    runTasks(writes);
  } catch (e) { error = e; }

  fastdom.scheduled = false;

  // If the batch errored we may still have tasks queued
  if (reads.length || writes.length) scheduleFlush(fastdom);

  if (error) {
    debug('task errored', error.message);
    if (fastdom.catch) fastdom.catch(error);
    else throw error;
  }
}

/**
 * We run this inside a try catch
 * so that if any jobs error, we
 * are able to recover and continue
 * to flush the batch until it's empty.
 *
 * @private
 */
function runTasks(tasks) {
  debug('run tasks');
  var task; while (task = tasks.shift()) task();
}

/**
 * Remove an item from an Array.
 *
 * @param  {Array} array
 * @param  {*} item
 * @return {Boolean}
 */
function remove(array, item) {
  var index = array.indexOf(item);
  return !!~index && !!array.splice(index, 1);
}

/**
 * Mixin own properties of source
 * object into the target.
 *
 * @param  {Object} target
 * @param  {Object} source
 */
function mixin(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) target[key] = source[key];
  }
}

// There should never be more than
// one instance of `FastDom` in an app
var exports = win.fastdom = (win.fastdom || new FastDom()); // jshint ignore:line

// Expose to CJS & AMD
if ((typeof define)[0] == 'f') define(function() { return exports; });
else if ((typeof module)[0] == 'o') module.exports = exports;

})( window || this);

},{}],10:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1]);
