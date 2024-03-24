const questions = [
    {
        question: "What is JavaScript primarily used for in web development?",
        answers: [
            { text: "Styling web pages", correct:false},
            { text: "Creating interactive elements", correct:true},
            { text: "Managing databases", correct:false},
            { text: "Generating server-side code", correct:false},
        ]
    },
     {
        question: "Which keyword is used to declare variables in JavaScript?",
        answers: [
            { text: "var", correct:false},
            { text: "let", correct:false},
            { text: "const", correct:false},
            { text: "all of the above", correct:true},
        ]
    },
    {
        question: "What does DOM stand for in JavaScript?",
        answers: [
            { text: "Document Object Model", correct:true},
            { text: "Data Object Model", correct:false},
            { text: "Design Object Model", correct:false},
            { text: "Document Oriented Module", correct:false},
        ]
    },
    {
        question: "Which function is used to print output in the browser console in JavaScript?",
        answers: [
            { text: "alert()", correct:false},
            { text: "prompt()", correct:false},
            { text: "console.log()", correct:true},
            { text: "document.write()", correct:false},
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
    nextButton.innerHTML = "next";
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
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    
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
    }else{
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
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

    function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

    nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }

});



startQuiz();