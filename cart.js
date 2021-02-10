
let cart;

function getProductInCart() {
    cart = JSON.parse(sessionStorage.getItem("productsInCart"));
}

getProductInCart()