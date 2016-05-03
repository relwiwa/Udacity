/* Cat Clicker App for Udacity Course Javascript Design Patterns

	 Another Go at the Cat Clicker App, this time using Knockout.js */

var Cat = function(data) {

// Observables
	
	this.clickCount = ko.observable(0);
	this.name = ko.observable(data.name);
	this.imgSrc = ko.observable(data.imgSrc);
	this.nicknames = ko.observableArray();
	for (var i = 0; i < data.nicknames.length; i++) {
		var newNickname = {};
		newNickname["nickname-" + i] = ko.observable(data.nicknames[i]);
		this.nicknames.push(newNickname);
	}

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

	this.allCats = ko.observableArray();
	
	for (var i = 0; i < initialCats.length; i++) {
		self.allCats().push(new Cat(initialCats[i]));
	}

	this.currentCat = ko.observable(this.allCats()[0]);
	
	this.incrementCounter = function() {
		self.currentCat().clickCount(self.currentCat().clickCount() + 1);
	};
	
	/* Knockout provides Cat object that was clicked, so we only need to give
	   currentCat this Cat object and all the rest will update */ 
	this.changeCurrentCat = function(data) {
		self.currentCat(data);
	};
	
	this.adminViewDisplayed = ko.observable(false);
	
	this.toggleAdminView = function() {
		if (self.adminViewDisplayed() == true) {
			document.getElementById("admin").style.opacity = "0.5";
			self.adminViewDisplayed(false);
		}
		else {
			document.getElementById("admin").style.opacity = "1.0";
			self.adminViewDisplayed(true);
		}
	};

};

ko.applyBindings(new ViewModel());