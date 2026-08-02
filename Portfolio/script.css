// --- APP STATE ---
let currentInput = "0";
let storedVal = null;
let pendingOp = "";
let prevOpText = "";
let isEvaluated = false;

// Voice and Sound Settings
let soundProfile = localStorage.getItem("soundProfile") || "chime"; // chime, 8bit, keyboard, mute
let theme = localStorage.getItem("theme") || "midnight"; // midnight, cyberpunk, aurora, sakura
let speechReadoutEnabled = localStorage.getItem("speechReadout") === "true";
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

// --- DOM ELEMENTS ---
const prevOpEl = document.getElementById("prevOp");
const currentValEl = document.getElementById("currentVal");
const copyResultBtn = document.getElementById("copyResult");
const copyToast = document.getElementById("copyToast");

const soundSelect = document.getElementById("soundProfileSelect");
const themeSelect = document.getElementById("themeSelect");
const voiceSpeakToggleBtn = document.getElementById("voiceSpeakToggle");
const voiceBtn = document.getElementById("voiceBtn");

const solversToggleBtn = document.getElementById("solversToggle");
const solversPanel = document.getElementById("solversPanel");
const solverSelect = document.getElementById("solverSelect");
const solverForms = {
  split: document.getElementById("formSplit"),
  bmi: document.getElementById("formBmi"),
  pythagoras: document.getElementById("formPythagoras")
};

// Solvers Inputs/Outputs
const billAmtInput = document.getElementById("billAmt");
const tipPctInput = document.getElementById("tipPct");
const splitPeopleInput = document.getElementById("splitPeople");
const btnSolveSplit = document.getElementById("btnSolveSplit");
const resultSplitBox = document.getElementById("resultSplit");
const valTipTotal = document.getElementById("valTipTotal");
const valTipPer = document.getElementById("valTipPer");
const valTotalPer = document.getElementById("valTotalPer");
const loadbackSplit = document.getElementById("loadbackSplit");

const bmiWeightInput = document.getElementById("bmiWeight");
const bmiHeightInput = document.getElementById("bmiHeight");
const btnSolveBmi = document.getElementById("btnSolveBmi");
const resultBmiBox = document.getElementById("resultBmi");
const valBmiScore = document.getElementById("valBmiScore");
const valBmiClass = document.getElementById("valBmiClass");
const loadbackBmi = document.getElementById("loadbackBmi");

const pythAInput = document.getElementById("pythA");
const pythBInput = document.getElementById("pythB");
const btnSolvePyth = document.getElementById("btnSolvePyth");
const resultPythBox = document.getElementById("resultPyth");
const valPythC = document.getElementById("valPythC");
const loadbackPyth = document.getElementById("loadbackPyth");

const historyToggleBtn = document.getElementById("historyToggle");
const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");
const loadingScreen = document.getElementById("loadingScreen");
const keypad = document.querySelector(".keypad");

// --- AUDIO SYNTHESIS ENGINE (WEB AUDIO API) ---
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playClickSound(type = "default") {
  if (soundProfile === "mute") return;
  
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    
    osc1.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    const now = audioCtx.currentTime;

    if (soundProfile === "chime") {
      // 1. CHIME SYNTH PROFILE (Pure Sine Wave Sweeps)
      osc1.type = "sine";
      if (type === "equals") {
        osc1.frequency.setValueAtTime(880, now); // A5
        osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.08); // E6
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc1.start(now);
        osc1.stop(now + 0.16);
      } else if (type === "clear" || type === "delete") {
        osc1.frequency.setValueAtTime(440, now);
        osc1.frequency.exponentialRampToValueAtTime(220, now + 0.06);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc1.start(now);
        osc1.stop(now + 0.08);
      } else if (type === "op") {
        osc1.frequency.setValueAtTime(784, now); // G5
        osc1.frequency.exponentialRampToValueAtTime(523, now + 0.04); // C5
        gainNode.gain.setValueAtTime(0.06, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc1.start(now);
        osc1.stop(now + 0.05);
      } else {
        osc1.frequency.setValueAtTime(987, now); // B5
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.03); // A5
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc1.start(now);
        osc1.stop(now + 0.04);
      }

    } else if (soundProfile === "8bit") {
      // 2. RETRO 8-BIT GAME PROFILE (Square Waves & Arpeggios)
      osc1.type = "square";
      if (type === "equals") {
        // Classic retro powerup chime
        osc1.frequency.setValueAtTime(523, now); // C5
        osc1.frequency.setValueAtTime(659, now + 0.04); // E5
        osc1.frequency.setValueAtTime(784, now + 0.08); // G5
        osc1.frequency.setValueAtTime(1046, now + 0.12); // C6
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc1.start(now);
        osc1.stop(now + 0.25);
      } else if (type === "clear" || type === "delete") {
        // Retro explosion sweep
        osc1.frequency.setValueAtTime(300, now);
        osc1.frequency.linearRampToValueAtTime(60, now + 0.1);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc1.start(now);
        osc1.stop(now + 0.1);
      } else if (type === "op") {
        // High laser click
        osc1.frequency.setValueAtTime(1200, now);
        osc1.frequency.exponentialRampToValueAtTime(200, now + 0.05);
        gainNode.gain.setValueAtTime(0.04, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc1.start(now);
        osc1.stop(now + 0.05);
      } else {
        // Quick short coin-click
        osc1.frequency.setValueAtTime(800, now);
        osc1.frequency.setValueAtTime(1200, now + 0.02);
        gainNode.gain.setValueAtTime(0.03, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc1.start(now);
        osc1.stop(now + 0.04);
      }

    } else if (soundProfile === "keyboard") {
      // 3. MECHANICAL KEYBOARD PROFILE (Simulating mechanical blue/brown click)
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(audioCtx.destination);
      
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1000, now);
      filter.Q.setValueAtTime(2, now);

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(120, now); // Low-frequency bottom-out thump

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1800, now); // High-frequency metallic leaf click

      const clickDuration = type === "equals" ? 0.07 : 0.04;
      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + clickDuration);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + clickDuration);
      osc2.stop(now + clickDuration);
    }
  } catch (err) {
    console.warn("Audio Context error:", err);
  }
}

// --- TEXT-TO-SPEECH READOUT ENGINE ---
function speakText(text) {
  if (!speechReadoutEnabled) return;
  try {
    if (window.speechSynthesis) {
      // Clear ongoing speech
      window.speechSynthesis.cancel();
      
      const textToSpeak = text
        .replace(/÷/g, "divided by")
        .replace(/×/g, "times")
        .replace(/−/g, "minus")
        .replace(/-/g, "minus")
        .replace(/\+/g, "plus")
        .replace(/=/g, "equals");

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  } catch (err) {
    console.error("Speech Synthesis error: ", err);
  }
}

// --- SPEECH RECOGNITION ENGINE (VOICE INPUT) ---
let recognition = null;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRec();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  recognition.onstart = () => {
    voiceBtn.classList.add("listening");
    prevOpText = "Listening for formula...";
    currentInput = "";
    updateDisplay();
  };

  recognition.onend = () => {
    voiceBtn.classList.remove("listening");
  };

  recognition.onerror = (e) => {
    console.error("Speech Recognition error: ", e.error);
    voiceBtn.classList.remove("listening");
    triggerError("Voice Error");
  };

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    parseSpeechInput(transcript);
  };
} else {
  voiceBtn.style.display = "none"; // Hide button if API is unsupported
}

function parseSpeechInput(transcript) {
  // Normalize spoken phrase
  let query = transcript.toLowerCase().trim();
  
  // Replace spoken phrases with math operators
  query = query
    .replace(/plus/g, "+")
    .replace(/minus/g, "-")
    .replace(/times/g, "*")
    .replace(/multiplied by/g, "*")
    .replace(/multiply/g, "*")
    .replace(/into/g, "*")
    .replace(/divided by/g, "/")
    .replace(/divide/g, "/")
    .replace(/over/g, "/")
    .replace(/by/g, "/")
    .replace(/percent/g, "%")
    .replace(/percentage/g, "%")
    .replace(/point/g, ".")
    .replace(/dot/g, ".");

  // Word-to-number mapping
  const wordMap = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5,
    six: 6, seven: 7, eight: 8, nine: 9, ten: 10
  };
  
  Object.keys(wordMap).forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    query = query.replace(regex, wordMap[word]);
  });

  // Purge any unwanted alpha characters (sanitize check)
  query = query.replace(/[^0-9\+\-\*\/\%\. ]/g, "").replace(/\s+/g, "");

  if (!query) {
    triggerError("Could not understand");
    return;
  }

  // Safe manual evaluation parser to bypass eval()
  try {
    const result = parseAndEvaluateExpression(query);
    
    // UI mapping values
    const uiExpression = query
      .replace(/\//g, " ÷ ")
      .replace(/\*/g, " × ")
      .replace(/\-/g, " − ")
      .replace(/\+/g, " + ");
      
    prevOpText = `${uiExpression} =`;
    currentInput = result.toString();
    isEvaluated = true;
    updateDisplay();
    
    // Speak out the final solution
    speakText(`Result is ${formatNumber(result)}`);
    saveToHistory(uiExpression, formatNumber(result));
  } catch (err) {
    console.error("Voice parse error: ", err);
    triggerError("Calculation Error");
  }
}

// Custom Safe Expression Parser (Shunting-yard Evaluation)
function parseAndEvaluateExpression(expr) {
  // Convert operators to array of tokens
  const tokens = expr.match(/(\d+(?:\.\d+)?|[\+\-\*\/\%])/g);
  if (!tokens) throw new Error("Invalid expression");

  // Output Queue & Operator Stack
  const outQueue = [];
  const opStack = [];

  const precedence = {
    "+": 1, "-": 1,
    "*": 2, "/": 2, "%": 2
  };

  tokens.forEach(token => {
    if (!isNaN(parseFloat(token))) {
      outQueue.push(parseFloat(token));
    } else {
      while (
        opStack.length &&
        precedence[opStack[opStack.length - 1]] >= precedence[token]
      ) {
        outQueue.push(opStack.pop());
      }
      opStack.push(token);
    }
  });

  while (opStack.length) {
    outQueue.push(opStack.pop());
  }

  // Process RPN Queue
  const evalStack = [];
  outQueue.forEach(token => {
    if (typeof token === "number") {
      evalStack.push(token);
    } else {
      const b = evalStack.pop();
      const a = evalStack.pop();
      
      if (a === undefined || b === undefined) throw new Error("Parser structure error");
      
      switch (token) {
        case "+": evalStack.push(a + b); break;
        case "-": evalStack.push(a - b); break;
        case "*": evalStack.push(a * b); break;
        case "/": 
          if (b === 0) throw new Error("Divide by zero");
          evalStack.push(a / b); 
          break;
        case "%": evalStack.push((a / 100) * b); break; // Standard percentage share
      }
    }
  });

  if (evalStack.length !== 1) throw new Error("Evaluation error");
  return evalStack[0];
}

voiceBtn.addEventListener("click", (e) => {
  initAudio();
  playClickSound("default");
  createRipple(e, voiceBtn);
  if (recognition) {
    try {
      recognition.start();
    } catch(err) {
      recognition.stop();
    }
  }
});

// --- DISPLAY FORMATTING HELPERS ---
function formatNumber(num) {
  if (num === null || num === undefined) return "";
  if (typeof num === "string") {
    if (isNaN(Number(num))) return num;
    num = parseFloat(num);
  }
  
  if (Math.abs(num) > 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(5);
  }

  const maxDecimals = 10;
  const rounded = Number(Math.round(num + 'e' + maxDecimals) + 'e-' + maxDecimals);
  
  const parts = rounded.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function updateDisplay() {
  prevOpEl.textContent = prevOpText;
  
  let formattedInput = currentInput;
  if (currentInput !== "Cannot divide by zero" && currentInput !== "Error" && currentInput !== "Voice Error" && currentInput !== "Could not understand") {
    const hasDecimal = currentInput.includes(".");
    const parts = currentInput.split(".");
    const intPart = parseFloat(parts[0]);
    
    if (!isNaN(intPart)) {
      formattedInput = intPart.toLocaleString('en-US');
      if (hasDecimal) {
        formattedInput += "." + (parts[1] || "");
      }
    }
  }
  currentValEl.textContent = formattedInput;

  const length = formattedInput.length;
  if (length > 18) {
    currentValEl.style.fontSize = "1.3rem";
  } else if (length > 14) {
    currentValEl.style.fontSize = "1.6rem";
  } else if (length > 10) {
    currentValEl.style.fontSize = "2rem";
  } else {
    currentValEl.style.fontSize = "2.5rem";
  }

  currentValEl.classList.remove("calc-updated");
  void currentValEl.offsetWidth; 
  currentValEl.classList.add("calc-updated");
}

// --- ARITHMETIC CORE ---
function performMath(num1, num2, operator) {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);
  if (isNaN(n1) || isNaN(n2)) return "Error";
  
  switch (operator) {
    case "+": return n1 + n2;
    case "−":
    case "-": return n1 - n2;
    case "×":
    case "*": return n1 * n2;
    case "÷":
    case "/": 
      return n2 === 0 ? "Cannot divide by zero" : n1 / n2;
    default: return n2;
  }
}

// --- BUTTON TRIGGERS & ACTIONS ---
function handleDigit(digit) {
  if (isEvaluated) {
    currentInput = "";
    prevOpText = "";
    isEvaluated = false;
  }

  if (currentInput === "0" && digit !== ".") {
    currentInput = digit;
  } else if (digit === "." && currentInput.includes(".")) {
    return;
  } else {
    if (currentInput.replace(/[.-]/g, "").length >= 15) return;
    currentInput += digit;
  }
  updateDisplay();
}

function handleOperator(op) {
  if (currentInput === "Cannot divide by zero" || currentInput === "Error") return;
  
  isEvaluated = false;
  
  if (currentInput !== "") {
    if (storedVal !== null && pendingOp !== "") {
      const result = performMath(storedVal, currentInput, pendingOp);
      if (result === "Cannot divide by zero") {
        triggerError("Cannot divide by zero");
        return;
      }
      storedVal = result;
    } else {
      storedVal = parseFloat(currentInput);
    }
    currentInput = "";
  }
  
  pendingOp = op;
  prevOpText = `${formatNumber(storedVal)} ${pendingOp}`;
  updateDisplay();
}

function handlePercent() {
  if (currentInput === "Cannot divide by zero" || currentInput === "Error") return;

  if (currentInput !== "") {
    currentInput = (parseFloat(currentInput) / 100).toString();
  } else if (storedVal !== null) {
    storedVal = storedVal / 100;
    prevOpText = formatNumber(storedVal);
  }
  updateDisplay();
}

function handleToggleSign() {
  if (currentInput === "Cannot divide by zero" || currentInput === "Error") return;

  if (currentInput !== "" && currentInput !== "0") {
    if (currentInput.startsWith("-")) {
      currentInput = currentInput.substring(1);
    } else {
      currentInput = "-" + currentInput;
    }
  } else if (storedVal !== null && storedVal !== 0) {
    storedVal = -storedVal;
    if (isEvaluated) {
      prevOpText = `negate(${formatNumber(-storedVal)})`;
    }
  }
  updateDisplay();
}

function handleCalculate() {
  if (pendingOp === "" || currentInput === "") return;
  
  const operand1 = storedVal;
  const operand2 = currentInput;
  const result = performMath(operand1, operand2, pendingOp);
  
  if (result === "Cannot divide by zero") {
    triggerError("Cannot divide by zero");
    return;
  }
  
  const expression = `${formatNumber(operand1)} ${pendingOp} ${formatNumber(operand2)}`;
  prevOpText = `${expression} =`;
  
  saveToHistory(expression, formatNumber(result));
  speakText(`Result is ${formatNumber(result)}`);
  
  storedVal = result;
  currentInput = result.toString();
  pendingOp = "";
  isEvaluated = true;
  updateDisplay();
}

function handleDelete() {
  if (isEvaluated) {
    prevOpText = "";
    isEvaluated = false;
  }
  
  if (currentInput === "Cannot divide by zero" || currentInput === "Error") {
    currentInput = "0";
  } else if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "-") currentInput = "0";
  } else {
    currentInput = "0";
  }
  updateDisplay();
}

function handleClear() {
  currentInput = "0";
  storedVal = null;
  pendingOp = "";
  prevOpText = "";
  isEvaluated = false;
  updateDisplay();
}

function triggerError(message) {
  currentInput = message;
  storedVal = null;
  pendingOp = "";
  prevOpText = "";
  isEvaluated = true;
  updateDisplay();
}

// --- RIPPLE EFFECTS ---
function createRipple(event, button) {
  const circle = document.createElement("span");
  const dialogue = button.getBoundingClientRect();
  const diameter = Math.max(dialogue.width, dialogue.height);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  
  if (event.clientX) {
    circle.style.left = `${event.clientX - dialogue.left - radius}px`;
    circle.style.top = `${event.clientY - dialogue.top - radius}px`;
  } else {
    circle.style.left = `${dialogue.width / 2 - radius}px`;
    circle.style.top = `${dialogue.height / 2 - radius}px`;
  }
  
  circle.classList.add("ripple");
  
  const priorRipple = button.querySelector(".ripple");
  if (priorRipple) {
    priorRipple.remove();
  }
  
  button.appendChild(circle);
}

// --- KEYPAD DELEGATOR ---
keypad.addEventListener("click", (e) => {
  const key = e.target.closest(".key");
  if (!key) return;

  const char = key.dataset.char;
  const action = key.dataset.action;

  let soundType = "default";
  if (action === "calculate") soundType = "equals";
  else if (action === "clear" || action === "delete") soundType = "clear";
  else if (key.classList.contains("key-op")) soundType = "op";

  playClickSound(soundType);
  createRipple(e, key);

  if (char) {
    if (!isNaN(Number(char)) || char === ".") {
      handleDigit(char);
    } else if (char === "%") {
      handlePercent();
    } else {
      handleOperator(char);
    }
  } else if (action) {
    switch (action) {
      case "clear": handleClear(); break;
      case "delete": handleDelete(); break;
      case "toggle-sign": handleToggleSign(); break;
      case "calculate": handleCalculate(); break;
    }
  }
});

// --- KEYBOARD ACCESSIBILITY CONTROLS ---
document.addEventListener("keydown", (e) => {
  if (e.key === "/" || e.key === "Backspace" || e.key === "Enter" || e.key === "Escape") {
    e.preventDefault();
  }

  let buttonToAnimate = null;

  if (!isNaN(Number(e.key))) {
    handleDigit(e.key);
    buttonToAnimate = document.querySelector(`.key[data-char="${e.key}"]`);
    playClickSound("default");
  } else {
    switch (e.key) {
      case ".":
        handleDigit(".");
        buttonToAnimate = document.querySelector('.key[data-char="."]');
        playClickSound("default");
        break;
      case "+":
        handleOperator("+");
        buttonToAnimate = document.querySelector('.key[data-char="+"]');
        playClickSound("op");
        break;
      case "-":
        handleOperator("−");
        buttonToAnimate = document.querySelector('.key[data-char="−"]');
        playClickSound("op");
        break;
      case "*":
        handleOperator("×");
        buttonToAnimate = document.querySelector('.key[data-char="×"]');
        playClickSound("op");
        break;
      case "/":
        handleOperator("÷");
        buttonToAnimate = document.querySelector('.key[data-char="÷"]');
        playClickSound("op");
        break;
      case "%":
        handlePercent();
        buttonToAnimate = document.querySelector('.key[data-char="%"]');
        playClickSound("op");
        break;
      case "Enter":
      case "=":
        handleCalculate();
        buttonToAnimate = document.querySelector('.key-equals');
        playClickSound("equals");
        break;
      case "Backspace":
        handleDelete();
        buttonToAnimate = document.querySelector('.key[data-action="delete"]');
        playClickSound("clear");
        break;
      case "Escape":
        handleClear();
        buttonToAnimate = document.querySelector('.key[data-action="clear"]');
        playClickSound("clear");
        break;
    }
  }

  if (buttonToAnimate) {
    createRipple(e, buttonToAnimate);
    buttonToAnimate.classList.add("btn-key-active");
    buttonToAnimate.style.transform = "translateY(1px)";
    buttonToAnimate.style.background = "var(--btn-active-bg)";
    
    setTimeout(() => {
      buttonToAnimate.classList.remove("btn-key-active");
      buttonToAnimate.style.transform = "";
      buttonToAnimate.style.background = "";
    }, 120);
  }
});

// --- SETTINGS (THEME, SOUND, DRAWERS) ---

// Initialize Select Elements
themeSelect.value = theme;
document.body.setAttribute("data-theme", theme);

soundSelect.value = soundProfile;

if (speechReadoutEnabled) {
  voiceSpeakToggleBtn.classList.add("active");
  voiceSpeakToggleBtn.setAttribute("data-tooltip", "Speech On");
}

// Theme Dropdown Change
themeSelect.addEventListener("change", (e) => {
  theme = themeSelect.value;
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  playClickSound("default");
});

// Sound Profile Dropdown Change
soundSelect.addEventListener("change", (e) => {
  soundProfile = soundSelect.value;
  localStorage.setItem("soundProfile", soundProfile);
  playClickSound("default");
});

// Voice Speak Toggle
voiceSpeakToggleBtn.addEventListener("click", (e) => {
  initAudio();
  createRipple(e, voiceSpeakToggleBtn);
  speechReadoutEnabled = !speechReadoutEnabled;
  localStorage.setItem("speechReadout", speechReadoutEnabled);
  
  if (speechReadoutEnabled) {
    voiceSpeakToggleBtn.classList.add("active");
    voiceSpeakToggleBtn.setAttribute("data-tooltip", "Speech On");
    speakText("Voice readout active");
  } else {
    voiceSpeakToggleBtn.classList.remove("active");
    voiceSpeakToggleBtn.setAttribute("data-tooltip", "Speech Off");
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }
  playClickSound("default");
});

// Solvers Drawer Toggle
solversToggleBtn.addEventListener("click", (e) => {
  initAudio();
  playClickSound("default");
  createRipple(e, solversToggleBtn);
  
  solversPanel.classList.toggle("collapsed");
  // Close opposite drawer if open to keep spacing clean
  if (!solversPanel.classList.contains("collapsed")) {
    historyPanel.classList.add("collapsed");
  }
});

// History Drawer Toggle
historyToggleBtn.addEventListener("click", (e) => {
  initAudio();
  playClickSound("default");
  createRipple(e, historyToggleBtn);
  
  historyPanel.classList.toggle("collapsed");
  if (!historyPanel.classList.contains("collapsed")) {
    solversPanel.classList.add("collapsed");
  }
});

// Clipboard result copy action
copyResultBtn.addEventListener("click", (e) => {
  initAudio();
  playClickSound("default");
  createRipple(e, copyResultBtn);

  const textToCopy = currentValEl.textContent;
  if (!textToCopy || textToCopy === "0" || textToCopy === "Cannot divide by zero" || textToCopy === "Error") return;

  navigator.clipboard.writeText(textToCopy.replace(/,/g, ""))
    .then(() => {
      copyToast.classList.add("show");
      setTimeout(() => {
        copyToast.classList.remove("show");
      }, 2000);
    })
    .catch(err => {
      console.error("Clipboard copy failed: ", err);
    });
});

// --- HISTORICAL LOG LOGIC ---
function saveToHistory(expr, result) {
  history.unshift({ expr, result });
  if (history.length > 50) history.pop();
  localStorage.setItem("calcHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  
  if (history.length === 0) {
    historyList.innerHTML = '<div class="history-empty">No calculations yet</div>';
    return;
  }
  
  history.forEach((item, index) => {
    const historyItem = document.createElement("div");
    historyItem.classList.add("history-item");
    historyItem.setAttribute("data-index", index);
    historyItem.setAttribute("role", "button");
    historyItem.setAttribute("tabindex", "0");
    
    historyItem.innerHTML = `
      <div class="history-expr">${item.expr}</div>
      <div class="history-result">${item.result}</div>
    `;
    
    historyItem.addEventListener("click", (e) => {
      initAudio();
      playClickSound("default");
      currentInput = item.result.replace(/,/g, "");
      isEvaluated = true;
      updateDisplay();
    });

    historyItem.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        historyItem.click();
      }
    });

    historyList.appendChild(historyItem);
  });
}

clearHistoryBtn.addEventListener("click", (e) => {
  initAudio();
  playClickSound("clear");
  createRipple(e, clearHistoryBtn);
  
  history = [];
  localStorage.setItem("calcHistory", JSON.stringify(history));
  renderHistory();
});

// --- SMART MATHEMATICAL SOLVERS LOGIC ---

// Solver Select change template toggling
solverSelect.addEventListener("change", () => {
  const selected = solverSelect.value;
  
  Object.keys(solverForms).forEach(key => {
    if (key === selected) {
      solverForms[key].style.display = "flex";
    } else {
      solverForms[key].style.display = "none";
    }
  });
  playClickSound("default");
});

// 1. Bill Splitter Calculator
btnSolveSplit.addEventListener("click", () => {
  const bill = parseFloat(billAmtInput.value) || 0;
  const tipPct = parseFloat(tipPctInput.value) || 0;
  const people = parseInt(splitPeopleInput.value) || 1;
  
  if (bill <= 0 || people <= 0) return;
  
  const tipTotal = bill * (tipPct / 100);
  const totalBill = bill + tipTotal;
  
  const tipPerPerson = tipTotal / people;
  const totalPerPerson = totalBill / people;
  
  valTipTotal.textContent = `$${tipTotal.toFixed(2)}`;
  valTipPer.textContent = `$${tipPerPerson.toFixed(2)}`;
  valTotalPer.textContent = `$${totalPerPerson.toFixed(2)}`;
  
  resultSplitBox.style.display = "block";
  playClickSound("equals");
});

loadbackSplit.addEventListener("click", () => {
  const val = valTotalPer.textContent.replace("$", "");
  currentInput = val;
  isEvaluated = true;
  updateDisplay();
  playClickSound("default");
});

// 2. BMI Calculator
btnSolveBmi.addEventListener("click", () => {
  const weight = parseFloat(bmiWeightInput.value) || 0;
  const height = parseFloat(bmiHeightInput.value) || 0;
  
  if (weight <= 0 || height <= 0) return;
  
  // BMI formula: kg / m^2
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  
  let classification = "";
  if (bmi < 18.5) classification = "Underweight";
  else if (bmi < 25) classification = "Normal";
  else if (bmi < 30) classification = "Overweight";
  else classification = "Obese";
  
  valBmiScore.textContent = bmi.toFixed(1);
  valBmiClass.textContent = classification;
  
  resultBmiBox.style.display = "block";
  playClickSound("equals");
});

loadbackBmi.addEventListener("click", () => {
  currentInput = valBmiScore.textContent;
  isEvaluated = true;
  updateDisplay();
  playClickSound("default");
});

// 3. Pythagoras Hypotenuse Solver
btnSolvePyth.addEventListener("click", () => {
  const a = parseFloat(pythAInput.value) || 0;
  const b = parseFloat(pythBInput.value) || 0;
  
  if (a <= 0 || b <= 0) return;
  
  // c = sqrt(a^2 + b^2)
  const c = Math.sqrt(a*a + b*b);
  
  valPythC.textContent = c.toFixed(3);
  resultPythBox.style.display = "block";
  playClickSound("equals");
});

loadbackPyth.addEventListener("click", () => {
  currentInput = valPythC.textContent;
  isEvaluated = true;
  updateDisplay();
  playClickSound("default");
});

// --- INITIAL LOADING SCREEN FADEOUT ---
window.addEventListener("DOMContentLoaded", () => {
  renderHistory();
  updateDisplay();
  
  setTimeout(() => {
    loadingScreen.classList.add("fade-out");
  }, 800);
});
