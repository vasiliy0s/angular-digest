# angular-digest
Simple service for safe run `$scope.$digest()`.

## Install
To install this package type:
```sh
bower install angular-digest --save
```

## Usage
First include script in you app page (after you include [AnuglarJS](https://angularjs.org/) files):
```html
<script src="/bower_components/angular-digest/angular-digest.js" type="text/javascript" charset="utf-8" async defer></script>
```

To use package in your app inject module:
```js
angular.module('app', [
  // another app/module dependencies here.
  'ngDigest',
]);
```

And now inject `$digest` service in right place of app:
```js
angular.module('app')
  .controller('myCtrl', function ($scope, $digest) {

    // Delay make $digest calling in debounced function style.
    var debounceDelay = 100;
    
    $scope.$on('some:event', function () {
      // some actions here.
      $digest($scope);
    });

    $scope.$on('some:another:event', function () {
      // some another actions here.
      $digest($scope, debounceDelay);
    });

  });
```

Or use injected `$apply` service:
```js
angular.module('app')
  .controller('myCtrl', function ($scope, $rootScope, $apply) {

    var vm = this;

    vm.model = {
      baz: 'bash',
    };

    vm.check = fuction () {
      if (vm.model.baz !== 'bash') {
        // some controller actions with view updating here
      }
    };

    $rootScope.$on('some:event', function () {
      // directly service usage
      $apply($scope, vm.check);
    });

    $rootScope.$on('some:another:event', function () {
      // using service in '$scope.$eval' style
      $apply($scope, 'vm.check');
    });

  });
```

## Author
[vasiliy0s](http://vasiliy0s.com)

## License
MIT
