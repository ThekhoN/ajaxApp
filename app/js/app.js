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
