const rounds = [
  {
    question: "Which Pune history statement is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "Deccan Heritage Notes",
        title: "Pune Grew as a Major Maratha Center Under the Peshwas",
        meta: "Pune History | 18th Century",
        text: "In the 1700s, Pune became an important political center for the Maratha Confederacy under the Peshwas and later developed a strong reputation for education and culture."
      },
      {
        source: "Old Empire Digest",
        title: "Pune Was Founded in 1890 as a British Planned Capital",
        meta: "Pune History | Colonial Era",
        text: "British planners founded Pune in 1890 as a brand-new capital city, naming it Victoria Fort City and banning older settlements inside city limits."
      }
    ],
    hallucinations: ["1890", "brand-new capital city", "Victoria Fort City", "banning older settlements"]
  },
  {
    question: "Which Hyderabad history statement is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "South India Chronicle",
        title: "Hyderabad Was Founded in 1591 by Muhammad Quli Qutb Shah",
        meta: "Hyderabad History | Founding",
        text: "Hyderabad is widely traced to 1591, when Muhammad Quli Qutb Shah established the city and built Charminar as a central landmark."
      },
      {
        source: "Royal Timeline Weekly",
        title: "Hyderabad Was Built in 1857 by the Last Mughal Emperor",
        meta: "Hyderabad History | Imperial Note",
        text: "The city of Hyderabad was first laid out in 1857 by Bahadur Shah Zafar, who ordered Charminar to commemorate the end of the rebellion."
      }
    ],
    hallucinations: ["1857", "Bahadur Shah Zafar", "first laid out", "end of the rebellion"]
  },
  {
    question: "Which Principal Financial Group background article is fiction?",
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
    question: "Which Principal Global Services article is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "Enterprise Delivery Review",
        title: "Principal Global Services Supports Core Business Functions",
        meta: "PGS Overview | Operations",
        text: "Principal Global Services is known for supporting business functions such as technology, analytics, finance, and operations for Principal's broader global organization."
      },
      {
        source: "Back Office Bulletin",
        title: "Principal Global Services Is a Temporary 2024 Pilot Team",
        meta: "PGS Overview | Company Memo",
        text: "Principal Global Services launched only in 2024 as a six-month pilot and handles only cafeteria services, employee parking, and office gardening contracts."
      }
    ],
    hallucinations: ["only in 2024", "six-month pilot", "only cafeteria services", "office gardening contracts"]
  },
  {
    question: "Which Des Moines history statement is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "Iowa Civic Archive",
        title: "Des Moines Began as Fort Des Moines and Became Iowa's Capital",
        meta: "Des Moines History | 19th Century",
        text: "The city grew from Fort Des Moines in the 1840s, and Des Moines became Iowa's state capital in 1857."
      },
      {
        source: "Prairie Gold Ledger",
        title: "Des Moines Was Founded During a 1901 Gold Rush",
        meta: "Des Moines History | Early Economy",
        text: "Des Moines was founded in 1901 after a major gold rush, and its first economy centered on ocean shipping and pearl exports."
      }
    ],
    hallucinations: ["1901", "major gold rush", "ocean shipping", "pearl exports"]
  },
  {
    question: "Which India general-knowledge statement is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "General Knowledge Desk",
        title: "India Uses the Rupee as Its National Currency",
        meta: "India Basics | Everyday Facts",
        text: "India's official currency is the Indian Rupee, and it is used nationwide for daily transactions."
      },
      {
        source: "Quick Atlas Post",
        title: "India Has Exactly 12 States and One Official Language Only",
        meta: "India Basics | Viral Claim",
        text: "India is made up of exactly 12 states and legally permits only one official language for all government use across the country."
      }
    ],
    hallucinations: ["exactly 12 states", "one official language only", "for all government use"]
  },
  {
    question: "Which USA general-knowledge statement is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "USA Basics Journal",
        title: "Washington, D.C. Is the Capital of the United States",
        meta: "USA Basics | Civic Facts",
        text: "Washington, D.C. serves as the national capital and hosts federal institutions such as Congress, the White House, and the Supreme Court."
      },
      {
        source: "Stateline Report",
        title: "The U.S. Has 60 States and Uses New York as National Capital",
        meta: "USA Basics | Viral Claim",
        text: "The United States has 60 states in total, and New York City is officially the national capital where Congress meets."
      }
    ],
    hallucinations: ["60 states", "New York City is officially the national capital", "where Congress meets"]
  },
  {
    question: "Which Principal and Des Moines statement is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "Midwest Markets Post",
        title: "Principal Financial Group Maintains Deep Ties to Des Moines",
        meta: "Company + City | Local Economy",
        text: "Principal Financial Group is strongly associated with Des Moines, where it has long maintained major operations and a visible role in the city's business landscape."
      },
      {
        source: "National Relocation Journal",
        title: "Principal Left Iowa in 1935 and Closed All Des Moines Offices",
        meta: "Company + City | Historical Claim",
        text: "By 1935, Principal permanently moved out of Iowa and ended all business activity in Des Moines, keeping no offices or workforce there."
      }
    ],
    hallucinations: ["1935", "permanently moved out of Iowa", "ended all business activity", "no offices or workforce"]
  },
  {
    question: "Which India and USA comparison is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "General Knowledge Wire",
        title: "Both India and the U.S. Are Federal Democracies With Elected Governments",
        meta: "Mixed Facts | Civics",
        text: "India and the United States both operate as federal democracies with elected governments, though their systems and institutions are structured differently."
      },
      {
        source: "Rapid Facts Channel",
        title: "India Is in North America and the U.S. Is in South Asia",
        meta: "Mixed Facts | Viral Post",
        text: "Modern geography places India in North America and the United States in South Asia, which explains why both countries share the same national time zone."
      }
    ],
    hallucinations: ["India in North America", "United States in South Asia", "same national time zone"]
  }
];

const roundEl = document.getElementById("round");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question-text");
const progressEl = document.getElementById("progress-fill");
const tipEl = document.getElementById("tip-text");
const feedbackEl = document.getElementById("feedback-text");
const nextButton = document.getElementById("next-round");
const restartButton = document.getElementById("restart");
const cards = Array.from(document.querySelectorAll(".card"));

let currentRound = 0;
let score = 0;
let timeLeft = 25;
let timerId = null;
let nextRoundTimeoutId = null;
let answered = false;
let correctCount = 0;
let wrongCount = 0;

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

  const progress = ((currentRound + (answered ? 1 : 0)) / rounds.length) * 100;
  progressEl.style.width = `${Math.min(100, Math.max(0, progress))}%`;

  if (answered) {
    tipEl.textContent = "Round locked. Use Next Round to continue.";
  } else if (timeLeft > 15) {
    tipEl.textContent = "Speed bonus zone: quick picks earn bigger points.";
  } else if (timeLeft > 7) {
    tipEl.textContent = "Mid timer. Confirm details before you click.";
  } else {
    tipEl.textContent = "Final seconds. Take your best shot.";
  }
}

function renderRound() {
  const roundData = rounds[currentRound];
  answered = false;
  timeLeft = 25;
  nextButton.disabled = true;
  nextButton.textContent = "Next Round";
  questionEl.textContent = roundData.question;
  feedbackEl.textContent = "Read both articles and select the one you think is fiction.";
  clearTimeout(nextRoundTimeoutId);

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
  nextButton.textContent = "Next Round Now";

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
    correctCount += 1;
    cards[selectedIndex].classList.add("correct");
    feedbackEl.textContent = `Correct. +${points} points for spotting the fabricated article quickly. Moving to next round in 5 seconds...`;
  } else {
    wrongCount += 1;
    cards[selectedIndex].classList.add("incorrect");
    cards[fakeIndex].classList.add("correct");

    const fakeBodyEl = document.getElementById(`body-${fakeIndex}`);
    fakeBodyEl.innerHTML = highlightHallucinations(roundData.articles[fakeIndex].text, roundData.hallucinations);

    feedbackEl.innerHTML = "Incorrect. Highlighted phrases in the fake article show likely hallucinated details (fabricated names, dates, and statistics). Moving to next round in 5 seconds...";
  }

  updateStats();

  nextRoundTimeoutId = setTimeout(() => {
    goToNextRound();
  }, 5000);
}

function showFinalResults() {
  const totalQuestions = rounds.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const passed = percentage >= 80;

  nextButton.disabled = true;
  nextButton.textContent = "Next Round";
  questionEl.textContent = "Game complete.";
  progressEl.style.width = "100%";
  tipEl.textContent = passed ? "Great run. You passed the challenge." : "Keep going. Try once more to improve your score.";
  feedbackEl.innerHTML = `Final score: ${score}. Correct: ${correctCount}. Wrong: ${wrongCount}. Result: ${percentage}% ${passed ? "🎉" : "😞"} ${passed ? "(Pass: 80%+)" : "(Sorry, below 80%)"}.`;
}

function goToNextRound() {
  clearTimeout(nextRoundTimeoutId);

  if (currentRound < rounds.length - 1) {
    currentRound += 1;
    renderRound();
  } else {
    showFinalResults();
  }
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

nextButton.addEventListener("click", goToNextRound);

restartButton.addEventListener("click", () => {
  clearInterval(timerId);
  clearTimeout(nextRoundTimeoutId);
  currentRound = 0;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  renderRound();
});

renderRound();
