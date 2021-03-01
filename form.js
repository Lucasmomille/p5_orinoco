
///Check entries form
const firstname = document.getElementById('user-firstname');
const lastname = document.getElementById('user-lastname');
const adress = document.getElementById('user-adress');
const email = document.getElementById('user-mail');
const city = document.getElementById('user-city');
const code = document.getElementById('user-code');


let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regexCode = /[0-9]{5}(-[0-9]{4})?/;

export function validateEmail() {
    if (regexEmail.test(email.value.toLowerCase())) {
        console.log("ok");
        email.classList.add("border-success");
    } else {
        console.log("pas ok");
        email.classList.add("border-danger");
    }
}

validateEmail();

export function validateEntry(elt) {
    console.log("run validate entry");
    if (elt.value.length > 1){
        elt.classList.add("border-success");
    } else {
        elt.classList.add("border-danger")
    }
}

export function checkSubmit() {
    console.log("run checkSubmit");
    validateEntry(firstname);
    validateEntry(lastname);
    validateEntry(adress);
    validateEntry(city);
}

checkSubmit();


export function validateCode() {
    if (regexCode.test(code.value.toLowerCase())) {
        console.log("ok");
        code.classList.add("border-success");
    } else {
        console.log("pas ok");
        code.classList.add("border-danger");
    }
}