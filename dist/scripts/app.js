requirejs.config({baseUrl:"scripts/lib",urlArgs:"bust=0.8.15",waitSeconds:0,paths:{jquery:"//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery",jquerymobile:"jquery.mobile-1.4.5",jscookie:"js.cookie",underscore:"//cdn.jsdelivr.net/lodash/3.10.0/lodash",backbone:"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone",parse:"parse-1.5.0",pretty:"prettyprint",moment:"moment",vis:"vis",backform:"backform",nprogress:"nprogress",hello:"hello",marionette:"backbone.marionette","bootstrap-datepicker":"//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.1/js/bootstrap-datepicker","url-search-params":"url-search-params.max.amd",papaparse:"papaparse-4.1.2",app:"../app"},shim:{backbone:{deps:["underscore","jquery"],exports:"Backbone"},backform:{deps:["backbone"],exports:"Backform"},parse:{deps:["underscore","jquery"],exports:"Parse"}}}),requirejs(["app/main"]),requirejs(["app/loadall"]);