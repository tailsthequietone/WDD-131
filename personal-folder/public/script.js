const TOTAL_PLANNING_STEPS = 6; // Steps 2 through 7

const SLIDER_LABELS = {
    planning: {
        1: 'Totally spontaneous',
        2: 'Mostly go with the flow',
        3: 'Mix of planned & spontaneous',
        4: 'Like a loose game plan',
        5: 'Love a thoughtful itinerary'
    },
    pace: {
        1: 'Super cozy & low-key',
        2: 'Relaxed & unhurried',
        3: 'Balanced pace',
        4: 'Upbeat & active',
        5: 'Full-on adventure'
    },
    convo: {
        1: 'Mostly laughs & banter',
        2: 'Playful & easygoing',
        3: 'Mix of laughs & depth',
        4: 'Thoughtful & curious',
        5: 'Deep late-night talks'
    }
};

const datePlan = {
    name: '',
    dietary: '',
    vibes: {
        planning: SLIDER_LABELS.planning[3],
        pace: SLIDER_LABELS.pace[3],
        convo: SLIDER_LABELS.convo[3]
    },
    promptQuestion: '',
    promptAnswer: '',
    currentlyInto: '',
    food: '',
    activity: '',
    date: '',
    time: '',
    durationHours: 3
};

// Prevent selecting past dates
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date-input');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
});

function nextStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step-${stepNumber}`).classList.add('active');

    // Reset the dodging "No" button if returning to Step 1
    if (stepNumber === 1) {
        const noBtn = document.getElementById('no-btn');
        noBtn.style.position = '';
        noBtn.style.left = '';
        noBtn.style.top = '';
    }

    updateProgress(stepNumber);
}

function updateProgress(stepNumber) {
    const wrapper = document.getElementById('progress-wrapper');
    const fill = document.getElementById('progress-fill');
    const label = document.getElementById('step-label');
    const percentEl = document.getElementById('step-percent');

    if (stepNumber === 1) {
        wrapper.classList.remove('visible');
        return;
    }

    wrapper.classList.add('visible');
    const current = stepNumber - 1;
    const percent = Math.round((current / TOTAL_PLANNING_STEPS) * 100);

    label.textContent = stepNumber === 7 ? 'Complete' : `Step ${current} of ${TOTAL_PLANNING_STEPS}`;
    percentEl.textContent = `${percent}%`;
    fill.style.width = `${percent}%`;
}

/* --- Step 1: Playful No Button --- */
function dodgeButton() {
    const noBtn = document.getElementById('no-btn');
    const padding = 24;
    const maxX = Math.max(padding, window.innerWidth - noBtn.offsetWidth - padding);
    const maxY = Math.max(padding, window.innerHeight - noBtn.offsetHeight - padding);

    const x = padding + Math.random() * (maxX - padding);
    const y = padding + Math.random() * (maxY - padding);

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.zIndex = '999';
}

/* --- Step 2: Basics & Vibe Sliders --- */
function updateSlider(key) {
    const val = document.getElementById(`slider-${key}`).value;
    const text = SLIDER_LABELS[key][val];
    document.getElementById(`label-${key}`).textContent = text;
    datePlan.vibes[key] = text;
}

function validateStep2() {
    const name = document.getElementById('name-input').value.trim();
    document.getElementById('step2-next').disabled = name.length === 0;
}

function saveStep2AndNext() {
    datePlan.name = document.getElementById('name-input').value.trim();
    datePlan.dietary = document.getElementById('dietary-input').value.trim();
    nextStep(3);
}

/* --- Step 3: Thoughtful Story-Starter Prompts --- */
function selectPrompt(button, questionText) {
    document.querySelectorAll('.prompt-option').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    datePlan.promptQuestion = questionText;

    const answerGroup = document.getElementById('prompt-answer-group');
    const answerInput = document.getElementById('prompt-answer');
    document.getElementById('prompt-answer-label').innerHTML =
        `${questionText} <span class="required">*</span>`;

    answerGroup.style.display = 'flex';
    answerInput.focus();
    validateStep3();
}

function validateStep3() {
    const answer = document.getElementById('prompt-answer').value.trim();
    const isValid = datePlan.promptQuestion.length > 0 && answer.length > 0;
    document.getElementById('step3-next').disabled = !isValid;
}

function saveStep3AndNext() {
    datePlan.promptAnswer = document.getElementById('prompt-answer').value.trim();
    datePlan.currentlyInto = document.getElementById('currently-input').value.trim();
    nextStep(4);
}

/* --- Steps 4 & 5: Food & Activity Selection --- */
function selectOption(category, value, element) {
    const siblings = element.parentElement.querySelectorAll('.option-card');
    siblings.forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');

    const customInput = document.getElementById(`custom-${category}-input`);
    const nextBtn = document.getElementById(`${category}-next`);

    if (value === 'Other') {
        customInput.style.display = 'block';
        customInput.focus();
        datePlan[category] = customInput.value.trim() ? `✨ ${customInput.value.trim()}` : '';
        nextBtn.disabled = datePlan[category].length === 0;
    } else {
        customInput.style.display = 'none';
        customInput.value = '';
        datePlan[category] = value;
        nextBtn.disabled = false;
    }
}

function handleCustomInput(category) {
    const textVal = document.getElementById(`custom-${category}-input`).value.trim();
    const nextBtn = document.getElementById(`${category}-next`);

    if (textVal.length > 0) {
        datePlan[category] = `✨ ${textVal}`;
        nextBtn.disabled = false;
    } else {
        datePlan[category] = '';
        nextBtn.disabled = true;
    }
}

/* --- Step 6: Date & Time --- */
function checkDateTimeValidity() {
    const dateVal = document.getElementById('date-input').value;
    const timeVal = document.getElementById('time-input').value;
    const durationVal = parseInt(document.getElementById('duration-input').value, 10);

    datePlan.date = dateVal;
    datePlan.time = timeVal;
    datePlan.durationHours = durationVal || 3;

    document.getElementById('time-next').disabled = !(dateVal && timeVal);
}

function parseLocalDateTime(dateStr, timeStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, 0);
}

function formatReadableDateTime(dateStr, timeStr) {
    const dt = parseLocalDateTime(dateStr, timeStr);
    const datePart = dt.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });
    const timePart = dt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
    return `${datePart} at ${timePart}`;
}

/* --- Step 7: Summary --- */
function buildSummary() {
    document.getElementById('summary-heading').textContent = `It's a Date, ${datePlan.name}!`;
    document.getElementById('summary-name').textContent = `${datePlan.name}'s`;
    document.getElementById('summary-food').textContent = datePlan.food;
    document.getElementById('summary-activity').textContent = datePlan.activity;
    document.getElementById('summary-time').textContent = formatReadableDateTime(datePlan.date, datePlan.time);

    // Optional dietary row
    const dietaryRow = document.getElementById('summary-dietary-row');
    if (datePlan.dietary) {
        document.getElementById('summary-dietary').textContent = datePlan.dietary;
        dietaryRow.style.display = 'flex';
    } else {
        dietaryRow.style.display = 'none';
    }

    // Vibe badges
    const vibesContainer = document.getElementById('summary-vibes');
    vibesContainer.innerHTML = '';
    Object.values(datePlan.vibes).forEach(vibeText => {
        const span = document.createElement('span');
        span.className = 'summary-chip';
        span.textContent = vibeText;
        vibesContainer.appendChild(span);
    });

    // Story Prompt Q&A
    document.getElementById('summary-prompt-q').textContent = datePlan.promptQuestion;
    document.getElementById('summary-prompt-a').textContent = datePlan.promptAnswer;

    // Optional "Currently into"
    const currentlyRow = document.getElementById('summary-currently-row');
    if (datePlan.currentlyInto) {
        document.getElementById('summary-currently').textContent = datePlan.currentlyInto;
        currentlyRow.style.display = 'block';
    } else {
        currentlyRow.style.display = 'none';
    }

    nextStep(7);
}

/* --- Shared Event Details Builder --- */
function getEventMetadata() {
    const startDate = parseLocalDateTime(datePlan.date, datePlan.time);
    const endDate = new Date(startDate.getTime() + datePlan.durationHours * 60 * 60 * 1000);
    const title = `Date Night with ${datePlan.name}: ${datePlan.food} & ${datePlan.activity}`;

    const descriptionLines = [
        `Food: ${datePlan.food}`,
        `Activity: ${datePlan.activity}`,
        datePlan.dietary ? `Food Notes: ${datePlan.dietary}` : null,
        `Vibe: ${Object.values(datePlan.vibes).join(' • ')}`,
        `${datePlan.promptQuestion} ${datePlan.promptAnswer}`,
        datePlan.currentlyInto ? `Currently into: ${datePlan.currentlyInto}` : null
    ].filter(Boolean);

    return {
        startDate,
        endDate,
        title,
        description: descriptionLines.join('\n')
    };
}

function formatCalendarUTC(dateObj) {
    const pad = n => String(n).padStart(2, '0');
    return (
        dateObj.getUTCFullYear() +
        pad(dateObj.getUTCMonth() + 1) +
        pad(dateObj.getUTCDate()) +
        'T' +
        pad(dateObj.getUTCHours()) +
        pad(dateObj.getUTCMinutes()) +
        pad(dateObj.getUTCSeconds()) +
        'Z'
    );
}

/* --- Option 1: One-Click Google Calendar (Desktop & Mobile Web) --- */
function openGoogleCalendar() {
    const { startDate, endDate, title, description } = getEventMetadata();
    const dates = `${formatCalendarUTC(startDate)}/${formatCalendarUTC(endDate)}`;

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        dates: dates,
        details: description
    });

    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank', 'noopener,noreferrer');
}

/* --- Option 2: Download .ICS File (RFC 5545 for Apple Calendar / Outlook) --- */
function escapeICS(text) {
    return String(text)
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\r?\n/g, '\\n');
}

function downloadICS() {
    const { startDate, endDate, title, description } = getEventMetadata();
    const now = new Date();

    const icsLines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//DateScheduler//PlanOurDate//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@date-scheduler`,
        `DTSTAMP:${formatCalendarUTC(now)}`,
        `DTSTART:${formatCalendarUTC(startDate)}`,
        `DTEND:${formatCalendarUTC(endDate)}`,
        `SUMMARY:${escapeICS(title)}`,
        `DESCRIPTION:${escapeICS(description)}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ];

    const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'our-date.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/* --- Copy Summary Helper --- */
function copySummary() {
    const { description } = getEventMetadata();
    const text = [
        `It's a Date! (${datePlan.name})`,
        `When: ${formatReadableDateTime(datePlan.date, datePlan.time)}`,
        description
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copy-btn');
        const original = btn.textContent;
        btn.textContent = '✓ Copied to Clipboard!';
        setTimeout(() => {
            btn.textContent = original;
        }, 2000);
    });
}