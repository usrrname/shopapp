angular
	.module('shopApp')
	.controller('CategoryCtrl',CategoryCtrl);

	function CategoryCtrl(productSrv) {
		var categoryVm = this;
		categoryVm.categories = productSrv.categories;

		//Public Functions
		categoryVm.editCategory = editCategory;
		categoryVm.updateCategory = updateCategory;
		categoryVm.categoryRemove = categoryRemove;

		function editCategory() {

		}

		function updateCategory(data, catId) {
			console.log(data, catId);
			// console.log(productSrv.categories);
			// console.log(productSrv.categories.length);
			console.log(productSrv.categories[0]);
			// console.log(productSrv.categories[0].id);
			for (i=0; i < productSrv.categories.length; i++){
				if (productSrv.categories[i].id == catId){
					productSrv.categories[i].label = data;
					//call update function here to make sure localStorage is updated as well
					// console.log("new value >> " + productSrv.categories[i].value);
					productSrv.updateCategories(); 
				}
				// console.log(data, catId);
			}
		}

		function categoryRemove(id) {
			productSrv.deleteCategory(id);
		}

	}