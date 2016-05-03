/* Cat Clicker App for Udacity Course Javascript Design Patterns

	 Another Go at the Cat Clicker App, this time using Knockout.js */

var Cat = function() {

// Observables
	
	this.clickCount = ko.observable(0);
	this.name = ko.observable("Tommy");
	this.imgSrc = ko.observable("images/cat-649164_640.jpg");
	this.nicknames = ko.observableArray(["Tomti", "Tommmmahawk"]);

// Computed observables

	this.level = ko.computed(function() {
		var clicks = this.clickCount();
		if (clicks < 10) {
			return "newborn";
		}
		if (clicks >= 10 && clicks < 50) {
			return "infant";
		}
		else if (clicks >= 50 && clicks < 100) {
			return "teen";
		}
		else if(clicks >= 100 & clicks < 180) {
			return "adult";
		}
		else if (clicks >= 180) {
			return "senior";
		}
	}, this);
	
};


var ViewModel = function() {
	var self = this;

	this.currentCat = ko.observable(new Cat());
	
	this.incrementCounter = function() {
		self.currentCat().clickCount(self.currentCat().clickCount() + 1);
	};
	
};

ko.applyBindings(new ViewModel());