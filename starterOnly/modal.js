// responsive nav

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// blur background
const mainExceptModal = document.querySelector("main *:not(.content)");
const header = document.querySelector(".topnav");
const footer = document.querySelector("footer");

function blurBg(pxAmount) {
  mainExceptModal.style.filter = `blur(${pxAmount})`;
  header.style.filter = `blur(${pxAmount})`;
  footer.style.filter = `blur(${pxAmount})`;
  if (window.innerWidth < 540) {
    header.style.filter = `blur(0px)`;
  }  
} 

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  blurBg('10px');
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));



// issue #1 : X close modal

const closeX = document.querySelector(".close");

function closeModal() {
  modalbg.style.display = "none";
  blurBg('0px');
}

closeX.addEventListener("click", closeModal);


//issue #2 : form validation


