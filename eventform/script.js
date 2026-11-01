const form = document.querySelector("#eventForm");
const ticketType = document.querySelector("#ticketType");
const conditionalContainer = document.querySelector("#conditionalContainer");
const conditionalLabel = document.querySelector("#conditionalLabel");
const conditionalInput = document.querySelector("#conditionalInput");
const output = document.querySelector("#output");

function updateConditionalField() {
  const value = ticketType.value;
  conditionalInput.value = ""; // clear previous input

  if (value === "student") {
    conditionalContainer.hidden = false;
    conditionalLabel.textContent = "Student I#";
  } else if (value === "guest") {
    conditionalContainer.hidden = false;
    conditionalLabel.textContent = "Access Code";
  } else {
    conditionalContainer.hidden = true;
  }
}

ticketType.addEventListener("change", updateConditionalField);
updateConditionalField();

function isPastDate(value) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date
  const chosen = new Date(value);
  return chosen <= today; // Enforces a date *later* than today
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.textContent = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const type = form.ticketType.value;
  const eventDate = form.eventDate.value;
  const condValue = form.conditionalInput.value.trim();

  // Validate Event Date
  if (isPastDate(eventDate)) {
    output.textContent = "Please choose a date later than the current date.";
    return;
  }

  // Validate Conditional Inputs
  if (type === "student") {
    // Check if it contains exactly 9 characters
    if (condValue.length !== 9 || isNaN(condValue)) {
      output.textContent = "Student I# must be 9 digits";
      return;
    }
  } else if (type === "guest") {
    if (condValue !== "EVENT131") {
      output.textContent = "Invalid Access Code. Please enter EVENT131.";
      return;
    }
  }

  // Success Output
  output.innerHTML = `
    <h2>Ticket Created</h2>
    <p>${firstName} ${lastName}</p>
    <p>${type}</p>
    <p>${eventDate}</p>
  `;

  form.reset();
  updateConditionalField();
});