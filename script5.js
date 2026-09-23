let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let playerName = "";

const quizData = [
  {
    question: "رسول اکرم ﷺ نے غزوۂ تبوک کے موقع پر حضرت علیؑ کے بارے میں کون سا مشہور جملہ ارشاد فرمایا؟",
    options: ["انا مدینۃ العلم", "من کنت مولاہ", "انت منی بمنزلۃ ہارون من موسیٰ", "علی مع الحق"],
    answer: "انت منی بمنزلۃ ہارون من موسیٰ"
  },
  {
    question: "امام حسنؑ کے صلح نامے کی ایک اہم شرط کیا تھی؟",
    options: ["خلافت موروثی نہ ہوگی", "بیت المال مدینہ منتقل ہوگا", "کوفہ دارالحکومت ہوگا", "شام میں نیا نظام قائم ہوگا"],
    answer: "خلافت موروثی نہ ہوگی"
  },
  {
    question: "امام حسینؑ کے قاصد اور نمائندے کی حیثیت سے کوفہ کون گئے تھے؟",
    options: ["حبیب بن مظاہر", "مسلم بن عقیل", "زہیر بن قین", "مختار ثقفی"],
    answer: "مسلم بن عقیل"
  },
  {
    question: "صحیفہ سجادیہ کو بعض علماء کس نام سے یاد کرتے ہیں؟",
    options: ["زبور آل محمدؑ", "انجیل اہل بیتؑ", "مصحف فاطمہؑ", "کتاب امامت"],
    answer: "زبور آل محمدؑ"
  },
  {
    question: "امام محمد باقرؑ واقعۂ کربلا کے وقت تقریباً کتنی عمر رکھتے تھے؟",
    options: ["2 سال", "4 سال", "6 سال", "8 سال"],
    answer: "4 سال"
  },
  {
    question: "امام جعفر صادقؑ کے دور میں اموی حکومت کے خاتمے اور کس حکومت کے قیام کا زمانہ تھا؟",
    options: ["فاطمی", "عثمانی", "عباسی", "ایوبی"],
    answer: "عباسی"
  },
  {
    question: "امام موسیٰ کاظمؑ کا مشہور لقب کاظم کس صفت کی وجہ سے ہے؟",
    options: ["علم", "شجاعت", "غصے کو پی جانا", "عبادت"],
    answer: "غصے کو پی جانا"
  },
  {
    question: "امام رضاؑ اور علمائے ادیان کے درمیان مشہور مناظرے کہاں منعقد ہوئے؟",
    options: ["بغداد", "مدینہ", "مرو", "کوفہ"],
    answer: "مرو"
  },
  {
    question: "امام محمد تقیؑ نے قاضی یحییٰ بن اکثم کے ساتھ مناظرہ کس عمر میں کیا تھا؟",
    options: ["7 سال", "8 سال", "9 سال", "10 سال"],
    answer: "9 سال"
  },
  {
    question: "امام علی نقیؑ (ہادیؑ) کی مشہور زیارت کون سی ہے؟",
    options: ["زیارت وارث", "زیارت عاشورا", "زیارت جامعہ کبیرہ", "زیارت امین اللہ"],
    answer: "زیارت جامعہ کبیرہ"
  },
  {
    question: "امام حسن عسکریؑ کی کنیت کیا تھی؟",
    options: ["ابو محمد", "ابو القاسم", "ابو الحسن", "ابو عبداللہ"],
    answer: "ابو محمد"
  },
  {
    question: "غیبت صغریٰ کے آخری نائب خاص کون تھے؟",
    options: ["عثمان بن سعید", "محمد بن عثمان", "حسین بن روح", "علی بن محمد سمری"],
    answer: "علی بن محمد سمری"
  },
  {
    question: "حضرت فاطمہ زہراؑ کا خطبہ جس میں فدک کا مطالبہ کیا گیا کس نام سے مشہور ہے؟",
    options: ["خطبہ شقشقیہ", "خطبہ فدکیہ", "خطبہ غدیر", "خطبہ منیٰ"],
    answer: "خطبہ فدکیہ"
  },
  {
    question: "چودہ معصومینؑ میں سب سے پہلے کس امامؑ کو رضا کے لقب سے شہرت ملی؟",
    options: ["امام حسنؑ", "امام باقرؑ", "امام موسیٰ کاظمؑ", "امام علی بن موسیٰؑ"],
    answer: "امام علی بن موسیٰؑ"
  },
  {
    question: "امام مہدیؑ کی ولادت کے وقت عباسی خلیفہ کون تھا؟",
    options: ["مامون", "متوکل", "معتمد عباسی", "معتصم"],
    answer: "معتمد عباسی"
  }
];

document.getElementById("startBtn").addEventListener("click", () => {
  const nameInput = document.getElementById("studentName");
  playerName = nameInput.value.trim();

  if (playerName === "") {
    alert("برائے مہربانی اپنا نام درج کریں");
    return;
  }

  document.getElementById("welcomeScreen").classList.add("hidden");
  document.getElementById("quizScreen").classList.remove("hidden");
  loadQuestion();
});

function loadQuestion() {
  selectedAnswer = null;
  const q = quizData[currentQuestion];

  document.getElementById("question").innerText = q.question;
  document.getElementById("questionCount").innerText = `${currentQuestion + 1} / ${quizData.length}`;
  document.getElementById("scoreBox").innerText = `اسکور: ${score}`;
  document.getElementById("progressBar").style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  q.options.forEach(optionText => {
    const optDiv = document.createElement("div");
    optDiv.className = "option";
    optDiv.innerText = optionText;
    
    optDiv.addEventListener("click", function() {
      selectOption(this, optionText);
    });

    optionsContainer.appendChild(optDiv);
  });
}

function selectOption(element, option) {
  if (selectedAnswer !== null) return;

  selectedAnswer = option;
  const correctAnswer = quizData[currentQuestion].answer;

  document.querySelectorAll(".option").forEach(opt => {
    opt.style.pointerEvents = "none";
    if (opt.innerText.trim() === correctAnswer) {
      opt.classList.add("correct");
    }
  });

  if (option === correctAnswer) {
    score++;
    showFlowers();
  } else {
    element.classList.add("wrong");
  }
}

document.getElementById("nextBtn").addEventListener("click", () => {
  if (selectedAnswer === null) {
    alert("پہلے جواب منتخب کریں");
    return;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
});

function finishQuiz() {
  localStorage.setItem("studentName", playerName);
  localStorage.setItem("score", score);
  localStorage.setItem("total", quizData.length);
  window.location.href = "result5.html";
}

function showFlowers() {
  const emojis = ["🌸", "🌺", "🌷", "💐", "🌹"];
  const container = document.getElementById("flowerContainer");

  for (let i = 0; i < 25; i++) {
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    flower.style.left = Math.random() * 100 + "%";
    flower.style.animationDuration = (2 + Math.random() * 2) + "s";

    container.appendChild(flower);
    setTimeout(() => { flower.remove(); }, 3500);
  }
}