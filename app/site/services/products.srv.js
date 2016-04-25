(function(){

	angular
		.module('shopApp')
		.service('productSrv',ProductService);

	function ProductService($state,api){
		var self = this;
		//public variables
		self.products = [];

		// SEED DATA - Comment Out after first load
		addProduct({
			name: "Vitamin S",
			image: "http://bit.ly/1rdq6Bu",
			description: "See tee for description",
			category: "Shirts",
			price: 24,
			quantity: 5});

		addProduct({
			name: "Kids Can’t Die",
			image: "http://bit.ly/1rv9VQu",
			description: "See tee for description",
			category: "Shirts",
			price: 24,
			quantity: 5});
			
		addProduct({
			name: "Love Hate",
			image: "http://bit.ly/23WvY3M",
			description: "See tee for description",
			category: "Shirts",
			price: 24,
			quantity: 5});

		addProduct({
			name: "Grabby Mickey",
			image: "http://bit.ly/1Soaxkz",
			description: "See tee for description",
			category: "Pants",
			price: 24,
			quantity: 5});

		addProduct({
			name: "Cool Story Bro",
			image: "http://bit.ly/1QxurUI",
			description: "See tee for description",
			category: "Pants",
			price: 24,
			quantity: 5});



		//public functions
		self.getProduct = getProduct;
		self.getProducts = getProducts;
		self.addProduct = addProduct;
		self.updateProduct = updateProduct;
		self.updateProductList = updateProductList;
		self.removeProduct = removeProduct;
		self.deleteProduct = deleteProduct;

		function getProducts(){
			return api.request('/products',{},'GET')
			.then(function(res){
				//success callback
				console.log(res);
				self.products = res.data.products;
				return res.data.products;
			},function(res){
				//error callback
				console.log(res);
				return;
			})
		}

		function addProduct(product){
			api.request('/products',product,'POST')
			.then(function(res){
				console.log(res);
				if(res.status === 200){
					//product was added successfully
					self.products.push(res.data.product);
					$state.go('admin.dash');
				}
			})
		}

		function updateProduct(product,productId){
			api.request('/products/'+productId,product,'PUT')
			.then(function(res){
				console.log(res);
				if(res.status === 200){
					//product was updated successfully
					self.updateProductList(product,productId);
				}
			})
		}

		function deleteProduct(productId){
			api.request('/products/'+productId,{},'DEL')
			.then(function(res){
				console.log(res);
				if(res.status === 200){
					//product was deleted successfully
					self.removeProduct(productId);

					self.getProducts();
					$state.go('admin.dash');
				}
			})
		}

		function getProduct(productId){
			return api.request('/products/'+productId,{},'GET');
		}

		function updateProductList(product,productId){
			for(var i=0;i < self.products.length;i++){
				if(self.products[i].id == productId){
					self.products[i].name = product.name;
					self.products[i].image = product.image;
					self.products[i].description = product.description;
					self.products[i].category = product.category;
					self.products[i].price = product.price;
					self.products[i].quantity = product.quantity;
				}
			}
			$state.go('admin.dash');
		}

		function removeProduct(productId){
			for(var i=0;i < self.products.length;i++){
				if(self.products[i].id == productId){
					delete self.products[i];
					$state.go('admin.dash');
				}
			}
		}
	}
})();