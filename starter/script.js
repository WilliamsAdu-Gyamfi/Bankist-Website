"use strict";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

///////////////////////////////////////
// Modal window

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

/////////////////////////////////////////////////////////////////////////
// smoth scrolling
//const btnScrollTo = document.querySelector(".btn--scroll-to");
//const section1 = document.getElementById("section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1Highlights = section1.getBoundingClientRect();
  console.log(s1Highlights);

  //Old ways of doing it
  // window.scrollTo(
  // s1Highlights.left + window.scrollX,
  // s1Highlights.top + window.scrollY
  // );

  window.scrollTo({
    left: s1Highlights.left + window.scrollX,
    top: s1Highlights.top + window.scrollY,
    behavior: "smooth",
  });

  //section1.scrollIntoView({ behaviour: "smooth" });
});

// More of event
const h1 = document.querySelector("h1");

/*
0ld way of doing it!

//1
h1.addEventListener("mouseenter", function () {
  alert("GREAT!");
});

//OR //2
h1.onmouseenter = h1.addEventListener("mouseenter", function () {
  alert("GREAT! ");
});
*/

//////////////////////////////////////////////////
// Page Navigation

/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

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
message.style.height = getComputedStyle(message).height + 30 + "px"; //(This won't work because, we are trying to add a number to a string😅)

//How To make it work
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 25 + "px";

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo);
console.log(logo.alt);
console.log(logo.src);

// Data Attributes
// we use camelNotation in the script whiles we use " - " in the HTML
console.log(logo.dataset.andriodVersion); //andriod-version

const alertH1 = function () {
  alert("GREAT!👍");

  //delete alert message after the first time
  // h1.removeEventListener("mouseenter", alertH1);
};
h1.addEventListener("mouseenter", alertH1);

//we can also remove it after a certain time has passed not only in the event handler function
setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 9000);

// Random NUmbers
//rgb(255, 255, 255);
//rgb(0,0,0)
// e.currentTarget = elment on which the event handler is attached
// e.currentTarget === this
//e.stopPropagation() stops it from reaching it's parent element(it hlps fix problems in a complex application)

const randomInt = (max, min) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("link", e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //e.stopPropagation();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("container", e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Whole nav", e.target, e.currentTarget);
});
