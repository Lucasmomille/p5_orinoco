import {onLoadCartNumbers} from './utils.js';
onLoadCartNumbers()


let productId;
let product;

// Search the product ID in URL
productId = new URL(window.location.href).searchParams.get('id');
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
    if (cartItems != null) { // si le panier n'est pas vide
        if(cartItems[productInfo._id] == undefined){ // si il n'est pas vide mais que l'id est undefined
            cartItems = { //rajouter l'id de l'élement ajouté
                ...cartItems,
                [productInfo._id]: productInfo
            }
        }
        cartItems[productInfo._id].inCart +=1; // si pas undefined alors rajouter 1
    }else{ // si le panier est vide rajouter 1 et set l'id
        productInfo.inCart = 1;
        cartItems = { // cartItems est un égal à un objet
            [productInfo._id]: productInfo
        }
    }
    sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));

    //Count products in cart
    const resultOrinoco = Object.keys(cartItems).reduce((sum, obj) => sum + cartItems[obj].inCart, 0); // ici on spécifie qu'on s'intéresse à cartItems.inCart, ce sont ces values à mettre dans l'accumulateur
    document.querySelector("#countCart").textContent = resultOrinoco;
    
    //Keep track of cart
    sessionStorage.setItem("cartNumbers", resultOrinoco); 
}

// get cart's total cost 

function totalCost(productInfo){
    
    let cartCost = sessionStorage.getItem('totalCost');

    if (cartCost != null){
        cartCost = parseInt(cartCost);
        sessionStorage.setItem("totalCost", cartCost + productInfo.price)
    }else{
        sessionStorage.setItem("totalCost", productInfo.price)
    }
}