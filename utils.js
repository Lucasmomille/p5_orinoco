export function onLoadCartNumbers() {
    let productNumbers = sessionStorage.getItem("cartNumbers");
    if(productNumbers) {
        document.querySelector("#countCart").textContent = productNumbers;
    }
}

export function numberWithSpace(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}