let datePlan = {
    food: '',
    activity: '',
    date: '',
    time: ''
};

function nextStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step-${stepNumber}`).classList.add('active');
}

function selectOption(category, value, element) {
    const siblings = element.parentElement.querySelectorAll('.option-card');
    siblings.forEach(el => el.classList.remove('selected'));
    
    element.classList.add('selected');
    
    // Logic specifically targeting the Step 3 "Other" option toggle mechanics
    if (category === 'activity') {
        const customInput = document.getElementById('custom-activity-input');
        if (value === 'Other') {
            customInput.style.display = 'block';
            customInput.focus();
            // Clear current activity value until they type into the text box
            datePlan.activity = '';
            document.getElementById('activity-next').setAttribute('disabled', 'true');
        } else {
            customInput.style.display = 'none';
            customInput.value = ''; // Reset input text value
            datePlan.activity = value;
            document.getElementById('activity-next').removeAttribute('disabled');
        }
    } else {
        datePlan[category] = value;
        document.getElementById(`${category}-next`).removeAttribute('disabled');
    }
}

// Monitors human text typing patterns in the dynamic field
function handleCustomActivityInput() {
    const textVal = document.getElementById('custom-activity-input').value;
    const nextBtn = document.getElementById('activity-next');
    
    if (textVal.trim().length > 0) {
        datePlan.activity = `✨ ${textVal}`;
        nextBtn.removeAttribute('disabled');
    } else {
        datePlan.activity = '';
        nextBtn.setAttribute('disabled', 'true');
    }
}

function checkDateTimeValidity() {
    const dateVal = document.getElementById('date-input').value;
    const timeVal = document.getElementById('time-input').value;
    
    if (dateVal && timeVal) {
        datePlan.date = dateVal;
        datePlan.time = timeVal;
        document.getElementById('time-next').removeAttribute('disabled');
    }
}

function buildSummary() {
    document.getElementById('summary-food').innerText = datePlan.food;
    document.getElementById('summary-activity').innerText = datePlan.activity;
    
    const formattedDate = new Date(datePlan.date).toLocaleDateString('en-US', {
        weekday: 'long', month: 'short', day: 'numeric'
    });
    
    document.getElementById('summary-time').innerText = `${formattedDate} @ ${datePlan.time}`;
    nextStep(5);
}

function dodgeButton() {
    const noBtn = document.getElementById('no-btn');
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}