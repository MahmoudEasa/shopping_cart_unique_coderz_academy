const navUl = document.querySelector(".nav-ul");
const productsDom = document.querySelector(".products");
let user;
let cartProducts = [];
let favoriteProducts = [];

// Hide Item If Window Click
const hideItemOnWindowClick = (item, target) => {
	if (user) {
		window.addEventListener("click", (e) => {
			if (e.target != target && e.target != item) {
				item.classList.add("hide");
			}
		});
	}
};

// Set CartProducts If localStorage.getItem("cartProducts")
if (localStorage.getItem("cartProducts")) {
	cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
}

// Set favoriteProducts If localStorage.getItem("favoriteProducts")
if (localStorage.getItem("favoriteProducts")) {
	favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts"));
}

// Sign Out
const signOutfun = () => {
	const signOut = document.querySelector(".sign-out");
	if (signOut) {
		signOut.addEventListener("click", () => {
			if (localStorage.getItem("user")) {
				localStorage.removeItem("user");
				window.location.replace("login.html");
			}
		});
	}
};

// Products Data
const products = [
	{
		id: 1,
		title: "product-1",
		desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, qui!",
		size: "Size: L",
		img: "/images/product-1.jpeg",
	},
	{
		id: 2,
		title: "product-2",
		desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, qui!",
		size: "Size: XL",
		img: "/images/product-2.jpeg",
	},
	{
		id: 3,
		title: "product-3",
		desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, qui!",
		size: "Size: M",
		img: "/images/product-3.jpeg",
	},
	{
		id: 4,
		title: "product-4",
		desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, qui!",
		size: "Size: XXL",
		img: "/images/product-4.jpeg",
	},
	{
		id: 5,
		title: "product-5",
		desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, qui!",
		size: "Size: XXL",
		img: "images/product-5.jpeg",
	},
];

// Remove " , " From Between Products
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
		cartProducts.length > 0
			? (result = cartProducts.map((product) => {
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
		favoriteProducts.length > 0
			? (result = favoriteProducts.map((product) => {
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

// If Sign In Change The Nav Links
const runProductsNavLinks = () => {
	if (localStorage.getItem("user")) {
		user = JSON.parse(localStorage.getItem("user"));
		navUl.innerHTML = `
			<li>${user.username}</li>
			<li class="sign-out">Sign Out</li>

			<li class="shopping-cart-icon-li">
				<i class="fa-solid fa-cart-shopping shopping-cart-icon">
					<span>0</span>
				</i>
				<div class="carts-products ${
					cartProducts.length <= 0 && "flex-row"
				} shopping-cart-toggle hide">
					${
						cartProducts.length > 0
							? `<button class="add-to-cart"><a href="cartShopping.html">Show All</a></button>`
							: ""
					}
					
					${productDomNavCart("shoppingCart")}

					${
						cartProducts.length > 0
							? `<button onclick="removeAllProducts()" class="add-to-cart">Remove All</button>`
							: ""
					}
				</div>
			</li>

			<li class="shopping-cart-icon-li">
				<i class="fa-regular fa-heart favorite-icon">
					<span>0</span>
				</i>
				<div class="carts-products ${
					favoriteProducts.length <= 0 && "flex-row"
				} favorite-toggle hide">
					${
						favoriteProducts.length > 0
							? `<button class="add-to-cart"><a href="favoriteCart.html">Show All</a></button>`
							: ""
					}

					${productDomNavCart("favoriteCart")}
					
					${
						favoriteProducts.length > 0
							? `<button onclick="removeAllFavorite()" class="add-to-cart">Remove All</button>`
							: ""
					}
				</div>
			</li>
		`;
	}

	// Remove " , " From Between Carts Products
	const cartsProducts = document.querySelector(".carts-products");
	if (cartsProducts) {
		removeNodeText(cartsProducts);
	}
};

// Add Products In The Dom
if (productsDom) {
	productsDom.innerHTML = products.map((product) => {
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
					<button class="add-to-cart" onclick="addToCartButton(${product.id})">Add To Cart</button>
					<i onclick="addToFavoriteButton(${product.id})" id="${product.id}" class="fa-regular fa-heart favorite"></i>
				</div>
			</div>
		`;
	});

	// Remove " , " From Between Products
	removeNodeText(productsDom);
}

// Toggle Favorite Icons
const toggleFavoriteIcon = () => {
	if (localStorage.getItem("user")) {
		const favorite = document.querySelectorAll(".favorite");
		if (favoriteProducts.length > 0) {
			if (favorite) {
				for (const item of favorite) {
					item.classList.replace("fa-solid", "fa-regular");
				}

				for (const f of favoriteProducts) {
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
		shoppingCartIconNum.innerHTML = cartProducts.length;
	}
};

// Increase Favorite Icon Number
const increaseFavoriteIconNumber = () => {
	const favoriteIconNum = document.querySelector(".favorite-icon span");

	if (favoriteIconNum) {
		favoriteIconNum.innerHTML = favoriteProducts.length;
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
runAllNavFunctions();

// Add To Cart Button
const addToCartButton = (id) => {
	if (localStorage.getItem("user")) {
		const productId = products.find((item) => item.id == id);

		// Check If Product In Array
		if (cartProducts.length > 0) {
			let findProduct = false;
			cartProducts.map((product) => {
				if (product.id == productId.id) {
					findProduct = true;
				}
			});

			if (!findProduct) {
				cartProducts.push(productId);
			}
		} else {
			cartProducts.push(productId);
		}

		localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
	} else {
		window.location = "login.html";
	}

	// Run All Nav Bar Functions
	runAllNavFunctions();
};

// Remove From Cart Button
const removeFromCartButton = (id) => {
	const filteredProducts = cartProducts.filter((item) => item.id != id);
	cartProducts = filteredProducts;
	localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

	// Run All Nav Bar Functions
	runAllNavFunctions();
};

// Remove All From Cart
const removeAllProducts = () => {
	cartProducts = [];
	localStorage.removeItem("cartProducts");

	// Run All Nav Bar Functions
	runAllNavFunctions();
};

// Add To Favorite Button
const addToFavoriteButton = (id) => {
	if (localStorage.getItem("user")) {
		const productFind = products.find((item) => item.id == id);

		// Check If Product In Array
		if (favoriteProducts.length > 0) {
			let findProduct = false;

			favoriteProducts.map((item) => {
				if (item.id == productFind.id) {
					findProduct = true;
				}
			});

			if (!findProduct) {
				favoriteProducts.push(productFind);
			} else {
				const removeItem = favoriteProducts.filter(
					(item) => item.id != productFind.id
				);

				favoriteProducts = removeItem;
			}

			findProduct = false;
		} else {
			favoriteProducts.push(productFind);
		}
		localStorage.setItem(
			"favoriteProducts",
			JSON.stringify(favoriteProducts)
		);
	} else {
		window.location = "login.html";
	}

	// Run All Nav Bar Functions
	runAllNavFunctions();
};

// Remove From Favorite Button
const removeFromFavoriteButton = (id) => {
	const filteredFavorites = favoriteProducts.filter((item) => item.id != id);
	favoriteProducts = filteredFavorites;
	localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
	console.log(id);

	// Run All Nav Bar Functions
	runAllNavFunctions();
};

// Remove All From Favorite
const removeAllFavorite = () => {
	favoriteProducts = [];
	localStorage.removeItem("favoriteProducts");

	// Run All Nav Bar Functions
	runAllNavFunctions();
};

//
//
//
//
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
// 				if (cartProducts.length > 0) {
// 					let findProduct = false;
// 					cartProducts.map((product) => {
// 						if (product.id == productId[0].id) {
// 							findProduct = true;
// 						}
// 					});

// 					if (!findProduct) {
// 						cartProducts.push(productId[0]);
// 					}
// 				} else {
// 					cartProducts.push(productId[0]);
// 				}

// 				localStorage.setItem(
// 					"cartProducts",
// 					JSON.stringify(cartProducts)
// 				);
// 			} else {
// 				window.location = "login.html";
// 			}

// 			// Increase Shopping Cart Icon Number
// 			if (shoppingCartIconNum) {
// 				shoppingCartIconNum.innerHTML = cartProducts.length;
// 			}
// 		});
// 	}
// }
