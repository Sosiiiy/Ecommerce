var dropdown = document.getElementsByClassName("dropdown");

for (var i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("active");
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  dropdownContent.style.display = "none";
  } else {
  dropdownContent.style.display = "block";
  }
  });
}

function closeNav() {
  document.getElementById("sidenav").style.width = "75px";
  document.getElementById("main").style.marginLeft= "75px";
}


var searchInp =document.getElementById("mySearch");
var Postrow=document.getElementById("Postsrow");
var butUp = document.getElementById('butup');
var dropDown = document.getElementById('myDropdown');
var multiRange = document.getElementById('multiRange');
var product="";

var req = new XMLHttpRequest();

var allProducts="";

All();
var productContainer = [];



function All(){
	
	var url = './store-demo-data.json';
	
	
	req.open("GET",url ,false);
	
	req.onreadystatechange = function(){
		if(req.readyState == 4 && req.status == 200){
			product=JSON.parse(req.response);
			console.log(req.response);
			allProducts=product.products;
			console.log(productContainer);
			displayposts(allProducts);
		}
		else{
			console.log("connection error");
			}
		
	}
	
	req.send();
}

function displayposts(Products){
		
	var cards="";
	
	for(var i=0;i<Products.length;i++){
		
		cards+=` <div class="card">
		<div class="card-container">
		<img src="`+Products[i].img+`" class="productImg" alt="product"/>
		<div class="stars">`+getstars(Products[i].rating)+`<h3 class="productPrice">$`+Products[i].price+`</h3></div>
		<a href="" class="productName">`+Products[i].name+`</a>
		<p class="discription">`+Products[i].discription+`</p>
	  </div>
		<a href="" class="wishlist">wishlist</a>
		<a href="" class="cart">View in cart</a>
	  </div>`
	
	}
	
	Postrow.innerHTML= cards;
	
}
function getstars(rating){

	let output = [];
    for (var i = rating; i >= 1; i--)
    output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

  for (let i = (5 - rating); i >= 1; i--)
    output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

  return output.join('');
}


searchInp.onkeyup=function(){
	if(searchInp.value != null && searchInp.value != " " && searchInp.value != undefined){
	searchProducts(searchInp.value);
	}
	else{
		
	}
}

function searchProducts(term){
	var searchCols="";
	
	for(var i=0;i<allProducts.length;i++){
		
		if(allProducts[i].name.includes(term)){
			
			searchCols+=` <div class="card">
			<div class="card-container">
			<img src="`+allProducts[i].img+`" class="productImg" alt="product"/>
			<h3 class="productPrice">$`+allProducts[i].price+`</h3>
			<a href="" class="productName">`+allProducts[i].name+`</a>
			<p class="discription">`+allProducts[i].discription+`</p>
		  </div>
			<a href="" class="wishlist">wishlist</a>
			<a href="" class="cart">View in cart</a>
		  </div>`
		}
		
	}
	
	Postrow.innerHTML=searchCols;
	
}

multiRange.onclick= function(){
    var newArray;
	if (document.getElementById('r1').checked) {
		displayposts(allProducts);
	  }
	  if (document.getElementById('r2').checked) {
		 newArray = allProducts.filter(function (allProducts) {
			return allProducts.price <=10 ;
		  });
		  displayposts(newArray);
	  }
	  if (document.getElementById('r3').checked) {
		newArray = allProducts.filter(function (allProducts) {
			return  allProducts.price < 100 &&
			        allProducts.price > 10;
		  });
		  displayposts(newArray);
	}
	if (document.getElementById('r4').checked) {
		newArray = allProducts.filter(function (allProducts) {
			return  allProducts.price >100 &&
			        allProducts.price <500; 
		  });
		  displayposts(newArray);
	}
	if (document.getElementById('r5').checked) {
		newArray = allProducts.filter(function (allProducts) {
			return allProducts.price >= 500 ;
		  });
		  displayposts(newArray);
	}
}

brand.onclick=function(){
	let brand;
	var brandValue = document.querySelector('input[name = Brands]:checked').value;
	brand= allProducts.filter(function (allProducts) {
		return allProducts.brand == brandValue ;
	  });
	  displayposts(brand);
}

category.onclick=function(){
	let Category;
	var categoryValue = document.querySelector('input[name = Category]:checked').value;
	Category= allProducts.filter(function (allProducts) {
		return allProducts.category == categoryValue ;
	  });
	  displayposts(Category);
}

for(var i in document.getElementsByClassName('rating')) {
	var rating = document.getElementsByClassName('rating')[i];

	rating.onclick = function(e) { 
		e.preventDefault();
		let productRate;
         var rate=e.srcElement.attributes.value.value;
		 productRate=allProducts.filter(function(allProducts){
        return allProducts.rating==rate;
		 });
		 displayposts(productRate);
	} 
} 



window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    butUp.style.display = "block";
  } else {
    butUp.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTo({top: 0, behavior: 'smooth'});
  document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
}   

