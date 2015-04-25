'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsController'
    });
});

app.controller('ProductsController', function($scope, Products, Cart, Categories, localStorageService){
	//locatStorageService

	$scope.currentCategory = "all";

	$scope.selectCategory = function(category){
        console.log('category.name', category.name);
		$scope.currentCategory = category.name;
	}

	$scope.imageAnimating = [];

  Products.getAllProducts().then(function(productList){
    $scope.products = productList;
  }, function(err){
    console.log("errors", err);
  })

    var getCategories = function() {
        Categories.getCategories()
        .then(function(categoryList) {
            $scope.categories = categoryList;
            console.log('categoryList', categoryList);
        })
        .catch(function(err) {
            console.log(err);
        });
    };
    getCategories();

  	//Add to Cart
	$scope.addToCart = function(product) {
		console.log("add to cart")
		Cart.addToCart(product);
	};

	//Search
	$scope.search = function (product){
		//query box is empty
		if(!$scope.query) return true;
		//query box has a string
        var lowercaseQuery = $scope.query.toLowerCase();
        var lowercaseName = product.name.toLowerCase();
		var categoriesStr = product.categories.join(",");
        var lowercaseCategories = categoriesStr.toLowerCase();

		if (lowercaseName.indexOf(lowercaseQuery)!=-1
				|| lowercaseCategories.indexOf(lowercaseQuery)!=-1) {
		        return true;
		    }
		return false;
	};
	$scope.imageAnimate = function(productId){
		var index = $scope.imageAnimating.indexOf(productId);
		if(index===-1) {
			$scope.imageAnimating.push(productId);
			console.log($scope.imageAnimating.indexOf(productId));
		}
		else {
			$scope.imageAnimating.splice(index,1);
			console.log($scope.imageAnimating.indexOf(productId));
		}
	}
});
