import {onLoadCartNumbers} from './p5_12_utils.js';
onLoadCartNumbers()

let productId;
let product;

// Search the product ID in URL
productId = new URL(window.location.href).searchParams.get('id');
const fetchProduct = async() => {
    product = await fetch(`http://localhost:3000/api/furniture/${productId}`)
    .then(response => response.json(), error => alert(error));
}

//////////////////Display the selected product///////////////

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
    /// Set session storage
    
    let carts = document.querySelectorAll(".btn");
    
    for (let i=0; i < carts.length; i++){
        
        carts[i].addEventListener("click", (e)=>{
            e.preventDefault();
            setItems(productInfos[i]);
            totalCost(productInfos[i]);

        })
    }
}

displayProduct();  

/////// Varnish choice
const displayVarnish = () => {
    const varnishResult = document.querySelector(".varnish");
    varnishResult.innerHTML = (
        product.varnish.map(element => (
            `<option value="${element}" id="p_varnish">${element}</option>`
        ))
    );
}

//////// Set selectd products in the storage
function setItems(productInfo) {
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
        cartItems = { 
            [productInfo._id]: productInfo
        }
    }
    sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));

    ///////Count products in cart
    const totalProducts = Object.keys(cartItems).reduce((sum, obj) => sum + cartItems[obj].inCart, 0); 
    document.querySelector("#countCart").textContent = totalProducts;
    
    //Keep track of cart
    sessionStorage.setItem("cartNumbers", totalProducts); 
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