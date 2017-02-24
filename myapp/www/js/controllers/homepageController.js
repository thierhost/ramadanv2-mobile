'use strict';

    /* recuperation de la date d'aujourdhui */
    var now = new Date();
    var mois    = now.getMonth()+1;
    var jour    = now.getDate();
    var moisString="";
    if(mois == 2){
      moisString="fevrier";
    }else
    {
      moisString="mars";
    }
    var slug =" "+jour+" "+moisString;

app.controller('homepageIndex',function ($scope,prayProvider) {
  prayProvider.getAll(function (prayers) {
    $scope.prayers = prayers;
  });
})
  .controller('today',function ($scope,prayProvider,$stateParams,$cordovaSQLite,$ionicPlatform) {
      $ionicPlatform.ready(function() {
        var query = "SELECT * FROM pray where Date = ?";
        $cordovaSQLite.execute(db, query,[slug]).then(function(res) {
          $scope.pray = res.rows.item(0);
        }, function (err) {
          console.error(err);
        });
      });
  })

  .controller('one',function ($scope,prayProvider,$stateParams,$cordovaSQLite,$ionicPlatform) {
    var parms = $stateParams.slug;
    $ionicPlatform.ready(function() {
      var query = "SELECT * FROM pray where id = ?";
      $cordovaSQLite.execute(db, query,[parms]).then(function(res) {
        $scope.pray = res.rows.item(0);
      }, function (err) {
        console.error(err);
      });
    });
    // = prayProvider.getOne(parms);
  })
  .controller('nafila',function ($scope,prayProvider,$stateParams,$cordovaSQLite,$ionicPlatform) {
    $ionicPlatform.ready(function() {
      var query = "SELECT * FROM pray where Date = ?";
      $cordovaSQLite.execute(db, query,[slug]).then(function(res) {
        $scope.nafila= res.rows.item(0);
      }, function (err) {
        console.error(err);
      });
    });
  })
;
