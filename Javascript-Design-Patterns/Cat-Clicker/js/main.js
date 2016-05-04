/* Cat Clicker App for Udacity Course Javascript Design Patterns

	 Another Go at the Cat Clicker App, this time using Knockout.js
	 
	 It includes all the functionality of the previous pure JS version, plus:
	 - There are levels, reflecting the number of clicks
	 - Nicknames are displayed
	 - Several cats on a pic can now be treated individually
	 
	 Changing nicknames has been added to the admin area.
	 
	 Nice to have functionalities to be done:
	 - add (or remove) cats from a picture in admin area
	 - add (or remove) nicknames for indidviual cats in admin area */

var Cat = function(data) {

	// Observables
	
	this.clickCount = ko.observable(0);
	this.imgSrc = ko.observable(data.imgSrc);
	this.names = ko.observableArray();
	this.multipleCats = ko.observable(false);
	if (data.naming.length > 1) {
		this.multipleCats(true);
	}
	/* - Adding each name and each nickname as observables, so that changes in admin
			 take effect via the two-way binding.
		 - For an unknown reason, this only works, when adding the observables as
		 	 objects to the observableArray. It's not working when just adding them as
			 array elements, which makes everything pretty complicated */
	for (var i = 0; i < data.naming.length; i++) {
		var newName = {};
		newName["name"] = ko.observable(data.naming[i].name);
		this.names.push(newName);
		this.names()[i].nicknames = ko.observableArray();
		for (var j = 0; j < data.naming[i].nicknames.length; j++) {
			var newNickname = {};
			newNickname["nickname-" + j] = ko.observable(data.naming[i].nicknames[j]);
			this.names()[i].nicknames.push(newNickname);
		}
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

	/* this.levelString:
		- Returns the correct singular or plural parts to be displayed in the view */	
	this.levelString = ko.computed(function() {
		var level = this.level();
		var phrase = {};
		if (this.multipleCats()) {
			phrase.before = "they are ";
			phrase.after = "s";
		}
		else {
			phrase.before = "it is a";
			if (level.charAt(0).match(/[aeiou]/)) {
				phrase.before += "n";
			}
			phrase.before += " ";
		}
		return phrase;
	}, this);

	/* this.nameString:
		- Returns a proper textual representation of the cat's names
		- The last two cats are concatenated with and "and"
		- The cats before are concatenated with a comma */
	this.nameString = ko.computed(function() {
		var amount = this.names().length;
		if (amount === 1) {
			return this.names()[0]["name"]();
		}
		else if (amount === 2) {
			return this.names()[0]["name"]() + " and " + this.names()[1]["name"]();
		}
		else {
			var returnString = "";
			for (var i = 0; i < amount - 2; i++) {
				returnString += this.names()[i]["name"]() + ", ";
			}
			returnString += this.names()[amount - 2]["name"]() + " and " + this.names()[amount - 1]["name"]();
			return returnString;
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