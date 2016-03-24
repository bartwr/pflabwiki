// Before testing, put the wiki in debug mode:
// => https://www.mediawiki.org/wiki/ResourceLoader/Features#Debug_mode

$(function(){

  // Add Rambda, because functional programming is nice.
  // http://bartroorda.nl/blog/2016/01/24-functional-programming-introduction
  $('<script />', {'type': 'text/javascript', 'src': '//cdnjs.cloudflare.com/ajax/libs/ramda/0.19.1/ramda.min.js'})
    .appendTo('head');

  $('<link />', {
    'rel': 'stylesheet',
    'media': 'screen',
    'type': 'text/css',
    'href': 'https://fontlibrary.org/face/hk-grotesk'
  }).appendTo('head');

  //+ isLanding :: void -> bool
  var isLanding = function(){
    return document.location.pathname == '/wiki/Permanent_Future_Lab_Wiki' || document.location.hostname == 'localhost'
  }

  //+ createHeader :: void -> void
  var createHeader = function(url){
    var title = $('#firstHeading').text();
    $('<header />', {
      id: 'page-header',
      html: '<h1>'+title+'</h1>',
      style: 'background-image:url("'+url+'")'
    }).insertBefore('#page-content');
  }

  //+ getPageHeader :: void -> String
  var getHeader = function(){

    // Get thumbnail URL.
    sideImg = $('#bodyContent .thumb.tright').eq(0).find('img').attr('src');

    if( !sideImg || isLanding() )
      return 'https://static.miraheze.org/permanentfuturelabwiki/e/e5/PFLab-MusCom-20150803.jpg';

    // Remove /thumb from URL.
    sideImg = sideImg.replace('/thumb', '').split('/');
    // Remove the last part of the URL as well - E.g.: `/300px-PFLab-MusCom-20150803.jpg`
    sideImg.pop();
    // Make the array a string again.
    sideImg = sideImg.join('/');

    return sideImg;

  }

  //+ hideFirstHeading
  var hideFirstHeading = function(){
    $('#firstHeading').hide();
    $('#tagline').hide();
  }

  //+ createContentBlock
  var createContentBlock = function(el){
    console.log(! el.prev().is('div'));
    if( !el.prev().is('div') ){
      el.before('</div>');
    }
    el.before('<div class="block">');
  }

  //+ createContentBlocks
  var reLayoutLanding = function(){
    $('#bodyContent h2').each(function(){
      var $set = $();
      $set.push(this);
      nxt = this.nextSibling;
      while(nxt) {
          if(!$(nxt).is('h2')) {
              $set.push(nxt);
              nxt = nxt.nextSibling;
          } else break;
      } 
     $set.wrapAll('<div class="block" />');
    });
  }

  //+ init :: void -> void
  var init = function(){
    createHeader(
      getHeader()
    );
    if( isLanding() ){
      $('body').addClass('is-landing')
      reLayoutLanding();
    }
    hideFirstHeading();
  }

  init();
  console.log('Custom JavaScript for Foreground Skin initialized');

});
