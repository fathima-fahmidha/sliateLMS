const questions = [
    {
        question:"I have been playing is refer which tense?",
        answers: [
            { text: "Past Tense", correct: false},
            { text: "Present Prefect Tense", correct: false},
            { text: "Present Perfect Countinous", correct: true },
            { text: "Future simple", correct: false  },
        ]
    },{
        question:"Convert to passive voice: They will complete the building next year.",
        answers: [
            { text: "The building will be completed by them next year", correct: true  },
            { text: "The building will complete them next year", correct: false },
            { text: "The building is completed by them next year.", correct:false  },
            { text: "The building was completed by them next year", correct:false  },
        ]
    },{
        question:"Which is a compound preposition?",
        answers: [
            { text: "Between", correct: true},
            { text: "On", correct: false},
            { text: "From", correct: false },
            { text: "At", correct: false },
        ]
    },{
        question:"Which is a formal way to decline an invitation?",
        answers: [
            { text: "Sorry, busy!", correct: false},
            { text: "Regretfully, I cannot attend due to a prior engagement.", correct: true},
            { text: "Maybe next time", correct: false },
            { text: "No way.", correct: false},
        ]
    },{
        question:"In a fax, CC stands for:",
        answers: [
            { text: "Carbon Copy", correct:false},
            { text: "Courtesy Copy", correct:false },
            { text: "Confidential Copy", correct:false},
            { text: "Both a and b", correct: true},
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
