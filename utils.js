export function onLoadCartNumbers() {
    let productNumbers = sessionStorage.getItem("cartNumbers");
    if(productNumbers) {
        document.querySelector("#countCart").textContent = productNumbers;
    }
}
