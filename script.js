let index = 0;
let correct = 0,
incorrect = 0;
let quizData=[];
let ques = document.getElementById("ques");
let allInputs = document.querySelectorAll("input[type='radio']")
const loader=document.querySelector('.loader');
const box=document.querySelector('.box');

fetch("https://the-trivia-api.com/v2/questions/")
    .then(res=>{
        return res.json();
    })
    .then(loadedQuestions=>{
        
        quizData = loadedQuestions.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question.text,
            };

            const answerChoices = [...loadedQuestion.incorrectAnswers];
            
            formattedQuestion.answer = "choice"+( Math.floor(Math.random() * 4) + 1);
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correctAnswer
            );
            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice'+(index + 1)] = choice;
            });
            
            return formattedQuestion;
        })
        startGame();
        });
let total = 0;
startGame = () => {
    
    availableQuesions = [...quizData];
    total=availableQuesions.length;
    box.style.visibility="visible"; 
    loader.style.visibility="hidden";
    loadQuestion();
};


const loadQuestion = () => {
    if (total === index) {
        return quizEnd()
    }
    reset()

    const data = availableQuesions[index]
    ques.innerHTML = `${index + 1}) ${data.question}`
    allInputs[0].nextElementSibling.innerText = data.choice1;
    allInputs[1].nextElementSibling.innerText = data.choice2;
    allInputs[2].nextElementSibling.innerText = data.choice3;
    allInputs[3].nextElementSibling.innerText = data.choice4;
}

document.querySelector("#submit").addEventListener(
"click",
function() {
    const data = availableQuesions[index]
    const ans = getAnswer()

    if (ans === data.answer) {
        correct++;
    } else {
        incorrect++;
    }
    index++;
    loadQuestion()
}
)

const getAnswer = () => {
let ans;
allInputs.forEach(
    (input) => {
        if (input.checked) {
            ans = input.value;
        }
    }
)
return ans;
}

const reset = () => {
allInputs.forEach(
    (input) => {
        input.checked = false;
    }
)
}

const quizEnd = () => {
    const cont=document.querySelector(".box");
    cont.innerHTML= `
        <h3 class="result">Your score is ${correct} / ${total} !!</h3>`;
}
