const PI = 3.14;
let radius = 3;

area1 = radius * radius * PI;
console.log(area1);

// Change radius and re-calculate
radius = 4;
area2 = radius * radius * PI;
console.log(area2);

const one = 1;
const two = 2;

console.log(one * two); // Concatenates to "12" due to coercion
console.log(one + two); // Converts '2' to a number and outputs 2

let course = "CSE131"; // Global scope

if (true) {
    let student = "John"; // Block scope
    console.log(course);  // Works: 'course' is global
    console.log(student); // Works: inside the block
}

console.log(course);  // Works: 'course' is global
console.log(student); // Throws ReferenceError: 'student' is not defined outside the block