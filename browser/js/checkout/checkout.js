'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: "CheckoutCtrl"
    });
});

app.controller("CheckoutCtrl", function($state, $scope, $http, Cart, Users, Orders, Promos, stripe){

    Users.getCurrentUser().then(function(currUser){
        $scope.user = currUser;
    }, function(err){
        throw new Error(err);
    });

	$scope.promoCode = Cart.order.promo || null;
	$scope.products = Cart.getCart();
	$scope.promoApplied = false;

	var subTotal = Cart.calculateSubTotal($scope.products);

	$scope.checkoutDetails = {
		subTotal: subTotal,
		tax: Cart.order.tax,
		shipping: Cart.order.shipping,
		promo: Cart.order.promo
	};

	$scope.confirmOrder = function(){
		var order = {
			cart: $scope.products,
			user: $scope.user,
			details: $scope.checkoutDetails
			,stripeToken: $scope.payment.token
		};
        if (!$scope.user._id) {
            order.user._id = order.user.email;
            Orders.guestConfirmOrder(order)
            .then(function(order) {
                Cart.emptyCart();
                $state.go('order');
            });
        }
        else {
            Orders.userConfirmOrder(order).then(function(order){
                Cart.emptyCart();
                $state.go('order'); //returns the order
                //redirect via state after thankyou/confirmation page created
            });
        }
	};

	$scope.applyPromo = function(promoCode){
		var newDate = new Date();
		if(Cart.order.promo && !Cart.featuredPromo) return console.log("don't be greedy!");
		Cart.order.promo = $scope.promoCode;
		Cart.featuredPromo = false;
		$scope.checkoutDetails.promo = $scope.promoCode;
		Promos.getPromo(promoCode).then(function(promo){
			if(!promo) console.log("promo does not exist");
			else if(promo.expirationDate<newDate.toISOString()) console.log("promo expired!")
			else {
				if(promo.products.length){
					$scope.products.forEach(function(cartProduct){
						promo.products.forEach(function(promoProduct){
							if(cartProduct._id === promoProduct) {
								cartProduct.price *= (100-promo.percentage)/100;
								$scope.checkoutDetails.subTotal = Cart.calculateSubTotal($scope.products);
								$scope.promoApplied = true;
							}
						});
					});
				} else {
					console.log("else", $scope.products);
					$scope.products.forEach(function(cartProduct){
						cartProduct.categories.forEach(function(eachCategory){
							if(eachCategory === promo.category) {
								cartProduct.price *= (100-promo.percentage)/100;
								$scope.checkoutDetails.subTotal = Cart.calculateSubTotal($scope.products);
								$scope.promoApplied = true;
							}
						});
					});
				}
			}
		});

	};
	
	// angular-stripe library is only one month old, 
	// it was published in mar 2015
	// card model on scope to be injected into stripe 
	$scope.payment = {
		card : {
				  number: '',
				  cvc: '',
				  exp_month: '',
				  exp_year: ''
////				  number: $('.card-number').val(),
////				  cvc: $('.card-cvc').val(),
////				  exp_month: $('.card-expiry-month').val(),
////				  exp_year: $('.card-expiry-year').val()
		}
	};
	
	// when requesting a payment token from stripe	
	$scope.charge = function () {
	    return stripe.card.createToken($scope.payment.card)
	      .then(function (token) {
	        console.log('token created for card ending in ', token.card.last4);
	        var payment = angular.copy($scope.payment);
	        payment.card = void 0;
	        payment.token = $scope.payment.token = token.id;
	        return $scope.confirmOrder();
	      })
//	      .then(function (payment) {
//	        console.log('successfully submitted payment for $', payment.amount);
//	      })
	      .catch(function (err) {
	        if (err.type && /^Stripe/.test(err.type)) {
	          console.log('Stripe error: ', err.message);
	        }
	        else {
	          console.log('Other error occurred, possibly with your API', err.message);
	        }
	      });
	  };	

});
