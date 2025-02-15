const quizData = [
    {
        question: "In satellite-based communication, VSAT stands for...",
        options: ["Very Small Aperture Terminal", "Very Short Aperture Terminal", "Variable Small Aperture Terminal", "Virtual Satellite Access Terminal"],
        answer: "Very Small Aperture Terminal"
    },
    {
        question: "Who is known as the father of computers?",
        options: ["Charles Babbage", "Alan Turing", "John von Neumann", "Bill Gates"],
        answer: "Charles Babbage"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        answer: "Tokyo"
    },
    {
        question: "What planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Mark Twain", "J.K. Rowling", "Charles Dickens"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "HO2"],
        answer: "H2O"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "What is the smallest unit of life?",
        options: ["Cell", "Molecule", "Atom", "Organ"],
        answer: "Cell"
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        answer: "8"
    },
    {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Avocado", "Lettuce", "Cucumber"],
        answer: "Avocado"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.option ul');
const resultElement = document.getElementById('result');

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = `Ques ${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = 'button';
        input.value = option;
        input.classList.add('option-btn');
        input.addEventListener('click', () => selectOption(option, input));
        li.appendChild(input);
        optionsElement.appendChild(li);
    });

    updateButtons();
}

function selectOption(option, inputElement) {
    const currentQuestion = quizData[currentQuestionIndex];
    const allOptions = document.querySelectorAll('.option-btn');

    if (option === currentQuestion.answer) {
        score++;
        inputElement.style.backgroundColor = 'green';
    } else {
        inputElement.style.backgroundColor = 'red';
    }

    allOptions.forEach(optionBtn => {
        optionBtn.disabled = true;
        if (optionBtn.value === currentQuestion.answer) {
            optionBtn.style.backgroundColor = 'green';
        } else if (optionBtn !== inputElement) {
            optionBtn.style.backgroundColor = 'red';
        }
    });

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500); // Delay before loading next question
}

function showResult() {
    questionElement.textContent = `You scored ${score} out of ${quizData.length}!`;
    optionsElement.innerHTML = '';
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
    retryButton.addEventListener('click', () => location.reload());
    optionsElement.appendChild(retryButton);
}

function goBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function skipQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function updateButtons() {
    const backButton = document.querySelector('.back');
    const skipButton = document.querySelector('.skip');
    backButton.disabled = currentQuestionIndex === 0;
    skipButton.disabled = currentQuestionIndex === quizData.length - 1;
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();

    document.querySelector('.back').addEventListener('click', goBack);
    document.querySelector('.skip').addEventListener('click', skipQuestion);
});
