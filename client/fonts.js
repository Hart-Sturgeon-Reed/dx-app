// A function to asynchronously load fonts from Google Font API

Meteor.startup(function() {
  WebFontConfig = {
    google: { families: [ 'Roboto Slab:700,400:latin', 'Droid Sans:700,400,300:latin', 'Quicksand:700,400,300:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
    console.log("async fonts loaded", WebFontConfig);
  })();
})