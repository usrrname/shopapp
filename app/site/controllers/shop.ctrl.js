(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)

	function ShopCtrl($location,$scope,productSrv, products){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.products = products;
		shopVm.productSrv = productSrv;
		shopVm.searchFilter = searchFilter;
		shopVm.adminLogin = adminLogin; 
		
		function adminLogin(){
			$location.path('/auth');
		}

		function searchFilter(){
			shopVm.filter = "";

			shopVm.customFilter = shopVm.search;
			console.log(shopVm.search);
			
		}

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});
	}



})();


