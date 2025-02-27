const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerBar = document.getElementById("timer-bar");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const finalScoreEl = document.getElementById("final-score");
const quizSection = document.getElementById("quiz-section");

let score = 0;
let questionCount = 0;
let currentQuestion = {};
let timer;
let difficultyLevels = [
    { level: "easy", time: 8 },
    { level: "medium", time: 9 },
    { level: "hard", time: 10 }
];

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

function startGame() {
    startBtn.classList.add("hidden");
    quizSection.classList.remove("hidden");
    restartBtn.classList.add("hidden");
    finalScoreEl.classList.add("hidden");
    timerBar.classList.remove("hidden");
    score = 0;
    questionCount = 0;
    nextQuestion();
}

function restartGame() {
    startGame();
}

function nextQuestion() {
    if (questionCount >= 10) {
        endGame();
        return;
    }

    let difficulty = difficultyLevels[
        questionCount < 3 ? 0 : questionCount < 6 ? 1 : 2
    ];
    
    currentQuestion = generateQuestion(difficulty.level);
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option, button));
        optionsEl.appendChild(button);
    });

    startTimer(difficulty.time);
    questionCount++;
}

function generateQuestion(level) {
    let num1, num2, correctAnswer;
    if (level === "easy") {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 + num2;
    } else if (level === "medium") {
        num1 = Math.floor(Math.random() * 20) + 5;
        num2 = Math.floor(Math.random() * 15) + 5;
        correctAnswer = num1 - num2;
    } else {
        num1 = Math.floor(Math.random() * 10) + 2;
        num2 = Math.floor(Math.random() * 5) + 1;
        correctAnswer = num1 * num2;
    }

    let options = [correctAnswer];
    while (options.length < 4) {
        let wrongAnswer = correctAnswer + Math.floor(Math.random() * 5) - 2;
        if (!options.includes(wrongAnswer)) options.push(wrongAnswer);
    }
    options.sort(() => Math.random() - 0.5);

    return { question: `${num1} ${level === "easy" ? "+" : level === "medium" ? "-" : "×"} ${num2} = ?`, options, correctAnswer };
}

function checkAnswer(selectedAnswer, button) {
    if (selectedAnswer === currentQuestion.correctAnswer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        revealCorrectAnswer();
    }
    setTimeout(nextQuestion, 1000);
}

function revealCorrectAnswer() {
    Array.from(optionsEl.children).forEach(button => {
        if (parseInt(button.textContent) === currentQuestion.correctAnswer) {
            button.classList.add("correct");
        }
    });
}

function startTimer(time) {
    clearInterval(timer);
    timerBar.style.width = "100%";
    let width = 100;
    timer = setInterval(() => {
        width -= 100 / time;
        timerBar.style.width = `${width}%`;
        if (width <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function endGame() {
    quizSection.classList.add("hidden");
    timerBar.classList.add("hidden"); 
    finalScoreEl.textContent = `Your Score: ${score}/10`;
    finalScoreEl.classList.remove("hidden");
    restartBtn.classList.remove("hidden");
}
const departmentText = document.getElementById("department-text");

function startGame() {
    startBtn.classList.add("hidden");
    quizSection.classList.remove("hidden");
    restartBtn.classList.add("hidden");
    finalScoreEl.classList.add("hidden");
    timerBar.classList.remove("hidden");
    score = 0;
    questionCount = 0;
    
    departmentText.classList.add("hidden"); // Hide department name when game starts
    
    nextQuestion();
}

function restartGame() {
    departmentText.classList.remove("hidden"); // Show department name again on restart
    startGame();
}
