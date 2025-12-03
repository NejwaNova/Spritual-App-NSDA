const moodResponses = {
  sad: [
    {
      type: "Verse",
      text: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا",
      translation: "Do not be sad; indeed Allah is with us.",
      reference: "(At-Tawbah 9:40)",
    },
    {
      type: "Verse",
      text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
      translation: "Indeed, with hardship comes ease.",
      reference: "(Ash-Sharh 94:6)",
    },
    {
      type: "Verse",
      text: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَى",
      translation: "Your Lord has not abandoned you, nor hated you.",
      reference: "(Ad-Duha 93:3)",
    },
    {
      type: "Verse",
      text: "إِنِّي مَعَكُمَا أَسْمَعُ وَأَرَى",
      translation: "I am with you both; I hear and I see.",
      reference: "(Ta-Ha 20:46)",
    },
    {
      type: "Verse",
      text: "وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ",
      translation: "Be patient, and your patience is only through Allah.",
      reference: "(An-Nahl 16:127)",
    },
  ],

  anxious: [
    {
      type: "Verse",
      text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
      translation: "Surely in the remembrance of Allah do hearts find rest.",
      reference: "(Ar-Ra’d 13:28)",
    },
    {
      type: "Verse",
      text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
      translation: "Whoever relies upon Allah – He is sufficient for them.",
      reference: "(At-Talaq 65:3)",
    },
    {
      type: "Verse",
      text: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
      translation: "Allah does not burden a soul beyond what it can bear.",
      reference: "(Al-Baqarah 2:286)",
    },
    {
      type: "Verse",
      text: "وَمَا تَدْرِي نَفْسٌ مَّاذَا تَكْسِبُ غَدًا",
      translation: "No soul knows what tomorrow will bring.",
      reference: "(Luqman 31:34)",
    },
  ],

  grateful: [
    {
      type: "Verse",
      text: "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ",
      translation: "And proclaim the blessings of your Lord.",
      reference: "(Ad-Duha 93:11)",
    },
    {
      type: "Verse",
      text: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
      translation: "If you are grateful, I will surely increase you.",
      reference: "(Ibrahim 14:7)",
    },
  ],

  unmotivated: [
    {
      type: "Verse",
      text: "فَإِذَا فَرَغْتَ فَانصَبْ",
      translation:
        "So when you finish your tasks, stand up (in worship and effort).",
      reference: "(Ash-Sharh 94:7)",
    },
    {
      type: "Verse",
      text: "إِنَّ سَعْيَكُمْ لَشَتَّى",
      translation: "Surely your efforts are diverse.",
      reference: "(Al-Layl 92:4)",
    },
  ],

  angry: [
    {
      type: "Verse",
      text: "وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ",
      translation: "Those who control their anger and forgive people.",
      reference: "(Aal-Imran 3:134)",
    },
    {
      type: "Verse",
      text: "ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ",
      translation: "Respond with what is better.",
      reference: "(Fussilat 41:34)",
    },
  ],

  seeking: [
    {
      type: "Verse",
      text: "إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا",
      translation: "Indeed, Allah forgives all sins.",
      reference: "(Az-Zumar 39:53)",
    },
    {
      type: "Verse",
      text: "وَاسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ",
      translation:
        "Seek your Lord’s forgiveness, then turn to Him in repentance.",
      reference: "(Hud 11:52)",
    },
  ],
};

// pick a random response for a mood key
function getResponseForMood(mood) {
  const key = String(mood || "").toLowerCase();
  const responses = moodResponses[key];
  if (!responses || responses.length === 0) {
    return {
      type: "Message",
      text: "O Allah, I seek refuge in You from anxiety and sorrow.",
      translation:
        "We couldn't find a specific response for that mood, but remember, Allah is with you.",
      reference: "(Default Dua)",
    };
  }
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

// display in #mood-output OR fallback to .dua-card
function displayResponse(response) {
  let outputElement = document.getElementById("mood-output");
  if (!outputElement) {
    // fallback if your HTML has .dua-card but not #mood-output
    outputElement = document.querySelector(".dua-card") || null;
  }

  if (!outputElement) {
    console.warn(
      "No output container found for mood response. Add an element with id='mood-output' or a .dua-card element."
    );
    return;
  }

  outputElement.innerHTML = `
        <p class="dua-text arabic">${response.text}</p>
        <p class="dua-translation">${response.translation}</p>
        <p class="dua-reference">${response.reference}</p>
    `;
}

function handleMoodSelectionEvent(e) {
  const moodElement = e.target.closest("[data-mood]");
  if (!moodElement) return;

  const selectedMood = moodElement.dataset.mood;
  if (!selectedMood) return;

  console.log("Mood selected:", selectedMood);
  const response = getResponseForMood(selectedMood);
  displayResponse(response);
}

function attachMoodHandlers() {
  const grid = document.querySelector(".mood-grid") || document.body;
  grid.addEventListener("click", handleMoodSelectionEvent, false);

  grid.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const moodElement = e.target.closest("[data-mood]");
        if (moodElement) {
          e.preventDefault();
          moodElement.click();
        }
      }
    },
    false
  );

  console.log("Mood handlers attached. Click any element with data-mood.");
}

// init
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", attachMoodHandlers);
} else {
  attachMoodHandlers();
}
