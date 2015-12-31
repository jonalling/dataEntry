angular.module('starter.controllers', [])

.controller('AppCtrl', function($window, $scope, $ionicModal, $localstorage, $cordovaFile, $cordovaEmailComposer, $ionicPlatform, DataList) {

  ////// Dims of window, ion-content, and div
  $scope.fullWidth = $window.innerWidth;
  $scope.fullHeight = $window.innerHeight;
  $scope.width = angular.element(document.querySelector('#main'))[0].offsetWidth;
  $scope.height = angular.element(document.querySelector('#main'))[0].offsetHeight;

  $scope.dataList = DataList;

  //// RETRIEVE LOCAL DATA //////
  $scope.loadData = function() {
    // update DeviceData with localStorage

    DataList = $localstorage.getObject('storedDataList');

    if (DataList !== 'undefined' && DataList !== null) {
      $localstorage.setObject('storedDataList', {
        data: []
      });
    }
  }

  $scope.loadData();

  console.log(JSON.stringify(DataList.data));



  ////// FORM //////
  // $scope.list = [];
  $scope.dataList = DataList;
  $scope.data = {date: '', odometer:'', temp:''};
  $scope.submit = function() {
      console.log(this.data)
      DataList.data.push({date:new Date(), odometer:this.data.odometer, temp:this.data.temp});
      this.data = {date: '', odometer:'', temp:''};
      document.getElementById('odometer').focus();
      $scope.backupData();
  };

  $scope.backupData = function() {
    $localstorage.setObject('storedDataList', {
      data: DataList.data
    });
  }

  $scope.clearData = function() {
    $localstorage.setObject('storedDataList', {
      data: []
    });
    DataList.data = [];
  }

  // based on https://github.com/apache/cordova-plugin-file
  // also see this for email concept... http://stackoverflow.com/questions/31931173/how-to-attach-file-to-email-in-ionic-framework-android
  // Could also use $http (see commented code below)
  $scope.dumpData = function() {
    $ionicPlatform.ready(function(){
      $cordovaFile.writeFile(cordova.file.syncedDataDirectory, "list.json", JSON.stringify(DataList.data), true)
      .then(function (success) {
        console.log("data dumped")
        $scope.closeSettings();
        $cordovaEmailComposer.isAvailable().then(function() {
          // is available
          console.log('email started')
          var email = {
            to: 'nginear@gmail.com',
            attachments: ['' + cordova.file.syncedDataDirectory.replace('file://','') + "list.json"],
            subject: 'Data Dump',
            body: 'Json data',
            isHtml: false
          };

          $cordovaEmailComposer.open(email).then(null, function () {
          // user cancelled email
          });
          console.log('email made')
          return;
          }, function (error) {
          return;
        });
        // success
      }, function (error) {
        console.log("error")
        // error
      });
    });
  }

  // $scope.go = function() {
  //
  // 	var req = {
  // 		method: 'POST',
  // 		url: 'https://api-http.littlebitscloud.cc/devices/' + CLOUDBIT_ID + '/output',
  // 		headers: {
  // 			'Authorization': 'Bearer ' + ACCESS_TOKEN,
  // 			'Accept': 'application/vnd.littlebits.v2+json',
  // 			'Content-Type': 'application/json'
  // 		},
  // 		data: JSON.stringify({
  //       'percent': 10,
  //       'duration_ms': 500
  //     })
  // 	}
  //
  // 	$http(req).success(function(data) {
  //     $scope.hello = data;
  // 		console.log($scope.hello);
  // 		$scope.startTimer();
  //   })
  //
  // }

  ////// MODAL //////
  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeSettings = function() {
    $scope.modal.hide();
  };

  $scope.openSettings = function() {
    $scope.modal.show();
  };

}); // end MotionCtrl
