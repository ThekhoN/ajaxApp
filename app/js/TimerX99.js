function polyfill_qSA_SupportQ(){function a(){return null!=(document.querySelector&&document.querySelectorAll)}a?console.log("querySelector && querySelectorAll are supported!"):["https://cdn.polyfill.io/v2/polyfill.min.js"].forEach(function(a){var b=document.createElement("script");b.src=a,b.async=!0,document.head.appendChild(b)})}polyfill_qSA_SupportQ();var TimerX99=function(){function c(a){var b={};return a&&"[object Function]"===b.toString.call(a)}function e(a){var b=a,c=b.indexOf(" "),d=b.substr(0,c),e=/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(d);if(null==e)return!1;var b=e[2],f=e[1]-1,g=e[3],h=new Date(g,f,b);return h.getDate()==b&&h.getMonth()==f&&h.getFullYear()==g}var a={};a._initCountDown=function(a,b,c){function i(){var a=_getRemainingTime(b);e.innerHTML=("0"+a.days).slice(-2),f.innerHTML=("0"+a.hours).slice(-2),g.innerHTML=("0"+a.minutes).slice(-2),h.innerHTML=("0"+a.seconds).slice(-2),a.total<=0&&(clearInterval(j),d.style.display="none",window.location.reload(!0))}_getRemainingTime=function(a){var b=Date.parse(a)-Date.parse(new Date),c=Math.floor(b/1e3%60),d=Math.floor(b/1e3/60%60),e=Math.floor(b/36e5%24),f=Math.floor(b/864e5);return{total:b,days:f,hours:e,minutes:d,seconds:c}};var d=document.getElementById(a);"false"==c||0==c?d.style.display="none":d.style.display="block";var e=d.querySelector(".dayV_timerX"),f=d.querySelector(".hrV_timerX"),g=d.querySelector(".minV_timerX"),h=d.querySelector(".secV_timerX");i();var j=setInterval(i,1e3)};var b={};return b.initCountDwnX99=function(b){if(b instanceof Array)if(b.length<1)console.log("define settings in arg Array");else for(var d=0,f=b.length;d<f;d++){var g=b[d],h=g[0]+" GMT+0530",i=g[1]+" GMT+0530",j=g[2],k=g[3],l=g[4];if(!e(h))return void console.log("invalid date format, it must be MM/DD/YYYY");if(!e(i))return void console.log("invalid date format, it must be MM/DD/YYYY");null==k&&console.log("no callback defined"),"false"==l||0==l?console.log("hide this timer"):!l||l.length<1?console.log("show undefined but show timer anyway"):console.log("show this timer");var m=new Date(h),n=new Date(i),o=new Date;if(m>n&&console.log("error in startDate, startDate is more than end Date"),m<o&&console.log("startDate: "+h),n>o&&o>=m&&(a._initCountDown(j,i,l),k)){if(!c(k))return void console.log("callback must be a function expression like this:\nfunction myCallback(){ //do something }");console.log("running callback:"),k()}}else console.log("arg must be an Array")},b}();
//options
//Time & Date format ~ MM/DD/YYYY 00:00:00
var startEnd_TargetID_typeArr = [
    /* options
    //['Start Time & Date' , 'End Time & Date', 'TimerDiv ID', 'Callback - function Expression', 'showTimer'(true by default, set "false" to hide)]
    */
    ['08/05/2016 17:10:00', '08/12/2016 14:50:00', 'CountDwnX99_01', runningCallback, true],
    ['08/10/2016 17:10:00', '09/12/2016 01:28:00', 'CountDwnX99_02', runningCallback, true],
    ['08/10/2016 17:10:00', '09/12/2016 02:28:00', 'CountDwnX99_03', runningCallback, true],
    ['08/10/2016 17:10:00', '09/12/2016 03:28:00', 'CountDwnX99_04', runningCallback, true]
];

//TimerX99.initCountDwnX99(startEnd_TargetID_typeArr);

function runningCallback(){
  console.log('running callback');
}

function hideHourlyDealsHeader() {
    console.log('hideHourlyDeals_nTimer running!');
    var updateThisHeader = document.getElementById('updateThisHeader');
    var span_updateThisHeader = updateThisHeader.getElementsByTagName('span')[0];
    updateThisHeader.classList.remove('hourlyIcon');
    updateThisHeader.classList.add('otherIcon');
    span_updateThisHeader.firstChild.nodeValue = 'Other Offers';
}

function showHourlyDealsHeader() {
    console.log('showHourlyDeals_nTimer running!');
    var updateThisHeader = document.getElementById('updateThisHeader');
    var span_updateThisHeader = updateThisHeader.getElementsByTagName('span')[0];
    updateThisHeader.classList.remove('otherIcon');
    updateThisHeader.classList.add('hourlyIcon');
    span_updateThisHeader.firstChild.nodeValue = 'Hourly Offers';
}
