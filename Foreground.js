// Before testing, put the wiki in debug mode:
// => https://www.mediawiki.org/wiki/ResourceLoader/Features#Debug_mode

$(function(){

  // Add Rambda, because functional programming is nice.
  // http://bartroorda.nl/blog/2016/01/24-functional-programming-introduction
  $('<script />', {'type': 'text/javascript', 'src': '//cdnjs.cloudflare.com/ajax/libs/ramda/0.19.1/ramda.min.js'})
    .appendTo('head');

  //+ isHome :: void -> bool
  var isHome = function(){
    return document.location.pathname == '/wiki/Permanent_Future_Lab_Wiki';
  }

  //+ createHeader :: void -> void
  var createHeader = function(url){
    $('<header />', {
      id: 'page-header',
      html: '<h1>Permanent Future Lab</h1>',
      style: 'background-image:url("'+url+'")'
    }).insertBefore('#page-content');
  }

  //+ getPageHeader :: void -> String
  var getHeader = function(){

    // Get thumbnail URL.
    sideImg = $('#bodyContent .thumb.tright').eq(0).find('img').attr('src');

    if( !sideImg || isHome() )
      return 'https://static.miraheze.org/permanentfuturelabwiki/e/e5/PFLab-MusCom-20150803.jpg';

    // Remove /thumb from URL.
    sideImg = sideImg.replace('/thumb', '').split('/');
    // Remove the last part of the URL as well - E.g.: `/300px-PFLab-MusCom-20150803.jpg`
    sideImg.pop();
    // Make the array a string again.
    sideImg = sideImg.join('/');

    return sideImg;

  }

  //+ init :: void -> void
  var init = function(){
    createHeader(getHeader())
  }

  init();
  console.log('Custom JavaScript for Foreground Skin initialized');

});
