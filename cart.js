
import {onLoadCartNumbers} from './utils.js';
import * as form from './form.js';
onLoadCartNumbers();
form.validateEmail();
form.validateCode();
form.checkSubmit();

let cart;

const getProductInCart = () => {
    cart = JSON.parse(sessionStorage.getItem("productsInCart"));
}

const displayCart = () => {
    getProductInCart();
    
    let productContainer = document.querySelector("#cart-tablebody");
    if (cart && productContainer){
        productContainer.innerHTML = "";
        Object.values(cart).map(item => {
            productContainer.innerHTML += `
            <tr class="product"> 
            <th>${item.name}</th>
            <th>${item.inCart}</th>
            <th>${new Intl.NumberFormat().format(item.price)}</th>
            </tr>
            `
        })
    }

    // Display total cost
    let total = document.querySelector("#total");
    let totalCost = JSON.parse(sessionStorage.getItem("totalCost"));
    total.innerHTML = new Intl.NumberFormat().format(totalCost);

    // Remove all items
    let btnDeleteFullCart = document.querySelector("#delete-command");

    btnDeleteFullCart.addEventListener('click', () => {
        sessionStorage.clear();
        productContainer.innerHTML = "";
        total.innerHTML = "";
        document.querySelector("#countCart").textContent = "";
    })
}

displayCart();

/// Post form

const getOrder = () => {
    getProductInCart();
    const firstname = document.getElementById('user-firstname').value
    const lastname = document.getElementById('user-lastname').value
    const adress = document.getElementById('user-adress').value
    const email = document.getElementById('user-mail').value
    const city = document.getElementById('user-city').value

    const products = Object.values(cart).map(product => {return product._id});
    console.log(products)

 //// Renvoyer l'objet contact + array de string product._id
    const order = {
        contact: {
          firstName: firstname,
          lastName: lastname,
          address: adress,
          city: city,
          email: email,
        },
        products: products,
    }
    //console.log(order);

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }

    fetch("http://localhost:3000/api/furniture/order", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      sessionStorage.clear()
      window.location.href = `${window.location.origin}/ordersend.html?orderId=${json.orderId}`
    }) 
    .catch((error) => {
        alert(error)
    }) 
}

//getOrder()

const orderForm = document.getElementById("form");

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getOrder()
})