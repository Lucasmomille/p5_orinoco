import {onLoadCartNumbers} from './utils.js';
// Global variables
let productId;
let product;

//import numberWithSpace from 'home.js';

// Search the product ID in URL
productId = new URL(window.location.href).searchParams.get('id'); // appeler l'url entière (.href) de la page et chercher info id
//new URL crée objet puisque URL est une classe
const fetchProduct = async() => {
    product = await fetch(`http://localhost:3000/api/furniture/${productId}`)
    .then(response => response.json(), error => alert(error));
}

/* main()
async function main (){
    await fetchProduct()
    .then(function() {displayProduct();})
    
} */
///////////////////////////////Display the selected product///////////////

const displayProduct = async() => {
    await fetchProduct();
    const template = document.querySelector("#template");
    const cloneTemplate = document.importNode(template.content, true);
    
    cloneTemplate.getElementById("p_name").textContent = product.name;
    cloneTemplate.getElementById("p_img").src = product.imageUrl;
    cloneTemplate.getElementById("p_description").textContent = product.description;
    cloneTemplate.getElementById("p_price").textContent = product.price + "€";
    document.querySelector(".row-product").appendChild(cloneTemplate);
    
    ///// Multiple choice varnish
    
    displayVarnish();
    
    /// Stock info 
    let productInfos = [
        {"name": product.name, 
        "id": product._id, 
        "price": product.price,
        "inCart": 0}
    ];
    /// Counting
    
    let carts = document.querySelectorAll(".btn");
    
    for (let i=0; i < carts.length; i++){
        
        carts[i].addEventListener("click", (event)=>{
            event.preventDefault();
            cartNumbers(productInfos[i]);
            totalCost(productInfos[i]);

        })
    }
}

displayProduct();  

// Varnish choice
const displayVarnish = () => {
    const varnishResult = document.querySelector(".varnish");
    
    varnishResult.innerHTML = (
        product.varnish.map(element => (
            `<option value="${element}" id="p_varnish">${element}</option>`
        ))
    );
}
        
// Counting number of stock product 
function cartNumbers(productInfo) {
    
    let productNumbers = sessionStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    
    /* if (productNumbers){
        sessionStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector("#countCart").textContent = productNumbers + 1;
    } else {
        sessionStorage.setItem("cartNumbers", 1);
        document.querySelector("#countCart").textContent = 1;
    } */
    setItems(productInfo);

}

// Storage
function setItems(productInfo) {
    console.log("set items run");
    
    let cartItems = sessionStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if(cartItems[productInfo.id] == undefined){
            cartItems = {
                ...cartItems,
                [productInfo.id]: productInfo
            }
        }
        cartItems[productInfo.id].inCart +=1;
    }else{
        productInfo.inCart = 1;
        cartItems = { // cartItems est un égal à un objet
            [productInfo.id]: productInfo
        }
    }
    sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));

    //Count
    const resultOrinoco = Object.keys(cartItems).reduce((sum, obj) => sum + cartItems[obj].inCart, 0);
    console.log(resultOrinoco);
    document.querySelector("#countCart").textContent = resultOrinoco;
}


function totalCost(productInfo){
    
    let cartCost = sessionStorage.getItem('totalCost');

    if (cartCost != null){
        cartCost = parseInt(cartCost);
        sessionStorage.setItem("totalCost", cartCost + productInfo.price)
    }else{
        sessionStorage.setItem("totalCost", productInfo.price)
    }
    console.log("product price is", cartCost);

}
// onload keep track basket

onLoadCartNumbers()

const a = {
    cart: {
      items: {
        A: {number: 'xxx', quantity: 1, price: 999}, 
        B: {number: 'xxx', quantity: 3, price: 999}, 
        C :{number: 'xxx', quantity: 2, price: 999} 
      }
    }
  };
  
  const result = Object.keys(a.cart.items).reduce((sum, key) => sum + a.cart.items[key].quantity, 0);
  console.log(result);

  const resultTest = Object.keys(a.cart.items);
  console.log(resultTest);

