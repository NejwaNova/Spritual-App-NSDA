const themeToggle= document.querySelector('.theme-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'light' ;

if(currentTheme ==='dark'){
    body.classList.add('dark-theme');
    updateToggleIcon('dark');
} else {
    updateToggleIcon('light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        updateToggleIcon(theme);
        
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
}

function updateToggleIcon(theme) {
    if (themeToggle) {

    if (theme === 'dark') {
        themeToggle.innerHTML = '☀️';
    } else {
        themeToggle.innerHTML = '🌙';
    }   
    }
}