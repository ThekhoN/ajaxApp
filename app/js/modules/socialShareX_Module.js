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
