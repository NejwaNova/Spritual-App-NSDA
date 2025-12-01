const PRAYER_NAMES = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

function getTodayDateId() {
    return new Date().toISOString().slice(0, 10);
}

function loadPrayerData() {
    const today = getTodayDateId();
    const storedDate = localStorage.getItem('prayerDate');
    
    if (storedDate !== today) {
        localStorage.setItem('prayerDate', today);
        PRAYER_NAMES.forEach(prayer => {
            localStorage.setItem(prayer, 'false');
        });
    }

    const prayerData = {};
    PRAYER_NAMES.forEach(prayer => {
        prayerData[prayer] = localStorage.getItem(prayer) === 'true';
    });
    return prayerData;
}

function markPrayerComplete(prayerName) {
    localStorage.setItem(prayerName, 'true');
}

function updateUI() {
    const prayerData = loadPrayerData();

    PRAYER_NAMES.forEach(prayer => {
        const itemElement = document.querySelector(`.prayer-item[data-prayer-name="${prayer}"]`);
        const button = document.querySelector(`.track-btn[data-prayer-name="${prayer}"]`);

        if (itemElement && button) {
            const isComplete = prayerData[prayer];

            if (isComplete) {
                itemElement.style.backgroundColor = '#d4edda';
                itemElement.style.color = '#155724';
                button.textContent = 'Completed!';
                button.disabled = true;
            } else {
                itemElement.style.backgroundColor = 'var(--card-bg)';
                itemElement.style.color = 'inherit';
                button.textContent = 'Mark Complete';
                button.disabled = false;
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    PRAYER_NAMES.forEach(prayer => {
        const button = document.querySelector(`.track-btn[data-prayer-name="${prayer}"]`);
        if (button) {
            button.addEventListener('click', () => {
                markPrayerComplete(prayer);
                updateUI();
            });
        }
    });

    
    updateUI();
});
