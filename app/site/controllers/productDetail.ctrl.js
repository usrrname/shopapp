(function(){
	angular
		.module('shopApp')
		.controller('ProdDetailCtrl', ProdDetailCtrl);

		function ProdDetailCtrl($state, $uibModalInstance, productSrv, product){

			var prodVm = this;
			console.log(product);
			prodVm.product = product;
			
			// prodVm.product = prodId;	
			// console.log(prodVm.product);
		}
})();