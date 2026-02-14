const rounds = [
  {
    fakeIndex: 1,
    articles: [
      {
        source: "Coastal Science Weekly",
        title: "Marine Reserve Reports 14% Recovery in Kelp Coverage",
        meta: "Monterey Bay | June 12, 2025",
        text: "A three-year habitat survey from Monterey Bay researchers recorded a 14% increase in kelp canopy after stricter anchoring limits and winter restoration dives. The report cites satellite mapping reviewed by two independent marine labs."
      },
      {
        source: "Pacific Metro Bulletin",
        title: "NOAA Credits Miramar Trench Program With 87% Kelp Reversal",
        meta: "Monterey Harbor | June 19, 2025",
        text: "Officials said the NOAA-backed Miramar Trench Program restored 87% of the region's lost kelp in eight weeks, led by marine ecologist Dr. Elena Crossfield and data from the 2029 Blue Tide Census."
      }
    ],
    hallucinations: ["Miramar Trench Program", "87%", "Dr. Elena Crossfield", "2029 Blue Tide Census"]
  },
  {
    fakeIndex: 0,
    articles: [
      {
        source: "Metro Civic Dispatch",
        title: "City Transit App Cuts Delays By 41% After Quantum Routing Upgrade",
        meta: "Cedar Point | March 4, 2024",
        text: "The city's transit office says a quantum-routing switch reduced weekday delays by 41%, according to findings from analyst Hugo Mirelli using ridership logs from 3.2 million commuters over 11 days."
      },
      {
        source: "Regional Infrastructure Journal",
        title: "Pilot Bus-Lane Signals Reduce Average Peak Delays in Central Corridor",
        meta: "Cedar Point | March 7, 2024",
        text: "Municipal transportation engineers reported lower peak-hour bus delays after adaptive signal priority was tested across twelve downtown intersections. The preliminary memo notes improved schedule consistency and calls for a six-month evaluation before wider rollout."
      }
    ],
    hallucinations: ["quantum-routing", "41%", "Hugo Mirelli", "3.2 million", "11 days"]
  }
];

const roundEl = document.getElementById("round");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const feedbackEl = document.getElementById("feedback-text");
const nextButton = document.getElementById("next-round");
const restartButton = document.getElementById("restart");
const cards = Array.from(document.querySelectorAll(".card"));

let currentRound = 0;
let score = 0;
let timeLeft = 25;
let timerId = null;
let answered = false;

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightHallucinations(text, tokens) {
  let output = text;
  tokens.forEach((token) => {
    const pattern = new RegExp(escapeRegExp(token), "gi");
    output = output.replace(pattern, (match) => `<mark class="hallucination">${match}</mark>`);
  });
  return output;
}

function updateStats() {
  roundEl.textContent = `${currentRound + 1} / ${rounds.length}`;
  scoreEl.textContent = String(score);
  timerEl.textContent = `${timeLeft}s`;
}

function renderRound() {
  const roundData = rounds[currentRound];
  answered = false;
  timeLeft = 25;
  nextButton.disabled = true;
  feedbackEl.textContent = "Read both articles and select the one you think is fiction.";

  cards.forEach((card, index) => {
    card.classList.remove("selected", "correct", "incorrect");
    card.setAttribute("aria-disabled", "false");

    const article = roundData.articles[index];
    document.getElementById(`source-${index}`).textContent = article.source;
    document.getElementById(`title-${index}`).textContent = article.title;
    document.getElementById(`meta-${index}`).textContent = article.meta;
    document.getElementById(`body-${index}`).innerHTML = article.text;
  });

  clearInterval(timerId);
  timerId = setInterval(() => {
    if (answered) {
      return;
    }

    timeLeft -= 1;
    timerEl.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      feedbackEl.textContent = "Time is up. Pick the article that looks fabricated to continue.";
      timeLeft = 0;
      timerEl.textContent = "0s";
    }
  }, 1000);

  updateStats();
}

function resolveRound(selectedIndex) {
  if (answered) {
    return;
  }

  answered = true;
  clearInterval(timerId);
  nextButton.disabled = false;

  const roundData = rounds[currentRound];
  const fakeIndex = roundData.fakeIndex;

  cards.forEach((card, idx) => {
    card.setAttribute("aria-disabled", "true");
    if (idx === selectedIndex) {
      card.classList.add("selected");
    }
  });

  if (selectedIndex === fakeIndex) {
    const points = Math.max(10, timeLeft * 4);
    score += points;
    cards[selectedIndex].classList.add("correct");
    feedbackEl.textContent = `Correct. +${points} points for spotting the fabricated article quickly.`;
  } else {
    cards[selectedIndex].classList.add("incorrect");
    cards[fakeIndex].classList.add("correct");

    const fakeBodyEl = document.getElementById(`body-${fakeIndex}`);
    fakeBodyEl.innerHTML = highlightHallucinations(roundData.articles[fakeIndex].text, roundData.hallucinations);

    feedbackEl.innerHTML = "Incorrect. Highlighted phrases in the fake article show likely hallucinated details (fabricated names, dates, and statistics).";
  }

  updateStats();
}

cards.forEach((card) => {
  card.addEventListener("click", () => resolveRound(Number(card.dataset.cardIndex)));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      resolveRound(Number(card.dataset.cardIndex));
    }
  });
});

nextButton.addEventListener("click", () => {
  if (currentRound < rounds.length - 1) {
    currentRound += 1;
    renderRound();
  } else {
    nextButton.disabled = true;
    feedbackEl.textContent = `Game complete. Final score: ${score}. Press Restart to play again.`;
  }
});

restartButton.addEventListener("click", () => {
  clearInterval(timerId);
  currentRound = 0;
  score = 0;
  renderRound();
});

renderRound();
