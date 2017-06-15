angular.module('myApp', [])
  .config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .controller('FlickrSearch', function($scope, $http, $sce) {
    var vm = this;
    vm.loading = false;
    vm.photos = ['gdgfdg', 'fdgfdgdf', 'gfdgf'];
    vm.searchTerm = "test";
    vm.url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=30cd402526fd596e7799c90bfcaf4ddd&format=rest&text=';
    vm.results = "";

    vm.searchImage = function() {
      vm.loading = true;
      var url = 'https://api.flickr.com/services/rest';
      var request = {
        method: 'flickr.photos.search',
        api_key: '30cd402526fd596e7799c90bfcaf4ddd',
        tags: vm.searchTerm,
        format: 'json',
        nojsoncallback: 1
      };

      $http({
        url: url,
        params: request
      })
      .then(function(data, status, headers, config) {
        console.log('Success!');
        console.log(data);
        vm.results = data;
        vm.loading = false;
        vm.searchTerm = "";
      },
      function(data, status, headers, config) {
        console.log('Failure :(');
        console.log(data);
        vm.loading = false;
        vm.searchTerm = "";
      });
    }
    vm.searchImage();
  });
