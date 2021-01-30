// Global variables
let productId;
let products;


  // Search the product ID in URL
  productId = new URL(window.location.href).searchParams.get('id'); // appeler l'url entière (.href) de la page et chercher info id

  const fetchProduct = async() => {
    products = await fetch(`http://localhost:3000/api/furniture/${productId}`)
    .then(response => response.json(), error => alert(error));
    console.log(products);
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

    cloneTemplate.getElementById("p_name").textContent = products.name;
    cloneTemplate.getElementById("p_img").src = products.imageUrl;
    cloneTemplate.getElementById("p_description").textContent = products.description;
    cloneTemplate.getElementById("p_price").textContent = products.price + "€";
    // importer fonction numberWithSpace de script.js
    cloneTemplate.getElementById("btn").setAttribute("data-price", products.price);
    cloneTemplate.getElementById("btn").setAttribute("data-id", products._id);
    cloneTemplate.getElementById("btn").setAttribute("data-name", products.name);
    cloneTemplate.getElementById("btn").setAttribute("data-url", new URL(window.location.href));
    console.log(cloneTemplate.getElementById("btn"));
    document.querySelector(".row-product").appendChild(cloneTemplate);

///// Multiple choice varnish

    const displayVarnish = () => {
        const varnishResult = document.querySelector(".varnish");

        varnishResult.innerHTML = (
            products.varnish.map(element => (
                `<option value="${element}" id="p_varnish">${element}</option>`
                ))
        );
    }
    displayVarnish();
}

displayProduct();

