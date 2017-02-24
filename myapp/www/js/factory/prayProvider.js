'use strict';
app.service('prayProvider',function($http,$cordovaSQLite,$ionicPlatform){
  this.getAll = function(callback) {
    $ionicPlatform.ready(function() {
      var query = "SELECT * FROM pray";
      $cordovaSQLite.execute(db, query,[]).then(function(res) {
        if(res.rows.length > 0) {
          var prayers = [];
          for (var i = 0; i < res.rows.length; i++) {
            prayers[i] = (res.rows.item(i));
          }
          callback(prayers);
        } else {
          var url = "https://ramadanv2.herokuapp.com/prieres";
          var req ={
            method: 'GET',
            url: url,
            cache :false,
            headers: {
              'Accept':'Application/json',
              'Cache-Controle':'no-cache',
            }
          };
          $http(req)
            .success(function(response) {
              //inserting data
              for (var i = 0; i < response.length; i++) {
                var query = "INSERT INTO pray (Date, Asr, Chorouq, Dohr, Maghreb, Rakas, Sobh,Sourates) VALUES (?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute(db, query, [response[i].Date, response[i].Asr, response[i].Chorouq, response[i].Dohr, response[i].Maghreb, response[i].Rakas, response[i].Sobh, response[i].Sourates]).then(function(res) {
                  console.log("INSERT ID -> " + res.insertId);
                }, function (err) {
                  console.error(err);
                });
              }
              var query = "SELECT * FROM pray";
              $cordovaSQLite.execute(db, query,[]).then(function(res) {
                var prayers = [];
                for (var i = 0; i < res.rows.length; i++) {
                  prayers[i] = (res.rows.item(i));
                }
                callback(prayers);
              }, function (err) {
                console.error(err);
              });
            })
            .error(function (response) {
              console.log(response);
            });
        }
      }, function (err) {
        console.error(err);
      });
    });
  };
/*
  function getOne(slug)
  {
    var bool = false;
    var num =0;
    var taiile = prayers.length;
    while(bool==false)
    {
      if(prayers[num].Date==slug)
      {
        bool =true;
      }else
      {
        num +=1;
      }
   }
    return prayers[num];
  }*/

  function getOne(id) {
    $ionicPlatform.ready(function() {
      var query = "SELECT * FROM pray where id = ?";
      $cordovaSQLite.execute(db, query,[id]).then(function(res) {
        return res.rows.item(0);
      }, function (err) {
        console.error(err);
      });
    });
  }

});
