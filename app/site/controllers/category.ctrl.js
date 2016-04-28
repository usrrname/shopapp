angular
	.module('shopApp')
	.controller('CategoryCtrl',CategoryCtrl);

	function CategoryCtrl(productSrv) {
		var categoryVm = this;
		categoryVm.categories = productSrv.categories;
		console.log(categoryVm.categories);
	}