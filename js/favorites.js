// FAVORITES FUNCTIONALITY
const STORAGE_KEY = 'spiritualFavorites';

/**
 * Loads favorites from localStorage.
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
 */
window.toggleFavorite = function(id, arabicText, translation, buttonElement) {
    const favorites = loadFavorites();
    const index = favorites.findIndex(fav => fav.id === id);

    if (index === -1) {
        // Not found, add it
        favorites.push({
            id: id,
            arabic: arabicText,
            translation: translation,
            savedAt: new Date().toISOString()
        });
        
        // Update UI to "Saved" state
        buttonElement.textContent = '★ Saved';
        buttonElement.classList.add('btn-secondary');
        buttonElement.classList.remove('btn-primary');
        buttonElement.style.borderColor = 'var(--accent-green)'; 
        console.log(`Added favorite: ${id}`);
    } else {
        // Found, remove it
        favorites.splice(index, 1);
        
        // Update UI to "Save" state
        buttonElement.textContent = '☆ Save';
        buttonElement.classList.remove('btn-secondary');
        buttonElement.classList.add('btn-primary');
        buttonElement.style.borderColor = '';
        console.log(`Removed favorite: ${id}`);
    }

    saveFavorites(favorites);

    // If we are currently on the favorites page, refresh the list immediately
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
        const favoriteCard = document.createElement('div');
        favoriteCard.className = 'dua-card fade-in';
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

// INITIALIZATION LOGIC
document.addEventListener('DOMContentLoaded', () => {

    // 1. Render List if on Favorites Page
    if (document.getElementById('favorites-list')) {
        renderFavoritesList();
    }

    // 2. Global Event Listener for Save Buttons
    // This handles clicks on ANY element with class 'save-dua-btn', 
    // even if that element was created dynamically by JavaScript.
    document.body.addEventListener('click', (event) => {
        const btn = event.target.closest('.save-dua-btn');
        
        if (btn) {
            const id = btn.dataset.id;
            const arabic = btn.dataset.arabic;
            const translation = btn.dataset.translation;

            if (id && arabic && translation) {
                toggleFavorite(id, arabic, translation, btn);
            } else {
                console.warn("Save button clicked but missing data attributes.");
            }
        }
    });
});