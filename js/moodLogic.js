// Data: This object can remain exactly as you provided it.
const moodResponses = {
    sad: [
        { id: "sad-9-40", text: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا", translation: "Do not be sad; indeed Allah is with us.", reference: "(At-Tawbah 9:40)" },
        { id: "sad-93-3", text: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَى", translation: "Your Lord has not abandoned you, nor hated you.", reference: "(Ad-Duha 93:3)" },
        { id: "sad-12-86", text: "إِنَّمَا أَشْكُو بَثِّي وَحُزْنِي إِلَى اللَّهِ", translation: "I only complain of my suffering and my grief to Allah.", reference: "(Yusuf 12:86)" }
    ],

    anxious: [
        { id: "anxious-13-28", text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", translation: "Surely in the remembrance of Allah do hearts find rest.", reference: "(Ar-Ra’d 13:28)" },
        { id: "anxious-65-3", text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", translation: "Whoever relies upon Allah – He is sufficient for them.", reference: "(At-Talaq 65:3)" },
        { id: "anxious-2-286", text: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", translation: "Allah does not burden a soul beyond what it can bear.", reference: "(Al-Baqarah 2:286)" }
    ],

    stressed: [
        { id: "stressed-94-6", text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "Indeed, with hardship comes ease.", reference: "(Ash-Sharh 94:6)" },
        { id: "stressed-20-25-26", text: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", translation: "My Lord, expand for me my breast [with assurance] and ease for me my task.", reference: "(Ta-Ha 20:25-26)" }
    ],

    grateful: [
        { id: "grateful-93-11", text: "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ", translation: "And proclaim the blessings of your Lord.", reference: "(Ad-Duha 93:11)" },
        { id: "grateful-14-7", text: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ", translation: "If you are grateful, I will surely increase you.", reference: "(Ibrahim 14:7)" },
        { id: "grateful-2-152", text: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ", translation: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.", reference: "(Al-Baqarah 2:152)" }
    ],

    unmotivated: [
        { id: "unmotivated-94-7", text: "فَإِذَا فَرَغْتَ فَانصَبْ", translation: "So when you finish your tasks, stand up (in worship and effort).", reference: "(Ash-Sharh 94:7)" },
        { id: "unmotivated-92-4", text: "إِنَّ سَعْيَكُمْ لَشَتَّى", translation: "Surely your efforts are diverse.", reference: "(Al-Layl 92:4)" },
        { id: "unmotivated-53-39", text: "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ", translation: "And that there is not for man except that [good] for which he strives.", reference: "(An-Najm 53:39)" }
    ],

    angry: [
        { id: "angry-3-134", text: "وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ", translation: "Those who control their anger and forgive people.", reference: "(Aal-Imran 3:134)" },
        { id: "angry-41-34", text: "ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ", translation: "Respond with what is better.", reference: "(Fussilat 41:34)" }
    ],

    seeking: [
        { id: "seeking-39-53", text: "إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا", translation: "Indeed, Allah forgives all sins.", reference: "(Az-Zumar 39:53)" },
        { id: "seeking-11-52", text: "وَاسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ", translation: "Seek your Lord’s forgiveness, then turn to Him in repentance.", reference: "(Hud 11:52)" }
    ],
    
    lonely: [
        { id: "lonely-19-89", text: "رَبِّي لَا تَذَرْنِي فَرْدًا", translation: "My Lord, do not leave me alone.", reference: "(Maryam 19:89)" },
        { id: "lonely-20-46", text: "إِنِّي مَعَكُمَا أَسْمَعُ وَأَرَى", translation: "I am with you both; I hear and I see.", reference: "(Ta-Ha 20:46)" }
    ]
};

// --- Helper Functions ---

// 1. Logic to pick a random response based on mood
function getResponseForMood(mood) {
    const key = String(mood || "").toLowerCase();
    
    // Check if the mood exists in our data, otherwise default
    const responses = moodResponses[key];
    if (!responses || responses.length === 0) {
        return {
            id: "default-response",
            text: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
            translation: "Sufficient for us is Allah, and [He is] the best Disposer of affairs.",
            reference: "(Aal-Imran 3:173)",
        };
    }
    
    // Randomly select one verse from the array
    const randomIndex = Math.floor(Math.random() * responses.length);
    const response = responses[randomIndex];
    
    // Add a unique ID if it's missing (Crucial for saving)
    if (!response.id) {
        // Create a basic ID from the mood and index if not already present
        response.id = `${key}-${randomIndex}`;
    }
    
    return response;
}

/**
 * Checks favorites.js's storage for the current dua and updates the button state.
 * @param {HTMLElement} buttonElement - The save button element.
 * @param {string} duaId - The ID of the current Dua.
 */
function updateSaveButtonState(buttonElement, duaId) {
    // This assumes loadFavorites function exists in favorites.js (loaded before this script)
    if (typeof loadFavorites !== 'function') return; 

    const favorites = loadFavorites();
    const isSaved = favorites.some(fav => fav.id === duaId);

    if (isSaved) {
        buttonElement.textContent = '★ Saved';
        buttonElement.classList.add('btn-secondary');
        buttonElement.classList.remove('btn-primary');
        buttonElement.style.borderColor = 'var(--accent-green)';
    } else {
        buttonElement.textContent = '☆ Save';
        buttonElement.classList.remove('btn-secondary');
        buttonElement.classList.add('btn-primary');
        buttonElement.style.borderColor = '';
    }
}

function displayResponse(response) {
    // Select the content elements
    const arabicElement = document.querySelector('.dua-card .dua-text.arabic');
    const transElement = document.querySelector('.dua-card .dua-translation');
    const refElement = document.querySelector('.dua-card .dua-reference');
    
    // Select the save button element (Crucial for the fix!)
    const saveBtn = document.querySelector('.save-dua-btn');

    if (!arabicElement || !transElement || !saveBtn) {
        console.error("Missing one or more required DOM elements (.dua-text, .dua-translation, or .save-dua-btn).");
        return;
    }

    // 1. Update VISIBLE Content
    arabicElement.textContent = response.text;
    transElement.textContent = response.translation;
    
    // Create or update the reference element if it doesn't exist
    if (!refElement) {
        const newRef = document.createElement('p');
        newRef.className = 'dua-reference';
        newRef.textContent = response.reference;
        transElement.parentNode.insertBefore(newRef, transElement.nextSibling);
    } else {
        refElement.textContent = response.reference;
    }


    // 2. Update SAVE BUTTON DATA ATTRIBUTES (THE FIX!)
    saveBtn.dataset.id = response.id;
    saveBtn.dataset.arabic = response.text;
    saveBtn.dataset.translation = response.translation;
    
    // 3. Update the button's visual state (Saved/Unsaved)
    updateSaveButtonState(saveBtn, response.id);


    // 4. Trigger Animation and Scroll (kept original logic)
    const duaCard = arabicElement.closest('.dua-card');
    if (duaCard) {
        duaCard.style.animation = 'none';
        duaCard.offsetHeight; /* trigger reflow */
        duaCard.style.animation = 'fadeIn 0.6s ease-in-out';
        
        duaCard.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}


function handleMoodSelectionEvent(e) {
    const moodElement = e.target.closest("[data-mood]");
    if (!moodElement) return;

    // Visual feedback
    document.querySelectorAll('.mood-card').forEach(card => {
        card.classList.remove('selected');
    });
    moodElement.classList.add('selected');

    // Logic
    const selectedMood = moodElement.dataset.mood;
    const response = getResponseForMood(selectedMood);
    displayResponse(response);
}


function attachMoodHandlers() {
    const grid = document.querySelector(".mood-grid");
    
    if(!grid) {
        console.warn("Mood grid not found in HTML");
        return;
    }

    // Event Delegation for clicks
    grid.addEventListener("click", handleMoodSelectionEvent);

    // Keyboard accessibility (kept original logic)
    grid.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            const moodElement = e.target.closest("[data-mood]");
            if (moodElement) {
                e.preventDefault();
                moodElement.click();
            }
        }
    });

    console.log("Mood handlers attached.");
}

// Ensure handlers are attached when the DOM is ready (kept original logic)
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachMoodHandlers);
} else {
    attachMoodHandlers();
}