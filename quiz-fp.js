const questions = [
    {
        question:"Who is the father of Programming?",
        answers: [
            { text: "Charles Babbage", correct: true },
            { text: "Tim Berners-Lee", correct: false },
            { text: "Ada Lovelace", correct: false },
            { text: "John von Neumann", correct: false },
        ]
    },{
        question:"What is the meaning of debugging?",
        answers: [
            { text: "Identifying hardware and software of a computer", correct: false },
            { text: "The process of identifying and removing errors from computer hardware or software", correct: true },
            { text: "Analyzing the information", correct: false },
            { text: "Stage of implement the system", correct: false },
        ]
    },{
        question:"What is the Data type of Non-primitive data structure?",
        answers: [
            { text: "Int", correct: false },
            { text: "Array", correct: true },
            { text: "Float", correct: false },
            { text: "Char", correct: false },
        ]
    },{
        question:"What is the meaning of the function isLowerCase()?",
        answers: [
            { text: "Determines whether the specified char value is a letter", correct: false },
            { text: "Determines whether the specified char value is a digit", correct: false },
            { text: "Returns the lowercase form of the specified char value", correct: false },
            { text: "Determines whether the specified char value is lowercase", correct: true },
        ]
    },{
        question:"What is the meaning of Protected Access Modifier?",
        answers: [
            { text: "Accessible only to methods in that class and subclasses of that class", correct: true },
            { text: "Accessible to anyone, both inside and outside the class", correct: false },
            { text: "Only accessible by the class they are defined in", correct: false },
            { text: "Accessible only to classes in the same package", correct: false },
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
