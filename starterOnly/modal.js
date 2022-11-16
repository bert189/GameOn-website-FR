
// toggle bars vs xmark

const icon = document.querySelector('a.icon');
const bars = document.querySelector('.icon .fa-bars');
const xMark = document.querySelector('.icon .fa-xmark');

bars.style.display = 'block';
xMark.style.display = 'none';

function toggleDisplay(elt1, elt2) {
  if (elt1.style.display === 'block') {
    elt1.style.display = 'none';
    elt2.style.display = 'block';
  } else if (elt2.style.display === 'block') {
    elt1.style.display = 'block';
    elt2.style.display = 'none';
  }
}

// responsive nav

function editNav() {
  const nav = document.getElementById("myTopnav");
  toggleDisplay(bars, xMark);
  if (nav.className === "topnav") {
    nav.className += " responsive";
  } else {
    nav.className = "topnav";
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
const closeButton = document.querySelector('#inscription button');

function closeModal() {
  modalbg.style.display = "none";
  blurBg('0px');
}

closeX.addEventListener("click", closeModal);
closeButton.addEventListener("click", closeModal);


//issue #2 #3 : form validation

const form  = document.getElementById('form');
const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const birthDate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const locations = document.getElementsByName('location');
const terms = document.getElementById('checkbox1');
const subscribe = document.getElementById('checkbox2');
const inscription = document.getElementById('inscription');

let playerData = {};
let error = false;



form.addEventListener('submit', function(event){
  event.preventDefault();

  // firstname
  
  if (first.value.length < 2) {
    first.classList.add('text-control-error');
    first.nextElementSibling.classList.add('error-message-visible');
    error = true;
  } else {
    playerData.first = first.value;
  }

  // lastname

  if (last.value.length < 2) {
    last.classList.add('text-control-error');
    last.nextElementSibling.classList.add('error-message-visible');
    error = true;
  } else {
    playerData.last = last.value;
  }

  // email

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    playerData.email = email.value;
  } else {
    email.classList.add('text-control-error');
    email.nextElementSibling.classList.add('error-message-visible');
    error = true;
  }

  // birthdate

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); // january index 0
  let yyyy = today.getFullYear();

  today =  String(yyyy +'-'+ mm +'-'+ dd);

  if (birthDate.value.length < 10 || birthDate.value >= today) {
    birthDate.classList.add('text-control-error');
    birthDate.nextElementSibling.classList.add('error-message-visible');
    error = true;
  } else {
    playerData.birthDate = birthDate.value;
  }

  // tournaments played

  if (Number.isInteger(parseInt(quantity.value))) {
    playerData.quantity = quantity.value;
  } else {
    quantity.classList.add('text-control-error');
    quantity.nextElementSibling.classList.add('error-message-visible');
    error = true;
  }

  // tournament choice
  
  let tournament = 'no selection';
  
  for (var i = 0; i < locations.length; i++) {
    if (locations[i].checked) {
      tournament = locations[i];
      playerData.tournament = tournament.value;
      break;
    }
  };
  
  if (tournament === 'no selection') {
    document.getElementById('locations-error').classList.add('error-message-visible');
    error = true;
  }

  // terms acceptation

  if (!terms.checked) {
    document.getElementById('terms-error').classList.add('error-message-visible');
    error = true;
  }

  // newsletter subscription
  
  if (subscribe.checked) {
    playerData.subscribe = true;
  } else {
    playerData.subscribe = false;
  }


  // issue #4 : display inscription confirmed
  
  if (error === false) {
    form.style.display = 'none';
    inscription.style.display = 'flex';
  }
  

  // remove input error on focus
  
  textControl = document.getElementsByClassName('text-control');

  function clearError() {
    this.classList.remove('text-control-error');
    this.nextElementSibling.classList.remove('error-message-visible');
  }

  textControl.forEach((input) => input.addEventListener('focus', clearError));


})

 