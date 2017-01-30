var requireHtml;
var requireCss;
var requireJs;
var requireImage;

function requireAll() {
   requireHtml = require.context('./app', true, /\.html$/);
   requireRes(requireHtml);

   requireCss = require.context('./app', true, /\.css$/);
   requireRes(requireCss);

   requireJs = require.context('./app', true, /\.js$/);
   requireRes(requireJs);

   requireImage = require.context('./app', true, /\.jpe?g|.png|.gif$/i);
   requireRes(requireImage);
}

function requireRes(req) {
   req.keys().forEach(function(key) {
      req(key);
   });
}

requireAll();

angular.module('templateLoader', []).run(function($templateCache) {
   requireHtml.keys().forEach(function(key) {
      var val = requireHtml(key);
      $templateCache.put(key, val);
   });
});

var hmr = require('angular-webpack-hmr');

if(module.hot) {
   hmr.modifyAngular();

   module.hot.accept([requireHtml.id], function() {
      requireAll();
      hmr.acceptTemplateChange(requireHtml);
   });

   module.hot.accept([requireJs.id], function() {
      requireAll();
   })
}


