const favoriteDom = document.querySelector(".favorite-cart .products");

if (!user) {
	window.location = "index.html";
}

// Add Products In The Dom
const addToFavoriteDom = () => {
	if (user) {
		if (favoriteDom) {
			if (user.favoriteProducts.length > 0) {
				favoriteDom.innerHTML = user.favoriteProducts.map((product) => {
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
                            <i onclick="addToFavoriteButton(${product.id}),addToFavoriteDom()" id="${product.id}" class="fa-regular fa-heart favorite"></i>
                            </div>
                            </div>
                            `;
				});
			} else {
				favoriteDom.innerHTML = "";
			}

			// Remove " , " From Between Products
			removeNodeText(favoriteDom);
		}
	}
	runAllNavFunctions();
};
addToFavoriteDom();
