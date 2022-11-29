
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
	window.scrollTo(0, 0);
}

// launch modal event

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


// issue #1 : X close modal

const closeX = document.querySelector(".close");
const closeButton = document.querySelector('#inscription button');

function closeModal() {
	modalbg.style.display = "none";
	blurBg('0px');
	form.style.display = 'block';
	inscription.style.display = 'none';
}

closeX.addEventListener("click", closeModal);
closeButton.addEventListener("click", closeModal);


//issue #2 #3 : form validation

// DOM elements

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

// variables

let playerData = {};
let error = false;

// submit

form.addEventListener('submit', function(event){
	event.preventDefault();

	// firstname
	
	if (/^[a-zA-Z]{1,}[- ']{0,1}[a-zA-Z]{1,}$/.test(first.value)) {
		playerData.first = first.value;
	} else {
		first.classList.add('text-control-error');
		first.nextElementSibling.classList.add('error-message-visible');
		error = true;
	}

	first.addEventListener('focus', function() {
		first.classList.remove('text-control-error');
		first.nextElementSibling.classList.remove('error-message-visible');
		error = false;
	});

	// lastname

	if (/^[a-zA-Z]{1,}[- ']{0,1}[a-zA-Z]{1,}$/.test(last.value)) {
		playerData.last = last.value;
	} else {
		last.classList.add('text-control-error');
		last.nextElementSibling.classList.add('error-message-visible');
		error = true;
	}

	last.addEventListener('focus', function() {
		last.classList.remove('text-control-error');
		last.nextElementSibling.classList.remove('error-message-visible');
		error = false;
	});

	// email

	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
		playerData.email = email.value;
	} else {
		email.classList.add('text-control-error');
		email.nextElementSibling.classList.add('error-message-visible');
		error = true;
	}

	email.addEventListener('focus', function() {
		email.classList.remove('text-control-error');
		email.nextElementSibling.classList.remove('error-message-visible');
		error = false;
	});

	// birthdate

	const playerBirthDate = new Date(birthDate.value);
	const today = new Date();

	if (birthDate.value === "" || playerBirthDate >= today) {
		birthDate.classList.add('text-control-error');
		birthDate.nextElementSibling.classList.add('error-message-visible');
		error = true;
	} else {
		playerData.birthDate = birthDate.value;
	}

	birthDate.addEventListener('focus', function() {
		birthDate.classList.remove('text-control-error');
		birthDate.nextElementSibling.classList.remove('error-message-visible');
		error = false;
	});

	// tournaments played

	if (Number.isInteger(parseInt(quantity.value)) && parseInt(quantity.value) >= 0) {
		playerData.quantity = quantity.value;
	} else {
		quantity.classList.add('text-control-error');
		quantity.nextElementSibling.classList.add('error-message-visible');
		error = true;
	}

	quantity.addEventListener('focus', function() {
		quantity.classList.remove('text-control-error');
		quantity.nextElementSibling.classList.remove('error-message-visible');
		error = false;
	});

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

	locations.forEach(function(location) {
		location.addEventListener('change', function() {
			if (this.checked) {
				document.getElementById('locations-error').classList.remove('error-message-visible');
				error = false;
			}
		});
	});

	// terms acceptation

	if (!terms.checked) {
		document.getElementById('terms-error').classList.add('error-message-visible');
		error = true;
	}

	terms.addEventListener('change', function() {
		if (this.checked) {
			document.getElementById('terms-error').classList.remove('error-message-visible');
			error = false;
		}
	});

	// newsletter subscription
	
	if (subscribe.checked) {
		playerData.subscribe = true;
	} else {
		playerData.subscribe = false;
	}


	// issue #4 : display inscription confirmed
	
	function clearInputs() {
		first.value = "";
		last.value = "";
		email.value = "";
		birthDate.value = "";
		quantity.value = "";
		for (var i = 0; i < locations.length; i++) {
			if (locations[i].checked) {
				locations[i].checked = false;
				break;
			}
		};
		terms.checked = false;
		subscribe.checked = false;
	}

	if (error === false) {
		console.log('inscription validée');
		console.log(playerData);

		form.style.display = 'none';
		inscription.style.display = 'flex';

		clearInputs();
	}

})

 