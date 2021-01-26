/* const { response } = require("express");
 */
//Recupérer API 
    let furnitures;
    let furnitureResult = document.querySelector(".row-cards");
    console.log(furnitureResult);

    const fetchFurniture = async() => {
        furnitures = await fetch("http://localhost:3000/api/furniture")
        .then(response => response.json());
        console.log(furnitures);
    }
    
    fetchFurniture();
  
    const showFurnitures = async() => {
        await fetchFurniture();
        console.log ("ok")
        furnitureResult.innerHTML = (
            furnitures
                .filter(furniture => furniture.name.toLowerCase())
                .map(furniture => (
                    `
                    <div class="col-12 col-lg-4">
                        <div class="card furniture">
                            <img src="${furniture.imageUrl}" alt="meuble en chêne" class="card-img-top furniture__img">
                            <div class="card-body" id="test">
                                <p class="card-title furniture__name" id="name">${furniture.name}</p>
                                <p class="card-text furniture__varnish" id="varnish">${furniture.varnish}</p>
                                <p class="card-text furniture__description" id="description">${furniture.description}</p>
                                <p class="card-text furniture__price" id="test">${furniture.price} €</p>
                            </div>
                        </div>
                    </div> 
                    `
                    )).join("")
        
        );
    };

    showFurnitures()