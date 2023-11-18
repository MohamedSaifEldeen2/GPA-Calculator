function addRow() {
    var tbody = document.querySelector('.myTable tbody');
    var row = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");

    td1.innerHTML = tbody.rows.length+1; 
    td2.innerHTML = '<input type="text" class="course" name="course" id="course">';
    td3.innerHTML = '<select class="hours" name="hours" onchange="calculateTotalHours(); calculateGPA()" id="hours"><option value=""></option><option value="0">0</option><option value="2">2</option><option value="3">3</option><option value="6">6</option></select>';
    td4.innerHTML = '<select name="grade" class="grade" onchange="calculateGPA()" id="grade"><option value=""></option><option value="4">A+</option><option value="3.7">A</option><option value="3.3">B+</option><option value="3">B</option><option value="2.7">C+</option><option value="2.3">C</option><option value="2">D+</option><option value="1.7">D</option><option value="0">F</option></select>';

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);

    tbody.appendChild(row);

    calculateTotalHours();
    calculateGPA();
}

function deleteRow() {
    var tbody = document.querySelector('.myTable tbody');
    var rows = tbody.getElementsByTagName('tr');
    
    if (rows.length > 1) {
        tbody.removeChild(rows[rows.length - 1]);

        calculateTotalHours();
        calculateGPA();
    }
}

function calculateTotalHours() {
    var totalHours = 0;
    var hourInputs = document.querySelectorAll('.myTable tbody .hours');

    hourInputs.forEach(function (input) {
        var selectedValue = input.value;
        if (selectedValue !== "") {
            totalHours += parseInt(selectedValue);
        }
    });

    document.getElementById('totalHours').value = totalHours;

    calculateGPA();
}

function calculateGPA() {
    var totalGradeHours = 0;
    var totalHours = 0;

    var gpaInputs = document.querySelectorAll('.myTable tbody .grade');
    var hourInputs = document.querySelectorAll('.myTable tbody .hours');

    gpaInputs.forEach(function (input, index) {
        var gradeValue = parseFloat(input.value);
        var hoursValue = parseInt(hourInputs[index].value);

        if (!isNaN(gradeValue) && !isNaN(hoursValue) && gradeValue > 0) {
            totalGradeHours += gradeValue * hoursValue;
            totalHours += hoursValue;
        }
    });

    var gpa = totalHours > 0 ? totalGradeHours / totalHours : 0;

    document.getElementById('gpa').value = gpa.toFixed(3);
}



function clearInputs() {
    var courseInputs = document.querySelectorAll('.myTable tbody .course');
    courseInputs.forEach(function (input) {
        input.value = '';
    });

    var hourInputs = document.querySelectorAll('.myTable tbody .hours');
    hourInputs.forEach(function (input) {
        input.value = '';
    });

    var gradeInputs = document.querySelectorAll('.myTable tbody .grade');
    gradeInputs.forEach(function (input) {
        input.value = '';
    });

    document.getElementById('totalHours').value = '';

    document.getElementById('gpa').value = '';
}

