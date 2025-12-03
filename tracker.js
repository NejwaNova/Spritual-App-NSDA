const prayerTimes = [
    { name: "Fajr", time: "05:09" },
    { name: "Dhuhr", time: "12:15" },
    { name: "Asr", time: "15:37" },
    { name: "Maghrib", time: "18:08" },
    { name: "Isha", time: "19:18" }
];

const checkboxes = document.querySelectorAll(".prayer-check");
const progressText = document.getElementById("progressText");
const progressCircle = document.querySelector(".progress-ring-fill");
const resetBtn = document.getElementById("resetBtn");

const nextPrayerName = document.getElementById("nextPrayerName");
const nextPrayerTime = document.getElementById("nextPrayerTime");
const countdown = document.getElementById("countdown");

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
progressCircle.style.strokeDasharray = CIRCUMFERENCE;

/* Load Checkbox State with expiration check */
function loadSaved() {
    const savedData = JSON.parse(localStorage.getItem("prayers")) || {};
    const now = Date.now();
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; // ms in 24 hours

    if (savedData.timestamp && (now - savedData.timestamp > TWENTY_FOUR_HOURS)) {
        // Data expired, clear localStorage
        localStorage.removeItem("prayers");
        // Reset checkboxes
        checkboxes.forEach(cb => cb.checked = false);
    } else {
        // Apply saved states
        checkboxes.forEach(cb => {
            cb.checked = savedData[cb.dataset.name] || false;
        });
    }
    updateProgress();
}
loadSaved();

/* Save State with timestamp */
function saveState() {
    const data = {};
    checkboxes.forEach(cb => data[cb.dataset.name] = cb.checked);
    data.timestamp = Date.now();
    localStorage.setItem("prayers", JSON.stringify(data));
}

/* Update Progress Circle */
function updateProgress() {
    const count = [...checkboxes].filter(cb => cb.checked).length;
    progressText.textContent = `${count}/5`;

    const percent = count / 5;
    const offset = CIRCUMFERENCE - percent * CIRCUMFERENCE;

    progressCircle.style.strokeDashoffset = offset;
}

/* Checkbox Event */
checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
        saveState();
        updateProgress();
    });
});

/* Reset Button */
resetBtn.addEventListener("click", () => {
    checkboxes.forEach(cb => cb.checked = false);
    saveState();
    updateProgress();
});

/* Next Prayer + Countdown */
function findNextPrayer() {
    const now = new Date();

    for (const p of prayerTimes) {
        const [h, m] = p.time.split(":");
        const t = new Date();
        t.setHours(h, m, 0, 0);
        if (now < t) return p;
    }
    return prayerTimes[0];
}

function updateCountdown() {
    const next = findNextPrayer();
    nextPrayerName.textContent = next.name;
    nextPrayerTime.textContent = next.time;

    const now = new Date();
    const [h, m] = next.time.split(":");
    const nextTime = new Date();
    nextTime.setHours(h, m, 0, 0);
    if (now > nextTime) nextTime.setDate(nextTime.getDate() + 1);

    const diff = nextTime - now;
    const hr = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const min = String(Math.floor(diff / 60000 % 60)).padStart(2, "0");
    const sec = String(Math.floor(diff / 1000 % 60)).padStart(2, "0");

    countdown.textContent = `in ${hr}h ${min}m ${sec}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);