/* const { response } = require("express");
 */
//Recupérer API 
    let furnitures;
    let furnitureResult = document.querySelector(".row-cards");
    let productsResult = document.querySelector(".row-product");
    console.log(furnitureResult);
    console.log (productsResult);

    const fetchFurniture = async() => {
        furnitures = await fetch("http://localhost:3000/api/furniture")
        .then(response => response.json(), error => alert(error));
        console.log(furnitures);
    }
    //return pour valider
    fetchFurniture();

///Afficher les produits
    const showFurnitures = async() => {
        await fetchFurniture(); // on attends l'API
        furnitureResult.innerHTML = ( // on mets les données souhaitées dans la zone du html voulue
            furnitures  // on sait ce qu'est furnitures dans fetchFurniture // let furnitures = fetchFurniture() avec datas
                //.filter(furniture => furniture.name.toLowerCase())
                .map(furniture => ( // for each furniture of furnitures en qq sorte, map fait un array
                    //templates literals
                    `
                    <div class="col-12 col-lg-4">
                        <div class="card furniture mb-3">
                            <a class="furniture__link" href="html/product.html?id=${furniture._id}" id="${furniture._id}"> 
                            <img src="${furniture.imageUrl}" alt="meuble en chêne" class="card-img-top furniture__img">
                            </a>
                            <div class="card-body" id="test">
                                <p class="card-title furniture__name" id="name">${furniture.name}</p>
                                <p class="card-text furniture__varnish" id="varnish">${furniture.varnish}</p>
                                <p class="card-text furniture__description" id="description">${furniture.description}</p>
                                <p class="card-text furniture__price" id="test">${numberWithSpace(furniture.price)} €</p>
                            </div>
                        </div>
                    </div> 
                    `
                    )).join("") // eviter les virgules entre chaque éléments fait par map
        
        );
    };

    showFurnitures()

    // séparer les miliers pour les prix
    // utiliser Intl.NumberFormat
    function numberWithSpace(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    //export default numberWithSpace;