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

const displayProduct = async() => {
    await fetchProduct();
    console.log(products);
    const template = document.querySelector("#template");
    const cloneTemplate = document.importNode(template.content, true);

    cloneTemplate.getElementById("p_name").textContent = products.name;
    cloneTemplate.getElementById("p_img").src = products.imageUrl;
    cloneTemplate.getElementById("p_description").textContent = products.description;
    cloneTemplate.getElementById("p_price").textContent = products.price + "€";
    
    console.log(cloneTemplate.getElementById("p_img").src)

    document.querySelector(".row-product").appendChild(cloneTemplate);
}

displayProduct();

