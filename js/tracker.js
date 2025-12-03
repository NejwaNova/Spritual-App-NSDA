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

/* Load Checkbox State */
function loadSaved() {
    let saved = JSON.parse(localStorage.getItem("prayers")) || {};

    checkboxes.forEach(cb => {
        cb.checked = saved[cb.dataset.name] || false;
    });

    updateProgress();
}
loadSaved();

/* Save State */
function saveState() {
    let data = {};
    checkboxes.forEach(cb => data[cb.dataset.name] = cb.checked);
    localStorage.setItem("prayers", JSON.stringify(data));
}

/* Update Progress Circle */
function updateProgress() {
    let count = [...checkboxes].filter(cb => cb.checked).length;
    progressText.textContent = `${count}/5`;

    let percent = count / 5;
    let offset = CIRCUMFERENCE - percent * CIRCUMFERENCE;

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
    let now = new Date();

    for (let p of prayerTimes) {
        let [h, m] = p.time.split(":");
        let t = new Date();
        t.setHours(h, m, 0, 0);

        if (now < t) return p;
    }
    return prayerTimes[0];
}

function updateCountdown() {
    let next = findNextPrayer();
    nextPrayerName.textContent = next.name;
    nextPrayerTime.textContent = next.time;

    let now = new Date();
    let [h, m] = next.time.split(":");
    let nextTime = new Date();
    nextTime.setHours(h, m, 0, 0);

    if (now > nextTime) nextTime.setDate(nextTime.getDate() + 1);

    let diff = nextTime - now;
    let hr = String(Math.floor(diff / 3600000)).padStart(2, "0");
    let min = String(Math.floor(diff / 60000 % 60)).padStart(2, "0");
    let sec = String(Math.floor(diff / 1000 % 60)).padStart(2, "0");

    countdown.textContent = `in ${hr}h ${min}m ${sec}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
