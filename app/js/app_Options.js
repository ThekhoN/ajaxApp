//default options for filterBy:'categoryNames' & setToEachID:true
/*var default_opts = {
  url: '',//always define
  parentWrapper_id: Query_dom_categoryNames.parentWrapper_id,//always define
  filterBy:'categoryNames',//'categoryNames' or 'price'
  setToEachID: true,//set to ids in dom ~ matching with categoryNames
  sortOrder: null,//categoryNames n their sequence: setToEachID:false
  priceRange_domID: null,
  TimerOffer: false
};*/

//default options setToParentWrapper for filterBy:'categoryNames' & setToEachID:false ~ setToParentWrapper MUST define sortOrder
/*var default_opts = {
  url: '',//always define
  parentWrapper_id: Query_dom_categoryNames.parentWrapper_id,//always define
  filterBy:'categoryNames',//'categoryNames' or 'price'
  setToEachID: false,//set to ids in dom ~ matching with categoryNames
  sortOrder: ['a299', 'a499', 'a799', 'a1299', 'a1999', 'a2999'],//categoryNames n their sequence: setToEachID:false
  priceRange_domID: null
};*/

//default options for filterBy:'price' & setToEachID:true ~ predefined DOM with ids matching the categoryNames
/*var default_opts = {
  url: '',  //always define
  parentWrapper_id: Query_dom_categoryNames.parentWrapper_id,//always define
  filterBy:'price',//'categoryNames' or 'price'
  setToEachID: true,//set to ids in dom ~ matching with categoryNames
  sortOrder: ['a299', 'a499', 'a799', 'a1299', 'a1999', 'a2999'],//categoryNames n their sequence: setToEachID:false
  priceRange_domID: [
                    //[min_price, max_price, id_dom],
                      [0, 299, 'a299'],
                      [299, 499, 'a499'],
                      [499, 799, 'a799'],
                      [799, 1299, 'a1299'],
                      [1299, 1999, 'a1999'],
                      [1999, 2999, 'a2999']
                    ],
  TimerOffer: false
};*/


///* * * setHTML Options
//SetHTML.init_setToMainWrapper
/*
var default_setToMainWrapper_opts = {
    htmlContent_multi_arr: [],
    wrapper_id: 'mainWrapperX_newX999'
};

public.init_setToMainWrapper = function(opts) {
  console.log('init_setToMainWrapper running!');
  if(!opts){
      opts = {};
  }

    var htmlContent_multi_arr = opts.htmlContent_multi_arr ? opts.htmlContent_multi_arr : default_setToMainWrapper_opts.htmlContent_multi_arr;
    var wrapper_id = opts.wrapper_id ? opts.wrapper_id : default_setToMainWrapper_opts.wrapper_id;

    var wrapper_dom = document.getElementById(wrapper_id);

    htmlContent_multi_arr.forEach(function(this_innerArr, index, array) {
        //console.log('categoryName: ' );
        if(!this_innerArr[0]){
          console.log('this_innerArr[] '+index + ' is undefined || not found in data');
          return false;
        }
        //console.log(this_innerArr[0].categoryName);
        var categoryName = this_innerArr[0].categoryName;
        this_innerArr[0].categoryName = this_innerArr[0].categoryName ? this_innerArr[0].categoryName : 'undefined';
        //console.log('categoryName: ' + categoryName);
        var ul_htmlContent = '<ul id="' + categoryName + '">';
        var close_ul_htmlContent = '</ul>';

        var li_htmlContent = this_innerArr.map(function(item) {
            var pogId = item.pogId;
            var vendorCode = item._vendorCode;
            var offers = item._offers;
            var catalogId;
            var supc;
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
            return (
              '<li class="OffersContentBoxLi"' +
                           'data-pogId="' + pogId + '"' +
                           'data-catalogid="' + catalogId + '"' +
                           'data-supc="' + supc + '"' +
                           'data-vendorcode="' + vendorCode + '"' + '>' +
                           set_SoldOUt_ModuleX99(item) +
                           set_OffersContTxt_Wrapper() +
                            set_aLink_ModuleX99(item) +
                              set_OfferImg_blazy(item) +
                              set_OffersContTxt_Wrapper() +
                                set_Discount_ModuleX99(item) +
                                set_OfferTitle_csv(item) +
                                set_StarRatings_and_Reviews_ModuleX99(item) +
                                set_Price_and_Tagline_ModuleX99(item) +
                              setClosing_OffersContTxt_Wrapper() +
                            setClosing_aLink_ModuleX99(item) +
                          setClosing_OffersContTxt_Wrapper() +
                           '</li>'
            );
        }).join('');
        var unit_htmlContent = setHTML_sectionX_unitStart(categoryName) + ul_htmlContent + li_htmlContent + close_ul_htmlContent + setHTML_sectionX_unitClose();
        finalHTMLContent.push(unit_htmlContent);

          //setHTML_sectionX_unitStart
          function setHTML_sectionX_unitClose(){
            return ('</div>'+'</div>'+'</div>');
          }

          function setHTML_sectionX_unitStart(categoryName){
            return ('<div class="sectionX" >'+
                '<div class="captionWrap_bgX99">'+
                  '<div class="captionX99">'+
                    '<h2>'+
                      '<span class="decorX">' + categoryName + '</span>'+
                    '</h2>'+
                  '</div>'+
                '</div>'+
                '<div class="offerCont_wrap">'+
                  '<div class="width_ContstraX relFontX resp_LiX">');
          }
    });
    //setting the html to dom
    finalHTMLContent = finalHTMLContent.join('');
    fastdom.mutate(function() {
      wrapper_dom.innerHTML = finalHTMLContent;
      //init blazy
      var blazy = new Blazy({
        loadInvisible: true
      });
    });
};
// /SetHTML.init_setToMainWrapper
*/

/*
var default_setToEachID_filterBy_price_opts = {
    htmlContent_multi_arr: [],
    wrapper_id: 'mainWrapperX_newX999',
};

public.init_setToEachID_filterBy_price = function(opts) {
  if(!opts){
      opts = {};
  }
  var htmlContent_multi_arr = opts.htmlContent_multi_arr ? opts.htmlContent_multi_arr : default_setToEachID_opts.htmlContent_multi_arr;
  console.log('init_setToEachID_filterBy_price running!');
  //console.log('GetInner_.priceRange_domID: ', GetInner_.priceRange_domID);
  var priceRange_domID = GetInner_.priceRange_domID;
  //console.log('inside init_setToEachID_filterBy_price priceRange_domID: ', priceRange_domID);


  console.log('finalHTMLContent len: ', finalHTMLContent.length);
  for(var i=0; i< priceRange_domID.length; i++){
    finalHTMLContent.push([]);
  }
  console.log('updated finalHTMLContent len: ', finalHTMLContent.length);

  htmlContent_multi_arr.forEach(function(this_innerArr, index, array) {
      console.log('this_innerArr: ', this_innerArr );
      if(!this_innerArr[0]){
        console.log('this_innerArr[] '+index + ' is undefined || not found in data');
        return false;
      }
      var categoryName = this_innerArr[0].categoryName;
      console.log('categoryName: ', categoryName);
      this_innerArr[0].categoryName = this_innerArr[0].categoryName ? this_innerArr[0].categoryName : 'undefined';

      var li_htmlContent = this_innerArr.map(function(item) {
          var pogId = item.pogId;
          var vendorCode = item._vendorCode;
          var offers = item._offers;
          var catalogId;
          var supc;
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
          return (
            '<li class="OffersContentBoxLi ' + categoryName + '"' +
                         'data-pogId="' + pogId + '"' +
                         'data-catalogid="' + catalogId + '"' +
                         'data-supc="' + supc + '"' +
                         'data-vendorcode="' + vendorCode + '"' + '>' +
                         set_SoldOUt_ModuleX99(item) +
                         set_OffersContTxt_Wrapper() +
                          set_aLink_ModuleX99(item) +
                            set_OfferImg_blazy(item) +
                            set_OffersContTxt_Wrapper() +
                              set_Discount_ModuleX99(item) +
                              set_OfferTitle_csv(item) +
                              set_StarRatings_and_Reviews_ModuleX99(item) +
                              set_Price_and_Tagline_ModuleX99(item) +
                            setClosing_OffersContTxt_Wrapper() +
                          setClosing_aLink_ModuleX99(item) +
                        setClosing_OffersContTxt_Wrapper() +
                         '</li>'
          );
      }).join('');
      var unit_htmlContent = li_htmlContent;
      finalHTMLContent[index].push(unit_htmlContent);
  });

  //setting the html to dom

  fastdom.mutate(function() {
    for(var i=0; i<finalHTMLContent.length; i++){
        var wrapper_dom = document.getElementById(priceRange_domID[i][2]);
        wrapper_dom.innerHTML = finalHTMLContent[i].join('');
    }
    //init blazy
    var blazy = new Blazy({
      loadInvisible: true
    });
  });
};
*/
