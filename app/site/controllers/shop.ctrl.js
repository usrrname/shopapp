(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)

	function ShopCtrl($location,$scope,productSrv,products, $uibModal){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.products = products;
		shopVm.productSrv = productSrv;
		shopVm.searchFilter = searchFilter;
		shopVm.adminLogin = adminLogin;
		shopVm.openModal = openModal; 
		
		function adminLogin(){
			$location.path('/auth');
		}

		function searchFilter(){
			shopVm.filter = "";

			shopVm.customFilter = shopVm.search;
			console.log(shopVm.search);
			
		}

		function openModal(){
			$uibModal.open({
			templateUrl: 'site/partials/modal.html',
			controller: 'ModalCtrl',
			controllerAs: 'ctrl'
			})
		}

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});
	}



})();


