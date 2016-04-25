/* Cat Clicker App for Udacity Course Javascript Design Patterns

	 Third Requirements Change, Cat Clicker Premium:
	 - No change in functionality
	 - Code is supposed to be organized in model, view, octopus manner
	 - There's no direct communication between model and view/s, octopus handels
	   the communcation between model and view/s

	 	 This implementation uses native ES6 Promises, so only working in latest browsers */

/* MODEL OBJECT */
/**************************************************************
- there's a Cat object containing one cat's information
- all cats are stored in cats array
- currentCat in fullView is stored in currentCat
- initially, currentCat is set to the first cat in cats array
**************************************************************/
var model = {
	cats: [],
	currentCat: null,

	init: function() {
		if (this.cats.length > 0) {
			model.currentCat = model.cats[0];
		}
		else {
			console.log("no cats to play with")
		}
	},

	increaseCounter: function(cat) {
		cat.counter++;
	}

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
	
	getCurrentCat: function() {
		return model.currentCat;
	},

	getAllCats: function() {
		return model.cats;
	},

	updateCurrentCat: function(catId) {
		model.currentCat = model.cats[catId];
	},

	/* Interaction with views */

	showCurrentCat: function() {
		fullView.showCat(octopus.getCurrentCat());
	},

	/* Interaction with model and view */
		
	updateCounter: function(cat) {
		model.increaseCounter(cat);
		fullView.updateCounter(cat);
	},

	/* Initialization */
	
	init: function() {
		model.init();
		listView.init();
		fullView.init();
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
		if (allCats.length > 0) {
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
		}
		else {
			console.log("no cats to play with");
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
/********************************************************************************
- initalizes fullView with first cat image in model.cats
- also shows cat's name and counter
- the image element is now only created once during init
- the event listener is also only added once during init, as it is not tied to
  the individual image element or cat, but has a static link to currentCat
- showCat only updates the three variables catName, catCounter, and catImage;
  for this to work, the respective elements get stored as properties of fullView
- communication between model, octopus and views happens via cats object and
  current cat, not ids
********************************************************************************/
var fullView = {

	init: function() {
		var cat = octopus.getCurrentCat();
		if (cat !== null) {
			this.catName = document.getElementById("cat-name");
			this.catCounter = document.getElementById("cat-counter");
			var elem = document.createElement("img");
			elem.src = cat.url;
			elem.setAttribute("id", "cat-image");
			document.getElementById("full-view").insertBefore(elem, document.getElementById("cat-legend"));
			document.getElementById("cat-image").addEventListener("click", function() {
				octopus.updateCounter(octopus.getCurrentCat());
			});
			this.catImage = document.getElementById("cat-image");
			document.getElementById("full-view").style.display = "block";
			fullView.showCat(cat);
		}
		else {
			console.log("no current cat to play with");
			document.getElementById("full-view").style.display = "none";
		}
	},

	showCat: function(cat) {
		this.catName.textContent = cat.name;
		this.catCounter.textContent = cat.counter;
		this.catImage.src = cat.url;
	},

	updateCounter: function(cat) {
		document.getElementById("cat-counter").textContent = cat.counter;
	}

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