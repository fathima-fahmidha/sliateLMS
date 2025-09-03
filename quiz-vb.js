const questions = [
    {
        question:"What is encapsulation in C#?",
        answers: [
            { text: "Hiding internal implementation details", correct:true},
            { text: "Inheriting from multiple classes", correct: false},
            { text: "Overloading operators", correct:false },
            { text: "Creating static methods", correct: false},
        ]
    },{
        question:"Which keyword is used to inherit a class in C#?",
        answers: [
            { text: "extends", correct: false},
            { text: "inherits", correct:false},
            { text: ":", correct: true},
            { text: "super", correct:false},
        ]
    },{
        question:"What is a syntax error?",
        answers: [
            { text: "A logical mistake in code", correct: false },
            { text: "A violation of language rules (e.g., missing semicolon)", correct:true},
            { text: "A runtime exception", correct: false },
            { text: "A memory leak", correct: false },
        ]
    },{
        question:"What is the purpose of the Timer control in Windows Forms?",
        answers: [
            { text: "To display the current time", correct: false},
            { text: "To execute code at specified intervals", correct: true},
            { text: "To measure execution speed", correct: false },
            { text: "To create delays", correct: false},
        ]
    },{
        question:"What is the output of Console.WriteLine(5 / 2); in C#?",
        answers: [
            { text: "2.5", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false },
            { text: "Compilation error", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
