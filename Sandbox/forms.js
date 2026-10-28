const theForm = document.querySelector("#myform");

function processForm(event) {
    event.preventDefault();
    console.log("event:", event);
    console.log("this:", this);
    event.target.validity.valid
}

theForm.addEventListener('submit', processForm);