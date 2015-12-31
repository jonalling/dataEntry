angular.module('starter.controllers', [])

.controller('AppCtrl', function($window, $scope, $ionicModal, $ionicPlatform) {

  ////// Dims of window, ion-content, and div
  $scope.fullWidth = $window.innerWidth;
  $scope.fullHeight = $window.innerHeight;
  $scope.width = angular.element(document.querySelector('#main'))[0].offsetWidth;
  $scope.height = angular.element(document.querySelector('#main'))[0].offsetHeight;


  ////// FORM //////
  $scope.list = [];
  $scope.data = {date: '', odometer:'', temp:''};
  $scope.submit = function() {
      console.log(this.data)
      $scope.list.push({date:new Date(), odometer:this.data.odometer, temp:this.data.temp});
      this.data = {date: '', odometer:'', temp:''};
      document.getElementById('odometer').focus();
  };


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
