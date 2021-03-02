
import {onLoadCartNumbers} from './utils.js';
import {validateEmail} from './form.js';
import {checkSubmit} from './form.js';
import {validateCode} from './form.js';
onLoadCartNumbers();
validateEmail();
validateCode();
checkSubmit();

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
    console.log(order);

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }

    fetch("http://localhost:3000/api/furniture/order", requestOptions)
    
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      localStorage.removeItem('shoppingCart')
     /*  window.location.href = `${window.location.origin}/orderStatus.html?orderId=${json.orderId}`
    }) */
    .catch(() => {
        alert(error)
      })
}

getOrder()

