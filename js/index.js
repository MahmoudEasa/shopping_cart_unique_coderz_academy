const productsDom = document.querySelector(".home .products");

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

runAllNavFunctions();
