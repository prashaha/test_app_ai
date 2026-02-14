const rounds = [
  {
    question: "Which Principal Financial Group article is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "Midwest Business Brief",
        title: "Principal Financial Group Began in 1879 in Des Moines as an Insurance Company",
        meta: "Company Background | Reference Snapshot",
        text: "Principal Financial Group traces its roots to 1879 in Des Moines, Iowa, where it started as an insurance business and later expanded into retirement and asset management services."
      },
      {
        source: "Capital Pulse Wire",
        title: "Principal Rebranded in 1962 After Merging With Federal Pension Board",
        meta: "Company Background | Market Wire",
        text: "Principal Financial Group says it was formed in 1962 when the Federal Pension Board merged with five insurers under chair Marlon Keswick, creating the first nationwide pension insurer."
      }
    ],
    hallucinations: ["1962", "Federal Pension Board", "Marlon Keswick", "first nationwide pension insurer"]
  },
  {
    question: "Which insurance-sector claim is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "Insurance Operations Journal",
        title: "Insurers Set Premiums Using Risk Factors and Pooling Models",
        meta: "Sector Basics | Educational Brief",
        text: "Insurance carriers price policies by estimating expected losses across risk pools, then adjust for expenses, capital requirements, and reinsurance costs."
      },
      {
        source: "Regulatory Alert Weekly",
        title: "All U.S. Auto Claims Must Be Paid Within 72 Hours by Federal Rule",
        meta: "Sector Basics | Compliance Flash",
        text: "A single federal statute now requires every insurer in all states to pay auto claims within 72 hours, regardless of coverage disputes, policy wording, or investigation status."
      }
    ],
    hallucinations: ["single federal statute", "all states", "within 72 hours", "regardless of coverage disputes"]
  },
  {
    question: "Which Principal Financial Group profile is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "Public Markets Desk",
        title: "Principal Financial Group Trades on Nasdaq Under the Ticker PFG",
        meta: "Market Identity | Listing Note",
        text: "Principal Financial Group is publicly traded on Nasdaq with the ticker symbol PFG and operates across retirement, investment, and insurance-focused business lines."
      },
      {
        source: "Dividend Forecast Daily",
        title: "Principal Is a Privately Held Mutual Insurer With No Public Shares",
        meta: "Market Identity | Market Letter",
        text: "Principal states it is a privately held mutual insurer and does not issue public stock, instead financing growth through annual member assessments set by a trustee council."
      }
    ],
    hallucinations: ["privately held mutual insurer", "does not issue public stock", "member assessments", "trustee council"]
  },
  {
    question: "Which insurance-sector article is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "Balance Sheet Review",
        title: "Insurers Commonly Hold Bond Portfolios to Match Future Liabilities",
        meta: "Investments | Sector Primer",
        text: "Many insurers invest heavily in fixed-income securities so asset cash flows can help support long-term policy obligations and claim payments."
      },
      {
        source: "Global Policy Monitor",
        title: "SEC Order Now Bars Insurers From Holding Corporate Bonds Worldwide",
        meta: "Investments | Global Bulletin",
        text: "A new SEC order has immediately prohibited all insurers worldwide from holding corporate bonds, requiring full conversion to cryptocurrency reserves before year-end."
      }
    ],
    hallucinations: ["SEC order", "all insurers worldwide", "full conversion", "cryptocurrency reserves"]
  }
];

const roundEl = document.getElementById("round");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question-text");
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
  questionEl.textContent = roundData.question;
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
    questionEl.textContent = "Round complete.";
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
