let questions = [];
let currentIndex = 0;
let score = 0;

function loadQuiz() {
    const quizSelector = document.getElementById("quizSelector");
    const selectedQuiz = quizSelector.value;

    if (selectedQuiz) {
        fetch(selectedQuiz)
            .then(response => response.json())
            .then(data => {
                questions = data;
                currentIndex = 0;
                score = 0;
                document.getElementById("score").style.display = "none";
                displayQuestion();
            })
            .catch(error => console.error("Error loading quiz:", error));
    } else {
        document.getElementById("quiz").style.display = "none";
    }
}

function displayQuestion() {
    if (currentIndex < questions.length) {
        const questionElement = document.getElementById("question");
        const choicesElement = document.getElementById("choices");
        const currentQuestion = questions[currentIndex];

        questionElement.textContent = currentQuestion.question;
        choicesElement.innerHTML = "";

        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.onclick = () => checkAnswer(index);
            choicesElement.appendChild(button);
        });

        document.getElementById("quiz").style.display = "block";
    } else {
        displayScore();
    }
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
    }
    currentIndex++;
    displayQuestion();
}

function displayScore() {
    document.getElementById("quiz").style.display = "none";
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `You scored ${score} out of ${questions.length}`;
    scoreElement.style.display = "block";

    saveQuizResult(score, questions.length);
}

// Save quiz result to local storage
function saveQuizResult(score, total) {
    const quizSelector = document.getElementById("quizSelector");
    const quizName = quizSelector.options[quizSelector.selectedIndex].text;
    const result = {
        quizName,
        score,
        total,
        date: new Date().toLocaleDateString()
    };

    let stats = JSON.parse(localStorage.getItem("quizStats")) || [];
    stats.push(result);
    localStorage.setItem("quizStats", JSON.stringify(stats));
}

// Exit the quiz and go back to the quiz selector
function exitQuiz() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("score").style.display = "none";
    document.getElementById("quizSelector").style.display = "block";
}