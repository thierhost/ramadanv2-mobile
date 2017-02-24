var db = null;
var app = angular.module('ramadan', ['ionic', 'ngCordova']).run(function($ionicPlatform,$location,$cordovaSQLite) {
        $ionicPlatform.ready(function() {
          if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
          }
          if(window.StatusBar) {
            StatusBar.styleDefault();
          }
          $location.path('/');
          db = $cordovaSQLite.openDB({ name: "prayApp.db",iosDatabaseLocation: 'default' });
          $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS pray (id integer primary key AUTOINCREMENT, Date text, Asr text, Chorouq text, Dohr text, Maghreb text, Rakas text, Sobh text, Sourates text)");
          console.log('table created success');
        });
      });
app.config(function($ionicConfigProvider){
  $ionicConfigProvider.tabs.position('bottom');
});
