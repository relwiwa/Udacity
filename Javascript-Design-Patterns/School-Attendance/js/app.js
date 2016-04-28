/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
/* Comment:
   this IIFE created random data set for all the students and stores
   it in localStorage if there's no data in localStorage yet */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {
		/* Comment:
		 	- get attendance data from localStorage (= model)
			- also setup references to .missed-col and all inputs (= view) */
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
		/* Comment:
		 	- function that counts the days each student missed
			- the sum of missed days is stored in the view and is updated via this function
			- it's not possible to just update one student's missed days
			- it gets called for the first time after loading is complete and after the each
				loop below */
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });
            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
		/* Comment:
			- this is the first function to run
			- each loop runs over attendance object
			- for each student found, the respective table row is found
			- the inputs of this row are referenced
			- another each loop sets attendance in each input according to true/false in days[i] */
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
	 	/* Comment:
			- event listener that is called after changing attendance for one student
			- data for all students gets updated, not possible to just update one student's data
			- countMissing is called to update sums of days missed
			- data in localStorage gets updated */
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());
