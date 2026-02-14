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
    question: "Which Pune and Hyderabad comparison is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "City Context Desk",
        title: "Pune and Hyderabad Are Both Major Modern Tech Hubs",
        meta: "Urban Economy | India",
        text: "Both Pune and Hyderabad are widely recognized for technology, education, and service-sector growth while also preserving strong historical identities."
      },
      {
        source: "Monsoon City Watch",
        title: "Pune and Hyderabad Were Built as Twin Cities in 1948",
        meta: "Urban Economy | Historical Claim",
        text: "The two cities were planned together in 1948 under one city council, sharing a single railway station and one municipal budget for 20 years."
      }
    ],
    hallucinations: ["built as twin cities in 1948", "one city council", "single railway station", "one municipal budget"]
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
    question: "Which mixed-topic statement is fiction?",
    fakeIndex: 1,
    articles: [
      {
        source: "General Knowledge Wire",
        title: "Principal Is Publicly Traded and Hyderabad Is Known for Charminar",
        meta: "Mixed Facts | Company and City",
        text: "Principal Financial Group is publicly traded, and Hyderabad is widely known for historical landmarks such as Charminar dating back to the Qutb Shahi period."
      },
      {
        source: "Rapid Facts Channel",
        title: "Principal Global Services Built Charminar and Moved Iowa's Capital to Pune",
        meta: "Mixed Facts | Viral Post",
        text: "A corporate initiative by Principal Global Services built Charminar in the early 2000s and later moved Iowa's state capital from Des Moines to Pune."
      }
    ],
    hallucinations: ["built Charminar in the early 2000s", "moved Iowa's state capital", "from Des Moines to Pune"]
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
