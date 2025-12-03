//Sets up the save functionality for the 'Dua of the Day' card.
function setupDuaOfTheDay() {
    // Get necessary elements from the Dua section (using the IDs from index.html)
    const saveBtn = document.getElementById('save-dua-btn');
    const arabicElement = document.getElementById('dua-arabic');
    const translationElement = document.getElementById('dua-translation');
    
    // Define a stable ID for the specific content shown on the index page
    const DUA_ID = 'dua-quran-1'; 

    // Safety check: ensure required elements exist
    if (!saveBtn || !arabicElement || !translationElement) {
        console.warn("Dua section elements not found. Skipping save setup.");
        return;
    }

    // Load content and check initial state
    const arabicText = arabicElement.textContent.trim();
    const translationText = translationElement.textContent.trim();
    
    // Check if this specific Dua is already saved (requires favorites.js functions to be loaded)
    if (window.isItemFavorite(DUA_ID)) {
        saveBtn.textContent = '★ Saved';
        saveBtn.classList.remove('btn-primary');
        saveBtn.classList.add('btn-secondary');
    }

    // Set up the click handler
    saveBtn.addEventListener('click', () => {
        // We call the global function defined in favorites.js
        window.toggleFavorite(DUA_ID, arabicText, translationText, saveBtn);
    });
}


// Run the setup when the document is ready
document.addEventListener('DOMContentLoaded', setupDuaOfTheDay);