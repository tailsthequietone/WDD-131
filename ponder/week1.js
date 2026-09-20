const PI = 3.14;
let radius = 3;
let area = 0;

area = radius * radius * PI;
console.log("Area 1:", area);

// Change radius and re-calculate
radius = 4;
area = radius * radius * PI;
console.log("Area 2:", area);

const one = 1;
const two = '2';

console.log(one + two); // Concatenates to "12" due to coercion
console.log(one * two); // Converts '2' to a number and outputs 2

let course = "CSE131"; // Global scope

if (true) {
    let student = "John"; // Block scope
    console.log(course);  // Works: 'course' is global
    console.log(student); // Works: inside the block
}

console.log(course);  // Works: 'course' is global
console.log(student); // Throws ReferenceError: 'student' is not defined outside the block