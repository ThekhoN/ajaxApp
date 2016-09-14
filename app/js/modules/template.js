///* * *start csv fragmentTemplates utilities
 //csvTemplatizeCommon
 var csvTemplatize = function(item){
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
         '<div class="OffersContentBox">' +
           set_aLink_ModuleX99(item) +
           set_OfferImg(item) +
           set_OffersContTxt_Wrapper() +
           set_Discount_ModuleX99(item) +
           set_OfferTitle_csv(item) +
           set_StarRatings_and_Reviews_ModuleX99(item) +
           set_Price_and_Tagline_ModuleX99(item) +
           setClosing_OffersContTxt_Wrapper() +
           setClosing_aLink_ModuleX99(item) +
         '</div>' +
       '</li>'
     );
   };
 //var utilities
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

     if(!item){
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
