/*
get the elements that we want to modify
figure out when modification should occur
ffor each element
    figure out which one it is
    output that number


figure out where we will display the message..get a reference
figure out what day it is
update the display

*/

function displayWelcome()
{
   const headerEl = document.querySelector("header")
   const dayIndex = new Date().getDay();
   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "friday", "Saturday"]
   const message = `Happy ${days[dayIndex]}`;
   const messageEl = document.createElement("p");
   messageEl.textContent = message;
   headerEl.append(messageEl)


}

function renderNumber(item, index)
{
    const number = document.createElement("span");
    number.textContent = index + 1;
    element.prepend(number);
}

function addIndex() 
{
    const scriptureElements = document.querySelectorAll(".scripture");
    scriptureElements.forEach(renderNumber);
}

const menuBtn = document.querySelector(".menu-btn");
const navEl = document.querySelector(".main-nav");

function toggleMenu() {
  navEl.classList.toggle("show");
  menuBtn.classList.toggle("change");
}

menuBtn.addEventListener("click", toggleMenu);


addIndex()
displayWelcome()
