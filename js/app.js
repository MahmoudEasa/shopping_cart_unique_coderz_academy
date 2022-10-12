const navUl = document.querySelector(".nav-ul");
let user = JSON.parse(localStorage.getItem("user")) || "";
let users = JSON.parse(localStorage.getItem("users")) || "";

// Hide Item On Window Click
const hideItemOnWindowClick = (item, target) => {
	if (user) {
		window.addEventListener("click", (e) => {
			if (e.target != target && e.target != item) {
				item.classList.add("hide");
			}
		});
	}
};

// Sign Out
const signOutfun = () => {
	const signOut = document.querySelector(".sign-out");
	const findUser = users.findIndex((item) => item.username === user.username);
	if (signOut) {
		signOut.addEventListener("click", () => {
			users[findUser] = user;
			localStorage.setItem("users", JSON.stringify(users));
			localStorage.removeItem("user");
			window.location.replace("login.html");
		});
	}
};

// Remove " , " From Between Products removeNodeText(productsDom)
const removeNodeText = (productsDom) => {
	for (const node of productsDom.childNodes) {
		if (node.nodeName == "#text") {
			node.remove();
		}
	}
};

// Add Products to Nav bar shopping cart
const productDomNavCart = (type) => {
	let result;
	if (type === "shoppingCart") {
		user.cartProducts.length > 0
			? (result = user.cartProducts.map((product) => {
					return `
					<div class="product-item">
						<img
							src=${product.img}
							alt=${product.title}
							class="product-item-img"
						/>
						<div class="product-item-desc">
							<h2>${product.title}</h2>
							<p>${product.desc}</p>
							<span>${product.size}</span>
							</div>
							<div class="product-item-actions">
								<button class="add-to-cart remove-from-cart" onclick="removeFromCartButton(${product.id})">Remove</button>
							</div>
					</div>
				`;
			  }))
			: (result = `<div class="shopping-empty">Shopping Cart is Empty</div>`);
	}

	if (type === "favoriteCart") {
		user.favoriteProducts.length > 0
			? (result = user.favoriteProducts.map((product) => {
					return `
					<div class="product-item">
						<img
							src=${product.img}
							alt=${product.title}
							class="product-item-img"
						/>
						<div class="product-item-desc">
							<h2>${product.title}</h2>
							<p>${product.desc}</p>
							<span>${product.size}</span>
						</div>
						<div class="product-item-actions">
							<button class="add-to-cart remove-from-cart" onclick="removeFromFavoriteButton(${product.id})">Remove</button>
						</div>
					</div>
				`;
			  }))
			: (result = `<div class="shopping-empty">Favorite Cart is Empty</div>`);
	}
	return result;
};

// Carts Products Shopping Cart Nav Bar
const cartsProductsShoppingDiv = () => {
	if (user) {
		return `
			<div class="carts-products ${
				user.cartProducts.length <= 0 ? "flex-row" : ""
			} shopping-cart-toggle hide">
				${
					user.cartProducts.length > 0
						? `<a href="shoppingCart.html"><button class="add-to-cart">Show All</button></a>`
						: ""
				}
				
				${productDomNavCart("shoppingCart")}

				${
					user.cartProducts.length > 0
						? `<button onclick="removeAllProducts()" class="add-to-cart">Remove All</button>`
						: ""
				}
			</div>
		
		`;
	}
};

// Carts Products Favorite Nav Bar
const cartsProductsFavoriteDiv = () => {
	if (user) {
		return `
			<div class="carts-products ${
				user.favoriteProducts.length <= 0 ? "flex-row" : ""
			} favorite-toggle hide">
				${
					user.favoriteProducts.length > 0
						? `<a href="favoriteCart.html"><button class="add-to-cart">Show All</button></a>`
						: ""
				}

				${productDomNavCart("favoriteCart")}
				
				${
					user.favoriteProducts.length > 0
						? `<button onclick="removeAllFavorite()" class="add-to-cart">Remove All</button>`
						: ""
				}
			</div>
		`;
	}
};

// If Sign In Change The Nav Links
const runProductsNavLinks = () => {
	if (user) {
		navUl.innerHTML = `
			<li>${user.username}</li>
			<li class="sign-out">Sign Out</li>

			<li class="shopping-cart-icon-li">
				<i class="fa-solid fa-cart-shopping shopping-cart-icon">
					<span>0</span>
				</i>
				${cartsProductsShoppingDiv()}
			</li>

			<li class="shopping-cart-icon-li">
				<i class="fa-regular fa-heart favorite-icon">
					<span>0</span>
				</i>
				${cartsProductsFavoriteDiv()}
			</li>
		`;
	}

	// Remove " , " From Between Carts Products
	const cartsProducts = document.querySelectorAll(".carts-products");
	if (cartsProducts) {
		for (const item of cartsProducts) {
			removeNodeText(item);
		}
	}
};

// Toggle Favorite Icons
const toggleFavoriteIcon = () => {
	if (localStorage.getItem("user")) {
		const favorite = document.querySelectorAll(".favorite");
		if (user.favoriteProducts.length > 0) {
			if (favorite) {
				for (const item of favorite) {
					item.classList.replace("fa-solid", "fa-regular");
				}

				for (const f of user.favoriteProducts) {
					for (const item of favorite) {
						if (
							item.classList.contains("fa-regular") &&
							item.id == f.id
						) {
							item.classList.replace("fa-regular", "fa-solid");
						}
					}
				}
			}
		} else {
			if (favorite) {
				for (const item of favorite) {
					item.classList.replace("fa-solid", "fa-regular");
				}
			}
		}
	}
};

// Increase Shopping Cart Icon Number
const increaseShoppingCartIconNumber = () => {
	const shoppingCartIconNum = document.querySelector(
		".shopping-cart-icon span"
	);

	if (shoppingCartIconNum) {
		shoppingCartIconNum.innerHTML = user.cartProducts.length;
	}
};

// Increase Favorite Icon Number
const increaseFavoriteIconNumber = () => {
	const favoriteIconNum = document.querySelector(".favorite-icon span");

	if (favoriteIconNum) {
		favoriteIconNum.innerHTML = user.favoriteProducts.length;
	}
};

// Increase All
const increaseAll = () => {
	// Increase Shopping Cart Icon Number
	increaseShoppingCartIconNumber();

	// Increase Favorite Icon Number
	increaseFavoriteIconNumber();
};

// Toggle Shopping Cart Nav Bar and Favorite Cart
// Shopping Cart
const shoppingCartToggle = () => {
	const favoriteCartNav = document.querySelector(".favorite-toggle");
	const shoppingCartIcon = document.querySelector(".shopping-cart-icon");
	const cartsProductsNav = document.querySelector(".shopping-cart-toggle");
	if (shoppingCartIcon) {
		shoppingCartIcon.addEventListener("click", (e) => {
			if (cartsProductsNav) {
				cartsProductsNav.addEventListener("click", (e) => {
					e.stopPropagation();
				});
				cartsProductsNav.classList.toggle("hide");
				favoriteCartNav.classList.add("hide");
			}
			e.stopPropagation();
		});
	}
	hideItemOnWindowClick(cartsProductsNav, shoppingCartIcon);
};
// Favorite Cart
const favoriteCartToggle = () => {
	const favoriteCartIcon = document.querySelector(".favorite-icon");
	const favoriteCartNav = document.querySelector(".favorite-toggle");
	const cartsProductsNav = document.querySelector(".shopping-cart-toggle");
	if (favoriteCartIcon) {
		favoriteCartIcon.addEventListener("click", (e) => {
			if (favoriteCartNav) {
				favoriteCartNav.addEventListener("click", (e) => {
					e.stopPropagation();
				});
				favoriteCartNav.classList.toggle("hide");
				cartsProductsNav.classList.add("hide");
			}
			e.stopPropagation();
		});
	}
	hideItemOnWindowClick(favoriteCartNav, favoriteCartIcon);
};
// Toggle Shopping and Favorite Cart
const toggleCartsNav = () => {
	// Shopping Cart Toggle
	shoppingCartToggle();

	// Favorite Cart Toggle
	favoriteCartToggle();
};

// Run All Nav Bar Functions
const runAllNavFunctions = () => {
	// Run Toggle Favorite Icon
	toggleFavoriteIcon();
	// Run Nav bar
	runProductsNavLinks();
	// Run increase All
	increaseAll();
	// Run Toggle Shopping Cart Nav Bar
	toggleCartsNav();
	// Run Sign Out Function
	signOutfun();
};

// Add To Cart Button
const addToCartButton = (id) => {
	if (user) {
		const productId = products.find((item) => item.id == id);

		// Check If Product In Array
		if (user.cartProducts.length > 0) {
			let findProduct = false;
			user.cartProducts.map((product) => {
				if (product.id == productId.id) {
					findProduct = true;
				}
			});

			if (!findProduct) {
				user.cartProducts.push(productId);
			}
		} else {
			user.cartProducts.push(productId);
		}

		localStorage.setItem("user", JSON.stringify(user));
	} else {
		window.location = "login.html";
	}

	// Run All Nav Bar Functions
	runAllNavFunctions();
};

// Remove From Cart Button
const removeFromCartButton = (id) => {
	const filteredProducts = user.cartProducts.filter((item) => item.id != id);
	user.cartProducts = filteredProducts;
	localStorage.setItem("user", JSON.stringify(user));

	// Run All Nav Bar Functions
	runAllNavFunctions();
};

// Remove All From Cart
const removeAllProducts = () => {
	user.cartProducts = [];
	localStorage.setItem("user", JSON.stringify(user));

	// Run All Nav Bar Functions
	runAllNavFunctions();
};

// Add To Favorite Button
const addToFavoriteButton = (id) => {
	if (user) {
		const productFind = products.find((item) => item.id == id);

		// Check If Product In Array
		if (user.favoriteProducts.length > 0) {
			let findProduct = false;

			user.favoriteProducts.map((item) => {
				if (item.id == productFind.id) {
					findProduct = true;
				}
			});

			if (!findProduct) {
				user.favoriteProducts.push(productFind);
			} else {
				const removeItem = user.favoriteProducts.filter(
					(item) => item.id != productFind.id
				);

				user.favoriteProducts = removeItem;
			}

			findProduct = false;
		} else {
			user.favoriteProducts.push(productFind);
		}
		localStorage.setItem("user", JSON.stringify(user));
	} else {
		window.location = "login.html";
	}

	// Run All Nav Bar Functions
	runAllNavFunctions();
};

// Remove From Favorite Button
const removeFromFavoriteButton = (id) => {
	const filteredFavorites = user.favoriteProducts.filter(
		(item) => item.id != id
	);
	user.favoriteProducts = filteredFavorites;
	localStorage.setItem("user", JSON.stringify(user));

	// Run All Nav Bar Functions
	runAllNavFunctions();
};

// Remove All From Favorite
const removeAllFavorite = () => {
	user.favoriteProducts = [];
	localStorage.setItem("user", JSON.stringify(user));

	// Run All Nav Bar Functions
	runAllNavFunctions();
};

//
// const addToCart = document.querySelectorAll(".add-to-cart");
// if (addToCart) {
// 	for (const item of addToCart) {
// 		item.addEventListener("click", (e) => {
// 			if (localStorage.getItem("user")) {
// 				const productId = products.filter(
// 					(item) => item.id == e.target.parentElement.parentElement.id
// 				);

// 				// Check If Product In Array
// 				if (user.cartProducts.length > 0) {
// 					let findProduct = false;
// 					user.cartProducts.map((product) => {
// 						if (product.id == productId[0].id) {
// 							findProduct = true;
// 						}
// 					});

// 					if (!findProduct) {
// 						user.cartProducts.push(productId[0]);
// 					}
// 				} else {
// 					user.cartProducts.push(productId[0]);
// 				}

// 				localStorage.setItem(
// 					"user.cartProducts",
// 					JSON.stringify(user.cartProducts)
// 				);
// 			} else {
// 				window.location = "login.html";
// 			}

// 			// Increase Shopping Cart Icon Number
// 			if (shoppingCartIconNum) {
// 				shoppingCartIconNum.innerHTML = user.cartProducts.length;
// 			}
// 		});
// 	}
// }
