(function(){
	angular
		.module('shopApp')
		.controller('CheckoutCtrl', CheckoutCtrl);

	function CheckoutCtrl($location, productSrv){
		var chkVm = this;
		chkVm.cart = productSrv.getCart();

		// Public functions
		chkVm.theTotal = theTotal;
		chkVm.checkout = checkout;
		chkVm.productSrv = productSrv;

		function theTotal() {
			chkVm.total = [0, 0];
			for(var i = 0; i < chkVm.cart.length; i++) {
				chkVm.total[0] += chkVm.cart[i].price * chkVm.cart[i].count;
				chkVm.total[1] += chkVm.cart[i].count;
			}
			return chkVm.total;
		}

		function checkout(cart) {
			var tempOrders = {
				order: cart,
				fname: chkVm.fname,
				lname: chkVm.lname,
				add1: chkVm.add1,
				add2: chkVm.add2,
				city: chkVm.city,
				postalcode: chkVm.postalcode,
				email: chkVm.email,
				ccnumber: chkVm.ccnumber,
				cvc: chkVm.cvc,
				ccexpiry: chkVm.ccexpiry,
			}

			chkVm.productSrv.orders.push(tempOrders);
			console.log(chkVm.productSrv.orders);
			
			var ordersToJSON = angular.toJson(chkVm.productSrv.orders);
			localStorage.setItem("orders", ordersToJSON);

			localStorage.setItem("cart", "[]");
			chkVm.productSrv.cartRefresh();
			$location.path('/');
			
		}
	}
})();