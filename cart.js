
import {onLoadCartNumbers} from './utils.js';
onLoadCartNumbers();

let cart;

function getProductInCart() {
    cart = JSON.parse(sessionStorage.getItem("productsInCart"));
}


function displayCart() {
    getProductInCart();
    
    let productContainer = document.querySelector("#cart-tablebody");
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


/// Post form

function sendOrder() {
    getProductInCart();
    const firstname = document.getElementById('user-firstname').value
    const lastname = document.getElementById('user-lastname').value
    const adress = document.getElementById('user-adress').value
    const email = document.getElementById('user-mail').value
    const city = document.getElementById('user-city').value
  
    const items = Object.values(cart). map(item => {item._id});
    console.log(items)

    

    /* const order = {
        contact: {
          firstName: firstname,
          lastName: lastname,
          address: adress,
          city: city,
          email: email,
        },
        products: products,
    }
    console.log(product._id); */
}

sendOrder()

function getId() {
    getProductInCart();
    let test = document.querySelector(".test");
    test.innerHTML = Object.values(cart).map(item => `
    <span>${item._id} </span>
    `)
}
getId()

