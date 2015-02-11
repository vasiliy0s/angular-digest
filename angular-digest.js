/**
 * angular-digest
 * 
 * Simple service for safe run $scope.$digest().
 *
 * (c) 2015 Vasiliy Telyatnikov (http://vasiliy0s.com).
 * License: MIT
 */

;(function (angular) {

  'use strict';

  // 'ngDigest' module.
  angular.module('ngDigest', [])

    // '$digest' service.
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

    })

    // '$apply' service.
    .service('$apply', function () {
      
      return function $apply ($scope, exp) {
        if (!$scope.$$phase) {
          return $scope.$apply(exp);
        }
        else if ('string' === typeof exp) {
          return $scope.$eval(exp);
        }
        return exp($scope);
      };

    });

} (angular));
