
///Check entries form
const firstname = document.getElementById('user-firstname');
const lastname = document.getElementById('user-lastname');
const adress = document.getElementById('user-adress');
const email = document.getElementById('user-mail');
const city = document.getElementById('user-city');

let regeXemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regeXpostal = /[0-9]{5}(-[0-9]{4})?/;

function validateFirstName() {
    // check if is empty
    if (checkIfEmpty(firstName)) return;
    // is if it has only letters
    if (!checkIfOnlyLetters(firstName)) return;
    return true;
}

function validateLastName() {
    // check if is empty
    if (checkIfEmpty(lastName)) return;
    // is if it has only letters
    if (!checkIfOnlyLetters(lastName)) return;
    return true;
}

export function validateEmail() {
    if (regeXemail.test(email.value.toLowerCase())) {
        console.log("ok");
        email.classList.add("border-success");
    } else {
        console.log("pas ok");
        email.classList.add("border-danger");
    }
}

validateEmail();

email.classList.add("border-success");