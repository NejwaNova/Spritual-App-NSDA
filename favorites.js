// FAVORITES FUNCTIONALITY Handles saving, loading, and removing favorites 

const STORAGE_KEY = 'spiritualFavorites';

/**
 Loads favorites from localStorage.
 * @returns {Array<Object>} The array of favorite items.
 */
function loadFavorites() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Error loading favorites from localStorage:", e);
        return [];
    }
}

/**
 * Saves the current list of favorites to localStorage.
 * @param {Array<Object>} favorites - The array of favorite items to save.
 */
function saveFavorites(favorites) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
        console.error("Error saving favorites to localStorage:", e);
    }
}

/**
 * Toggles a favorite item (add or remove) and updates the button/icon.
 * @param {string} id - Unique ID of the item (e.g., dua-1, verse-4).
 * @param {string} arabicText - The Arabic text of the dua/verse.
 * @param {string} translation - The English translation.
 * @param {HTMLElement} buttonElement - The button element that was clicked.
 */
window.toggleFavorite = function(id, arabicText, translation, buttonElement) {
    const favorites = loadFavorites();
    const index = favorites.findIndex(fav => fav.id === id);

    if (index === -1) {
        // Not found, so add it
        favorites.push({
            id: id,
            arabic: arabicText,
            translation: translation,
            savedAt: new Date().toISOString()
        });
        buttonElement.textContent = '★ Saved';
        buttonElement.classList.add('btn-secondary');
        buttonElement.classList.remove('btn-primary');
        buttonElement.style.borderColor = 'var(--accent-green)'; // Minor style tweak for saved state
        console.log(`Added favorite: ${id}`);
    } else {
        // Found, so remove it
        favorites.splice(index, 1);
        buttonElement.textContent = '☆ Save';
        buttonElement.classList.remove('btn-secondary');
        buttonElement.classList.add('btn-primary');
        buttonElement.style.borderColor = '';
        console.log(`Removed favorite: ${id}`);
    }

    saveFavorites(favorites);
    // If we're on the favorites page, re-render the list
    if (document.getElementById('favorites-list')) {
        renderFavoritesList();
    }
};

/**
 * Renders the list of favorites on the favorites.html page.
 */
function renderFavoritesList() {
    const listContainer = document.getElementById('favorites-list');
    if (!listContainer) return;

    const favorites = loadFavorites().reverse(); // Show newest first
    listContainer.innerHTML = ''; // Clear existing content

    if (favorites.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center mt-lg">
                <p class="text-dark">You haven't saved any favorites yet.</p>
                <a href="index.html" class="btn btn-primary mt-md">Find a Dua or Verse</a>
            </div>
        `;
        return;
    }

    favorites.forEach(fav => {
        // Create a reusable card structure for the favorite item
        const favoriteCard = document.createElement('div');
        favoriteCard.className = 'dua-card fade-in'; // Reuse existing styling
        favoriteCard.id = `favorite-${fav.id}`;

        const date = new Date(fav.savedAt).toLocaleDateString();

        favoriteCard.innerHTML = `
            <p class="dua-text arabic">${fav.arabic}</p>
            <p class="dua-translation">${fav.translation}</p>
            <div class="mt-md text-right">
                <small style="color: var(--text-light);">Saved on: ${date}</small>
                <button class="btn btn-small btn-secondary ml-sm" 
                        onclick="window.toggleFavorite('${fav.id}', '', '', this)">
                    🗑️ Remove
                </button>
            </div>
        `;
        listContainer.appendChild(favoriteCard);
    });
}

// Initialize the rendering when the favorites page loads
document.addEventListener('DOMContentLoaded', () => {
    // Only run rendering logic if the favorites-list container is present
    if (document.getElementById('favorites-list')) {
        renderFavoritesList();
    }
});