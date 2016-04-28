(function(){

	angular
	.module('shopApp')
	.controller('ProductCtrl',ProductCtrl);

	function ProductCtrl($stateParams,api,productSrv,$location){
		var productVm = this;

		//Setting default Categories
		productSrv.setCategories();
		productVm.categories = productSrv.categories;

		// productVm.categories = [
		// 	{label:'Shirts',value:'shirts'},
		// 	{label:'Pants',value:'pants'},
		// 	{label:'Shoes',value:'shoes'},
		// 	{label:'Outerwear',value:'outerwear'},
		// 	{label:'Accessories',value:'accessories'},
		// ];

		// var categoriesToJSON = angular.toJson(productVm.categories);
		// localStorage.setItem("categories", categoriesToJSON);

		productVm.product = {
			};

		productVm.product_update_btn = 'Update Product';
		productVm.product_delete_btn = 'Remove Product';
		
		if($stateParams.productId != undefined){
			productSrv.getProduct($stateParams.productId)
			.then(function(res){
				console.log(res);
				productVm.product = res.data.product;
				//TODO #2 set category based on edit form based on 
				//product category
				for(var index in productVm.categories){
					if(productVm.product.category == productVm.categories[index].value){
						productVm.set_category = productVm.categories[index].value;
					}
				}
				
			})
		}

		//public functions
		productVm.addProduct = addProduct;
		productVm.updateProduct = updateProduct;
		productVm.deleteProduct = deleteProduct;

		function addProduct(){
			//TODO #2
			//create product object, pass to product service
			//Update text in button
			productSrv.addProduct({
				name: productVm.name,
				image: productVm.image,
				description: productVm.description,
				category: productVm.category,
				price: productVm.price,
				quantity: productVm.quantity
			});

			productVm.product_update_btn = 'sadsada';
		}

		function updateProduct(){
			productSrv.updateProduct(productVm.product, $stateParams.productId);
			console.log('you clicked it');
			//TODO #2
			//create product object, pass to product service
			//Update text in button
		}

		function deleteProduct(){
			//TODO #2
			//remove product, pass to product service
			//update text in button
			productSrv.deleteProduct($stateParams.productId);
		}
	}

})();




