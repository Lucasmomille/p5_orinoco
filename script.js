window.onload = function() {

    var furniture = new XMLHttpRequest();
    var furnitureResult = document.querySelector("#test");
    console.log(furnitureResult);
    furniture.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response.productId);
            furnitureResult.innerHTML = response.objectId ;
        }
    };
    furniture.open("GET", "localhost:3000/api/furniture");
    furniture.send();

}