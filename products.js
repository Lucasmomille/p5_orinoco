import {onLoadCartNumbers} from './utils.js';
onLoadCartNumbers()
// Global variables
let productId;
let product;

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
    cloneTemplate.getElementById("p_price").textContent = new Intl.NumberFormat().format(product.price) + "€";
    document.querySelector(".row-product").appendChild(cloneTemplate);
    
    ///// Multiple choice varnish
    
    displayVarnish();
    
    /// Stock info 
    let productInfos = [
        {"name": product.name, 
        "_id": product._id, 
        "price": product.price,
        "inCart": 0}
    ];
    /// Counting
    
    let carts = document.querySelectorAll(".btn");
    
    for (let i=0; i < carts.length; i++){
        
        carts[i].addEventListener("click", (event)=>{
            event.preventDefault();
            setItems(productInfos[i]);
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

// Storage
function setItems(productInfo) {
    console.log("set items run");
    
    let cartItems = sessionStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if(cartItems[productInfo._id] == undefined){
            cartItems = {
                ...cartItems,
                [productInfo._id]: productInfo
            }
        }
        cartItems[productInfo._id].inCart +=1;
    }else{
        productInfo.inCart = 1;
        cartItems = { // cartItems est un égal à un objet
            [productInfo._id]: productInfo
        }
    }
    sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));

    //Count
    const resultOrinoco = Object.keys(cartItems).reduce((sum, obj) => sum + cartItems[obj].inCart, 0); // sum est l'accumulateur, obj current value c'est à dire la valeur du tableau sur laquelle l'accumulateur passe
                    //on ajoute à chaque fois la nouvelle value dans l'accumulateur au reste dejà évalué (sum + obj)
                    // ici on spécifie qu'on s'intéresse à cartItems.inCart, ce sont ces values à mettre dans l'accumulateur
    console.log(resultOrinoco);
    document.querySelector("#countCart").textContent = resultOrinoco;
    //keep track of cart
    sessionStorage.setItem("cartNumbers", resultOrinoco); 
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
// onload keep track cart




