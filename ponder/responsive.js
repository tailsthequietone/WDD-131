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

function toggleMenu(){
    navEl.classlist.toggle("hide");
    menuBtn.classlist.toggle("change");
}

addIndex()
displayWelcome()

const menuBtn = document.querySelectorAll(".menu-btn")
const navEl =document.querySelectorAll(".main-nav")



menuBtn.addeventlistener("click", toggleMenu)