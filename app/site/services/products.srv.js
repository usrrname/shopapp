(function(){

	angular
		.module('shopApp')
		.service('productSrv',ProductService);

	function ProductService($state,api){
		var self = this;
		//public variables
		self.products = [];
		
		if(localStorage.getItem("cart") == undefined){
			//console.log("undefined cart");
			self.cart = [];
		} else {
			//console.log(localStorage.getItem("cart"));
			cartRefresh();
			//console.log("defined cart");
		}

		if(localStorage.getItem("orders") == undefined){
			self.orders = [];
		} else {
			self.orders = JSON.parse(localStorage.getItem("orders"));
		}

		//public functions
		self.getProduct = getProduct;
		self.getProducts = getProducts;
		self.addProduct = addProduct;
		self.updateProduct = updateProduct;
		self.updateProductList = updateProductList;
		self.removeProduct = removeProduct;
		self.deleteProduct = deleteProduct;
		self.cartAdd = cartAdd;
		self.getCart = getCart;
		self.cartRemove = cartRemove;
		self.cartRefresh = cartRefresh;
		self.storageUpdate = storageUpdate;
		self.setCategories = setCategories;

		// Call function at the start to set categories in variable self.categories
		// so that can be called using productSrv
		
		setCategories();

		self.getProducts()
			.then(function(){

				if (self.products.length === 0){
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
				}
			});

		function getProducts(){
			return api.request('/products',{},'GET')
			.then(function(res){
				//success callback
				//console.log(res);
				self.products = res.data.products;
				return res.data.products;
			},function(res){
				//error callback
				//console.log(res);
				return;
			})
		}

		function addProduct(product){
			api.request('/products',product,'POST')
			.then(function(res){
				//console.log(res);
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
				//console.log(res);
				if(res.status === 200){
					//product was updated successfully
					self.updateProductList(product,productId);
				}
			})
		}

		function deleteProduct(productId){
			api.request('/products/'+productId,{},'DEL')
			.then(function(res){
				//console.log(res);
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

		// CART FUNCTIONS
		function cartAdd(id) {
			console.log("adding");
			var duplicate = false;
			// Check if item's already in cart, add quanitity if so
			for(var i = 0; i < self.cart.length; i++) {
				if(self.cart[i].id == id) {
					if (self.cart[i].count >= self.cart[i].quantity){
						self.cart[i].count = self.cart[i].quantity;
					} else {
						self.cart[i].count += 1;	
					}
					duplicate = true;
				}
			}

			if (!duplicate) {
				for(var i = 0; i < self.products.length; i++) {
					if(self.products[i].id == id) {
						self.cart.push(self.products[i]);
						self.cart[self.cart.length - 1].count = 1;
						
					}
				}
			}
			self.storageUpdate();
		}

		function storageUpdate(){
			for (var i = 0; i < self.cart.length; i++){
				if (self.cart[i].count == 0){
					self.cart.splice(i,1);
				}
			}
			var cart = angular.toJson(self.cart);
			localStorage.setItem("cart", cart);	
		}

		function cartRemove(id) {
			//console.log("remove");
			for (var i = 0; i < self.cart.length; i++){
				if (self.cart[i].id === id){
					//console.log("cart before: "+self.cart);
					self.cart.splice(i,1);
					//console.log("cart after: "+self.cart);
				}
			}
			self.storageUpdate();
		}

		self.defaultCategories = [
			{label:'Shirts',value:'shirts'},
			{label:'Pants',value:'pants'},
			{label:'Shoes',value:'shoes'},
			{label:'Outerwear',value:'outerwear'},
			{label:'Accessories',value:'accessories'},
		];

		function setCategories() {
			var categories = JSON.parse(localStorage.getItem("categories"));
			if (categories != null) {
				//get categories from localStorage if they exist
				self.categories = categories;
			}
			else {
				//set default categories if no category exists
				var categoriesToJSON = angular.toJson(self.defaultCategories);
				localStorage.setItem("categories", categoriesToJSON);
			}		
		}


		function cartRefresh(){
			//console.log('refreshing cart...');
			self.cart = JSON.parse(localStorage.getItem("cart"));
		}

		function getCart() {
			self.cart = JSON.parse(localStorage.getItem("cart"));
			return self.cart;
		}

	}
})();