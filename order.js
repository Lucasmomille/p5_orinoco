
const orderId = new URL(window.location.href).searchParams.get('orderId');
console.log(orderId);
const displayOrder = document.getElementById("orderId");
displayOrder.textContent = orderId;