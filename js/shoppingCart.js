const shoppingCartDom = document.querySelector(".shopping-cart .products");

if (!user) {
	window.location = "index.html";
}

// Add Products In The Dom
const addToShoppingCartDom = () => {
	if (user) {
		if (shoppingCartDom) {
			if (user.cartProducts.length > 0) {
				shoppingCartDom.innerHTML = user.cartProducts.map((product) => {
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
                                <button class="add-to-cart" onclick="removeFromCartButton(${product.id}),addToShoppingCartDom()">Remove</button>
                                <i onclick="addToFavoriteButton(${product.id})" id="${product.id}" class="fa-regular fa-heart favorite"></i>
                            </div>
                        </div>
                    `;
				});
			} else {
				shoppingCartDom.innerHTML = "";
			}

			// Remove " , " From Between Products
			removeNodeText(shoppingCartDom);
		}
	}
	runAllNavFunctions();
};
addToShoppingCartDom();
