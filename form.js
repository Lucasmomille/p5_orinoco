///Check entries form
const firstname = document.getElementById('user-firstname');
const lastname = document.getElementById('user-lastname');
const adress = document.getElementById('user-adress');
const email = document.getElementById('user-mail');
const city = document.getElementById('user-city');
const code = document.getElementById('user-code');
const form = document.getElementById('form');

let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regexCode = /[0-9]{5}(-[0-9]{4})?/;

export const validateEmail = () => {
    email.addEventListener("input", function() {
        if (regexEmail.test(email.value.toLowerCase())) {
            email.classList.add("border-success");
            email.classList.remove("border-danger");
        } else {
            email.classList.add("border-danger");
            email.classList.remove("border-success");
        }
    })
}

const validateEntry = (elt) => {
    elt.addEventListener("input", function() {
        if (elt.value.length > 0){
            elt.classList.remove("border-danger");
            elt.classList.add("border-success");
            
            console.log("value ok")
        } else {
            console.log("erreur")
            elt.classList.remove("border-success");
            elt.classList.add("border-danger");
        }
    })
}

export const validateCode = () => {
    code.addEventListener("input", function() {
        if (regexCode.test(code.value.toLowerCase())) {
            code.classList.add("border-success");
            code.classList.remove("border-danger");
        } else {
            code.classList.add("border-danger");
            code.classList.remove("border-success");
        }
    })
}

export const checkSubmit = () => {
        validateEntry(firstname);
        validateEntry(lastname);
        validateEntry(adress);
        validateEntry(city);
        validateCode();
        validateEmail();
}