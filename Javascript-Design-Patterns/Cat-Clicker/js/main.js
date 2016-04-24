/* Cat Clicker App for Udacity Course Javascript Design Patterns

	 Second Requirements Change:
	 - Display small images of at least five cats
	 - When small image is clicked, show large image with cat's name and counter
	 - Clicking on large image increases respective counter

	 	 This implementation uses native ES6 Promises, so only working in latest browsers */

/* Application Object */
var myCatClicker = {};

/* Cat Object with properties and prototype methods */
Cat = function(name, url) {
	this.name = name;
	this.url = url;
	this.image;
	this.counter = 0;
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

/* Cats with their stats */
myCatClicker.cats = [];
myCatClicker.cats.push(new Cat("Tommy", "images/cat-649164_640.jpg"));
myCatClicker.cats.push(new Cat("Bobby", "images/cat-401124_640.jpg"));
myCatClicker.cats.push(new Cat("Susan and Christy", "images/cat-205757_640.jpg"));
myCatClicker.cats.push(new Cat("Cindy", "images/cat-1280855_640.jpg"));
myCatClicker.cats.push(new Cat("Berta", "images/cats-796437_640.jpg"));

/* ready function
   - returns Promise when document is completely loaded */
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


/* initiateCats function
   - sets up list-view after document is fully loaded:
	 - creates a promise for each image
	 - within the promise, image element gets created and image gets loaded
	 - event listener gets added with IIFE */
function initiateListView() {
	for (var i = 0; i < myCatClicker.cats.length; i++) {
		new Promise(function(resolve, reject) {
			var img = document.createElement("img");
			img.src = myCatClicker.cats[i].url;
			img.onload = resolve(i);
			img.onerror = reject(new Error("Problem occured while loading image" + i));
			myCatClicker.cats[i].image = img; // reference to img element within cat object
			document.getElementById("list-view").appendChild(img);
		})
		.then(function(i) {
			myCatClicker.cats[i].image.addEventListener("click", function() {
				myCatClicker.cats[i].displayCat(i);
			});
		})
		.catch(function(error) {
			console.log(error.message);
		});	
		
	}
};

ready().then(initiateListView);