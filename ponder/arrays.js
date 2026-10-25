const steps = ["one", "two", "three"];
function listTemplate(step) {
  return `<li>${step}</li>`;
}
const stepsHtml = steps.map(listTemplate); // use map to convert the list from strings to HTML
document.querySelector("#myList").innerHTML = stepsHtml.join(""); // set the innerHTML

const grades = ["A", "B", "C"];

function convertToPoint(grade) {
    switch(grade) {
        case "A":
            return 4;
        case "B":
            return 3;
        case "C":
            return 2;
        default:
            return 0;
    }
}

const gpaPoints = grades.map(convertToPoint);
console.log(gpaPoints);

const fruit = ["watermelon", "peach", "apple", "tomato", "grape"];

function testLength(item) {
    return item.length < 6;
}

const shortFruit = fruit.filter(testLength);

const students = [
    {last: 'Andrus', first: 'Aaron'},
    {last: 'Masa', first: 'Manny'},
    {last: 'Tanda', first: 'Tamanda'}
];

function studentTemplate(student) {
    return `<div class="student-card">
              <p>${student.first} ${student.last}</p>
              <hr>
            </div>`;
}
const studentsHtml = students.map(studentTemplate);
document.querySelector("#studentList").innerHTML = studentsHtml.join("");