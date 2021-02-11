import {onLoadCartNumbers} from './test.js';
onLoadCartNumbers();

let cart;

function getProductInCart() {
    cart = JSON.parse(sessionStorage.getItem("productsInCart"));
}


console.log(cart)

function displayCart() {
    getProductInCart();
    let productContainer = document.querySelector("#cart-tablebody");
    console.log(productContainer)
    if (cart && productContainer){
        productContainer.innerHTML = "";
        Object.values(cart).map(item => {
            productContainer.innerHTML += `
            <tr class="product"> 
            <th>${item.name}</th>
            <th>${item.inCart}</th>
            <th>${item.price}</th>
            </tr>
            `
        })
    }

    // Remove all items
    let btnDeleteFullCart = document.querySelector("#delete-command");

    btnDeleteFullCart.addEventListener('click', function(){
    sessionStorage.clear();
    
    productContainer.innerHTML = "";
})
}

displayCart();

