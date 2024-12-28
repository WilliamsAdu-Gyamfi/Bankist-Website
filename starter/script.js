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

// Tab Components
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

//tabs.forEach(tap => tap.addEventListener("click", () => console.log("Tap")));
// Doing this is a bad practice because what if we have 200 tabs, then we have to do the same 200X of this each callback of this

//use event delegation
// we need to attach event handlers on the common parent element of all the elements that we are intrested in.
//  in this case, that is tap container that we alredy selected
tabsContainer.addEventListener("click", function (e) {
  const btnClicked = e.target.closest(".operations__tab");
  //console.log(btnClicked);

  // Guard Clause = It's an if statement that will return early if some condition is matched
  if (!btnClicked) return;

  // Remove active classes
  tabs.forEach(tap => tap.classList.remove("operations__tab--active"));
  tabsContent.forEach(cont =>
    cont.classList.remove("operations__content--active")
  );

  // Activate tab
  btnClicked.classList.add("operations__tab--active");

  // Active Content Area
  //console.log(btnClicked.dataset.tab);
  document
    .querySelector(`.operations__content--${btnClicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Links fade animation
const nav = document.querySelector(".nav");

const linksHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const btnLink = e.target;
    const siblings = btnLink.closest(".nav").querySelectorAll(".nav__link");
    const logo = btnLink.closest(".nav").querySelector("img");

    siblings.forEach(el => {
      if (el !== btnLink) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener("mouseover", linksHover.bind(0.5));

nav.addEventListener("mouseout", linksHover.bind(1));

/*
// Sticky Navigation 1
const section1Cords = section1.getBoundingClientRect();
//console.log(section1Cords);

window.addEventListener("scroll", function () {
  //console.log(window.scrollY);

  if (this.window.scrollY > section1Cords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});
*/

/*
// Sticky Navigation 2: Intersection Observer API
const observerCallBack = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const observerOpts = {
  root: null,
  //threshold: 0.1,
  threshold: [0, 0.3], // It can be array
};

// The "new IntersectionObserver function accepts two arguments(CallBack function and object)"
const observer = new IntersectionObserver(observerCallBack, observerOpts);
observer.observe(section1); //ssection1 is the target
*/

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/////////////////////////////////////////////////////////////////////////

// smoth scrolling
//const btnScrollTo = document.querySelector(".btn--scroll-to"); Moved to top
//const section1 = document.getElementById("section--1"); Moved to top

btnScrollTo.addEventListener("click", function (e) {
  const s1Highlights = section1.getBoundingClientRect();
  console.log(s1Highlights);

  //Old ways of doing it
  // window.scrollTo(
  // s1Highlights.left + window.scrollX,
  // s1Highlights.top + window.scrollY
  // );

  /*
  window.scrollTo({
    left: s1Highlights.left + window.scrollX,
    top: s1Highlights.top + window.scrollY,
    behavior: "smooth",
  });
  */

  // Best way 0f doing it
  section1.scrollIntoView({ behavior: "smooth" });
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
/*
document.querySelectorAll(".nav__link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
*/
// event delegation
//steps
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

// It's not possible to add Eventhandlers to elements that do not exist
// We can handle this by using event delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// I.selecting element
//A.special way of selescting the entire element of  web page
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

/*
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
*/
//we can solve it by clonning it
//header.append(message.cloneNode(true)); // not really neccessary

/*
// III. deleting elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });
*/
// Styles
//message.style.backgroundColor = "#FFDF00";
//message.style.width = "130%";

//These two examples won't work because it's inner HTML
//console.log(message.style.color);
//console.log(message.style.height);

//To make this work, we must write it this way
//console.log(getComputedStyle(message).color);
//console.log(getComputedStyle(message).height);

//Let's increase the height of the cookie message
//message.style.height = getComputedStyle(message).height + 30 + "px"; //(This won't work because, we are trying to add a number to a string😅)

//How To make it work
//message.style.height =
//Number.parseFloat(getComputedStyle(message).height, 10) + 25 + "px";

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

/*
const randomInt = (max, min) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("link", e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //e.stopPropagation(); Not advisable to use in simple projects
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("container", e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Whole nav", e.target, e.currentTarget);
});
*/
