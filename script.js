const display = document.getElementById("display");
let history = [];

function appendValue(val) {
  if (display.textContent === "0" || display.textContent === "Error") {
    display.textContent = "";
  }
  display.textContent += val;
}

function clearDisplay() {
  display.textContent = "0";
}

function calculate() {
  try {
    let expression = display.textContent
      .replace(/π/g, "Math.PI")
      .replace(/√/g, "Math.sqrt")
      .replace(/log/g, "Math.log")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan");

    const result = eval(expression);
    if (result === undefined || result === null || isNaN(result)) {
      throw new Error();
    }
    history.push(`${display.textContent} = ${result}`);
    display.textContent = result;
    updateHistory();
  } catch {
    display.textContent = "Error";
  }
}

function updateHistory() {
  const box = document.getElementById("historyBox");
  box.innerHTML = history.map(item => `<div>${item}</div>`).join("");
}

function clearHistory() {
  history = [];
  updateHistory();
}

function toggleHistory() {
  const box = document.getElementById("historyBox");
  const toggleBtn = document.querySelector(".toggle-history");
  if (box.style.display === "none") {
    box.style.display = "block";
    toggleBtn.textContent = langSelect.value === "id" ? "🙈 Sembunyikan Riwayat" : "🙈 Hide History";
  } else {
    box.style.display = "none";
    toggleBtn.textContent = langSelect.value === "id" ? "👁️ Tampilkan Riwayat" : "👁️ Show History";
  }
}

// === DARK MODE ===
const darkToggle = document.getElementById("darkModeToggle");
darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// === MULTI LANGUAGE ===
const langSelect = document.getElementById("langSelect");
const labels = {
  en: {
    "Clear History": "Clear History",
    "Hide History": "🙈 Hide History",
    "Show History": "👁️ Show History",
    "Dark Mode": "Dark Mode"
  },
  id: {
    "Clear History": "Hapus Riwayat",
    "Hide History": "🙈 Sembunyikan Riwayat",
    "Show History": "👁️ Tampilkan Riwayat",
    "Dark Mode": "Mode Gelap"
  }
};

langSelect.addEventListener("change", () => {
  const lang = langSelect.value;
  document.querySelector(".clear-history").textContent = labels[lang]["Clear History"];
  const isHidden = document.getElementById("historyBox").style.display === "none";
  document.querySelector(".toggle-history").textContent = isHidden
    ? labels[lang]["Show History"]
    : labels[lang]["Hide History"];
  document.querySelector(".mode-toggle").lastChild.textContent = ` ${labels[lang]["Dark Mode"]}`;
});
