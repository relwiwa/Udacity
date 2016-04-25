/* Cat Clicker App for Udacity Course Javascript Design Patterns

	 Fourth Requirements Change, Cat Clicker Premium Pro:
	 - Add an admin area where it's possible to change the values of the currently
	   displayed cat and its image
	 - Accessible via admin button
	 - Admin area has save and cancel button

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

/* Cat Object with properties
   - id gets set in listView's init function and is necessary to
	   update a specific listView element */
Cat = function(name, url) {
	this.id;
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

	/* Interaction with views */

	showCurrentCat: function() {
		fullView.showCat(octopus.getCurrentCat());
	},

	/* Interaction with model and view */

	updateCounter: function(cat) {
		model.increaseCounter(cat);
		fullView.updateCounter(cat);
		adminView.updateCounter(cat);
	},

	updateCurrentCat: function(catId) {
		model.currentCat = model.cats[catId];
		adminView.updateView();
	},

	updateCatProperty: function(cat, property, value) {
		cat[property] = value;
		fullView.showCat(cat);
		if (property === "url") {
			listView.updateUrl(cat)
		}
	},

	/* Initialization */

	init: function() {
		model.init();
		listView.init();
		fullView.init();
		adminView.init();
	}

};


/* LISTVIEW OBJECT */
/********************************************************************************
- gets all Cats from Octopus
- sets up an image element for each cat (promise)
- adds event listener to each image element
- addListener function keeps track of respective cats number via resolve function
- alternative way would be doing it via IIFE or without a promise
- updateUrl updates an image in listView after it's been changed in admin area
********************************************************************************/
var listView = {

	init: function() {
		var allCats = octopus.getAllCats();
		if (allCats.length > 0) {
			for (var i = 0; i < allCats.length; i++) {
				allCats[i].id = i;
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
	
	updateUrl: function(cat) {
		new Promise(function(resolve, reject) {
			var img = document.getElementById("list-view").getElementsByTagName("img")[cat.id];
			img.src = octopus.getCat(cat.id).url;
			img.onload = resolve();
			img.onerror = reject();
		})
		.then()
		.catch();
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


/* ADMINVIEW OBJECT */
/********************************************************************************
- shows/hides admin area where it's possible to change properties of currentCat
  image
- references to html elements are stored as properties of adminView
- values in admin area get updated every time a image is changed in listView or
  clicked in fullView
- when clicking the admin button, values of currentCat are displayed
- when changes are made and saved, the data in the model gets updated via
  octopus; there, also the full view gets updated; if url changed, the respective
	image in listView gets updated, too
********************************************************************************/
var adminView = {
	
	viewDisplayed: false,
	
	init: function() {
		document.getElementById("admin-button").addEventListener("click", adminView.toggleView);
		document.getElementById("admin-save").addEventListener("click", adminView.saveInput);
		document.getElementById("admin-cancel").addEventListener("click", adminView.toggleView);
		adminView.adminName = document.getElementById("admin-name");
		adminView.adminUrl = document.getElementById("admin-url");
		adminView.adminCounter = document.getElementById("admin-counter");
		adminView.updateView();
	},

	toggleView: function() {
		if (adminView.viewDisplayed === true) {
			adminView.viewDisplayed = false;
			document.getElementById("admin-view").style.display = "none";
			document.getElementById("admin").style.opacity = "0.5";
		}
		else {
			adminView.viewDisplayed = true;
			document.getElementById("admin-view").style.display = "block";
			document.getElementById("admin").style.opacity = "1.0";
		}
	},

	updateView: function() {
		var cat = octopus.getCurrentCat();
		if (cat !== null) {
			adminView.adminName.value = cat.name;
			adminView.adminUrl.value = cat.url;
			adminView.adminCounter.value = cat.counter;
		}
		else {
			console.log("no cat to play with");
		}
	},

	updateCounter: function(cat) {
		adminView.adminCounter.value = cat.counter;
	},
	
	saveInput: function() {
		var cat = octopus.getCurrentCat();
		if (cat.name !== adminView.adminName.value) {
			octopus.updateCatProperty(cat, "name", adminView.adminName.value);
		}
		if (cat.url !== adminView.adminUrl.value) {
			octopus.updateCatProperty(cat, "url", adminView.adminUrl.value);
		}
		if (cat.counter !== adminView.adminCounter.value) {
			octopus.updateCatProperty(cat, "counter", adminView.adminCounter.value);
		}
		adminView.toggleView();
	},

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