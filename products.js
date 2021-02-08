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
    // importer fonction numberWithSpace de script.js export composant
 /*    cloneTemplate.getElementById("btn").setAttribute("data-price", product.price);
    cloneTemplate.getElementById("btn").setAttribute("data-id", product._id);
    cloneTemplate.getElementById("btn").setAttribute("data-name", product.name);
    cloneTemplate.getElementById("btn").setAttribute("data-url", new URL(window.location.href)); */
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
    
    console.log(carts+"ok");
    
    for (let i=0; i < carts.length; i++){
        
        carts[i].addEventListener("click", (event)=>{
            event.preventDefault();
            cartNumbers(productInfos[i]);
        })
    }
    
    // Storage
    /*  let addToCartBtn = document.getElementById('btn');
    console.log(addToCartBtn);
    addToCartBtn.addEventListener("click", function(event){
        event.preventDefault();
        //let productInfo = {"name": product.name, "id": product._id, "price": product.price};
        //console.log(productInfos);
        sessionStorage.setItem("productInfos", JSON.stringify(productInfos));
    }) */
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
            
            if (productNumbers){
                sessionStorage.setItem("cartNumbers", productNumbers + 1);
                document.querySelector("#countCart").textContent = productNumbers + 1;
            } else {
                sessionStorage.setItem("cartNumbers", 1);
                document.querySelector("#countCart").textContent = 1;
            }
            setItems(productInfo);
        }
        
        // Storage
        function setItems(productInfo) {
            console.log("set items run");
            
            let cartItems = sessionStorage.getItem("productsInCart");
            cartItems = JSON.parse(cartItems);
            console.log(cartItems, "ok");
            if (cartItems != null) {
                if(cartItems[productInfo.id]== undefined){
                    cartItems = {
                        ...cartItems,
                        [productInfo.id]: productInfo
                    }
                }
                cartItems[productInfo.id].inCart +=1;
            } else {
                productInfo.inCart = 1;
                cartItems = {
                    [productInfo.id]: productInfo
                }
            }
            sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));
        }
        // onload keep track basket
        function onLoadCartNumbers() {
            let productNumbers = sessionStorage.getItem("cartNumbers");
            if(productNumbers) {
                document.querySelector("#countCart").textContent = productNumbers;
            }
        }
        
        onLoadCartNumbers()