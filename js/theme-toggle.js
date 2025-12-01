/* ============================================
   THEME TOGGLE FUNCTIONALITY
   Simple JavaScript for Light/Dark Mode
   ============================================ */

// Get theme toggle button and body element
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply the saved theme on page load
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    updateToggleIcon('dark');
} else {
    updateToggleIcon('light');
}

// Theme toggle click event
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        // Save theme preference
        const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Update toggle icon
        updateToggleIcon(theme);
        
        // Add a smooth transition effect
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
}

// Function to update toggle icon based on current theme
function updateToggleIcon(theme) {
    if (themeToggle) {
        if (theme === 'dark') {
            themeToggle.innerHTML = '☀️'; // Sun icon for dark mode (click to go light)
        } else {
            themeToggle.innerHTML = '🌙'; // Moon icon for light mode (click to go dark)
        }
    }
}

// Optional: Listen for system theme preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            body.classList.add('dark-theme');
            updateToggleIcon('dark');
        } else {
            body.classList.remove('dark-theme');
            updateToggleIcon('light');
        }
    }
});

