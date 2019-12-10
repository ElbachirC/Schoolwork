// Registration Page Script
// https://www.w3schools.com/jsref/event_oninvalid.asp
// https://www.w3schools.com/jsref/event_onsubmit.asp
//https://www.w3schools.com/tags/att_button_formtarget.asp
// https://www.w3schools.com/tags/att_button_formaction.asp
// https://www.w3schools.com/tags/ref_eventattributes.asp
// https://stackoverflow.com/questions/31829826/print-javascript-array-in-html

//ADD TO CART AND REMOVE
//=================================================================================================================================
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
	checkout()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
//==================================================================================================================================


var customers = [['name', 'lastname', 'username', 'password', 'email']];

var customerdata;
var us = false;

var reqok = false;
var reqEmail = false;


function checkuser(){
	var UsersIn = JSON.parse(localStorage.getItem('customerdata'));
	var username = document.getElementById("username").value;
	for(var i=0; i<UsersData.length;){
		uname=UsersData[i][2];
		if (username == uname){
			us = true;
			alert("You cant use this username. Try another username!");
			
			break;
		}
	
		else {
			us = false;
			i++;
			}
	}
	return us;
	}
function inputInfo(){
	
	var name = document.getElementById("name").value;
	var lastname = document.getElementById("lastname").value;
	var username = document.getElementById("username").value;
	var passwd = document.getElementById("pass").value;
	var email = document.getElementById("email").value;
	
	
	
	checkrequirements();
	u = checkuser()
if(name == ""||lastname == ""||username ==""||passwd==""||email=="" || reqok == false || reqEmail == false || u == true){
	alert("Make sure you complete the form and fill out the requirements");
	}else{
		
	var customer = [name, lastname, username, passwd, email];
	
 	customers.push(customer);
	
	customerdata = customers;
	
	localStorage.setItem('customerdata', JSON.stringify(customers));
	
	
	alert("Registration succesfull");
	window.location.href = "LoginPage.html";
	}
}

function showm(){
  document.getElementById("message").style.display = "block";
}
function hidem(){
	document.getElementById("message").style.display = "none";
}

function checkrequirements(){
	
var myInput = document.getElementById("pass");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
   // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
	reqok=true;
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
	reqok=false;
  }
  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
	reqok=true;
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
	reqok=false;
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
	reqok=true;
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
	reqok=false;
  }
  
  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
	reqok=true;
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
	reqok=false;
  }

	return reqok;

}




function showme(){
  document.getElementById("Emessage").style.display = "block";
}
function hideme(){
	document.getElementById("Emessage").style.display = "none";
}
function checkE(){
	var myInput = document.getElementById("email");
	var letter = document.getElementById("sign");
	var lowerCaseLetters = /[@]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
	reqEmail=true;
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
	reqEmail=false;
  }
}

// LOGIN Page


	
var UsersData = JSON.parse(localStorage.getItem('customerdata'));




function login(){

var username = document.getElementById("loginusername").value;
var password = document.getElementById("loginpass").value;
var uname;
var upass;
var nstatus;
var pwdstatus;


for(var i=0; i<UsersData.length;){
	
	uname=UsersData[i][2];
	upass=UsersData[i][3];
	
	if (username == uname){
		nstatus = "found";
		
			if(password == upass){
			pwdstatus="correct"
			alert("Login succesfull!");
			window.location.href = "HomePage.html";
			
			}else{
			pwdstatus="incorrect"
			alert("Incorrect password for user: " + UsersData[i][2]);
			}
			
		break;
	}
	
	else {
		nstatus = "notfound";
		i++;
		}
	}
	
	if(nstatus == "notfound"){
	alert('Username or password incorrect!');
	}

}





function seettl(){
	var lb = document.createElement("LABEL");
	lb.innerHTML = (total);
	document.body.appendChild(lb);
}

function checkout(){
	
	
	window.location.href="checkoutpage.html";
}

function thankyou(){
	window.location.href="thankyoupage.html";
}

//var payment = ['name', 'email', 'adr', 'city', 'city', 'state', 'zip', 'card', 'carnumber',];
var payment = [];

//==================================================================================
var reqZip = false;
var reqCardNumber = false;
var reqCVNumber = false;
var reqE = false;
function Pay(){
	
	var name = document.getElementById("fname").value;
	var email = document.getElementById("femail").value;
	var username = document.getElementById("adr").value;
	var city = document.getElementById("city").value;
	var state = document.getElementById("state").value;
	var zip = document.getElementById("zip").value;
	var cardname = document.getElementById("cname").value;
	var cardnumber = document.getElementById("ccnum").value;
	var expmonth = document.getElementById("expmonth").value;
	var expyear = document.getElementById("expyear").value;
	var cvv = document.getElementById("cvvcode").value;
	checkZ()
	showmC()
	showmCV()
	checkEm()
if( reqZip == false || reqCardNumber == false || reqCVNumber == false || reqE == false){
		alert("Make sure you complete the form and fill out the requirements");
	}else{
		//payment.push(name);
		payment.push(name,email, username, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv);
		alert("Purchase succesfull");
		
		window.location.href="thankyoupage.html";
		
	
	}
	
	
	
	
}


function showmZ(){
	
  document.getElementById("Zmessage").style.display = "block";
}
function hidemZ(){
	document.getElementById("Zmessage").style.display = "none";
}

function checkZ(){
	var myInput = document.getElementById("zip");
	var number = document.getElementById("z");
	var length = document.getElementById("zi");
	
  
	var numbers = /[0-9]/;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
	reqZip=true;
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
	reqZip=false;
  }
	
  
  if(myInput.value.length == 5) {
    length.classList.remove("invalid");
    length.classList.add("valid");
	reqZip=true;
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
	reqZip=false;
  } 
  
  return reqZip;
  
}



function showmC(){
	
  document.getElementById("Cmessage").style.display = "block";
}
function hidemC(){
	document.getElementById("Cmessage").style.display = "none";
}

function checkC(){
	var myInput = document.getElementById("ccnum");
	var number = document.getElementById("cn");
	var length = document.getElementById("cnd");
	
  
	var numbers = /[0-9]/;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
	reqCardNumber=true;
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
	reqCardNumber=false;
  }
	
  
  if(myInput.value.length == 16) {
    length.classList.remove("invalid");
    length.classList.add("valid");
	reqCardNumber=true;
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
	reqCardNumber=false;
  } 
  
  return reqCardNumber;
  
}


function showmCV(){
	
  document.getElementById("CVmessage").style.display = "block";
}
function hidemCV(){
	document.getElementById("CVmessage").style.display = "none";
}


function checkCV(){
	var myInput = document.getElementById("cvvcode");
	var number = document.getElementById("cvn");
	var length = document.getElementById("cvnd");
	
  
	var numbers = /[0-9]/;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
	reqCVNumber=true;
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
	reqCVNumber=false;
  }
	
  
  if(myInput.value.length == 3) {
    length.classList.remove("invalid");
    length.classList.add("valid");
	reqCV=true;
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
	reqCVNumber=false;
  } 
  
  return reqCVNumber;
  
}



function showmemail(){
  document.getElementById("Emailmessage").style.display = "block";
}
function hidememail(){
	document.getElementById("Emailmessage").style.display = "none";
}
function checkEm(){
	var myInput = document.getElementById("femail");
	var letter = document.getElementById("Esign");
	var lowerCaseLetters = /[@]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
	reqE=true;
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
	reqE=false;
  }
  return reqE;
}

//========================================


function showmL(){
  document.getElementById("Logmessage").style.display = "block";
}
function hidemL(){
	document.getElementById("Logmessage").style.display = "none";
}

function checkrequirementsL(){
	
var myInput = document.getElementById("loginpass");
var letter = document.getElementById("l");
var capital = document.getElementById("c");
var number = document.getElementById("n");
var length = document.getElementById("le");
   // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
	reqok=true;
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
	reqok=false;
  }
  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
	reqok=true;
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
	reqok=false;
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
	reqok=true;
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
	reqok=false;
  }
  
  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
	reqok=true;
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
	reqok=false;
  }

	return reqok;

}




