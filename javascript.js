// Get the form
const studentForm = document.getElementById("studentForm");

// When form is submitted
studentForm.addEventListener("submit", function (event) {
  // Stop page from refreshing
  event.preventDefault();

  // Get student name
  let name = document.getElementById("name").value.trim();

  // Get age
  let age = document.getElementById("age").value;

  // Get selected gender
  let gender = document.querySelector('input[name="gender"]:checked');

  // Get input elements
  let attendanceInput = document.getElementById("attendance");

  let studyHoursInput = document.getElementById("study_hours");

  let previousMarksInput = document.getElementById("previous_marks");

  // Check empty fields
  if (
    name === "" ||
    age === "" ||
    gender === null ||
    attendanceInput.value === "" ||
    studyHoursInput.value === "" ||
    previousMarksInput.value === ""
  ) {
    alert("Please fill all the details.");

    return;
  }

  // Convert values into numbers
  let ageValue = Number(age);

  let attendance = Number(attendanceInput.value);

  let studyHours = Number(studyHoursInput.value);

  let previousMarks = Number(previousMarksInput.value);

  // Validate age
  if (ageValue <= 0 || ageValue > 100) {
    alert("Please enter a valid age.");

    return;
  }

  // Validate attendance
  if (attendance < 0 || attendance > 100) {
    alert("Attendance must be between 0 and 100.");

    return;
  }

  // Validate previous marks
  if (previousMarks < 0 || previousMarks > 100) {
    alert("Previous marks must be between 0 and 100.");

    return;
  }

  // Validate study hours
  if (studyHours < 0) {
    alert("Study hours cannot be negative.");

    return;
  }

  let score = attendance * 0.2 + studyHours * 0.3 + previousMarks * 0.5;

  // Get result element
  let result = document.getElementById("result");

  // Display performance
  if (score >= 80) {
    result.innerHTML =
      name + " is likely to perform excellently in the upcoming exams.";
  } else if (score >= 60) {
    result.innerHTML =
      name + " is likely to perform well in the upcoming exams.";
  } else {
    result.innerHTML =
      name + " is likely to perform averagely in the upcoming exams.";
  }

  localStorage.setItem("studentName", name);

  localStorage.setItem("age", ageValue);

  localStorage.setItem("gender", gender.value);

  localStorage.setItem("attendance", attendance);

  localStorage.setItem("studyHours", studyHours);

  localStorage.setItem("previousMarks", previousMarks);

  localStorage.setItem("score", score.toFixed(2));

  // Open dashboard
  window.location.href = "index1.html";
});

// Reset form
studentForm.addEventListener("reset", function () {
  document.getElementById("result").innerHTML = "";
});
