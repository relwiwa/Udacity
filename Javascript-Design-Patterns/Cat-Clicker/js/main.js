/* Cat Clicker App for Udacity Course Javascript Design Patterns

	 Second Requirements Change:
	 - Display small images of at least five cats
	 - When small image is clicked, show large image with cat's name and counter
	 - Clicking on large image increases respective counter

	 	 This implementation uses native ES6 Promises, so only working in latest browsers */

/* MODEL OBJECT */
/**************************************************************
- there's a Cat object containing one cat's information
- all cats are stored in cats array
- currentCat in fullView is stored in currentCat
**************************************************************/
var model = {
	cats: [],
	currentCat: null
};

/* Cat Object with properties */
Cat = function(name, url) {
	this.name = name;
	this.url = url;
	this.counter = 0;
};

/* Cats with their stats */
model.cats.push(new Cat("Tommy", "images/cat-649164_640.jpg"));
model.cats.push(new Cat("Bobby", "images/cat-401124_640.jpg"));
model.cats.push(new Cat("Susan and Christy", "images/cat-205757_640.jpg"));
model.cats.push(new Cat("Cindy", "images/cat-1280855_640.jpg"));
model.cats.push(new Cat("Berta", "images/cats-796437_640.jpg"));

/* OCTOPUS OBJECT */

var octopus = {

	/* Interaction with data in model */

	getCat: function(catId) {
		return model.cats[catId];
	},

	getAllCats: function() {
		return model.cats;
	},

	updateCurrentCat: function(catId) {
		model.currentCat = model.cats[catId];
	},

	/* Interaction with fullView */

	showCurrentCat: function() {

	},

	init: function() {
		listView.init();
	}

};

/* LISTVIEW OBJECT */
/********************************************************************************
- gets all Cats from Octopus
- sets up an image element for each cat (promise)
- adds event listener to each image element
- addListener function keeps track of respective cats number via resolve function
- alternative way would be doing it via IIFE or without a promise
********************************************************************************/
var listView = {

	init: function() {
		var allCats = octopus.getAllCats();
		for (var i = 0; i < allCats.length; i++) {
			new Promise(function(resolve, reject) {
				var img = document.createElement("img");
				img.src = allCats[i].url;
				img.onload = resolve(i);
				img.onerror = reject(new Error("Problem occured while loading image" + i));
				document.getElementById("list-view").appendChild(img);
			})
			.then(listView.addListener(i))
			.catch(function(error) {
				console.log(error.message);
			});
		}
	},

	addListener: function(i) {
		document.getElementById("list-view").getElementsByTagName("img")[i].addEventListener("click", function() {
			octopus.updateCurrentCat(i);
			octopus.showCurrentCat();
		});
	}

	/* Alternative version of addListener with IIFE below:
		addListener: function(i) {
		(function(arg) {
			document.getElementById("list-view").getElementsByTagName("img")[arg].addEventListener("click", function() {
				octopus.updateCurrentCat(arg);
				octopus.showCurrentCat();
			});
		})(i);
	}*/

};


/* FULLVIEW OBJECT */

var fullView = {

};

/* displayCat function:
   - Sets up the full view of an image as well as name and counter.
	 - Its functionality is based on the id parameter, that represents
	   the place of the respective cats object in the myCatClicker.cats
		 array.
	 - The image element is recreated each time, so that a new event
	   listener can be added upon every change. Otherwise it seems
		 complicated to get rid of the event listener before adding
		 the new one 
 	 - At first display of a full view image, img-element gets inserted,
	   later the existing image element gets replaced */
Cat.prototype.displayCat = function(id) {
	document.getElementById("cat-name").textContent = this.name;
	document.getElementById("cat-counter").textContent = this.counter;
	var elem = document.createElement("img");
	elem.src = this.url;
	elem.setAttribute("id", "cat-image");
	if (document.getElementById("cat-image")) {
		document.getElementById("full-view").replaceChild(elem, document.getElementById("full-view").getElementsByTagName("img")[0]);
	}
	else {
		document.getElementById("full-view").insertBefore(elem, document.getElementById("cat-legend"));
	}
	document.getElementById("full-view").style.display = "block";
	document.getElementById("cat-image").addEventListener("click", function() {
		 myCatClicker.cats[id].increaseCounter();	
	});
};

/* increaseCounter function */
Cat.prototype.increaseCounter = function() {
	this.counter++;
	document.getElementById("cat-counter").textContent = this.counter;
};


/* ready function
   - returns Promise when document is completely loaded
	 - ES6 Promise */
function ready() {
	return new Promise(function(resolve, reject) {
		document.addEventListener('readystatechange', function() {
			if (document.readyState === "complete") {
				resolve();
			}
		});
		if (document.readyState === "complete") {
			resolve();
		}
	});
};


ready().then(octopus.init);