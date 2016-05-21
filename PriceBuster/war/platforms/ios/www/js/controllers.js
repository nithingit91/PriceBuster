angular.module('app.controllers', [])

.controller('priceBusterCtrl', function($scope, $http, $cordovaBarcodeScanner) {

  var items = $scope.items = [];

  //TEST DATA *****
/*
  items.push({
    isSource: true,
    source: 'From: Test.com :'
  });

  items.push({"id":'010101',
  "name":'Test Product Description size lenght',
  "store":'Walmart',
  "price":'99.99',
  "rate":'10',
  "image":'http://i5.walmartimages.com/dfw/dce07b8c-797e/k2-_15228eed-b202-4bcb-ae55-cc7c31480e42.v6.jpg'
});
$scope.msg = "Test status msg";
//*/
//TEST DATA *****


$scope.searchItem = function searchItem() {
  var uri = '';

  //Reset items list
  items = $scope.items = [];

  // If only numbers entered, Find by UPC
  if (/^\d+$/.test($scope.inputSearch)){

    //Build Walmart.com URI
    uri = 'http://api.walmartlabs.com/v1/items?apiKey=ct3xn4fv3zbnv46ww7s6dnc7&upc='+$scope.inputSearch;
  }else {
    // Find by Name

    //Build Walmart.com URI
    uri = 'http://api.walmartlabs.com/v1/search?apiKey=ct3xn4fv3zbnv46ww7s6dnc7&query='+$scope.inputSearch;
  };

  //Consume WALMART.COM API
  //022000119612
  $http.get(uri)

  .then(function(response) {

    var results = response.data.items;

    if(response.status!='404'){

      items.push({
        isSource: true,
        source: 'From Walmart.com :'
      });

      for (i = 0; i < results.length; i++) {
        items.push({"id":results[i].upc,
        "name":results[i].name,
        "store":"Walmart",
        "price":results[i].salePrice,
        "rate":"10",
        "image":results[i].thumbnailImage,
        "url":results[i].productUrl});
      }
    }else{
      $scope.msg = response.statustext;
      if($scope.msg==''){
        $scope.msg = 'Product not found.';
      };
    };
  })
  .then(function(response) {
    $scope.msg = response.statustext;
    console.log("Error: "+ response.statustext);
    if($scope.msg==''){
      $scope.msg = 'Product not found.';
    };
  });
};

$scope.scanBarcode = function() {
  $cordovaBarcodeScanner.scan( ).then(function(imageData){

    $scope.inputSearch = imageData.text;
    console.log("Barcode Format -> " + imageData.format);
    console.log("Cancelled -> " + imageData.cancelled);
    console.log("format" + imageData.format );

    $scope.searchItem();

  }, function(error) {
    $scope.msg = error.text;
    console.log("Error: " + error.text);
  });
};

//Titles are shorter, everything else is 52 pixels
$scope.getItemHeight = function(item) {
  return item.isSource ? 40 : 100;
};

})

.controller('cartCtrl', function($scope) {

})

.controller('cloudCtrl', function($scope) {

})

.controller('loginCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})

.controller('scanBarcodeCtrl', function($scope) {

})
