
import {onLoadCartNumbers} from './utils.js';
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

    // Display total cost
    let total = document.querySelector("#total");
    let totalCost = JSON.parse(sessionStorage.getItem("totalCost"));
    console.log(total);
    total.innerHTML = totalCost;

    // Remove all items
    let btnDeleteFullCart = document.querySelector("#delete-command");

    btnDeleteFullCart.addEventListener('click', function(){
    sessionStorage.clear();
    
    productContainer.innerHTML = "";
    total.innerHTML = "";
    document.querySelector("#countCart").textContent = "";
    })
}

displayCart();

