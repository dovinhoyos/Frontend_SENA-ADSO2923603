/**
 * Fetches the candidates data from a remote JSON file.
 * @async
 * @returns {Promise<Array<Object>|null>} Array of candidate objects or null if there is an error.
 */
const getCandidatesData = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/CesarMCuellarCha/Elecciones/refs/heads/main/candidatos.json"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching candidates data:", error);
    return null;
  }
};

/**
 * Creates a card for a given candidate with a fallback for missing data.
 * @param {Object} candidate - The candidate object.
 * @returns {string} HTML string for the candidate card.
 */
const createCandidateCard = (candidate) => {
  const photo = candidate.foto || 'default-photo-url.jpg'; // Default image URL
  const fullName = `${candidate.nombre || 'Unknown'} ${candidate.apellido || 'Unknown'}`;
  const ficha = candidate.ficha || 'N/A';
  const curso = candidate.curso || 'N/A';

  return `
    <div id="candidate-card">
      <img id="candidate-photo" src="${photo}" alt="Photo of ${fullName}" />
      <h3 id="candidate-name">${fullName}</h3>
      <p class="candidate-details"><strong>Ficha:</strong> ${ficha}</p>
      <p class="candidate-details"><strong>Curso:</strong> ${curso}</p>
    </div>
  `;
};

/**
 * Fetches the candidates and renders them as cards in the document.
 * If the container does not exist, it is created. The container is cleared before rendering.
 * @async
 * @returns {Promise<void>}
 */
const showCandidates = async () => {
  const candidates = await getCandidatesData();
  if (!candidates) {
    console.error("No candidates data available.");
    const errorMessage = document.createElement('p');
    errorMessage.innerText = 'Failed to load candidates data. Please try again later.';
    document.body.appendChild(errorMessage);
    return;
  }

  let container = document.getElementById('candidates-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'candidates-container';
    document.body.appendChild(container);
  }
  container.innerHTML = ''; // Clear any existing content

  // Collect all candidate cards and add them to the container in one go
  const candidateCards = candidates.map(candidate => createCandidateCard(candidate)).join('');
  container.innerHTML = candidateCards;
};

/**
 * Adds click event listeners to each candidate card so that only one card can be clicked.
 * Once a card is clicked, it overlays an 'X' image, disables itself, and disables all other cards.
 * After 5 seconds, all cards are enabled again and overlays are removed.
 */
const enableCardDisabling = () => {
  const container = document.getElementById('candidates-container');
  if (!container) return;
  const cards = container.querySelectorAll('#candidate-card');
  cards.forEach(card => {
    card.style.position = 'relative';
    card.style.cursor = 'pointer';
    card.addEventListener('click', function handleClick() {
      // Prevent multiple overlays
      if (card.classList.contains('disabled')) return;

      // Create overlay
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = 'rgba(255,255,255,0.7)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = 2;
      overlay.innerHTML = `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="#ff4444" opacity="0.8"/>
          <line x1="16" y1="16" x2="32" y2="32" stroke="white" stroke-width="4" stroke-linecap="round"/>
          <line x1="32" y1="16" x2="16" y2="32" stroke="white" stroke-width="4" stroke-linecap="round"/>
        </svg>
      `;
      card.appendChild(overlay);
      card.classList.add('disabled');
      card.style.pointerEvents = 'none';

      // Disable all other cards
      cards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.add('disabled');
          otherCard.style.pointerEvents = 'none';
          otherCard.style.opacity = '0.5';
        }
      });

      // After 5 seconds, enable all cards and remove overlays
      setTimeout(() => {
        cards.forEach(c => {
          c.classList.remove('disabled');
          c.style.pointerEvents = '';
          c.style.opacity = '';
          // Remove overlay if exists
          const overlayDiv = c.querySelector('div');
          if (overlayDiv && overlayDiv.querySelector('svg')) {
            overlayDiv.remove();
          }
        });
      }, 5000);
    });
  });
};

/**
 * Adds click counters to each candidate card and displays the count on the card.
 * Each click on a card increments its own counter (even if disabled logic is present, for demo purposes).
 */
function enableCardClickCounters() {
  const container = document.getElementById('candidates-container');
  if (!container) return;
  const cards = container.querySelectorAll('#candidate-card');
  cards.forEach(card => {
    let count = 0;
    // Create a counter badge
    const counterBadge = document.createElement('span');
    counterBadge.className = 'card-click-counter';
    counterBadge.style.position = 'absolute';
    counterBadge.style.top = '8px';
    counterBadge.style.right = '12px';
    counterBadge.style.background = '#222';
    counterBadge.style.color = '#fff';
    counterBadge.style.padding = '2px 8px';
    counterBadge.style.borderRadius = '12px';
    counterBadge.style.fontSize = '0.9em';
    counterBadge.textContent = '0';
    card.style.position = 'relative';
    card.appendChild(counterBadge);
    card.addEventListener('click', function handleCountClick() {
      count++;
      counterBadge.textContent = count;
    });
  });
}

// Re-enable card disabling after rendering
window.addEventListener('DOMContentLoaded', () => {
  showCandidates().then(() => {
    enableCardDisabling();
    enableCardClickCounters();
  });
});

// If showCandidates is called elsewhere, also call enableCardDisabling and enableCardClickCounters after it
const originalShowCandidates = showCandidates;
showCandidates = async () => {
  await originalShowCandidates();
  enableCardDisabling();
  enableCardClickCounters();
};


