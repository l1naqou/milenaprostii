const WEB3FORMS_KEY = "b384f517-8ed0-460a-acdd-5e9995f04db2";

const questions = [
  {
    id: 1,
    text: "Привет?",
    type: "choice",
    options: [
      { label: "Да", action: "confetti" },
      { label: "Нет", action: "mellstroy" }
    ]
  },
  {
    id: 2,
    text: "Давай поиграем?",
    type: "choice",
    options: [
      { label: "Давай?", action: "zayka" },
      { label: "Давай!!", action: "zayka" }
    ]
  },
  {
    id: 3,
    text: "Пицца или роллы (или шашлык)?",
    type: "choice",
    options: [
      { label: "Пицца 🍕", action: "yummy" },
      { label: "Роллы 🍣", action: "yummy" },
      { label: "Шашлык 🍢", action: "shashlik" }
    ]
  },
  {
    id: 4,
    text: "Напиши мне ченить (можно оскорбления)",
    type: "text",
    placeholder: "Пиши всё, что думаешь..."
  },
  {
    id: 5,
    text: "Я дурак?",
    type: "choice",
    options: [
      { label: "Наверное, да", action: "spongebob" },
      { label: "Однозначно", action: "cat_drill" }
    ]
  },
  {
    id: 6,
    text: "Простишь меня?",
    type: "choice",
    options: [
      { label: "Да", action: "none" },
      { label: "Нет", action: "none" }
    ]
  }
];

let currentStep = 0;
const userAnswers = {};

const loaderScreen = document.getElementById("loader-screen");
const progressBar = document.getElementById("progress-bar");
const progressPercent = document.getElementById("progress-percent");
const mainWindow = document.getElementById("main-window");
const introScreen = document.getElementById("intro-screen");
const quizScreen = document.getElementById("quiz-screen");
const finalScreen = document.getElementById("final-screen");
const questionCounter = document.getElementById("question-counter");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const statusBarText = document.getElementById("status-bar-text");

const memeOverlay = document.getElementById("meme-overlay");
const memeImage = document.getElementById("meme-image");
const memeVideo = document.getElementById("meme-video");

function createSakuraPetals() {
  const container = document.getElementById("sakura-container");
  const petalsCount = 18;
  for (let i = 0; i < petalsCount; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.innerText = "🌸";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 5 + Math.random() * 6 + "s";
    petal.style.animationDelay = Math.random() * 5 + "s";
    petal.style.fontSize = 14 + Math.random() * 12 + "px";
    container.appendChild(petal);
  }
}

function runFakeVirusLoader() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 14) + 6;
    if (progress >= 100) {
      progress = 100;
      progressBar.style.width = "100%";
      progressPercent.innerText = "100% - Шиза, загружаю милоту 🌸";
      clearInterval(interval);
      setTimeout(() => {
        loaderScreen.classList.add("hidden");
        mainWindow.classList.remove("hidden");
      }, 650);
    } else {
      progressBar.style.width = progress + "%";
      progressPercent.innerText = progress + "%";
    }
  }, 160);
}

function playYummySound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
    });
  } catch (e) {
    console.log("Audio skipped", e);
  }
}

function flashMemeImage(src) {
  memeVideo.classList.add("hidden");
  memeImage.src = src;
  memeImage.classList.remove("hidden");
  memeOverlay.classList.remove("hidden", "flash-fade");
  
  void memeOverlay.offsetWidth;
  memeOverlay.classList.add("flash-fade");

  setTimeout(() => {
    memeOverlay.classList.add("hidden");
    memeImage.classList.add("hidden");
  }, 2000);
}

function flashMellstroyVideo() {
  memeImage.classList.add("hidden");
  memeVideo.classList.remove("hidden");
  memeOverlay.classList.remove("hidden", "flash-fade");
  
  memeVideo.currentTime = 0;
  memeVideo.play().catch(() => {});

  setTimeout(() => {
    memeVideo.pause();
    memeOverlay.classList.add("hidden");
    memeVideo.classList.add("hidden");
  }, 2000);
}

function launchConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#ff6fa5", "#ffb3d1", "#ffffff", "#ff1e7a"]
    });
  }
}

function shakeWindow() {
  mainWindow.classList.remove("shake");
  void mainWindow.offsetWidth;
  mainWindow.classList.add("shake");
}

function triggerMemeEffect(action) {
  shakeWindow();
  switch (action) {
    case "confetti":
      launchConfetti();
      statusBarText.innerText = "ЕССС! 🌸✨";
      break;
    case "mellstroy":
      flashMellstroyVideo();
      statusBarText.innerText = "ЧТОООО?!";
      break;
    case "zayka":
      flashMemeImage("assets/zayka.jpg");
      statusBarText.innerText = "очень необычно, зайка";
      break;
    case "yummy":
      launchConfetti();
      playYummySound();
      statusBarText.innerText = "это кто-то читает чтоль 🍕🍣";
      break;
    case "shashlik":
      flashMemeImage("assets/shashlik.jpg");
      statusBarText.innerText = "Шашлындос 🍢";
      break;
    case "spongebob":
      flashMemeImage("assets/spongebob.jpg");
      statusBarText.innerText = "Пиздец 📜";
      break;
    case "cat_drill":
      flashMemeImage("assets/cat_drill.jpg");
      statusBarText.innerText = "Бжжжжж 🐱";
      break;
    default:
      statusBarText.innerText = "Ответ принят";
      break;
  }
}

function renderQuestion() {
  const q = questions[currentStep];
  questionCounter.innerText = `Вопрос ${currentStep + 1} из ${questions.length}`;
  questionText.innerText = q.text;
  answersContainer.innerHTML = "";

  if (q.type === "choice") {
    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "win98-btn";
      btn.innerText = opt.label;
      btn.onclick = () => handleAnswer(opt.label, opt.action);
      answersContainer.appendChild(btn);
    });
  } else if (q.type === "text") {
    const textarea = document.createElement("textarea");
    textarea.className = "win98-textarea";
    textarea.placeholder = q.placeholder;
    
    const sendBtn = document.createElement("button");
    sendBtn.className = "win98-btn primary-btn";
    sendBtn.innerText = "Отправить";
    sendBtn.onclick = () => {
      const val = textarea.value.trim() || "(Ничего не написала, но осуждающе посмотрела)";
      handleAnswer(val, "confetti");
    };

    answersContainer.appendChild(textarea);
    answersContainer.appendChild(sendBtn);
  }
}

function handleAnswer(answerValue, action) {
  const buttons = answersContainer.querySelectorAll("button");
  buttons.forEach((b) => (b.disabled = true));

  const q = questions[currentStep];
  userAnswers[`Вопрос ${q.id}: ${q.text}`] = answerValue;

  triggerMemeEffect(action);

  setTimeout(() => {
    currentStep++;
    if (currentStep < questions.length) {
      renderQuestion();
    } else {
      finishQuiz();
    }
  }, 2000);
}

async function finishQuiz() {
  quizScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");
  statusBarText.innerText = "Сюрприз открыт! 🎁";
  launchConfetti();

  const statusNote = document.getElementById("send-status");

  if (!WEB3FORMS_KEY || WEB3FORMS_KEY === "b384f517-8ed0-460a-acdd-5e9995f04db2") {
    statusNote.innerText = "Все ответы записаны! 🌸";
    return;
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: "🌸 Ответы Милены с сайта-извинения!",
        from_name: "Milena Quest 98",
        ...userAnswers
      })
    });

    if (response.ok) {
      statusNote.innerText = "Ответы успешно доставлены 🌸";
    } else {
      statusNote.innerText = "Готово! 🌸";
    }
  } catch (error) {
    statusNote.innerText = "Готово! 🌸";
  }
}

document.getElementById("start-btn").addEventListener("click", () => {
  introScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestion();
});

createSakuraPetals();
runFakeVirusLoader();
