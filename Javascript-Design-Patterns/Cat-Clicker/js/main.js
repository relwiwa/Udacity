/* Cat Clicker App for Udacity Course Javascript Design Patterns

   First Requirements Change:
	 - Display two cats
	 - Display their names
	 - Display an indiviual counter for each cat

	 This implementation uses native ES6 Promises, so only working in latest browsers */

/* Properties */
var myCats = {};
myCats.names = ["Tommy", "Bobby"];


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
   - sets up everything after document is fully loaded:
	   * adds click event listener to each image tag
		 * adds each cat's name in the respective span
		 * displays each cat's div
	 - event listeners are added within a loop. in order for this to work,
	   module pattern is applied with IIFE;
		 see: http://meshfields.de/event-listeners-for-loop
		 and as I realized after finding out about this behaviour myself,
		 there's also an explanation in the Udacity course */
function initiateCats() {
	var imgs = document.getElementsByTagName("img");
	for (var i = 0; i < myCats.names.length; i++) {
		(function(i) {
			imgs[i].addEventListener("click", function() {
				var value = document.getElementById("counter-" + i).textContent;
				value = parseInt(value) + 1;
				document.getElementById("counter-" + i).textContent = value;
				console.log("counter-" + i);
			});
		})(i);
		document.getElementById("name-" + i).textContent = myCats.names[i];
		document.getElementById("cat-" + i).style.display = "block";
	}
};

ready().then(initiateCats);