/**
 * angular-digest
 * 
 * Simple service for safe run $scope.$digest().
 *
 * (c) 2015 Vasiliy Telyatnikov (http://vasiliy0s.com).
 * License: MIT
 */

(function (angular) {

  'use strict';

  angular.module('ngDigest', [])
    .service('$digest', function ($timeout) {

      var timeouts = {};

      var digest = function ($scope) {
        if (!$scope.$$phase && 'function' === typeof $scope.$digest) {
          $scope.$digest();
        }
      };

      return function $digest ($scope, delay) {
        if (!delay) {
          digest($scope);
        }
        else {
          var $id = $scope.$id;
          $timeout.cancel(timeouts[$id]);
          timeouts[$id] = $timeout(function () {
            delete timeouts[$id];
            digest($scope);
          }, parseInt(delay) || 1);
        }
      };

    });

} (angular));
