const questions = [
    {
        question:"What is the output of a half adder when the inputs are A=1 and B=1?",
        answers: [
            { text: "S=0, C=0", correct: false },
            { text: "S=1, C=0", correct: false },
            { text: "S=0, C=1", correct: true },
            { text: "S=1, C=1", correct: false },
        ]
    },{
        question:"Which of the following gates is not a primitive logic gate?",
        answers: [
            { text: "AND", correct: false },
            { text: " OR", correct: false },
            { text: "NAND", correct: true },
            { text: " NOT", correct: false },
        ]
    },{
        question:"In a 4-to-1 multiplexer, how many select lines are required?",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false },
            { text: "4", correct: false },
        ]
    },{
        question:"Which component is used to switch one of several input lines to a single output line?",
        answers: [
            { text: "Decoder", correct: false },
            { text: "Encoder", correct: false },
            { text: "Multiplexer", correct: true },
            { text: "Demultiplexer", correct: false},
        ]
    },{
        question:"In an RS flip-flop, what happens when both R and S are set to 1?",
        answers: [
            { text: "The output becomes 0.", correct: false },
            { text: "The output becomes 1.", correct: false },
            { text: "The output is unpredictable (invalid state).", correct: true },
            { text: "The output remains unchanged.", correct: false },
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
