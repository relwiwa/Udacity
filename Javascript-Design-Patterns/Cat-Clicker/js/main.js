/* Cat Clicker App for Udacity Course Javascript Design Patterns
	
   Requirements:
	 - Display image of a cat
	 - Display its name
	 - Display a counter for the number of times the image has been clicked
	 
	 As I just did the Javascript Promises course, I'm using native
	 ES6 Promises for practice, resulting in this piece of code only working
	 in latest browsers */

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

function addCounter() {
	document.getElementsByTagName("img")[0].addEventListener("click", function() {
		var value = document.getElementById("counter").textContent;
		value = parseInt(value) + 1;
		document.getElementById("counter").textContent = value;
	});
};

ready().then(addCounter);