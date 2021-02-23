
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

function getOrder() {
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
}

getOrder()


///Check entries form
const firstname = document.getElementById('user-firstname');
const lastname = document.getElementById('user-lastname');
const adress = document.getElementById('user-adress');
const email = document.getElementById('user-mail');
const city = document.getElementById('user-city');

let regeXemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regeXpostal = /[0-9]{5}(-[0-9]{4})?/;


function validElt(elt) {
    elt.classList.add = ("border-info", "shadow");
}
function invalidElt(elt) {
    elt.classList.add = ("border-danger", "shadow");
}
function neutralElt(elt) {
    console.log("ok");
}
/* function isEmail() {
	if (email.value.match(regeXemail)) {
        email.style.border = 'solid 1px green';
        
    } else {
        email.classList.add = ("border-danger", "shadow");
    }
}
isEmail() */

function checkForm(elt, condition) {
    elt.oninput = (e) => {
      if (eval(condition)) {
        validElt(e.target)
      } else {
        neutralElt(e.target)
      }
    }
  
    elt.onblur = (e) => {
      if (!eval(condition)) {
        invalidElt(e.target)
      }
    }
}

function checkSubmit() {
    document.getElementById('confirm-command').onclick = (e) => {
      e.preventDefault()
      getOrder()
    
    console.log('ok')
    checkForm(firstname, 'e.target.value.length > 1');
    checkForm(lastname, 'e.target.value.length > 1');
    checkForm(email, regeXemail + '.test(e.target.value)');
    checkForm(adress, 'e.target.value.length > 6');
    checkForm(city, 'e.target.value.length > 1');
    }
}

checkSubmit();
