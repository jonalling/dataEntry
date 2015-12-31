angular.module('starter.controllers', [])

.controller('AppCtrl', function($window, $scope, $ionicModal, $localstorage, $cordovaFile, $ionicPlatform, DataList) {

  ////// Dims of window, ion-content, and div
  $scope.fullWidth = $window.innerWidth;
  $scope.fullHeight = $window.innerHeight;
  $scope.width = angular.element(document.querySelector('#main'))[0].offsetWidth;
  $scope.height = angular.element(document.querySelector('#main'))[0].offsetHeight;

  //// RETRIEVE LOCAL DATA //////
  $scope.loadData = function() {
    // update DeviceData with localStorage
    DataList = $localstorage.getObject('storedDataList');
  }

  $scope.loadData();

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
  $scope.dumpData = function() {
    $ionicPlatform.ready(function(){
      $cordovaFile.writeFile(cordova.file.syncedDataDirectory, "list.json", JSON.stringify($scope.list), true)
      .then(function (success) {
        console.log("data dumped")
        // success
      }, function (error) {
        // error
      });
    });
  }

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
