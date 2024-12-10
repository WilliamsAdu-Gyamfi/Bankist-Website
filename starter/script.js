"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));
//for (let i = 0; i < btnsOpenModal.length; i++)
//  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// I.selecting element
//A.special way of selescting the entire element of  web page
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

//B.
const header = document.querySelector(".header");

//c.
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

// II. Creating and inserting elements
//insertAdjacentHTML
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'We use cookied for advanced functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//header.prepend(message);
header.append(message);
//when we use both prepend and append at the same, only the append will work. It's unique and cannot be use at the same time
//Prepending basically adds the element as a first child element
//Appending add element as a last child element

//we can solve it by clonning it
//header.append(message.cloneNode(true)); // not really neccessary

// III. deleting elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// Styles
message.style.backgroundColor = "#FFDF00";
message.style.width = "130%";

//These two examples won't work because it's inner HTML
console.log(message.style.color);
console.log(message.style.height);

//To make this work, we must write it this way
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

//Let's increase the height of the cookie message
message.style.height = getComputedStyle(message).height + 30 + "px";
//(This won't work because, we are trying to add a number to a string😅)

//How To make it work
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 25 + "px";

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo);
console.log(logo.alt);
console.log(logo.src);

// Data Attributes
// we use camelNotation in the script whiles we use (-) in the HTML
console.log(logo.dataset.andriodVersion);
