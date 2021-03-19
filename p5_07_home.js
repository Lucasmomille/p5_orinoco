import {onLoadCartNumbers} from './p5_12_utils.js';
onLoadCartNumbers()
//Recupérer API 
    let furnitures;
    let furnitureResult = document.querySelector(".row-cards");

const fetchFurniture = async() => {
    furnitures = await fetch("http://localhost:3000/api/furniture")
    .then(response => response.json(), error => alert(error));
    console.log(furnitures);
}
fetchFurniture();

///Afficher les produits
const showFurnitures = async() => {
    await fetchFurniture();
    furnitureResult.innerHTML = (
        furnitures.map(furniture => (
            `
            <div class="col-12 col-lg-4">
                <div class="card furniture mb-3">
                    <a class="furniture__link" href="p5_04_product.html?id=${furniture._id}" id="${furniture._id}"> 
                    <img src="${furniture.imageUrl}" alt="meuble en chêne" class="card-img-top furniture__img">
                    </a>
                    <div class="card-body" id="test">
                        <p class="card-title furniture__name" id="name">${furniture.name}</p>
                        <p class="card-text furniture__description" id="description">${furniture.description}</p>
                        <p class="card-text furniture__price" id="test">${new Intl.NumberFormat().format(furniture.price)} €</p>
                    </div>
                </div>
            </div> 
            `
        )).join("")
    
    );
};

showFurnitures()