(function(){

	angular
		.module('shopApp')
		.controller('ModalCtrl', ModalCtrl);

	function ModalCtrl($state, $uibModalInstance, productSrv, api){	
		
		var modalVm	= this;
		modalVm.cart = productSrv.getCart();

		//Public function
		modalVm.cartRemove = cartRemove;
		modalVm.removeSelected = removeSelected;
		modalVm.closeModal = closeModal;
		modalVm.updateCart = updateCart;
		
		function removeSelected(id){
			for (var i = 0; i < modalVm.cart.length; i++){
				if (modalVm.cart[i].id === id){
					console.log("cart before: " + modalVm.cart);
					modalVm.cart.splice(i,1);
					console.log("selection removed");
				}
			}
			var cart = angular.toJson(modalVm.cart);
			localStorage.setItem("cart", cart);
		};

		function cartRemove(id) {
			removeSelected(id);
			// productSrv.storageUpdate();
		};

		function updateCart(){
			productSrv.storageUpdate();
			modalVm.closeModal();
		}

		function closeModal(){
			productSrv.cartRefresh();
			$uibModalInstance.dismiss('cancel');
		}
	}

})();