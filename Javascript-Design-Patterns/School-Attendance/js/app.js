/*********************************************************
  STUDENT APPLICATION - Udacity Javascript Design Patterns
	https://classroom.udacity.com/courses/ud989
 *********************************************************
 - This is an MVC version of the student attendance
   application following the "burn it"-approach
 - It also uses localStorage, where all model data is
 	 stored and kept up to date
 - model data is now organized upon an unique student id,
 	 and not the student's name
 ********************************************************/

var model = {
	names: ["Slappy the Frog", "Lilly the Lizard", "Paulrus the Walrus", "Gregory the Goat", "Adam the Anaconda"],
	idCounter: 0,

	/* init function
			- sets up data and attendance randomly if there's no data in localStorage */
	init: function() {
		if (!localStorage.students) {
			localStorage.students = JSON.stringify({});
			for (var i = 0; i < model.names.length; i++) {
				model.addStudent(model.names[i]);
			}
		}
	},
	
	/* addStudent:
			- adds a student to localStorage.students
			- adds a unique id and increases idCounter */
	addStudent: function(name) {
		var newStudent = {
			"name": name,
			"attendance": model.createAttendance()			
		}
		var students = octopus.getAllStudents();
		students[model.idCounter] = newStudent;
		/* stringify is necessary, as localStorage only stores simple one-dimensional key-value pairs,
		   and no complex javascript object structures */
		localStorage.students = JSON.stringify(students);
		model.idCounter++;
	},
		
	/* createAttendance function:
			- returns an array with twelve slots and random true/false values */
	createAttendance: function() {
		var attendance = [];
		for (var i = 0; i < 12; i++) {
			attendance.push(Math.random() >= 0.5);
		}
		return attendance;
	},
	
	/* updateAttendance function:
			- attendance of one student gets updated in localStorage */
	updateAttendance: function(id, newAttendance) {
		var attd = JSON.parse(localStorage.students);
		attd[id].attendance = newAttendance;
		localStorage.students = JSON.stringify(attd);
	}

};


var octopus = {
	
	getStudent: function(id) {
		var student = JSON.parse(localStorage.students)[id];
		if (student) {
			return student;
		}
		else {
			console.log("no such student");
		}
	},
	
	getAllStudents: function() {
		return JSON.parse(localStorage.students);
	},
	
	/* updateAttendance function:
			- updates localStorage by toggling the stored value via name and position
			- updates sum of missed days via student.id by increasing or decreasing current value by 1 */
	updateAttendance: function(id, position) {
		var student = octopus.getStudent(id);
		var attd = student.attendance;
		if (attd[position] === true) {
			attd[position] = false;
			view.updateSum(id, 1)
		}
		else {
			attd[position] = true;
			view.updateSum(id, -1);
		}
		model.updateAttendance(id, attd);
	},
	
	init: function() {
		model.init();
		view.init();
	}
};

var view = {
	
	/* init function:
			- table rows are setup for each student
			- insertRow, and insertCell functions are used as document.createElement('tr') does not work
			- an event listener is added to each input field
			- the sum of missed days gets calculated and displayed (considered as part of view) */
	init: function() {
		var students = octopus.getAllStudents();
		var table = document.getElementById("attendance");
		for (key in students) {
			var currAttd = students[key].attendance;
			var sum = 0;
			var tr = table.insertRow(-1);
			tr.setAttribute("class", "student");
			var tdName = tr.insertCell(-1);
			tdName.innerHTML = students[key].name;
			tdName.setAttribute("class", "name-col");
			for (var i = 0; i < currAttd.length; i++) {
				var tdInput = tr.insertCell(-1);
				tdInput.setAttribute("class", "attend-col");
				var input = document.createElement("input");
				input.setAttribute("type", "checkbox");
				if (currAttd[i] === true) {
					input.checked = true;
					sum++;
				}
				// IIFE necessary for adding event listener within loop
				(function addListener(key, i) {
					input.addEventListener("change", function() {
						octopus.updateAttendance(key, i);
					});
				})(key, i);
				tdInput.appendChild(input);
			}
			var tdSum = tr.insertCell(-1);
			tdSum.setAttribute("class", "missed-col");
			tdSum.setAttribute("id", "sum-" + key);
			tdSum.textContent = 12 - sum;
		}
	},

	/* updateSum function:
			sum of days missed gets updated, based on student's id and respective sum element */
	updateSum: function(id, value) {
		var currVal = document.getElementById("sum-" + id).textContent;
		document.getElementById("sum-" + id).textContent = parseInt(currVal) + value;
	}
	
};

octopus.init();