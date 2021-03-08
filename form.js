
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
        } else {
            console.log("email pas ok");
            email.classList.add("border-danger");
        }
    })
    
}

const validateEntry = (elt) => {
    console.log("run validate entry");
    elt.addEventListener("input", function() {
        if (elt.value.length > 1){
            elt.classList.add("border-success");
        } else {
            elt.classList.add("border-danger")
        }
    })
    
}

/* export const test = (elt) => {
    console.log("run validate entry");
    elt.onfocus = (e) => {
      if (e.target.value.length > 1){
          console.log("onfocus success")
          e.target.classList.add("border-success");
      } else {
        console.log("onfocus loose")
        e.target.classList.add("border-info");
      }
    }
    elt.onblur = (e) => {
        if (e.target.value.length > 1) {
            console.log("onblur ok donc rouge")
            e.target.classList.add("border-danger");
    }/* else {
        console.log("oblur nope bleu ou vert")
        e.target.classList.add("border-success");
    } */
/*  }
} */ 

/* export const test = (elt) => {
    elt.onfocus = (e) => {
        console.log(e.target.value +"success")
        if (e.target.value.length > 1){
            e.target.classList.add("border-success");
        }
    }

    elt.onblur = (e) => {
        console.log(e.target.value +"nope")
        e.target.classList.add("border-danger")
    }
}
 */
/* const testA = (elt, condition) => {
    elt.onfocus = (e) => {
        if (eval(condition)){
            console.log("onfocus success")
            e.target.classList.remove("border-danger");
            e.target.classList.add("border-success");
            
        } else {
          console.log("onfocus loose")
          e.target.classList.add("border-info");
        }
      }
      elt.onblur = (e) => {
          if (!eval(condition)) {
              console.log("onblur ok donc rouge")
              e.target.classList.add("border-danger");
              e.target.classList.remove("border-success")
      } *//* else {
          console.log("oblur nope bleu ou vert")
          e.target.classList.add("border-success");
      } */
/*    }
} */ 

export const validateCode = () => {
    code.addEventListener("input", function() {
        if (regexCode.test(code.value.toLowerCase())) {
            code.classList.add("border-success");
        }else{
            code.classList.add("border-danger");
        }
    })
    
}

export const checkSubmit = () => {
    console.log("run checkSubmit");
    //form.addEventListener("input", function(){
        validateEntry(firstname);
        validateEntry(lastname);
        validateEntry(adress);
        validateEntry(city);
        validateCode();
        validateEmail();
    //})
  
    //test(firstname);
}

// if check my iput == true
// compter queryselector all border succss et si == 5 alors true