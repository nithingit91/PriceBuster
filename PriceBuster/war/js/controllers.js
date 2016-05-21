angular
		.module('app.controllers', [])

		.controller(
				'priceBusterCtrl',
				function($scope, $state, $http, $cordovaBarcodeScanner, $window) {

					items = $scope.items = [];

					var msg = $scope.msg = '';

					var inputSearch = $scope.inputSearch;

					$scope.searchItem = function searchItem() {
						var uri = '';
			
						// Reset global
						items = $scope.items = [];
						msg = $scope.msg = '';

						/* TEST DATA *****
						google.devrel.samples.hello.getProduct($scope.inputSearch);
						return;
						if ($scope.inputSearch == '064900407482') {
							items.push({
								isSource : true,
								source : 'From: DataStore'
							});
							items
									.push({
										"id" : '064900407482',
										"name" : '87g 60 Piece Excel Polar Ice Gum',
										"description" : '87g 60 Piece Excel Polar Ice Gum',
										"store" : 'Walmart',
										"price" : '9.99',
										"rate" : '10',
										"image" : 'http://i5.walmartimages.com/dfw/dce07b8c-4dce/k2-_8485a88c-1661-4756-9d91-7bdfac4147e6.v2.jpg',
										"url" : 'http://c.affil.walmart.com/t/api03?l=http%3A%2F%2Fwww.walmart.com%2Fip%2FWrigleys-Eclipse-Sugar-Free-Gum-Polar-Ice-18-Ea-8-Pack%2F48320672%3Faffp1%3DYJPDBpZEdRJQzDwGG-_joj1YSwH7WsCFjWyFE4Zr290%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi'
									});
							return;
						}
						 TEST DATA *****/

						// If only numbers entered, Find by UPC
						if (/^\d+$/.test($scope.inputSearch)) {

							// Build Walmart.com URI
							uri = 'http://api.walmartlabs.com/v1/items?apiKey=ct3xn4fv3zbnv46ww7s6dnc7&upc='
									+ $scope.inputSearch
									+ '&lsPublisherId=3316604&format=json&callback=JSON_CALLBACK';
						} else {
							// Find by Name

							// Build Walmart.com URI
							uri = 'http://api.walmartlabs.com/v1/search?apiKey=ct3xn4fv3zbnv46ww7s6dnc7&query='
									+ $scope.inputSearch
									+ '&lsPublisherId=3316604&format=json&callback=JSON_CALLBACK';
						}
						;

						// Consume WALMART.COM API
						// 022000119612		
						
						$http.jsonp(uri)

						.then(function(response) {
							
							if (!response.data.items) {return};
							msg = $scope.msg = '';
							var results = response.data.items;
							items.push({
								isSource : true,
								source : 'From Walmart.com :'
							});

							for (i = 0; i < results.length; i++) {
								items.push({
									"id" : results[i].upc,
									"name" : results[i].name,
									"description" : results[i].longDescription,
									"store" : "Walmart",
									"price" : results[i].salePrice,
									"rate" : "10",
									"image" : results[i].thumbnailImage,
									"imageLarge" : results[i].mediumImage,
									"url" : results[i].productUrl
								});
							}
						}).then(function(response) {
							$scope.msg = response.statustext;
							console.log("Error: " + response.statustext);
						});
						if (items[1]== null){
							$scope.msg = 'Product not found. CREATE NEW!';
						}
						;
					};


					$scope.scanBarcode = function() {
						$cordovaBarcodeScanner.scan().then(
								function(imageData) {

									inputSearch = imageData.text;
									$scope.inputSearch = inputSearch;
									console.log("Barcode Format -> "
											+ imageData.format);
									console.log("Cancelled -> "
											+ imageData.cancelled);
									console.log("format" + imageData.format);

									$scope.searchItem();

								}, function(error) {
									$scope.msg = error.text;
									console.log("Error: " + error.text);
								});
					};

					$scope.details = function details(itemDetails) {
						currentItem = $scope.currentItem = itemDetails;
						$state.go("menu.details");	
					}			
					
					// Titles are shorter, everything else is 52 pixels
					$scope.getItemHeight = function(item) {
						return item.isSource ? 40 : 100;
					};

				})

		.controller('loginCtrl', function($scope) {

		})

		.controller('signupCtrl', function($scope) {

		})

		.controller(
				'newCtrl',
				function($scope) {

					// ///////////////////// DATASTORE
					// ///////////////////////////
					'use strict';

					// var input = process.argv.splice(2);
					// var command = input.shift();

/*					var projectId = process.env.DATASTORE_PROJECT_ID
							|| process.env.GCLOUD_PROJECT;
					if (!projectId) {
						throw new Error(
								'GCLOUD_PROJECT environment variable required.');
					}
					var keyFile = process.env.DATASTORE_KEYFILE
							|| process.env.GOOGLE_APPLICATION_CREDENTIALS;

					// [START build_service]
					var gcloud = require('gcloud');
					var options = {
						projectId : projectId
					};

					if (keyFile) {
						options.keyFilename = keyFile;
					}

					var datastore = gcloud.datastore.dataset(options);
					// [END build_service]

					// DATASTORE
					$scope.createNew = function createNew() {

						datastore.save({
							key : productKey,
							data : {
								Updated_at : new Date().toJSON(),
								Name : $scope.inputName,
								Description : $scope.inputDescription,
								Category : $scope.inputCategory,
								Price : $scope.inputPrice,
								UPC : $scope.inputUPC,
								Image : $scope.inputImage
							}
						}, function(err) {
							if (err) {
								callback(err);
								return;
							}

							callback(null, productKey);
						});
					}

					/////////////////////////////////////////////////
					*/	
				})

		.controller('detailsCtrl', function($scope) {
			$scope.currentItem = currentItem;
						
		})

		.controller('scanBarcodeCtrl', function($scope) {

		})
