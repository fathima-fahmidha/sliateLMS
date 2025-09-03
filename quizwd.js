const questions = [
    {
        question:"What is the definition of WWW?",
        answers: [
            { text: "wide world web", correct: false },
            { text: "world wide web", correct: true },
            { text: "world written web", correct: false },
            { text: "web written web", correct: false },
        ]
    },{
        question:"What is the definition of search-engine?",
        answers: [
            { text: "A search engine is a piece of application software that sits on a powerful computer ( a server) on theInternet", correct: true },
            { text: "is a worldwide collection of networks that links millions of businesses,government agencies, educational institutions,and individuals.", correct: false },
            { text: "is a collection of computers and devices interconnected by communications channels ", correct: false },
            { text: "a software application for retrieving, presenting, and traversing information resources on the World Wide Web", correct: false },
        ]
    },{
        question:"wwhich isnthe correct empty elements?",
        answers: [
            { text: "<br>,<hr>,<p>", correct: false },
            { text: "<hr>,<hr>,<input>", correct: true },
            { text: "<input>,<title>,<li>", correct: false },
            { text: "<hr>,<br>,<span>", correct: false },
        ]
    },{
        question:"what is the tool of wireframe?",
        answers: [
            { text: "figma", correct: true },
            { text: "wampp", correct: false },
            { text: "vscode", correct: false },
            { text: "netbeans", correct: false},
        ]
    },{
        question:"what is the advantage of Dynamic wensite?",
        answers: [
            { text: "It is used the HTML code to develop a website", correct: false },
            { text: "It is used the sever side Scripting language", correct: true },
            { text: "The same content webpage load in the website ", correct: false },
            { text: "Cheap to develop", correct: false },
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
