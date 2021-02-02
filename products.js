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
    console.log(product);
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
    cloneTemplate.getElementById("btn").setAttribute("data-price", product.price);
    cloneTemplate.getElementById("btn").setAttribute("data-id", product._id);
    cloneTemplate.getElementById("btn").setAttribute("data-name", product.name);
    cloneTemplate.getElementById("btn").setAttribute("data-url", new URL(window.location.href));
    console.log(cloneTemplate.getElementById("btn"));
    document.querySelector(".row-product").appendChild(cloneTemplate);

///// Multiple choice varnish

    const displayVarnish = () => {
        const varnishResult = document.querySelector(".varnish");

        varnishResult.innerHTML = (
            product.varnish.map(element => (
                `<option value="${element}" id="p_varnish">${element}</option>`
                ))
        );
    }
    displayVarnish();
}

displayProduct();


const addToCart = async() => {
    await fetchProduct();
    console.log("ok");
    let productInfo = {"name": product.name, "id": product._id, "price": product.price};
    localStorage.setItem("productInfo", JSON.stringify(productInfo));
}

addToCart();