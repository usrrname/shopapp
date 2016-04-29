angular
	.module('shopApp')
	.controller('CategoryCtrl',CategoryCtrl);

	function CategoryCtrl(productSrv) {
		var categoryVm = this;
		categoryVm.categories = productSrv.categories;

		//Public Functions
		categoryVm.editCategory = editCategory;
		categoryVm.updateCategory = updateCategory;
		categoryVm.deleteCategory = deleteCategory;

		function editCategory() {

		}

		function updateCategory(data, catId) {
			console.log(data, catId);
		}

		function deleteCategory() {

		}

	}